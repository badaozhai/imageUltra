/**
 * 可编辑提示词模板（移植自 fenjingtest 的 assetImagePrompt / assembleRefSeedPrompt 口径）。
 * 全部模板都不写死：设置里可改、可恢复默认；生成前最终提示词还能再改一遍。
 * 变量用 {name} 形式占位，留空的变量替换为空串。
 */

export type PromptTemplateKey = 'threeView' | 'lookbook' | 'prop' | 'weaponLine' | 'refPreamble';

export type PromptTemplates = Record<PromptTemplateKey, string>;

export const PROMPT_TEMPLATE_META: Record<PromptTemplateKey, { title: string; vars: string }> = {
  threeView: { title: '三视图', vars: '{name} {desc} {weaponLine} {style} {aspect}' },
  lookbook: { title: '定妆照', vars: '{name} {desc} {weaponLine} {style} {aspect}' },
  prop: { title: '道具参考图', vars: '{name} {ownerLine} {desc} {usageLine} {style} {aspect}' },
  weaponLine: { title: '武器/道具附加句（三视图·定妆照共用）', vars: '{weapon}' },
  refPreamble: { title: '挂参考图时的前置说明', vars: '{refList}' }
};

export const DEFAULT_PROMPT_TEMPLATES: PromptTemplates = {
  threeView:
    '角色三视图设定图：「{name}」，{desc}。同一角色的三个完整全身视图并排排列：左=正面、中=侧面、右=背面；' +
    '三个视图必须是同一人，长相、发型、装束、配色、身材比例完全一致，站姿自然统一。{weaponLine}' +
    '纯浅灰色背景，设定图排版干净整齐，角色轮廓清晰完整，装束配件（冠饰、翎羽、披帛、腰佩、鞋靴等）一件不漏、三视一致。' +
    '{style}画面比例{aspect}。画面无任何文字、标注、水印。',
  lookbook:
    '「{name}」的角色定妆照（正面全身立绘参考图）：{desc}。' +
    '正面全身站立、面向观众、姿态自然，居中构图，纯浅灰色背景，无其他人物。{weaponLine}' +
    '角色轮廓清晰完整，长相五官与装束细节清楚锐利，供后续锁定形象使用。' +
    '{style}画面比例{aspect}。画面无任何文字、标注、水印。',
  prop:
    '道具单体参考图：「{name}」{ownerLine}：{desc}。' +
    '道具居中、完整展示、形制细节清晰，选最能体现特征的角度呈现，纯浅灰色背景，无人物、无手持、无场景杂物。' +
    '{usageLine}{style}画面比例{aspect}。画面无任何文字、标注、水印。',
  weaponLine: '角色手持「{weapon}」，武器完整入画、形制细节清晰，各视图中形制保持一致。',
  refPreamble:
    '参考图按顺序：{refList}。严格以参考为准：角色参考锁定长相与装束、绝不改变身份、配件一件不漏；' +
    '道具参考锁定形制细节。基于参考生成全新画面（只输出新画面，不要照搬参考图的排版）：'
};

const STORAGE_KEY = 'imageultra.promptTemplates.v1';

export function loadPromptTemplates(): PromptTemplates {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROMPT_TEMPLATES };
    const parsed = JSON.parse(raw) as Partial<PromptTemplates>;
    const merged = { ...DEFAULT_PROMPT_TEMPLATES };
    for (const key of Object.keys(merged) as PromptTemplateKey[]) {
      const value = String(parsed[key] ?? '').trim();
      if (value) merged[key] = value;
    }
    return merged;
  } catch {
    return { ...DEFAULT_PROMPT_TEMPLATES };
  }
}

export function savePromptTemplates(templates: PromptTemplates): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
}

/** 变量替换：{var} → 值；未提供的变量替换为空串。 */
export function fillTemplate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_match, key: string) => vars[key] ?? '');
}

const withPeriod = (text: string) => {
  const t = text.trim();
  if (!t) return '';
  return /[。！？；，.!?;]$/.test(t) ? t : `${t}。`;
};

export type CharacterPromptInput = {
  mode: 'three_view' | 'lookbook';
  templates: PromptTemplates;
  name: string;
  desc: string;
  style: string;
  aspectId: string;
  /** 武器/道具描述，空=不带武器 */
  weapon: string;
  /** 已挂参考图的说明（角色参考/道具参考/上传照片），空数组=纯文生图 */
  refList: string[];
};

/** 三视图 / 定妆照最终提示词（App 生成后展示在可编辑文本框里，用户可再改）。 */
export function assembleCharacterPrompt(input: CharacterPromptInput): string {
  const name = input.name.trim() || '角色';
  const desc = input.desc.trim() || name;
  const weaponLine = input.weapon.trim()
    ? withPeriod(fillTemplate(input.templates.weaponLine, { weapon: input.weapon.trim() }))
    : '';
  const main = fillTemplate(input.templates[input.mode === 'three_view' ? 'threeView' : 'lookbook'], {
    name,
    desc,
    weaponLine,
    style: withPeriod(input.style),
    aspect: input.aspectId
  });
  const preamble = input.refList.length
    ? fillTemplate(input.templates.refPreamble, { refList: input.refList.join('；') }) + '\n'
    : '';
  return `${preamble}${main}`;
}

export type PropPromptInput = {
  templates: PromptTemplates;
  name: string;
  label: string;
  owner: string;
  desc: string;
  usage: string;
  style: string;
  aspectId: string;
};

/** 道具单体参考图最终提示词。 */
export function assemblePropPrompt(input: PropPromptInput): string {
  const name = input.name.trim() || '道具';
  return fillTemplate(input.templates.prop, {
    name,
    ownerLine: input.owner.trim() ? `（${input.owner.trim()}的${input.label.trim() || '道具'}）` : '',
    desc: input.desc.trim() || name,
    usageLine: input.usage.trim() ? `用法参考：${withPeriod(input.usage)}` : '',
    style: withPeriod(input.style),
    aspect: input.aspectId
  });
}
