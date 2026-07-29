import type { CopyTemplate } from './template';

export const agricultureTemplates: Record<string, CopyTemplate[]> = {
  agriculture: [
    { brand: '沃丰鲜果直供', subtitle: '产地直发新鲜到家', sellingPoints: '源头果园 / 冷链配送 / 坏果包赔', price: '整箱批发价', benefit: '下单赠试吃装' }
  ],
  produce: [
    { brand: '沃丰鲜果', subtitle: '凌晨采摘，当天发车', sellingPoints: '源头果园 / 冷链直达 / 坏果包赔', price: '整箱批发价5折', benefit: '满10箱送1箱' },
    { brand: '稻乡粮油', subtitle: '新米下来了，先尝后囤', sellingPoints: '当季新粮 / 厂家直发 / 真空锁鲜', price: '10斤装39.9元', benefit: '回购客户立减5元' }
  ],
  'nursery-plants': [
    { brand: '绿洲花木场', subtitle: '工程苗木，基地直供', sellingPoints: '万亩基地 / 规格齐全 / 装车代办', price: '工程苗批发价', benefit: '量大可议价' },
    { brand: '花见鲜花工坊', subtitle: '每周一束，把春天带回家', sellingPoints: '基地直采 / 每周配送 / 搭配设计', price: '周花套餐99元/月', benefit: '首月送花瓶' }
  ],
  aquatic: [
    { brand: '海捕鲜水产行', subtitle: '今晨到港，鲜活直供', sellingPoints: '基地直供 / 死亡包赔 / 酒店配送', price: '批发价每日更新', benefit: '长期合作享账期' },
    { brand: '清塘蟹业', subtitle: '中秋蟹礼，提前锁价', sellingPoints: '塘口直发 / 公母可选 / 死蟹包赔', price: '蟹券礼盒288元起', benefit: '团购50张送10张' }
  ],
  'wholesale-market': [
    { brand: '华丰批发城', subtitle: '一手货源，档口直拿', sellingPoints: '厂家直营 / 一件代发 / 退换无忧', price: '拿货价低至3折', benefit: '新商户首月免摊位费' },
    { brand: '云仓一件代发', subtitle: '0库存开店的货源后盾', sellingPoints: '万款现货 / 视频素材包 / 当日发货', price: '会员年费599元', benefit: '送爆款选品清单' }
  ],
  'agri-supplies': [
    { brand: '丰收农资站', subtitle: '种好地，从好种子开始', sellingPoints: '正品保障 / 农技指导 / 送货到田', price: '化肥团购价', benefit: '满2000送喷雾器' },
    { brand: '铁牛农机', subtitle: '农忙时节，机器不掉链子', sellingPoints: '整机销售 / 以旧换新 / 上门维修', price: '购机补贴代办', benefit: '送首次保养' }
  ]
};
