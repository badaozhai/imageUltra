import { isTauri } from './http';

/** 保存图片：桌面走系统保存对话框；安卓没有保存对话框，回退写入下载/应用目录；浏览器直接下载。 */

const cleanFileName = (name: string) => name.replace(/[\\/:*?"<>|]+/g, '-').slice(0, 120) || `image-${Date.now()}.png`;

export async function saveImageToDevice(blob: Blob, fileName: string): Promise<string> {
  const safeName = cleanFileName(fileName);
  if (isTauri()) {
    const bytes = new Uint8Array(await blob.arrayBuffer());
    const [{ save }, fs, path] = await Promise.all([
      import('@tauri-apps/plugin-dialog'),
      import('@tauri-apps/plugin-fs'),
      import('@tauri-apps/api/path')
    ]);
    try {
      const defaultPath = await path.join(await path.downloadDir(), safeName);
      const target = await save({ defaultPath, filters: [{ name: 'PNG Image', extensions: ['png'] }] });
      if (!target) return '已取消保存';
      await fs.writeFile(target, bytes);
      return `已保存到 ${target}`;
    } catch {
      // 移动端（Android）无保存对话框：依次尝试 下载目录 → 应用数据目录
      try {
        await fs.writeFile(safeName, bytes, { baseDir: fs.BaseDirectory.Download });
        return `已保存到下载目录：${safeName}`;
      } catch {
        await fs.writeFile(safeName, bytes, { baseDir: fs.BaseDirectory.AppData });
        return `已保存到应用数据目录：${safeName}`;
      }
    }
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
