import type { CopyTemplate } from './template';

export const foodTemplates: Record<string, CopyTemplate[]> = {
  food: [
    { brand: '鹿鸣茶饮', subtitle: '附近门店人气新品限时尝鲜', sellingPoints: '招牌奶茶 / 新鲜现做 / 到店即享', price: '第二杯半价', benefit: '到店赠小料一份' }
  ],
  'tea-coffee': [
    { brand: '鹿鸣茶饮', subtitle: '当季鲜果现萃，一口入夏', sellingPoints: '鲜果现萃 / 0植脂末 / 每日鲜奶', price: '新品尝鲜价9.9元', benefit: '第二杯半价' },
    { brand: '慢栖咖啡', subtitle: '街角的一杯手冲时光', sellingPoints: '精品豆现磨 / 手冲慢萃 / 安静自习位', price: '美式12元起', benefit: '集杯卡买五赠一' },
    { brand: '柠语茶事', subtitle: '一颗香水柠檬的暴打主义', sellingPoints: '现切现捶 / 真茶底 / 大杯加量', price: '招牌柠檬茶第二杯1元', benefit: '到店打卡送加料券' }
  ],
  juice: [
    { brand: '果立方鲜榨', subtitle: '一杯等于半斤鲜果', sellingPoints: '现点现榨 / 0添加糖 / 透明操作台', price: '小杯9.9元起', benefit: '买三杯送一杯' }
  ],
  'hotpot-bbq': [
    { brand: '蜀九重火锅', subtitle: '牛油锅底，毛肚七上八下', sellingPoints: '每日现熬锅底 / 鲜切黄牛肉 / 免费小吃站', price: '双人餐128元', benefit: '生日当月锅底免费' },
    { brand: '老灶门串串', subtitle: '签签入味，越撸越上头', sellingPoints: '牛肉串现穿 / 锅底免费续 / 人均50吃饱', price: '签子5毛一串', benefit: '锅底工作日免费' }
  ],
  bbq: [
    { brand: '炙野烧烤', subtitle: '炭火现烤，深夜的灵魂食堂', sellingPoints: '炭火现烤 / 大串管饱 / 冰啤畅饮', price: '烤串5折档期', benefit: '满100送烤生蚝6只' },
    { brand: '汉拿山烤肉', subtitle: '滋滋作响的厚切五花', sellingPoints: '原切牛五花 / 专人帮烤 / 小菜无限续', price: '双人烤肉餐158元', benefit: '加19.9升级部队锅' }
  ],
  fastfood: [
    { brand: '禾田快餐', subtitle: '现炒现卖，十分钟上桌', sellingPoints: '明厨现炒 / 米饭免费续 / 荤素搭配', price: '套餐15元起', benefit: '会员每日立减3元' },
    { brand: '一面如故', subtitle: '一碗手工面，汤底熬足8小时', sellingPoints: '手工现拉 / 骨汤现熬 / 浇头管够', price: '招牌面券12.9元', benefit: '加面不加价' }
  ],
  dinner: [
    { brand: '宴遇酒楼', subtitle: '家宴商宴，一桌好菜', sellingPoints: '名厨掌勺 / 包厢免费 / 停车便利', price: '宴席套餐988元/桌起', benefit: '订10桌赠果盘茶水' },
    { brand: '蜀香居川菜', subtitle: '地道川味，麻辣过瘾', sellingPoints: '川厨主理 / 现点现做 / 招牌毛血旺', price: '工作日午市8折', benefit: '消费满300送凉菜' }
  ],
  bakery: [
    { brand: '麦野烘焙', subtitle: '今日面包，今日新鲜', sellingPoints: '天然酵母 / 每日现烤 / 不过夜售卖', price: '晚8点后全场7折', benefit: '注册会员送吐司一条' },
    { brand: '甜屿甜品', subtitle: '一口治愈下午三点', sellingPoints: '动物奶油 / 低糖配方 / 每日限量', price: '下午茶套餐29.9元', benefit: '第二份甜品半价' }
  ],
  cake: [
    { brand: '甜屿蛋糕', subtitle: '为重要的日子定制一份甜', sellingPoints: '动物奶油 / 手作裱花 / 提前3小时可订', price: '生日蛋糕168元起', benefit: '附赠生日帽与餐具' }
  ],
  snack: [
    { brand: '巷口炸物铺', subtitle: '酥到掉渣的深夜小食', sellingPoints: '现裹现炸 / 秘制蘸料 / 外卖30分钟达', price: '小食拼盘19.9元', benefit: '套餐加1元换购饮品' },
    { brand: '卤味十八鲜', subtitle: '老卤新香，下酒下饭都对味', sellingPoints: '老汤卤制 / 当日现卤 / 真空可带走', price: '拼盘38元', benefit: '满50送卤蛋两枚' }
  ],
  crayfish: [
    { brand: '虾住不放', subtitle: '今夏第一顿小龙虾，安排', sellingPoints: '现杀现做 / 蒜蓉十三香双拼 / 戴手套开剥', price: '3斤套餐99元', benefit: '送冰镇酸梅汤一扎' }
  ],
  'foreign-food': [
    { brand: '青葵日料', subtitle: '当日直送，板前现握', sellingPoints: '空运食材 / 板前现握 / 无限量绿茶', price: '双人刺身套餐298元', benefit: '到店赠味噌汤' },
    { brand: '蓝栈西餐厅', subtitle: '一块好牛排的仪式感', sellingPoints: '原切牛排 / 现点现煎 / 红酒按杯点', price: '双人晚餐368元', benefit: '订位送开胃前菜' }
  ],
  japanese: [
    { brand: '青葵日料', subtitle: '一贯入魂的板前体验', sellingPoints: '主厨Omakase / 季节限定 / 清酒搭配', price: '午市套餐128元', benefit: '到店赠玉子烧' }
  ],
  western: [
    { brand: '蓝栈牛排馆', subtitle: '厚切西冷，五分熟刚好', sellingPoints: '谷饲牛排 / 明火现煎 / 沙拉吧畅享', price: '牛排套餐158元起', benefit: '周三会员日7折' }
  ],
  'packaged-food': [
    { brand: '山货严选', subtitle: '产地直发的地道风味', sellingPoints: '原产地直采 / 0添加防腐剂 / 顺丰包邮', price: '伴手礼盒99元', benefit: '满199减30' },
    { brand: '滋补优选', subtitle: '给家人的实在滋补', sellingPoints: '道地原料 / 检测报告可查 / 礼盒装', price: '燕窝礼盒399元', benefit: '买二赠炖盅' }
  ]
};
