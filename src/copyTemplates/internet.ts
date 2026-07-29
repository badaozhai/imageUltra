import type { CopyTemplate } from './template';

export const internetTemplates: Record<string, CopyTemplate[]> = {
  internet: [
    { brand: '千流AI获客系统', subtitle: '本地商家 AI 获客增长方案', sellingPoints: '智能线索采集 / 自动营销海报 / 私域转化', price: '月卡399，年卡3888', benefit: '开年卡赠送供应链' }
  ],
  'ai-apps': [
    { brand: '千流AI获客系统', subtitle: '让AI替你拉新转化', sellingPoints: '智能线索采集 / 自动营销物料 / 私域SOP', price: '月卡399，年卡3888', benefit: '开年卡赠供应链资源' },
    { brand: '灵犀智能客服', subtitle: '7x24小时不下班的金牌客服', sellingPoints: '多渠道接入 / 意图识别 / 人工无缝接管', price: '基础版免费试用30天', benefit: '年付享8折' }
  ],
  'ai-marketing': [
    { brand: '千流AI获客系统', subtitle: '一句话生成一套获客物料', sellingPoints: '海报文案自动生成 / 多平台分发 / 线索回流看板', price: '年卡3888元', benefit: '送代理商陪跑营' }
  ],
  'ai-design': [
    { brand: '豆沙包AI出图', subtitle: '一键出图，马上可用', sellingPoints: '行业模板内置 / 中文排版精准 / 多尺寸导出', price: '月卡399元', benefit: '新用户送20次生成' }
  ],
  saas: [
    { brand: '云链SCRM', subtitle: '客户资产沉淀在自己手里', sellingPoints: '全渠道获客 / 自动跟进 / 数据看板', price: '团队版99元/人/月', benefit: '年付送实施培训' },
    { brand: '简账进销存', subtitle: '小店生意，一部手机管全', sellingPoints: '扫码开单 / 库存预警 / 多门店同步', price: '单店版599元/年', benefit: '免费迁移老数据' }
  ],
  'ecom-platform': [
    { brand: '增长电商代运营', subtitle: '把店交给懂平台的人', sellingPoints: '全案代运营 / 投放优化 / 按效果对赌', price: '基础服务费6800/月', benefit: '首月不满意全退' },
    { brand: '出海跨境服务', subtitle: '把货卖到全世界', sellingPoints: '平台入驻 / 海外仓对接 / 合规清关', price: '入驻服务9800元起', benefit: '送选品分析报告' }
  ],
  'miniapp-dev': [
    { brand: '快码小程序', subtitle: '15天上线你的小程序', sellingPoints: '模板+定制 / 源码交付 / 一年免费维护', price: '电商版9800元起', benefit: '签约送公众号装修' },
    { brand: '栈云网站建设', subtitle: '官网是企业的第一张脸', sellingPoints: '响应式设计 / SEO友好 / 备案代办', price: '企业官网4980元起', benefit: '送一年云服务器' }
  ],
  'cyber-security': [
    { brand: '盾安网络安全', subtitle: '等保合规，一次过审', sellingPoints: '等保2.0全流程 / 渗透测试 / 应急响应', price: '等保测评套餐定制', benefit: '免费安全基线检查' },
    { brand: '隐盾数据合规', subtitle: '数据合规，别等处罚才重视', sellingPoints: '合规差距评估 / 制度落地 / 出境评估辅导', price: '合规体检19800元', benefit: '送员工合规培训' }
  ]
};
