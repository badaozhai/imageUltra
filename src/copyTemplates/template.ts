import type { ContentFields } from '../types';

/** 一套内容文案模板：品牌/副标题/卖点/价格/福利（标题与CTA由场景预设提供）。 */
export type CopyTemplate = Pick<ContentFields, 'brand' | 'subtitle' | 'sellingPoints' | 'price' | 'benefit'>;

export const fallbackCopyTemplate: CopyTemplate = {
  brand: '千流AI获客系统',
  subtitle: '本地商家 AI 获客增长方案',
  sellingPoints: '智能线索采集 / 自动营销海报 / 私域转化',
  price: '月卡399，年卡3888',
  benefit: '开年卡赠送供应链'
};
