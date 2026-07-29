/**
 * 统一 fetch：Tauri 打包环境走 plugin-http（Rust 侧请求，无 CORS 限制），
 * 浏览器开发环境退回 window.fetch。
 */

type FetchLike = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

let cachedFetch: FetchLike | null = null;

export function isTauri(): boolean {
  return typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;
}

export async function appFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  if (!cachedFetch) {
    if (isTauri()) {
      const mod = await import('@tauri-apps/plugin-http');
      cachedFetch = mod.fetch as FetchLike;
    } else {
      cachedFetch = window.fetch.bind(window);
    }
  }
  return cachedFetch(input, init);
}

/** 带超时的 AbortSignal（webview 对 AbortSignal.timeout 支持不一，手动实现）。 */
export function timeoutSignal(ms: number): { signal: AbortSignal; cancel: () => void } {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(new DOMException('timeout', 'TimeoutError')), ms);
  return { signal: controller.signal, cancel: () => window.clearTimeout(timer) };
}
