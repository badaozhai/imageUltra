import type { CopyTemplate } from './template';

export const financeTemplates: Record<string, CopyTemplate[]> = {
  finance: [
    { brand: '守护家庭保障规划', subtitle: '给家人一份安心的保障方案', sellingPoints: '一对一规划 / 条款透明 / 理赔协助', price: '咨询0元', benefit: '预约赠家庭保单体检' }
  ],
  'bank-loan': [
    { brand: '惠企信贷服务', subtitle: '经营周转，快至当天放款', sellingPoints: '正规持牌 / 利率透明 / 随借随还', price: '年化利率3.6%起', benefit: '额度测算免费' },
    { brand: '安居房贷顾问', subtitle: '买房贷款，方案先算明白', sellingPoints: '多行利率对比 / 材料代办 / 进度跟踪', price: '咨询服务0元', benefit: '免费出还款方案' }
  ],
  insurance: [
    { brand: '守护家庭保障规划', subtitle: '把风险交给保险，把安心留给家', sellingPoints: '多家产品对比 / 条款逐条讲解 / 协助理赔', price: '方案定制0元', benefit: '赠家庭保单整理' },
    { brand: '车保管家', subtitle: '续保前，先比一次价', sellingPoints: '多家报价 / 出险代办 / 增值救援', price: '车险报价1分钟出', benefit: '续保送洗车券' }
  ],
  investment: [
    { brand: '稳进财富规划', subtitle: '让闲钱有章法地增值', sellingPoints: '风险测评 / 资产配置 / 定期复盘', price: '首次规划咨询免费', benefit: '赠家庭资产体检报告' },
    { brand: '颐养养老规划', subtitle: '养老这件事，越早算越从容', sellingPoints: '养老金缺口测算 / 长期配置 / 政策解读', price: '测算服务0元', benefit: '预约送养老规划手册' }
  ],
  'tax-planning': [
    { brand: '明税财税顾问', subtitle: '合规省税，企业更轻装', sellingPoints: '持证税务师 / 方案合规 / 全程代办', price: '税务体检999元', benefit: '签约抵扣咨询费' },
    { brand: '个税无忧', subtitle: '年度汇算，别多缴冤枉钱', sellingPoints: '专项扣除梳理 / 合规申报 / 一对一辅导', price: '个税咨询99元', benefit: '团报每人减20' }
  ]
};
