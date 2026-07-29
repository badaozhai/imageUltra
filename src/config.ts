import { copyTemplatesForPath } from './copyTemplates';
import type { AspectOption, CameraOption, ContentFields, QualityOption, SceneOption } from './types';

export const GENERATION_TIMEOUT_MS = 10 * 60 * 1000;

export const aspectOptions: AspectOption[] = [
  { id: '1:1', label: '1:1', width: 1024, height: 1024 },
  { id: '3:2', label: '3:2', width: 1536, height: 1024 },
  { id: '2:3', label: '2:3', width: 1024, height: 1536 },
  { id: '4:3', label: '4:3', width: 1364, height: 1024 },
  { id: '3:4', label: '3:4', width: 1024, height: 1364 },
  { id: '16:9', label: '16:9', width: 1792, height: 1008 },
  { id: '9:16', label: '9:16', width: 1008, height: 1792 },
  { id: '21:9', label: '21:9', width: 1792, height: 768 }
];

export const qualityOptions: QualityOption[] = [
  { id: '1k', label: '1K', base: 1024 },
  { id: '2k', label: '2K', base: 2048 },
  { id: '4k', label: '4K', base: 4096 }
];

export const cameraOptions: CameraOption[] = [
  { id: 'iphone_17_pro', name: 'iPhone 17 Pro' },
  { id: 'iphone_16_pro', name: 'iPhone 16 Pro' },
  { id: 'xiaomi_15_ultra', name: 'Xiaomi 15 Ultra' },
  { id: 'vivo_x100_pro', name: 'vivo X100 Pro' },
  { id: 'sony_a7_iv', name: 'Sony A7 IV' },
  { id: 'sony_zv_e10_ii', name: 'Sony ZV-E10 II' }
];

export const scenes: SceneOption[] = [
  { id: 'investment_poster', name: '招商海报' },
  { id: 'promotion_poster', name: '活动促销海报' },
  { id: 'opening_poster', name: '开业海报' },
  { id: 'new_product_poster', name: '新品上市海报' },
  { id: 'festival_poster', name: '节日热点海报' },
  { id: 'brand_poster', name: '品牌形象海报' },
  { id: 'course_poster', name: '课程招生海报' },
  { id: 'recruit_poster', name: '招聘海报' },
  { id: 'member_recruit', name: '会员招募海报' },
  { id: 'invitation', name: '活动邀请函' },
  { id: 'moments_poster', name: '朋友圈海报' },
  { id: 'xiaohongshu_cover', name: '小红书封面' },
  { id: 'short_video_cover', name: '短视频封面' },
  { id: 'live_preview', name: '直播预告图' },
  { id: 'wechat_article_cover', name: '公众号首图' },
  { id: 'coupon_card', name: '优惠券卡券' },
  { id: 'group_deal', name: '团购套餐图' },
  { id: 'menu_price', name: '菜单价目表' },
  { id: 'ecommerce_main', name: '电商主图' },
  { id: 'ecommerce_detail', name: '详情页首图' },
  { id: 'web_banner', name: '横版 Banner' },
  { id: 'flyer', name: '宣传单页' },
  { id: 'rollup_banner', name: '易拉宝展架' },
  { id: 'store_lightbox', name: '门店灯箱图' }
];

export const styles: string[] = [
  '高科技感', '黑金商务', '简约高级', '轻奢质感', '暗黑高级', '未来金属',
  '红金促销', '电商大促', '节日喜庆', '倒计时紧迫感',
  '小红书清新', '奶油风', '日系杂志', 'ins极简', '莫兰迪柔和', '田园自然',
  '国潮风', '新中式雅致', '中式水墨', '复古港风',
  '赛博霓虹', '弥散光渐变', '玻璃拟态', '3D立体', '孟菲斯撞色', '波普艺术', '手绘插画', '卡通可爱', '像素复古', '运动活力'
];

export const layouts: string[] = [
  '大标题居中型', '左文右图型', '右文左图型', '上图下文型', '上文下图型', '杂志封面型', '海报标语型',
  '价格突出型', '产品截图型', '商品特写型', '人物主视觉型',
  '多卖点卡片型', '清单列表型', '九宫格拼贴型', '时间轴流程型', '步骤教程型', '数据图表型', '问答悬念型',
  '对比展示型', '前后对比型', '优惠券撕角型', '倒计时紧迫型', '证言口碑型', '对话气泡型'
];

const defaultContentFields: ContentFields = {
  brand: '千流AI获客系统',
  title: '全国招代理',
  subtitle: '本地商家 AI 获客增长方案',
  sellingPoints: '智能线索采集 / 自动营销海报 / 私域转化',
  price: '月卡399，年卡3888',
  period: '6月15日前',
  benefit: '开年卡赠送供应链',
  contact: '扫码咨询，领取代理资料',
  remark: '适合招商海报、朋友圈推广和广告投放'
};

const sceneContentPresets: Record<string, Partial<ContentFields>> = {
  investment_poster: { title: '全国招代理', contact: '扫码咨询，领取代理资料', remark: '适合招商海报、朋友圈推广和广告投放' },
  promotion_poster: { title: '限时优惠', contact: '立即到店，先到先得', remark: '适合门店活动、社群转发和朋友圈促销' },
  opening_poster: { title: '盛大开业', contact: '开业当天，到店有礼', remark: '适合新店开业宣传和周边引流' },
  new_product_poster: { title: '新品上市', contact: '抢先体验，立即下单', remark: '适合新品发布、上新预热和首发推广' },
  festival_poster: { title: '节日钜惠', contact: '整点开抢，先到先得', remark: '适合节日营销、热点借势和大促预热' },
  brand_poster: { title: '匠心之选', contact: '了解更多品牌故事', remark: '适合品牌形象展示和口碑传播' },
  course_poster: { title: '招生进行中', contact: '扫码预约免费试听', remark: '适合课程招生、教培宣传和开班通知' },
  recruit_poster: { title: '招贤纳士', contact: '投递简历，期待你的加入', remark: '适合企业招聘和团队扩张宣传' },
  member_recruit: { title: '会员招募', contact: '扫码入会，享专属权益', remark: '适合会员拉新、储值卡和私域运营' },
  invitation: { title: '诚邀莅临', contact: '扫码报名，锁定席位', remark: '适合活动邀请、发布会和沙龙聚会' },
  moments_poster: { title: '今日推荐', contact: '私信咨询，今日有效', remark: '适合朋友圈日常种草和轻量促销' },
  xiaohongshu_cover: { title: '新手必看', contact: '收藏起来，照着做就行', remark: '适合小红书封面、知识分享和种草内容' },
  short_video_cover: { title: '3秒看懂', contact: '关注我，获取完整方案', remark: '适合短视频封面、直播预告和课程切片' },
  live_preview: { title: '直播预告', contact: '点击预约，开播提醒', remark: '适合直播间引流和开播前预热' },
  wechat_article_cover: { title: '深度解读', contact: '点击阅读全文', remark: '适合公众号文章首图和专题封面' },
  coupon_card: { title: '立减优惠券', contact: '扫码领券，到店使用', remark: '适合卡券发放、满减促销和转化提频' },
  group_deal: { title: '超值团购', contact: '拼团立省，人满成团', remark: '适合团购套餐、拼团活动和套餐推广' },
  menu_price: { title: '招牌菜单', contact: '到店点单，扫码下单', remark: '适合菜单价目展示和门店点单引导' },
  ecommerce_main: { title: '爆款上新', contact: '点击购买，限时抢购', remark: '适合电商主图、商品详情首图和活动会场' },
  ecommerce_detail: { title: '品质之选', contact: '立即加购，享专属价', remark: '适合详情页头图和卖点展示' },
  web_banner: { title: '年度钜惠', contact: '立即了解', remark: '适合官网横幅、广告位和活动会场头图' },
  flyer: { title: '火热进行中', contact: '详询门店，电话咨询', remark: '适合线下派发单页和到店转化' },
  rollup_banner: { title: '精彩呈现', contact: '现场咨询，扫码了解', remark: '适合展会展架、门店易拉宝' },
  store_lightbox: { title: '镇店招牌', contact: '进店选购', remark: '适合门店灯箱、橱窗和店头展示' }
};

/**
 * 根据行业路径 + 场景自动生成内容文案：
 * 行业品类模板（二级 → 一级 → 通用）提供品牌/卖点/价格等，场景预设覆盖标题/CTA/用途，
 * variant 用于在该品类的多套模板之间轮换（“换一套”）。
 */
export function presetContentFields(sceneType: string, industryPath: string[], variant = 0): ContentFields {
  const templates = copyTemplatesForPath(industryPath);
  const template = templates[((variant % templates.length) + templates.length) % templates.length];
  return {
    ...defaultContentFields,
    ...template,
    ...(sceneContentPresets[sceneType] ?? {})
  };
}

/** 当前行业路径下可轮换的文案模板数量。 */
export function copyTemplateCount(industryPath: string[]): number {
  return copyTemplatesForPath(industryPath).length;
}

export function contentPayloadFromFields(fields: ContentFields, rawInput: string): Record<string, string> {
  return {
    brand: fields.brand,
    title: fields.title,
    subtitle: fields.subtitle,
    selling_points: fields.sellingPoints,
    price: fields.price,
    period: fields.period,
    benefit: fields.benefit,
    cta: fields.contact,
    remark: fields.remark,
    raw_input: rawInput
  };
}

export function dimensionsForAspect(aspect: AspectOption, quality: QualityOption): { canvas_width: number; canvas_height: number } {
  const longSide = quality.base;
  if (aspect.width === aspect.height) {
    return { canvas_width: longSide, canvas_height: longSide };
  }
  if (aspect.width > aspect.height) {
    return { canvas_width: longSide, canvas_height: Math.round(longSide * aspect.height / aspect.width) };
  }
  return { canvas_width: Math.round(longSide * aspect.width / aspect.height), canvas_height: longSide };
}

export function simulatedGenerationProgress(startedAt: number): number {
  const elapsed = Math.max(0, Date.now() - startedAt);
  const ratio = Math.min(1, elapsed / GENERATION_TIMEOUT_MS);
  if (ratio < 0.5) {
    return Math.min(70, Math.round((ratio / 0.5) * 70));
  }
  const tailRatio = (ratio - 0.5) / 0.5;
  return Math.min(96, Math.round(70 + (1 - Math.pow(1 - tailRatio, 2)) * 26));
}
