import type { CopyTemplate } from './template';

export const localServicesTemplates: Record<string, CopyTemplate[]> = {
  'local-services': [
    { brand: '邻里生活服务', subtitle: '家门口的省心服务套餐', sellingPoints: '同城响应 / 明码标价 / 服务保障', price: '新客立减50元', benefit: '下单赠增值服务' }
  ],
  'home-service': [
    { brand: '洁屋到家', subtitle: '4小时，还你一个清爽的家', sellingPoints: '阿姨持证 / 自带工具 / 不满意重做', price: '4小时保洁99元', benefit: '月卡4次送1次' },
    { brand: '安心月嫂', subtitle: '专业月嫂，守护月子里的每一天', sellingPoints: '持证上岗 / 体检合格 / 不满意可换', price: '26天12800元起', benefit: '签约送产后护理课' }
  ],
  cleaning: [
    { brand: '洁屋到家', subtitle: '周末别拖地了，交给我们', sellingPoints: '两人小组 / 标准56项 / 全程拍照反馈', price: '首单3小时79元', benefit: '好评返10元券' }
  ],
  'deep-clean': [
    { brand: '焕新开荒保洁', subtitle: '新房入住前的最后一步', sellingPoints: '工业级设备 / 玻璃外墙可做 / 按面积计价', price: '开荒保洁4.5元/㎡', benefit: '送全屋除醛喷洒' }
  ],
  repair: [
    { brand: '快师傅维修', subtitle: '家电小毛病，一个电话上门', sellingPoints: '30分钟响应 / 先报价后维修 / 保修90天', price: '上门检测费19元', benefit: '维修满200减30' },
    { brand: '匠心房屋维修', subtitle: '漏水补墙，小工程也认真', sellingPoints: '防水补漏 / 墙面翻新 / 当天出方案', price: '免费上门勘测', benefit: '工程款满千减百' }
  ],
  moving: [
    { brand: '顺达搬家', subtitle: '搬家不操心，全程有人管', sellingPoints: '透明计价 / 打包入户 / 贵重品保价', price: '小户型搬家299元起', benefit: '工作日下单9折' },
    { brand: '即刻同城货运', subtitle: '拉货搬厂，一键叫车', sellingPoints: '车型齐全 / 按里程计价 / 司机帮搬', price: '起步价30元', benefit: '企业月结95折' }
  ],
  laundry: [
    { brand: '净衣坊', subtitle: '换季衣物，洗护收纳一次搞定', sellingPoints: '德国设备 / 单件独洗 / 免费取送', price: '羽绒服洗护39元/件', benefit: '储值300送60' },
    { brand: '奢护工坊', subtitle: '你的包，值得专业养护', sellingPoints: '奢品资质 / 原厂工艺 / 保价承诺', price: '包包清洁护理199元起', benefit: '满500送防尘袋' }
  ],
  photography: [
    { brand: '映像写真馆', subtitle: '把这一刻拍成喜欢的样子', sellingPoints: '资深摄影师 / 妆造全包 / 精修不限张', price: '个人写真套系699元', benefit: '加赠全底原片' },
    { brand: '囍事婚纱摄影', subtitle: '一生一次，认真对待', sellingPoints: '总监档双机位 / 全新礼服 / 一对一选片', price: '婚纱套系4999元起', benefit: '订单送婚礼跟拍' }
  ],
  'wedding-photo': [
    { brand: '囍事婚纱摄影', subtitle: '城市旅拍，把爱拍进风景里', sellingPoints: '外景内景双拍 / 礼服不限套 / 底片全送', price: '旅拍套系6999元', benefit: '订金翻倍抵扣' }
  ],
  'id-photo': [
    { brand: '最美证件照', subtitle: '一张能用很多年的证件照', sellingPoints: '精修妆发 / 多尺寸打印 / 电子版秒发', price: '证件照套餐59元', benefit: '不满意免费重拍' }
  ],
  'pet-service': [
    { brand: '毛孩子美容屋', subtitle: '洗香香，做只体面的崽', sellingPoints: '温和洗护 / 全程直播 / 接送服务', price: '小型犬洗护59元', benefit: '办卡8折再送驱虫' },
    { brand: '安宠宠物医院', subtitle: '它不会说哪里疼，我们会看', sellingPoints: '24小时急诊 / 进口疫苗 / 主治医师坐诊', price: '疫苗套餐199元', benefit: '体检半价' }
  ],
  'wedding-event': [
    { brand: '良辰婚礼策划', subtitle: '把婚礼办成你们的故事', sellingPoints: '一对一策划 / 场地资源 / 四大金刚齐备', price: '小型婚礼19800元起', benefit: '签约送求婚布置' },
    { brand: '锦时宴会策划', subtitle: '宝宝宴寿宴，热闹又体面', sellingPoints: '主题布置 / 司仪互动 / 现场跟拍', price: '宴会布置3980元起', benefit: '送电子邀请函' }
  ]
};
