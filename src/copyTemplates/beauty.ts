import type { CopyTemplate } from './template';

export const beautyTemplates: Record<string, CopyTemplate[]> = {
  beauty: [
    { brand: '初颜皮肤管理', subtitle: '让状态更亮一点的护理方案', sellingPoints: '深层清洁 / 补水修护 / 专业仪器', price: '体验价99元', benefit: '预约赠皮肤检测' }
  ],
  skin: [
    { brand: '初颜皮肤管理', subtitle: '换季肌肤的深层SPA', sellingPoints: '定制方案 / 进口仪器 / 一客一换', price: '首次体验99元', benefit: '赠面部检测报告' },
    { brand: '汐悦SPA', subtitle: '90分钟，把疲惫泡走', sellingPoints: '私密单间 / 芳疗精油 / 资深技师', price: '双人同行5折', benefit: '会员卡赠2次护理' }
  ],
  hair: [
    { brand: '剪一刀造型', subtitle: '换季换发型，状态焕然新', sellingPoints: '总监操刀 / 进口药水 / 不满意免费修', price: '烫染套餐399元', benefit: '剪发卡10次仅299' },
    { brand: '发根唤醒所', subtitle: '头皮养好了，头发才留得住', sellingPoints: '头皮检测 / 防脱养护 / 一人一方案', price: '头皮护理体验99元', benefit: '送毛囊检测' }
  ],
  'nail-lash': [
    { brand: '指间美研', subtitle: '本月爆款款式上新', sellingPoints: '日式手法 / 持久不掉 / 款式上千', price: '美甲美睫双项199元', benefit: '闺蜜同行立减40' },
    { brand: '半永久眉社', subtitle: '睡醒就有的好气色', sellingPoints: '资深纹绣师 / 雾眉野生眉 / 一年内免费补色', price: '定妆眉特惠580元', benefit: '送唇部打底一次' }
  ],
  'medical-beauty': [
    { brand: '璞颜轻医美', subtitle: '科学抗衰，循证变美', sellingPoints: '正规机构 / 医师面诊 / 进口正品溯源', price: '首次体验项目480元', benefit: '面诊设计方案免费' },
    { brand: '光研皮肤诊所', subtitle: '让毛孔和痘印一起退场', sellingPoints: '光电项目齐全 / 术后跟踪 / 效果可视化', price: '光子嫩肤699元/次', benefit: '三次卡送术后面膜' }
  ],
  wellness: [
    { brand: '松骨堂', subtitle: '肩颈的酸，今天就放下', sellingPoints: '老师傅手法 / 草本热敷 / 60分钟起', price: '肩颈调理78元', benefit: '次卡5次送1次' },
    { brand: '沐汤足道', subtitle: '泡完这一脚，一夜好眠', sellingPoints: '中药泡浴 / 修脚采耳 / 包间影音', price: '足浴套餐88元', benefit: '免费水果茶点' }
  ],
  fitness: [
    { brand: '燃点健身', subtitle: '夏天的身材，现在开始练', sellingPoints: '团课丰富 / 私教定制 / 24小时门店', price: '月卡99元体验', benefit: '送体测+1节私教' },
    { brand: '禾屿瑜伽', subtitle: '呼吸之间，回到身体', sellingPoints: '小班授课 / 孕产修复 / 空中瑜伽', price: '新人3节体验课99元', benefit: '赠瑜伽垫一张' }
  ],
  gym: [
    { brand: '燃点健身', subtitle: '不办年卡也能好好练', sellingPoints: '次卡月卡灵活 / 器械区超千平 / 洗浴免费', price: '次卡19.9元/次', benefit: '体验日免费开放' }
  ],
  yoga: [
    { brand: '禾屿瑜伽', subtitle: '从一节正位课开始', sellingPoints: '正位体系 / 小班8人 / 理疗修复课', price: '体验课29.9元', benefit: '当天报名减500' }
  ],
  dance: [
    { brand: '律动舞蹈', subtitle: '零基础也能跳出镜头感', sellingPoints: '爵士韩舞热门 / 成品舞速成 / 年度公演', price: '月卡4节299元', benefit: '体验课9.9元' }
  ]
};
