import type { CopyTemplate } from './template';

export const bizServicesTemplates: Record<string, CopyTemplate[]> = {
  'biz-services': [
    { brand: '启明财税', subtitle: '公司注册代账一站式', sellingPoints: '资深会计 / 全程代办 / 风险提醒', price: '代账99元/月起', benefit: '签约赠工商年报' }
  ],
  'reg-tax': [
    { brand: '启明财税', subtitle: '注册公司，3天拿照', sellingPoints: '0元注册 / 专人代办 / 地址挂靠', price: '代账99元/月起', benefit: '签约送一年工商年报' },
    { brand: '启明资质代办', subtitle: '资质卡住的单子，我们来解', sellingPoints: '建筑/食品/医疗器械资质 / 进度透明 / 不过退款', price: '资质代办按项报价', benefit: '免费预审材料' }
  ],
  legal: [
    { brand: '法盾企业法务', subtitle: '把法律风险挡在门外', sellingPoints: '执业律师团队 / 合同审查 / 纠纷代理', price: '法务年卡9800元', benefit: '免费首次合同审查' },
    { brand: '权立知识产权', subtitle: '商标先注册，品牌再起飞', sellingPoints: '商标专利版权 / 驳回复审 / 侵权维权', price: '商标注册680元/类', benefit: '免费近似查询' }
  ],
  'hr-service': [
    { brand: '聚才人力', subtitle: '招人难？交给专业的来', sellingPoints: '岗位精准匹配 / 背调齐全 / 入职跟踪', price: '按到岗付费', benefit: '社保代缴首月免服务费' },
    { brand: '聚才灵活用工', subtitle: '旺季用人，弹性解决', sellingPoints: '小时工日结 / 合规派遣 / 当天到岗', price: '派遣服务费面议', benefit: '首批用工9折' }
  ],
  'ad-marketing': [
    { brand: '声量营销机构', subtitle: '让品牌被看见、被记住', sellingPoints: '全案策划 / 达人投放 / 效果复盘', price: '品牌全案定制报价', benefit: '免费出投放诊断' },
    { brand: '本地通推广', subtitle: '让附近的人都刷到你', sellingPoints: '同城号代运营 / 探店达人 / 团购上架', price: '套餐2980元/月', benefit: '签季度送拍摄' }
  ],
  printing: [
    { brand: '速印工坊', subtitle: '今天下单，明天交付', sellingPoints: '自营工厂 / 免费设计微调 / 同城配送', price: '单页印刷0.15元/张起', benefit: '满1000张送设计' },
    { brand: '匠牌标识', subtitle: '门头亮了，客流就来了', sellingPoints: '发光字门头 / 设计施工一体 / 夜间效果图', price: '门头制作按平米报价', benefit: '免费现场测量' }
  ],
  'office-rental': [
    { brand: '汇客共享办公', subtitle: '拎包入驻，注册可用', sellingPoints: '地铁上盖 / 含物业网络 / 可注册公司', price: '工位599元/月', benefit: '季付送会议室时长' },
    { brand: '租设备办公租赁', subtitle: '打印机电脑，租比买划算', sellingPoints: '免押月付 / 坏了就换 / 耗材全包', price: '打印机99元/月', benefit: '年租送一月' }
  ]
};
