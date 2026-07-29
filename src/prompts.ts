import { scenes } from './config';
import type { ProjectSpec } from './types';

/**
 * 提示词构建：逐条移植 imagepro 服务端 app/services/content.py 与
 * generation_service.py 的同名逻辑，保证生图效果一致。
 */

const SCENE_NAME_BY_ID = new Map(scenes.map((item) => [item.id, item.name]));

/** prompt 中使用中文场景名；自定义场景原样返回。 */
export function sceneDisplayName(sceneType: string): string {
  return SCENE_NAME_BY_ID.get(sceneType) ?? sceneType;
}

export function buildPrompt(project: ProjectSpec): string {
  const cameraPrompt = cameraPromptText(project);
  const imageSpecPrompt = imageSpecPromptText(project);
  return (
    `请生成一张完整的${sceneDisplayName(project.scene_type)}成品营销图。行业：${project.industry}。` +
    `风格：${project.style}。版式：${project.layout_type}。` +
    imageSpecPrompt +
    cameraPrompt +
    '画面高级、清晰、干净、有商业营销感。' +
    '直接在画面中完成排版和文字呈现，不要依赖后期叠加图层。' +
    '中文文字必须清晰、准确、无乱码；不要生成真实 Logo 或虚假二维码。'
  );
}

export function imageSpecPromptText(project: ProjectSpec): string {
  const aspectRatio = (project.aspect_ratio || '').trim();
  const width = project.canvas_width || 0;
  const height = project.canvas_height || 0;
  const quality = (project.image_quality || '1k').trim();
  const qualityText = {
    '1k': '标准清晰度，适合快速预览和移动端分享',
    '2k': '高清质量，细节更丰富，适合正式发布',
    '4k': '超高清质量，细节充足，适合大图展示和高质量导出'
  }[quality] ?? quality;
  const parts: string[] = [];
  if (aspectRatio) parts.push(`画面比例：${aspectRatio}`);
  if (width && height) parts.push(`目标画布：${width}×${height}px`);
  parts.push(`分辨率质量：${quality.toUpperCase()}（${qualityText}）`);
  parts.push('构图必须严格贴合目标比例，主体、标题、价格和行动引导不要被裁切');
  return parts.join('；') + '。';
}

const CAMERA_PROMPTS: Record<string, string> = {
  iphone_17_pro: '拍摄质感参考 iPhone 17 Pro：清晰 HDR、自然色彩、干净商业光线。',
  iphone_16_pro: '拍摄质感参考 iPhone 16 Pro：均衡 HDR、细节锐利、真实高光。',
  xiaomi_15_ultra: '拍摄质感参考 Xiaomi 15 Ultra：徕卡风格、对比丰富、高级产品广告质感。',
  vivo_x100_pro: '拍摄质感参考 vivo X100 Pro：蔡司风格、柔和景深、精致人像商业光。',
  sony_a7_iv: '拍摄质感参考 Sony A7 IV：全画幅相机、50mm 镜头、浅景深、高端棚拍光线。',
  sony_zv_e10_ii: '拍摄质感参考 Sony ZV-E10 II：创作者相机、明亮干净、主体分离清晰。'
};

export function cameraPromptText(project: ProjectSpec): string {
  const cameraModel = (project.camera_model || '').trim();
  if (!cameraModel) return '';
  return CAMERA_PROMPTS[cameraModel] ?? `拍摄质感参考 ${cameraModel}。`;
}

export function contentPromptText(content: Record<string, string> | null): string {
  if (!content) return '';
  const pick = (...keys: string[]): string => {
    for (const key of keys) {
      const value = String(content[key] ?? '').trim();
      if (value) return value;
    }
    return '';
  };
  const fields: Array<[string, string]> = [
    ['品牌/产品', pick('brand', 'title')],
    ['主标题', pick('title')],
    ['副标题', pick('subtitle')],
    ['卖点', pick('selling_points', 'sellingPoints')],
    ['价格/权益', pick('price')],
    ['活动时间', pick('period')],
    ['福利', pick('benefit')],
    ['行动引导', pick('cta', 'contact')],
    ['备注', pick('remark')]
  ];
  const parts = fields.filter(([, value]) => value).map(([label, value]) => `${label}：${value}`);
  const rawInput = String(content.raw_input ?? '').trim();
  if (rawInput) parts.push(`补充需求：${rawInput}`);
  if (!parts.length) return '';
  return '画面需要直接包含这些营销信息：' + parts.join('；') + '。';
}

/** 有实物图模式的种子句（进任务记录）：1 张→单品海报；≥2 张→产品合集海报。 */
export function buildImagePosterPrompt(project: ProjectSpec, referenceCount = 0): string {
  const keyword = (project.industry || '').trim();
  const aspect = (project.aspect_ratio || '').trim();
  const parts = referenceCount >= 2
    ? [`基于这${referenceCount}张图片生成一张产品合集海报`]
    : ['基于这个图片生成一张海报'];
  if (keyword) parts.push(keyword);
  if (aspect) parts.push(`画面比例${aspect}`);
  return parts.join('，') + '。';
}

/** 通用 AI 修图：把一句话指令包装成给 gpt-image 编辑端点的提示词。 */
export function buildPhotoEditPrompt(instruction: string, referenceCount = 1): string {
  const instr = (instruction || '').trim() || '对这张照片做自然的修饰优化';
  const base = referenceCount >= 2 ? '请基于上传的这几张照片' : '请基于上传的这张照片';
  return (
    `${base}完成以下编辑：${instr}。` +
    '只做指令要求的改动，画面其余部分（人物身份与五官、背景、其它物体、光影）保持与原图一致、真实自然；' +
    '结果要像真实照片、无明显修图痕迹，不要添加文字/水印/边框，不要改变画面比例。'
  );
}

/** 证件照标准尺寸（像素，约 300dpi）。实际裁切在本地 canvas 后处理。 */
export const ID_PHOTO_SIZES: Record<string, { label: string; w: number; h: number }> = {
  one_inch: { label: '一寸', w: 295, h: 413 },
  two_inch: { label: '二寸', w: 413, h: 626 },
  small_one_inch: { label: '小一寸', w: 260, h: 378 },
  small_two_inch: { label: '小二寸', w: 413, h: 531 },
  large_one_inch: { label: '大一寸', w: 390, h: 567 }
};

export const ID_PHOTO_BG: Record<string, { label: string; desc: string; color: string }> = {
  white: { label: '白底', desc: '干净的纯白色（接近 #FFFFFF）', color: '#ffffff' },
  blue: { label: '蓝底', desc: '标准证件照蓝色（接近 RGB 67,142,219）', color: '#438edb' },
  red: { label: '红底', desc: '纯正红色（接近 RGB 214,40,40）', color: '#d62828' }
};

export function idPhotoSpec(idSize: string): { label: string; w: number; h: number } {
  return ID_PHOTO_SIZES[idSize] ?? ID_PHOTO_SIZES.one_inch;
}

export function buildIdPhotoPrompt(idSize = 'one_inch', idBg = 'white'): string {
  const size = idPhotoSpec(idSize);
  const bg = ID_PHOTO_BG[idBg] ?? ID_PHOTO_BG.white;
  return (
    `请把上传的人物照片制作成标准${size.label}证件照：` +
    `背景替换为${bg.desc}、纯色无渐变无阴影无杂物；` +
    '人物正面免冠、双眼平视镜头、表情自然、肩部以上居中，头顶留少量空白、左右对称；' +
    '完整保留这个人真实的长相、五官、肤色、发型与神态，不要过度美颜、不得改变身份；' +
    '保持证件照规范的均匀光照与真实质感，不要添加任何文字、边框、水印或 Logo。'
  );
}

export const POSTER_BRIEF_SYSTEM =
  '你是顶级电商营销海报的文案与视觉总监。用户会给你一张产品实物照片和一个可选主题词。' +
  '请先在脑中完成策划，然后只输出一段中文“文生图指令”（直接发给图像模型用，不要任何解释、不要 Markdown、不要把方案分点罗列成清单）。' +
  '这段指令必须让图像模型生成一张内容完整、专业的营销海报，并明确包含：' +
  '1) 一个有冲击力的主标题 + 一句副标题，文案具体、像真实电商海报；' +
  '2) 3~4 个产品卖点，每个卖点=一个小图标+加粗小标题+一句简短利益点说明（材质/舒适度/功能/易打理等，需贴合该产品）；' +
  '3) 一个促销或信任徽章/行动号召；' +
  '4) 如适用，加“多色可选”色卡或底部一行功能图标；' +
  '5) 干净高级的版式、合理留白、与产品气质相符的配色；' +
  '6) 必须严格基于这张原图：原样保留照片里的真实产品，外观、颜色、形状、材质、图案和文字一律不得改动、不得重绘、不得替换，只在产品四周做排版；' +
  '7) 所有中文文字必须真实、准确、专业排版、无错别字、无乱码，不出现虚假 Logo 和二维码。' +
  '最后写明画面比例。';

/** 有实物图模式的静态富指令：1 张→单品海报；≥2 张→产品合集海报（LLM 策划失败时的兜底）。 */
export function fallbackPosterBrief(project: ProjectSpec, referenceCount = 1): string {
  const keyword = (project.industry || '').trim();
  const aspect = (project.aspect_ratio || '9:16').trim();
  const theme = keyword ? `产品主题：${keyword}。` : '';
  if (referenceCount >= 2) {
    return (
      `严格基于这 ${referenceCount} 张产品实物照片，制作一张精致、协调的【产品合集/家族营销海报】。` +
      theme +
      '把上传的每一个真实产品都原样保留（外观、颜色、形状、材质、图案和文字一律不得改动、不得重绘、不得替换）；' +
      '将这些产品整齐、协调地陈列在同一张海报里（网格或并列布局、大小均衡、间距统一）；' +
      '为整组产品配统一的背景、光影和配色，让不同产品看起来风格一致、像一套系列；' +
      '顶部放一个能统领整组的主标题和一句副标题；每个产品旁配一个简短标签或一句卖点；' +
      '底部可加一行通用卖点图标或“全系列/多款可选”点缀，并加一个促销或信任徽章/行动号召；' +
      '整体干净高级、留白合理；所有中文文字真实、准确、专业排版、无错别字、无乱码，不要虚假 Logo 或二维码。' +
      `画面比例${aspect}。`
    );
  }
  return (
    '严格基于这张产品实物照片制作一张精致、信息完整的电商营销海报。' +
    theme +
    '原样保留照片中的真实产品作为画面主视觉，外观、颜色、形状、材质、图案和文字一律不得改动、不得重绘、不得替换，只在产品四周做排版；' +
    '顶部放一个有冲击力的主标题和一句副标题；' +
    '在合适位置列出 3~4 个产品卖点，每个卖点用一个小图标 + 加粗小标题 + 一句简短利益点说明；' +
    '加入一个促销或信任徽章/行动号召；如适用加“多色可选”色卡或底部一行功能图标；' +
    '整体风格干净高级、留白合理、配色与产品气质相符；' +
    '所有中文文字必须真实、准确、专业排版、无错别字、无乱码，不要生成虚假 Logo 或二维码。' +
    `画面比例${aspect}。`
  );
}
