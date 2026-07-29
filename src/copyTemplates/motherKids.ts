import type { CopyTemplate } from './template';

export const motherKidsTemplates: Record<string, CopyTemplate[]> = {
  'mother-kids': [
    { brand: '暖星月子中心', subtitle: '科学坐月子的安心之选', sellingPoints: '护士长驻店 / 营养月膳 / 产后修复', price: '特惠房型限时开放', benefit: '预约参观赠礼盒' }
  ],
  confinement: [
    { brand: '暖星月子中心', subtitle: '28天，被照顾得像个孩子', sellingPoints: '医护团队24h / 定制月膳 / 宝宝早教启蒙', price: '套餐39800元起', benefit: '预约参观送待产包' },
    { brand: '暖星月膳到家', subtitle: '不住会所，也能吃上专业月子餐', sellingPoints: '营养师配餐 / 每日三送 / 周度调整', price: '月膳28天6800元', benefit: '试吃套餐99元' }
  ],
  'kids-play': [
    { brand: '跳跳堡亲子乐园', subtitle: '放电一下午，回家睡得香', sellingPoints: '超大淘气堡 / 每日消毒 / 家长免费陪同', price: '单次票59元', benefit: '年卡5折开抢' },
    { brand: '小农夫亲子农场', subtitle: '周末带娃去种地', sellingPoints: '采摘喂养体验 / 自然课堂 / 亲子厨房', price: '家庭套票168元', benefit: '会员日免费摘菜' }
  ],
  'kids-photo': [
    { brand: '童话镇儿童摄影', subtitle: '把长大的瞬间都留下来', sellingPoints: '引导师跟拍 / 服装百套 / 精修底片全送', price: '成长套系499元', benefit: '加赠全家福一组' },
    { brand: '初见新生儿摄影', subtitle: '出生第一个月的珍贵记录', sellingPoints: '上门拍摄 / 安全姿势认证 / 道具消毒', price: '新生儿套系899元', benefit: '预产期预订减200' }
  ],
  'toys-clothing': [
    { brand: '萌芽童品', subtitle: '换季童装，一站买齐', sellingPoints: 'A类面料 / 大牌折扣 / 尺码可换', price: '全场第二件半价', benefit: '会员日折上85折' },
    { brand: '积木星球', subtitle: '会陪孩子长大的玩具', sellingPoints: '大颗粒安全 / 拼搭教程 / 以旧换新', price: '积木套装99元起', benefit: '满300送收纳箱' }
  ],
  'maternity-care': [
    { brand: '初愈产后之家', subtitle: '生完之后，更要好好爱自己', sellingPoints: '产后评估 / 仪器+手法修复 / 上门服务可选', price: '体验项目99元', benefit: '套餐送骨盆修复2次' },
    { brand: '孕美时光写真', subtitle: '孕期的美，也值得记录', sellingPoints: '孕妇专属服装 / 温和打光 / 家人合影', price: '孕妇写真599元', benefit: '送精修电子册' }
  ]
};
