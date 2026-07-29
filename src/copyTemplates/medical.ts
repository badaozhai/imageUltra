import type { CopyTemplate } from './template';

export const medicalTemplates: Record<string, CopyTemplate[]> = {
  medical: [
    { brand: '安诚口腔', subtitle: '家门口的口腔健康管理', sellingPoints: '数字化诊疗 / 透明收费 / 复诊提醒', price: '初诊检查99元', benefit: '预约赠洁牙体验' }
  ],
  dental: [
    { brand: '安诚口腔', subtitle: '看牙不踩坑的本地选择', sellingPoints: '数字化种植 / 收费透明 / 主诊医师负责制', price: '种植牙咨询0元', benefit: '正畸分期0利息' },
    { brand: '贝乐儿童齿科', subtitle: '让孩子不怕看牙医', sellingPoints: '儿童专属诊室 / 行为引导 / 全程家长陪同', price: '儿童涂氟99元', benefit: '免费口腔档案' }
  ],
  implant: [
    { brand: '安诚口腔种植中心', subtitle: '缺牙修复，一次种好', sellingPoints: '数字化导板 / 进口植体溯源 / 终身维护', price: '种植牙特惠2980元起', benefit: '免费CT评估' }
  ],
  ortho: [
    { brand: '安诚正畸中心', subtitle: '成年人也来得及的整牙计划', sellingPoints: '隐形矫正 / 方案可视化 / 分期付款', price: '隐形矫正19800元起', benefit: '免费正畸方案设计' }
  ],
  'kids-dental': [
    { brand: '贝乐儿童齿科', subtitle: '乳牙的问题，别等换牙再说', sellingPoints: '无痛诊疗 / 涂氟窝沟封闭 / 动画安抚', price: '儿童检查套餐69元', benefit: '建档送防蛀礼包' }
  ],
  'eye-care': [
    { brand: '明视眼科', subtitle: '孩子的视力，定期查一查', sellingPoints: '医学验光 / 角膜塑形镜 / 建档跟踪', price: '青少年验光建档0元', benefit: '配镜立减200' },
    { brand: '清晰视光中心', subtitle: '摘镜这件事，先做个检查', sellingPoints: '术前20项检查 / 全飞秒ICL可选 / 术后终身复查', price: '摘镜手术预检0元', benefit: '学生暑期专项补贴' }
  ],
  checkup: [
    { brand: '康泰体检', subtitle: '给身体做一次年度复盘', sellingPoints: '三甲医师审核 / 当日出报告 / 一对一解读', price: '基础套餐399元', benefit: '双人同检9折' },
    { brand: '康泰企业团检', subtitle: '员工健康，企业的隐形福利', sellingPoints: '套餐可定制 / 上门采样可选 / 团检报告汇总', price: '团检人均299元起', benefit: '30人以上送高管套餐' }
  ],
  tcm: [
    { brand: '本草堂中医馆', subtitle: '老中医坐诊，调理有方', sellingPoints: '名老中医 / 道地药材 / 代煎配送', price: '初诊挂号9.9元', benefit: '冬病夏治三伏贴预约' },
    { brand: '颈松堂针推馆', subtitle: '久坐的腰颈，交给针灸推拿', sellingPoints: '执业医师操作 / 针灸+推拿联合 / 医保可用', price: '针推体验68元', benefit: '疗程卡8折' }
  ],
  pharmacy: [
    { brand: '康宁大药房', subtitle: '常备药放心买，慢病管理更省心', sellingPoints: '医保定点 / 执业药师在岗 / 24小时取药柜', price: '会员日全场95折', benefit: '慢病建档送血压检测' },
    { brand: '康宁健康生活馆', subtitle: '营养补充，按需不盲目', sellingPoints: '药师推荐 / 大牌直采 / 效期新鲜', price: '维生素第二件半价', benefit: '满199送便携药盒' }
  ],
  psychology: [
    { brand: '澄心心理', subtitle: '说出来，就轻了一半', sellingPoints: '执业咨询师 / 严格保密 / 线上线下可选', price: '首次咨询半价', benefit: '免费15分钟预沟通' },
    { brand: '澄心青少年中心', subtitle: '读懂青春期的沉默', sellingPoints: '青少年专长 / 家庭联合咨询 / 学校协同', price: '家庭咨询600元/次', benefit: '首次家长访谈免费' }
  ],
  rehab: [
    { brand: '初愈产后修复', subtitle: '妈妈的身体，值得认真修复', sellingPoints: '专业评估 / 仪器+手法 / 一人一方案', price: '盆底肌评估99元', benefit: '套餐赠腹直肌修复2次' },
    { brand: '复元运动康复', subtitle: '运动损伤，别靠硬扛', sellingPoints: '康复师一对一 / 评估-治疗-训练闭环 / 运动员同款方案', price: '首次评估199元', benefit: '十次卡送运动贴扎' }
  ]
};
