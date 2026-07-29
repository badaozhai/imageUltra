import type { CopyTemplate } from './template';

export const franchiseTemplates: Record<string, CopyTemplate[]> = {
  franchise: [
    { brand: '千流AI获客系统', subtitle: '本地商家 AI 获客增长方案', sellingPoints: '智能线索采集 / 自动营销海报 / 私域转化', price: '月卡399，年卡3888', benefit: '开年卡赠送供应链' }
  ],
  'food-franchise': [
    { brand: '鹿鸣茶饮·全国招商', subtitle: '小店模型，回本更快', sellingPoints: '总部带店 / 供应链直配 / 区域保护', price: '整店输出12.8万起', benefit: '前30名免加盟费' },
    { brand: '巷口炸物·联营计划', subtitle: '档口小店，两个人就能开', sellingPoints: '出餐标准化 / 选址评估 / 外卖代运营', price: '单店投入6.8万起', benefit: '设备分期0息' }
  ],
  'retail-franchise': [
    { brand: '星禾便利·城市合伙人', subtitle: '社区门口的好生意', sellingPoints: '选址评估 / 统一供货 / 系统赋能', price: '单店投资15万起', benefit: '首批铺货支持' },
    { brand: '毛球补给站·加盟', subtitle: '宠物经济的入场券', sellingPoints: '货盘直供 / 会员系统 / 美容培训', price: '标准店9.8万起', benefit: '总部驻店带教15天' }
  ],
  'edu-franchise': [
    { brand: '小画家美术·校区加盟', subtitle: '成熟校区模型复制', sellingPoints: '课程体系输出 / 招生带教 / 师训认证', price: '县级代理8.8万', benefit: '总部驻店扶持30天' },
    { brand: '芽芽托育·联营园', subtitle: '托育刚需，政策东风', sellingPoints: '备案辅导 / 保育课程包 / 招生方案', price: '联营投入面议', benefit: '首年免品牌使用费' }
  ],
  'beauty-franchise': [
    { brand: '初颜皮肤管理·联营', subtitle: '轻投入进入美业赛道', sellingPoints: '设备耗材直供 / 拓客方案 / 店务系统', price: '联营店9.9万起', benefit: '开业拓客团队上门' },
    { brand: '指间美研·城市站', subtitle: '美甲小店，坪效之王', sellingPoints: '款式库更新 / 技师培训 / 小程序预约系统', price: '轻量店5.8万起', benefit: '送首批物料' }
  ],
  'service-franchise': [
    { brand: '洁屋到家·城市站点', subtitle: '家政蓝海，县域也赚钱', sellingPoints: '平台派单 / 阿姨培训体系 / 区域独家', price: '站点授权5.8万', benefit: '首年免管理费' },
    { brand: '净衣坊·社区洗护店', subtitle: '一台设备，洗出一门生意', sellingPoints: '央厂洗护 / 门店只收发 / 小程序下单', price: '社区店4.98万起', benefit: '设备三年质保' }
  ]
};
