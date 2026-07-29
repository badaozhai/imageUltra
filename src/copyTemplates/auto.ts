import type { CopyTemplate } from './template';

export const autoTemplates: Record<string, CopyTemplate[]> = {
  auto: [
    { brand: '驰安汽车养护', subtitle: '全车养护一次到位', sellingPoints: '原厂配件 / 工时透明 / 免费检测', price: '保养套餐299起', benefit: '到店赠玻璃水' }
  ],
  'new-car': [
    { brand: '星驰新能源', subtitle: '本月提车，权益拉满', sellingPoints: '续航700km / 终身质保 / 置换补贴', price: '限时优惠2万元', benefit: '送家充桩+免费安装' },
    { brand: '德系臻选4S店', subtitle: '试驾一次，就知道差别', sellingPoints: '现车充足 / 金融低息 / 置换高评估', price: '月供2999元起', benefit: '试驾送保养券' }
  ],
  'ev-car': [
    { brand: '星驰新能源', subtitle: '一公里电费不到一毛钱', sellingPoints: '快充30分钟 / 智能座舱 / OTA常用常新', price: '综合补贴后15.98万起', benefit: '下订送终身流量' }
  ],
  'used-car': [
    { brand: '诚信二手车', subtitle: '一车一档，放心过户', sellingPoints: '259项检测 / 无事故承诺 / 30天可退', price: '准新车7折起', benefit: '免费代办过户' },
    { brand: '高价收车网点', subtitle: '卖车多比一家，多卖几千', sellingPoints: '上门评估 / 当场打款 / 手续全代办', price: '评估0费用', benefit: '成交送打车券' }
  ],
  'car-maintenance': [
    { brand: '驰安养车', subtitle: '小保养，大安心', sellingPoints: '原厂件溯源 / 透明车间 / 45分钟完工', price: '小保养199元', benefit: '送全车20项检测' },
    { brand: '镀晶贴膜工坊', subtitle: '新车第一件事，贴个好膜', sellingPoints: '进口膜料 / 无尘车间 / 质保十年', price: '全车贴膜2980元起', benefit: '送前挡升级' }
  ],
  'ev-charging': [
    { brand: '闪电充电站', subtitle: '快充一刻钟，续航300里', sellingPoints: '120kW快充 / 24小时营业 / 车位免费', price: '夜间电价5折', benefit: '新用户充100送30' },
    { brand: '家充无忧安装', subtitle: '私桩到家，告别排队', sellingPoints: '勘测-报装-安装全包 / 持证电工 / 三年质保', price: '安装套餐1680元', benefit: '送漏保空开' }
  ],
  'car-rental': [
    { brand: '任行租车', subtitle: '说走就走，车等你来', sellingPoints: '车型齐全 / 异地还车 / 不限里程', price: '经济型99元/天', benefit: '周租送1天' },
    { brand: '囍程婚车队', subtitle: '头车气派，车队整齐', sellingPoints: '热门车型 / 统一装饰 / 司机礼服上岗', price: '婚车套餐1688元起', benefit: '提前60天订95折' }
  ],
  'driving-school': [
    { brand: '顺通驾校', subtitle: '快拿本，少跑腿', sellingPoints: '一人一车 / 接送练车 / 不过补考费全包', price: 'C1班2980元', benefit: '学生党再减300' },
    { brand: '顺通VIP班', subtitle: '上班族的拿证时间表', sellingPoints: '晚间周末可约 / 专车接送 / 考场模拟', price: 'VIP班4580元', benefit: '45天拿证计划' }
  ]
};
