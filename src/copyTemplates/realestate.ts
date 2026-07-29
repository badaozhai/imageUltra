import type { CopyTemplate } from './template';

export const realestateTemplates: Record<string, CopyTemplate[]> = {
  realestate: [
    { brand: '栖居全屋定制', subtitle: '一站式整装拎包入住', sellingPoints: '免费量房 / 透明报价 / 环保板材', price: '整装立减8888', benefit: '签约赠全屋灯光设计' }
  ],
  'new-house': [
    { brand: '澜悦府', subtitle: '地铁口的改善之选', sellingPoints: '地铁300米 / 双学区 / 现房即住', price: '首付18万起', benefit: '开盘享97折' },
    { brand: '云麓台', subtitle: '推窗见山的低密洋房', sellingPoints: '容积率1.5 / 中央园林 / 精装交付', price: '单价1.2万/㎡起', benefit: '订房送车位使用权' }
  ],
  'house-agency': [
    { brand: '安家房产', subtitle: '靠谱房源，明白交易', sellingPoints: '真房源承诺 / 交易资金监管 / 全程陪签', price: '中介费8折', benefit: '免费评估房价' },
    { brand: '寓见公寓', subtitle: '一个人住，也要住得好', sellingPoints: '精装拎包入住 / 管家维修 / 月付免押', price: '月租1280元起', benefit: '首月租金半价' }
  ],
  'custom-furniture': [
    { brand: '栖居全屋定制', subtitle: '每一寸空间都不浪费', sellingPoints: 'E0级板材 / 免费设计 / 工厂直供', price: '全屋定制698元/㎡', benefit: '签约送五金升级' },
    { brand: '光合门窗', subtitle: '把阳台变成阳光房', sellingPoints: '断桥铝系统窗 / 隔音降噪 / 十年质保', price: '封阳台880元/㎡起', benefit: '免费上门测量' }
  ],
  decoration: [
    { brand: '匠心整装', subtitle: '装修一次到位，拎包入住', sellingPoints: '一口价不增项 / 工地直播 / 两年质保', price: '整装999元/㎡', benefit: '前10名送全屋窗帘' },
    { brand: '焕新局部改造', subtitle: '不动大格局，老房换新颜', sellingPoints: '7天焕新 / 局部可做 / 当天报价', price: '厨卫改造19800元起', benefit: '免费上门勘测' }
  ],
  'building-materials': [
    { brand: '宅配建材馆', subtitle: '工厂价直供，一站买齐', sellingPoints: '品牌直营 / 统一送货 / 安装售后', price: '瓷砖39元/㎡起', benefit: '满5000返500' },
    { brand: '光语灯饰', subtitle: '一盏好灯，点亮整个家', sellingPoints: '全屋灯光方案 / 智能调光 / 免费安装', price: '客厅主灯399元起', benefit: '套餐送氛围灯带' }
  ],
  property: [
    { brand: '悦邻物业', subtitle: '把小区住成放心的家', sellingPoints: '24小时管家 / 智慧安防 / 报修2小时达', price: '物业费季缴95折', benefit: '缴费抽家政服务' },
    { brand: '汇邻商管', subtitle: '让商铺的人气旺起来', sellingPoints: '统一招商 / 活动运营 / 客流数据月报', price: '委托管理费面议', benefit: '签约首月免管理费' }
  ]
};
