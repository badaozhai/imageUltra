import { isTauri } from './http';

/** 保存图片到本地：Tauri 走系统保存对话框，浏览器开发环境退回下载。 */

const cleanFileName = (name: string) => name.replace(/[\\/:*?"<>|]+/g, '-').slice(0, 120) || `image-${Date.now()}.png`;

export async function saveImageToDevice(blob: Blob, fileName: string): Promise<string> {
  const safeName = cleanFileName(fileName);
  if (isTauri()) {
    const [{ save }, { writeFile }, { downloadDir, join }] = await Promise.all([
      import('@tauri-apps/plugin-dialog'),
      import('@tauri-apps/plugin-fs'),
      import('@tauri-apps/api/path')
    ]);
    const defaultPath = await join(await downloadDir(), safeName);
    const path = await save({ defaultPath, filters: [{ name: 'PNG Image', extensions: ['png'] }] });
    if (!path) return '已取消保存';
    await writeFile(path, new Uint8Array(await blob.arrayBuffer()));
    return `已保存到 ${path}`;
  }
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = safeName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
  return '已开始浏览器下载';
}
