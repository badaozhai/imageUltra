import type { CopyTemplate } from './template';

export const retailTemplates: Record<string, CopyTemplate[]> = {
  retail: [
    { brand: '云选优品', subtitle: '热卖好物限时到手价', sellingPoints: '源头直发 / 品质严选 / 售后无忧', price: '限时低至5折', benefit: '满199减30' }
  ],
  fashion: [
    { brand: '栀以女装', subtitle: '本周上新，通勤也有度假感', sellingPoints: '设计师款 / 亲肤面料 / 7天无理由', price: '上新8折', benefit: '满300减50' },
    { brand: '川行男装', subtitle: '一衣多穿的城市机能', sellingPoints: '三防面料 / 立体剪裁 / 大码齐全', price: '夹克299元起', benefit: '会员日折上9折' }
  ],
  womens: [
    { brand: '栀以女装', subtitle: '换季衣橱的第一件确定', sellingPoints: '小个子友好 / 显瘦版型 / 套装可拆买', price: '连衣裙199元起', benefit: '两件再减60' }
  ],
  mens: [
    { brand: '川行男装', subtitle: '通勤休闲，一套搞定', sellingPoints: '免烫衬衫 / 弹力裤型 / 商务休闲两穿', price: '衬衫129元起', benefit: '三件套优惠价' }
  ],
  'kids-wear': [
    { brand: '萌芽童装', subtitle: '好动的孩子需要耐穿的衣服', sellingPoints: 'A类面料 / 耐磨耐洗 / 110-160码全', price: '全场第二件半价', benefit: '满200送袜子三双' }
  ],
  'beauty-retail': [
    { brand: '澄肌研究所', subtitle: '换季维稳，敏肌也安心', sellingPoints: '成分透明 / 临床实证 / 小样先试', price: '套组立省120元', benefit: '满赠旅行装三件套' },
    { brand: '雾屿香氛', subtitle: '把好闻穿在身上', sellingPoints: '调香师签名款 / 留香8小时 / 礼盒包装', price: '香水礼盒299元', benefit: '刻字服务免费' }
  ],
  digital: [
    { brand: '极核数码', subtitle: '旗舰新机，以旧换新更划算', sellingPoints: '官方授权 / 以旧换新 / 12期免息', price: '直降500元', benefit: '下单送碎屏险' },
    { brand: '智家电器', subtitle: '换新家电，焕新生活', sellingPoints: '国补叠加 / 送装一体 / 十年包修', price: '冰洗空套购立减1000', benefit: '旧机抵扣再加200' }
  ],
  grocery: [
    { brand: '鲜丰市集', subtitle: '今晨到货，今晚开饭', sellingPoints: '每日两配 / 坏果包赔 / 30分钟达', price: '时令果蔬第2件半价', benefit: '新客首单立减15' },
    { brand: '邻里便利', subtitle: '楼下就有的24小时安全感', sellingPoints: '24小时营业 / 鲜食日配 / 代收快递', price: '早餐组合6.6元', benefit: '会员积分换购' }
  ],
  'home-goods': [
    { brand: '栖物家居', subtitle: '小空间也能住出杂志感', sellingPoints: '原木材质 / 免费搭配方案 / 送装一体', price: '全屋软装套餐3999元', benefit: '满千返百' },
    { brand: '简舍百货', subtitle: '好用不贵的居家小物', sellingPoints: '工厂直供 / 每周上新 / 任选满减', price: '全场9.9元起', benefit: '满59减10' }
  ],
  jewelry: [
    { brand: '金致珠宝', subtitle: '克减优惠，足金好价', sellingPoints: '足金999 / 工费透明 / 终身免费洗护', price: '金价每克减30元', benefit: '旧金换新免折旧' },
    { brand: '映目眼镜', subtitle: '配一副真正合适的眼镜', sellingPoints: '专业验光 / 大牌镜片 / 30分钟取镜', price: '镜框+镜片299元起', benefit: '第二副半价' }
  ],
  'pet-goods': [
    { brand: '毛球补给站', subtitle: '主子的口粮，囤起来更省', sellingPoints: '进口大牌 / 临期清仓专区 / 试吃装齐全', price: '主粮第2件8折', benefit: '满99送冻干零食' },
    { brand: '汪喵智能家', subtitle: '上班也能云撸猫', sellingPoints: '智能喂食器 / APP远程互动 / 自动饮水', price: '智能套装399元', benefit: '送一年滤芯' }
  ],
  'books-toys': [
    { brand: '页屿书店', subtitle: '一本书的时间，留给自己', sellingPoints: '严选书单 / 文创周边 / 会员借阅', price: '新书79折', benefit: '满100送帆布袋' },
    { brand: '弦音乐器行', subtitle: '人生第一把琴，从这里开始', sellingPoints: '正品行货 / 免费调试 / 赠入门课', price: '初学者吉他499元', benefit: '送琴包+变调夹' }
  ]
};
