import type { CopyTemplate } from './template';

export const manufacturingTemplates: Record<string, CopyTemplate[]> = {
  manufacturing: [
    { brand: '精工机械设备', subtitle: '定制产线解决方案', sellingPoints: '厂家直供 / 质保三年 / 上门安装', price: '询价享出厂价', benefit: '签约赠备件包' }
  ],
  machinery: [
    { brand: '精工机械', subtitle: '产线升级，效率翻倍', sellingPoints: '非标定制 / 质保三年 / 工程师驻场调试', price: '方案报价免费', benefit: '老客户换新补贴' },
    { brand: '宏力工程机械', subtitle: '工地上的硬通货', sellingPoints: '现货直租 / 司机带机 / 24小时维保', price: '挖机月租2.8万起', benefit: '季租送保养' }
  ],
  electronics: [
    { brand: '芯达电子', subtitle: '元器件现货，当天发出', sellingPoints: '原厂渠道 / 现货库存 / BOM配单', price: '批量价另议', benefit: '免费寄样' },
    { brand: '感知传感科技', subtitle: '工业现场的精准之眼', sellingPoints: '工业级精度 / 定制量程 / 技术选型支持', price: '样机7折试用', benefit: '批量采购阶梯价' }
  ],
  packaging: [
    { brand: '盒匠包装', subtitle: '让产品开箱即惊喜', sellingPoints: '免费打样 / 环保材质 / 小单可接', price: '彩盒0.8元/个起', benefit: '首单免版费' },
    { brand: '礼成礼盒定制', subtitle: '高端礼盒，撑起品牌溢价', sellingPoints: '结构设计 / 特种工艺 / 一对一跟单', price: '礼盒定制6.8元/个起', benefit: '500个起订送设计' }
  ],
  hardware: [
    { brand: '坚工五金', subtitle: '工地直供，省下中间价', sellingPoints: '厂价直销 / 规格齐全 / 当日配送', price: '批发价目表索取', benefit: '月结账期支持' },
    { brand: '钢盛型材', subtitle: '钢材行情价，每日更新', sellingPoints: '一手货源 / 加工切割 / 物流到厂', price: '吨价实时报价', benefit: '量大免运费' }
  ],
  textile: [
    { brand: '锦纶纺织', subtitle: '面料打样到大货，一站搞定', sellingPoints: '千款现货面料 / 来图定织 / 小起订量', price: '样布免费寄', benefit: '首单运费全免' },
    { brand: '衣启服装代工', subtitle: '你的品牌，我们的产线', sellingPoints: '小单快返 / 100件起订 / 质检全检', price: '代工费按款报价', benefit: '免费打样一款' }
  ]
};
