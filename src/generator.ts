import { appFetch, timeoutSignal } from './http';
import {
  base64ToBytes,
  bytesToBase64,
  bytesToBlob,
  downscaleForVision,
  fitIdPhoto,
  imageProviderQuality,
  imageProviderSize,
  imagesEditSize,
  imagesEditSizeFromDims
} from './imageOps';
import {
  POSTER_BRIEF_SYSTEM,
  buildIdPhotoPrompt,
  buildImagePosterPrompt,
  buildPhotoEditPrompt,
  buildPrompt,
  contentPromptText,
  fallbackPosterBrief,
  idPhotoSpec
} from './prompts';
import { apiBaseUrl, type AppSettings } from './settings';
import type { GeneratedImage, GenerationRequest, ProjectSpec } from './types';

/**
 * 生图引擎：移植 imagepro 服务端 generation_service.call_image2。
 * 三种上游路线：有参考图 → /v1/images/edits（gpt-image 编辑模型，input_fidelity=high）；
 * gpt-image 文生图 → /v1/images/generations；gpt-5.x 文生图 → /v1/responses（流式）。
 */

export type GenerationEventHandler = (message: string) => void;

export function supportsImagesGenerationEndpoint(modelName: string): boolean {
  return modelName.startsWith('gpt-image-');
}

/** 各模式的种子提示词（等价 content.build_generation_prompt）。 */
export function buildSeedPrompt(req: GenerationRequest): string {
  if (req.promptOverride?.trim()) return req.promptOverride.trim();
  if (req.mode === 'image') return buildImagePosterPrompt(req.project, req.references.length);
  if (req.mode === 'edit') return buildPhotoEditPrompt(req.instruction, req.references.length);
  if (req.mode === 'id') return buildIdPhotoPrompt(req.idSize, req.idBg);
  if (req.mode === 'three_view' || req.mode === 'lookbook' || req.mode === 'prop') return '';
  return `${buildPrompt(req.project)}${contentPromptText(req.content)}`;
}

function errorBodySummary(body: string): string {
  try {
    const payload = JSON.parse(body);
    if (payload && typeof payload === 'object') {
      const error = (payload as Record<string, unknown>).error;
      if (error && typeof error === 'object') {
        const err = error as Record<string, unknown>;
        return String(err.message ?? err.detail ?? JSON.stringify(error)).slice(0, 500);
      }
      if (typeof error === 'string') return error.slice(0, 500);
      const detail = (payload as Record<string, unknown>).detail;
      if (detail) return String(detail).slice(0, 500);
    }
  } catch {
    // 原样返回文本
  }
  return body.slice(0, 500);
}

function providerErrorMessage(exc: unknown, providerWarning: string): string {
  if (providerWarning) return providerWarning;
  if (exc instanceof DOMException && (exc.name === 'TimeoutError' || exc.name === 'AbortError')) {
    return '上游生图接口超时未完成，请重试';
  }
  const message = exc instanceof Error ? exc.message.trim() : String(exc).trim();
  if (/load failed|failed to fetch|network/i.test(message)) {
    return `无法连接生图接口：${message}`;
  }
  return message.slice(0, 300) || '未知错误';
}

const sleep = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

/**
 * 模拟 ChatGPT 的策划过程：让视觉模型看着实物图，把简单需求扩展成一份内容丰富、
 * 版式明确的中文海报生成指令，再交给 gpt-image 出图。失败则回退到静态富指令模板。
 * readImageText=true 时强制用视觉模型识别图中已有文字/介绍并回填进文案。
 */
export async function buildPosterBrief(
  project: ProjectSpec,
  referenceImages: Uint8Array[],
  settings: AppSettings,
  readImageText: boolean,
  onEvent?: GenerationEventHandler
): Promise<string> {
  const keyword = (project.industry || '').trim();
  const aspect = (project.aspect_ratio || '9:16').trim();
  const count = referenceImages.length;
  let briefModel = (settings.briefModel || settings.imageModel || '').trim();
  if (readImageText) {
    // 读取图中文字必须用 chat+视觉模型
    briefModel = (settings.visionModel || 'gpt-5.5').trim() || 'gpt-5.5';
  } else if (supportsImagesGenerationEndpoint(briefModel)) {
    // gpt-image 系列是图像模型、不能做 chat 策划：直接用静态富指令
    return fallbackPosterBrief(project, count);
  }
  try {
    onEvent?.(`正在用 ${briefModel} 看图策划海报文案`);
    let userText: string;
    if (readImageText) {
      userText =
        `画面比例 ${aspect}。主题：${keyword || '（根据图片自行判断）'}。` +
        '请仔细识别并准确提取这张图里所有的文字、产品介绍、卖点、价格、活动信息（忠实原文、不要编造、不要漏字或改字），' +
        '把这些内容作为海报文案的主要内容来组织排版；若图中本身是产品实物，保留产品作为主视觉。' +
        '输出一张精致、专业、信息完整的中文营销海报的文生图指令。';
    } else if (count >= 2) {
      userText =
        `用户上传了 ${count} 张不同产品的照片，画面比例 ${aspect}。主题：${keyword || '（自行判断）'}。` +
        '请输出一张【产品合集/家族海报】的文生图指令：把每个真实产品都原样保留并协调地陈列在同一张海报里，' +
        '配统一的背景与光影、统领全组的主标题、每个产品一句简短说明。';
    } else {
      userText = `产品主题：${keyword || '（未给出，请根据图片自行判断品类与卖点）'}。画面比例 ${aspect}。请输出这张海报的文生图指令。`;
    }
    const userContent: Array<Record<string, unknown>> = [{ type: 'text', text: userText }];
    for (const item of referenceImages) {
      const b64 = bytesToBase64(await downscaleForVision(item));
      userContent.push({ type: 'image_url', image_url: { url: `data:image/png;base64,${b64}` } });
    }
    const timeoutMs = Math.min(120, settings.timeoutSeconds) * 1000;
    const { signal, cancel } = timeoutSignal(timeoutMs);
    let resp: Response;
    try {
      resp = await appFetch(`${apiBaseUrl(settings)}/chat/completions`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${settings.apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: briefModel,
          messages: [
            { role: 'system', content: POSTER_BRIEF_SYSTEM },
            { role: 'user', content: userContent }
          ],
          max_tokens: 900,
          temperature: 0.8
        }),
        signal
      });
    } finally {
      cancel();
    }
    if (resp.status >= 400) {
      throw new Error(`${resp.status} ${(await resp.text()).slice(0, 300)}`);
    }
    const data = (await resp.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const brief = String(data.choices?.[0]?.message?.content ?? '').trim();
    if (brief) return brief;
    throw new Error('empty brief');
  } catch {
    onEvent?.('看图策划失败，使用内置海报指令');
    return fallbackPosterBrief(project, count);
  }
}

/** 解析 /v1/responses SSE 数据行，提取 image_generation_call 结果。 */
function extractImageFromSseData(dataStr: string): string | null {
  try {
    const data = JSON.parse(dataStr) as Record<string, unknown>;
    if (data.type === 'response.output_item.done') {
      const item = data.item as Record<string, unknown> | undefined;
      if (item && item.type === 'image_generation_call' && typeof item.result === 'string' && item.result) {
        return item.result;
      }
    }
  } catch {
    // 忽略无法解析的行
  }
  return null;
}

/** 从 /v1/responses 非流式 JSON 中提取图片（部分网关会忽略 stream 参数）。 */
function extractImageFromResponsesJson(text: string): string | null {
  try {
    const data = JSON.parse(text) as { output?: Array<Record<string, unknown>> };
    for (const item of data.output ?? []) {
      if (item.type === 'image_generation_call' && typeof item.result === 'string' && item.result) {
        return item.result;
      }
    }
  } catch {
    // 不是 JSON
  }
  return null;
}

async function readResponsesStream(resp: Response): Promise<string> {
  // 优先增量读取；plugin-http 或 webview 不支持 body 流时退回整体读取
  if (resp.body) {
    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let fullText = '';
    while (true) {
      const { done, value } = await reader.read();
      const chunk = decoder.decode(value ?? new Uint8Array(), { stream: !done });
      buffer += chunk;
      fullText += chunk;
      const lines = buffer.split(/\r?\n/);
      buffer = lines.pop() ?? '';
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith('data:')) continue;
        const result = extractImageFromSseData(trimmed.slice(5).trim());
        if (result) {
          await reader.cancel().catch(() => undefined);
          return result;
        }
      }
      if (done) break;
    }
    const tail = buffer.trim();
    if (tail.startsWith('data:')) {
      const result = extractImageFromSseData(tail.slice(5).trim());
      if (result) return result;
    }
    const jsonResult = extractImageFromResponsesJson(fullText);
    if (jsonResult) return jsonResult;
    return '';
  }
  const text = await resp.text();
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('data:')) continue;
    const result = extractImageFromSseData(trimmed.slice(5).trim());
    if (result) return result;
  }
  return extractImageFromResponsesJson(text) ?? '';
}

/** 单张生图（等价 call_image2）。 */
export async function generateImage(
  req: GenerationRequest,
  settings: AppSettings,
  onEvent?: GenerationEventHandler
): Promise<GeneratedImage> {
  if (!settings.apiKey.trim()) {
    throw new Error('生图失败：请先在设置中配置 API Key');
  }
  const base = apiBaseUrl(settings);
  const prompt = buildSeedPrompt(req);
  if (!prompt) throw new Error('生图失败：提示词为空，请先填写角色/道具描述');
  const referenceImages = req.references.map((item) => item.bytes);

  const useEditsEndpoint = referenceImages.length > 0;
  const useImagesEndpoint = !useEditsEndpoint && supportsImagesGenerationEndpoint(settings.imageModel);
  const route: GeneratedImage['route'] = useEditsEndpoint
    ? 'images_edits'
    : useImagesEndpoint
      ? 'images_generations'
      : 'responses_stream';

  const editModel = (settings.editModel || 'gpt-image-2').trim();
  let editSize: string;
  if (req.mode === 'id') {
    editSize = '1024x1536'; // 证件照统一竖版生成，后处理再精确裁切
  } else if (req.mode === 'edit' && req.references.length) {
    editSize = imagesEditSizeFromDims(req.references[0].width, req.references[0].height);
  } else {
    editSize = imagesEditSize(req.project);
  }
  const editQuality = imageProviderQuality(req.project);

  // photo_edit / id_photo 直接用指令；image_poster 才走“看图策划”的海报 brief
  let editPrompt = prompt;
  if (useEditsEndpoint && req.mode === 'image') {
    editPrompt = await buildPosterBrief(req.project, referenceImages, settings, req.readImageText, onEvent);
  }

  const idTarget = req.mode === 'id' ? idPhotoSpec(req.idSize) : null;
  const maxAttempts = Math.max(1, settings.maxRetries + 1);
  let providerWarning = '';
  let lastError: unknown = null;

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    providerWarning = '';
    const { signal, cancel } = timeoutSignal(settings.timeoutSeconds * 1000);
    try {
      onEvent?.(attempt === 0 ? `正在调用生图接口（${route}）` : `第 ${attempt + 1} 次重试生图`);
      let resp: Response;
      if (useEditsEndpoint) {
        const form = new FormData();
        form.append('model', editModel);
        form.append('prompt', editPrompt);
        form.append('n', '1');
        form.append('size', editSize);
        form.append('quality', editQuality);
        // 关键：高保真保留上传实物图的真实外观，海报基于原图而非重绘
        form.append('input_fidelity', 'high');
        form.append('output_format', 'png');
        req.references.forEach((item, index) => {
          form.append('image[]', bytesToBlob(item.bytes), `ref_${index}.png`);
        });
        resp = await appFetch(`${base}/images/edits`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${settings.apiKey}` },
          body: form,
          signal
        });
      } else if (useImagesEndpoint) {
        resp = await appFetch(`${base}/images/generations`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${settings.apiKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: settings.imageModel,
            prompt,
            n: 1,
            size: imageProviderSize(req.project),
            response_format: 'b64_json'
          }),
          signal
        });
      } else {
        resp = await appFetch(`${base}/responses`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${settings.apiKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: settings.imageModel,
            input: [{ role: 'user', content: prompt }],
            tools: [{ type: 'image_generation' }],
            stream: true
          }),
          signal
        });
      }

      if (resp.status >= 400) {
        providerWarning = `${resp.status} ${errorBodySummary(await resp.text())}`;
        throw new Error(providerWarning);
      }

      let imageB64 = '';
      if (useEditsEndpoint || useImagesEndpoint) {
        const result = (await resp.json()) as { data?: Array<{ b64_json?: string; url?: string }> };
        const first = (result.data ?? []).find((item) => item && typeof item.b64_json === 'string' && item.b64_json);
        if (first?.b64_json) {
          imageB64 = first.b64_json;
        } else {
          // 兼容仅返回 url 的网关
          const withUrl = (result.data ?? []).find((item) => item && typeof item.url === 'string' && item.url);
          if (withUrl?.url) {
            onEvent?.('接口返回图片地址，正在下载');
            const imageResp = await appFetch(withUrl.url, { signal });
            if (imageResp.status >= 400) throw new Error(`下载生成图失败：${imageResp.status}`);
            const bytes = new Uint8Array(await imageResp.arrayBuffer());
            imageB64 = bytesToBase64(bytes);
          }
        }
        if (!imageB64) throw new Error('接口响应中没有图片结果（缺少 b64_json）');
      } else {
        imageB64 = await readResponsesStream(resp);
        if (!imageB64) throw new Error('接口响应中没有 image_generation_call 图片结果');
      }

      let rawBytes = base64ToBytes(imageB64);
      if (req.mode === 'id' && idTarget) {
        onEvent?.(`正在裁切到${idTarget.label}标准像素 ${idTarget.w}×${idTarget.h}`);
        rawBytes = await fitIdPhoto(rawBytes, idTarget.w, idTarget.h);
      }
      cancel();
      return { bytes: rawBytes, promptUsed: useEditsEndpoint ? editPrompt : prompt, route };
    } catch (exc) {
      lastError = exc;
      cancel();
      const message = providerErrorMessage(exc, providerWarning);
      if (attempt >= maxAttempts - 1) {
        throw new Error(`生图失败：${message}`);
      }
      onEvent?.(`生图出错（${message.slice(0, 120)}），准备重试`);
      await sleep(400 * (attempt + 1));
    }
  }
  throw new Error(`生图失败：${providerErrorMessage(lastError, providerWarning)}`);
}

/** 设置页“测试连接”：GET /models 验证地址与 Key。 */
export async function testConnection(settings: AppSettings): Promise<{ ok: boolean; message: string }> {
  try {
    const { signal, cancel } = timeoutSignal(15000);
    let resp: Response;
    try {
      resp = await appFetch(`${apiBaseUrl(settings)}/models`, {
        headers: { Authorization: `Bearer ${settings.apiKey}` },
        signal
      });
    } finally {
      cancel();
    }
    if (resp.status === 401 || resp.status === 403) {
      return { ok: false, message: `API Key 无效（${resp.status}）` };
    }
    if (resp.status >= 400) {
      return { ok: false, message: `接口返回 ${resp.status}，地址可达但 /models 不可用（不影响生图可先试生成）` };
    }
    return { ok: true, message: '连接成功，接口与 Key 可用' };
  } catch (exc) {
    return { ok: false, message: `连接失败：${providerErrorMessage(exc, '')}` };
  }
}
