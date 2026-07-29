import type { ProjectSpec } from './types';

/**
 * 图像本地处理：用 canvas 等价实现 imagepro 服务端的 Pillow 后处理，
 * 以及 /images/* 端点的尺寸映射规则。
 */

/** /v1/images/generations 的尺寸：最长边压到 1024、对齐 16 的倍数。 */
export function imageProviderSize(project: ProjectSpec): string {
  const width = project.canvas_width || 1024;
  const height = project.canvas_height || 1024;
  const scale = Math.max(1, 1024 / Math.max(width, height));
  const normalizedWidth = Math.max(16, Math.round((width * scale) / 16) * 16);
  const normalizedHeight = Math.max(16, Math.round((height * scale) / 16) * 16);
  return `${normalizedWidth}x${normalizedHeight}`;
}

export function imageProviderQuality(project: ProjectSpec): string {
  return ({ '1k': 'low', '2k': 'medium', '4k': 'high' } as Record<string, string>)[project.image_quality || '1k'] ?? 'low';
}

/** /v1/images/edits 仅支持有限尺寸，按画面比例就近映射到竖版/横版/方图。 */
export function imagesEditSize(project: ProjectSpec): string {
  const width = project.canvas_width || 1024;
  const height = project.canvas_height || 1024;
  if (width >= height * 1.15) return '1536x1024';
  if (height >= width * 1.15) return '1024x1536';
  return '1024x1024';
}

/** 按输入图本身的宽高比就近映射尺寸（修图模式用，保持原图朝向）。 */
export function imagesEditSizeFromDims(width: number, height: number): string {
  if (!width || !height) return '1024x1024';
  if (width >= height * 1.15) return '1536x1024';
  if (height >= width * 1.15) return '1024x1536';
  return '1024x1024';
}

async function decodeImage(bytes: Uint8Array): Promise<ImageBitmap | HTMLImageElement> {
  const blob = new Blob([bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer]);
  if (typeof createImageBitmap === 'function') {
    try {
      return await createImageBitmap(blob);
    } catch {
      // 回退 <img> 解码
    }
  }
  return await new Promise<HTMLImageElement>((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('图片解码失败'));
    };
    img.src = url;
  });
}

function sourceSize(source: ImageBitmap | HTMLImageElement): { width: number; height: number } {
  if (source instanceof HTMLImageElement) {
    return { width: source.naturalWidth, height: source.naturalHeight };
  }
  return { width: source.width, height: source.height };
}

async function canvasToPngBytes(canvas: HTMLCanvasElement): Promise<Uint8Array> {
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((result) => (result ? resolve(result) : reject(new Error('导出 PNG 失败'))), 'image/png');
  });
  return new Uint8Array(await blob.arrayBuffer());
}

/** 任意格式图片统一转 PNG（并拿到宽高），作为参考图上传。 */
export async function normalizeToPng(file: Blob): Promise<{ bytes: Uint8Array; width: number; height: number }> {
  const raw = new Uint8Array(await file.arrayBuffer());
  const source = await decodeImage(raw);
  const { width, height } = sourceSize(source);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('当前环境不支持 canvas');
  ctx.drawImage(source, 0, 0);
  const bytes = await canvasToPngBytes(canvas);
  if ('close' in source) source.close();
  return { bytes, width, height };
}

/** 送进视觉模型前把实物图压到合理尺寸，控制 token 与延迟（等价 downscale_for_vision）。 */
export async function downscaleForVision(bytes: Uint8Array, maxSide = 1024): Promise<Uint8Array> {
  try {
    const source = await decodeImage(bytes);
    const { width, height } = sourceSize(source);
    if (Math.max(width, height) <= maxSide) {
      if ('close' in source) source.close();
      return bytes;
    }
    const ratio = maxSide / Math.max(width, height);
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(width * ratio));
    canvas.height = Math.max(1, Math.round(height * ratio));
    const ctx = canvas.getContext('2d');
    if (!ctx) return bytes;
    ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
    if ('close' in source) source.close();
    return await canvasToPngBytes(canvas);
  } catch {
    return bytes;
  }
}

/**
 * 证件照后处理：把模型产物按“覆盖+居中裁切”精确裁到目标像素。
 * 纵向重心略偏上（0.42），保住头顶留白、避免裁掉头部（等价 ImageOps.fit centering=(0.5, 0.42)）。
 */
export async function fitIdPhoto(bytes: Uint8Array, targetWidth: number, targetHeight: number): Promise<Uint8Array> {
  try {
    const source = await decodeImage(bytes);
    const { width, height } = sourceSize(source);
    const scale = Math.max(targetWidth / width, targetHeight / height);
    const scaledWidth = width * scale;
    const scaledHeight = height * scale;
    const offsetX = (scaledWidth - targetWidth) * 0.5;
    const offsetY = (scaledHeight - targetHeight) * 0.42;
    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return bytes;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(source, -offsetX, -offsetY, scaledWidth, scaledHeight);
    if ('close' in source) source.close();
    return await canvasToPngBytes(canvas);
  } catch {
    return bytes;
  }
}

/** 读取图片字节的真实宽高（用于历史记录与预览比例）。 */
export async function imageDimsFromBytes(bytes: Uint8Array): Promise<{ width: number; height: number }> {
  const source = await decodeImage(bytes);
  const size = sourceSize(source);
  if ('close' in source) source.close();
  return size;
}

export function bytesToBlob(bytes: Uint8Array, mimeType = 'image/png'): Blob {
  return new Blob([bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer], { type: mimeType });
}

export function bytesToBase64(bytes: Uint8Array): string {
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

export function base64ToBytes(base64: string): Uint8Array {
  const binary = atob(base64.replace(/\s+/g, ''));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}
