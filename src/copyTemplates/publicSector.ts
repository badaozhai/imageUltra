import type { CopyTemplate } from './template';

export const publicSectorTemplates: Record<string, CopyTemplate[]> = {
  public: [
    { brand: '社区便民服务周', subtitle: '家门口的暖心服务', sellingPoints: '义诊义剪 / 政策咨询 / 便民维修', price: '全程免费', benefit: '参与赠环保袋' }
  ],
  community: [
    { brand: '社区便民服务周', subtitle: '这周末，社区见', sellingPoints: '义诊义剪 / 政策咨询 / 便民维修', price: '全部免费', benefit: '参与有礼' },
    { brand: '邻里文化节', subtitle: '老街坊的新热闹', sellingPoints: '文艺汇演 / 非遗市集 / 亲子游园', price: '免费入场', benefit: '集章兑换小礼品' }
  ],
  charity: [
    { brand: '微光公益', subtitle: '你的一小时，孩子的一束光', sellingPoints: '正规备案 / 善款公示 / 志愿时长认证', price: '志愿者免费报名', benefit: '完成服务发证书' },
    { brand: '青山环保行动', subtitle: '捡起来的，是更好的城市', sellingPoints: '净滩徒步 / 装备提供 / 环保课堂', price: '公益活动免费', benefit: '参与送纪念徽章' }
  ],
  expo: [
    { brand: '产业创新博览会', subtitle: '一年一度，行业人都在', sellingPoints: '500+展商 / 大咖论坛 / 现场对接洽谈', price: '观众预登记免票', benefit: '现场领行业白皮书' },
    { brand: '城市春季招聘会', subtitle: '好工作，面对面谈', sellingPoints: '300+企业进场 / 简历现场诊断 / 应届生专区', price: '求职者免费入场', benefit: '扫码领岗位手册' }
  ]
};
