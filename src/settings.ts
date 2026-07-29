export type AppSettings = {
  /** OpenAI Images 兼容网关地址，可带或不带 /v1 */
  baseUrl: string;
  apiKey: string;
  /** 文生图模型（gpt-image-* 走 /images/generations，其它走 /responses） */
  imageModel: string;
  /** 有参考图时 /images/edits 使用的编辑模型（需 gpt-image 系列） */
  editModel: string;
  /** 实物图海报“看图策划”模型；设为 gpt-image 系列则跳过策划、用静态富指令 */
  briefModel: string;
  /** “读取图中文案”用的视觉模型（需 chat+vision） */
  visionModel: string;
  /** 失败自动重试次数 */
  maxRetries: number;
  /** 单次生成超时（秒） */
  timeoutSeconds: number;
};

export const DEFAULT_SETTINGS: AppSettings = {
  baseUrl: 'https://claudegpt.com/v1',
  apiKey: '',
  imageModel: 'gpt-image-2',
  editModel: 'gpt-image-2',
  briefModel: 'gpt-image-2',
  visionModel: 'gpt-5.5',
  maxRetries: 1,
  timeoutSeconds: 600
};

const STORAGE_KEY = 'imageultra.settings.v1';

export function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    const parsed = JSON.parse(raw) as Partial<AppSettings>;
    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
      baseUrl: String(parsed.baseUrl ?? DEFAULT_SETTINGS.baseUrl).trim() || DEFAULT_SETTINGS.baseUrl,
      maxRetries: clampInt(parsed.maxRetries, 0, 5, DEFAULT_SETTINGS.maxRetries),
      timeoutSeconds: clampInt(parsed.timeoutSeconds, 60, 1800, DEFAULT_SETTINGS.timeoutSeconds)
    };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSettings(settings: AppSettings): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

function clampInt(value: unknown, min: number, max: number, fallback: number): number {
  const num = Number(value);
  if (!Number.isFinite(num)) return fallback;
  return Math.min(max, Math.max(min, Math.round(num)));
}

/** /v1 结尾的接口根路径（与 imagepro 服务端 response_api_base_url 一致）。 */
export function apiBaseUrl(settings: AppSettings): string {
  const base = settings.baseUrl.trim().replace(/\/+$/, '');
  return base.endsWith('/v1') ? base : `${base}/v1`;
}
