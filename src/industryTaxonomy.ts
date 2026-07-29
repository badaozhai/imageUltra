/**
 * 多级行业体系：一级行业 → 二级品类 → 三级细分。
 * 选中的路径最终拼接为字符串（如 "餐饮美食 · 茶饮咖啡 · 新式茶饮"）
 * 写入项目 industry 字段并进入生图 prompt，层级越深画面越聚焦。
 *
 * 注意：一级行业名称需覆盖后端高危行业词（医疗/金融/保险/教育培训/招商加盟/
 * 法律服务/投资理财等），后端按"高危词是否出现在拼接串中"判定送审。
 */
export type IndustryNode = {
  id: string;
  name: string;
  children?: IndustryNode[];
};

export const INDUSTRY_PATH_SEPARATOR = ' · ';

export const industryTaxonomy: IndustryNode[] = [
  {
    id: 'food',
    name: '餐饮美食',
    children: [
      { id: 'tea-coffee', name: '茶饮咖啡', children: [
        { id: 'new-tea', name: '新式茶饮' },
        { id: 'coffee', name: '咖啡馆' },
        { id: 'juice', name: '鲜榨果汁' },
        { id: 'milk-tea', name: '传统奶茶' },
        { id: 'lemon-tea', name: '柠檬茶' },
        { id: 'tea-house', name: '中式茶馆' }
      ] },
      { id: 'hotpot-bbq', name: '火锅烧烤', children: [
        { id: 'hotpot', name: '川渝火锅' },
        { id: 'tomato-hotpot', name: '番茄/菌汤火锅' },
        { id: 'fish-hotpot', name: '鱼火锅' },
        { id: 'lamb-hotpot', name: '涮羊肉' },
        { id: 'bbq', name: '烧烤烤肉' },
        { id: 'chuanchuan', name: '串串香' },
        { id: 'teppanyaki', name: '铁板烧' }
      ] },
      { id: 'fastfood', name: '快餐简餐', children: [
        { id: 'chinese-fast', name: '中式快餐' },
        { id: 'noodle', name: '米粉面馆' },
        { id: 'dumpling', name: '饺子馄饨' },
        { id: 'rice-bowl', name: '盖浇饭便当' },
        { id: 'light-meal', name: '轻食沙拉' },
        { id: 'burger', name: '汉堡炸鸡' }
      ] },
      { id: 'dinner', name: '正餐酒楼', children: [
        { id: 'sichuan', name: '川湘菜' },
        { id: 'cantonese', name: '粤菜茶点' },
        { id: 'jiangzhe', name: '江浙菜' },
        { id: 'northern', name: '北方菜' },
        { id: 'banquet', name: '宴会酒楼' },
        { id: 'private-kitchen', name: '私房菜' }
      ] },
      { id: 'bakery', name: '烘焙甜品', children: [
        { id: 'bread', name: '面包烘焙' },
        { id: 'cake', name: '蛋糕定制' },
        { id: 'dessert', name: '甜品冰品' },
        { id: 'chinese-pastry', name: '中式糕点' },
        { id: 'ice-cream', name: '冰淇淋' }
      ] },
      { id: 'snack', name: '小吃夜宵', children: [
        { id: 'fried-snack', name: '炸物小吃' },
        { id: 'crayfish', name: '小龙虾' },
        { id: 'night-market', name: '夜市排档' },
        { id: 'braised', name: '卤味熟食' },
        { id: 'pancake', name: '煎饼炸串' }
      ] },
      { id: 'foreign-food', name: '日料西餐', children: [
        { id: 'japanese', name: '日料寿司' },
        { id: 'western', name: '西餐牛排' },
        { id: 'korean', name: '韩式料理' },
        { id: 'thai', name: '东南亚菜' },
        { id: 'pizza-pasta', name: '披萨意面' }
      ] },
      { id: 'packaged-food', name: '食品零食', children: [
        { id: 'specialty', name: '地方特产' },
        { id: 'snacks', name: '休闲零食' },
        { id: 'health-food', name: '滋补食品' },
        { id: 'frozen-food', name: '速冻预制菜' },
        { id: 'condiment', name: '调味酱料' }
      ] }
    ]
  },
  {
    id: 'retail',
    name: '零售电商',
    children: [
      { id: 'fashion', name: '服装鞋包', children: [
        { id: 'womens', name: '女装' },
        { id: 'mens', name: '男装' },
        { id: 'kids-wear', name: '童装' },
        { id: 'underwear', name: '内衣家居服' },
        { id: 'sportswear', name: '运动服饰' },
        { id: 'shoes', name: '鞋靴' },
        { id: 'bags', name: '箱包' }
      ] },
      { id: 'beauty-retail', name: '美妆个护', children: [
        { id: 'skincare-makeup', name: '护肤彩妆' },
        { id: 'perfume', name: '香水香氛' },
        { id: 'personal-care', name: '洗护用品' },
        { id: 'mens-grooming', name: '男士理容' },
        { id: 'beauty-tools', name: '美妆工具' }
      ] },
      { id: 'digital', name: '数码家电', children: [
        { id: 'phone', name: '手机数码' },
        { id: 'computer', name: '电脑办公' },
        { id: 'appliance', name: '大家电' },
        { id: 'kitchen-appliance', name: '厨房小家电' },
        { id: 'smart-home', name: '智能家居' },
        { id: 'audio', name: '耳机音响' }
      ] },
      { id: 'grocery', name: '生鲜商超', children: [
        { id: 'fresh', name: '生鲜果蔬' },
        { id: 'meat-seafood', name: '肉禽水产' },
        { id: 'convenience', name: '便利店' },
        { id: 'supermarket', name: '商超卖场' },
        { id: 'imported', name: '进口食品' }
      ] },
      { id: 'home-goods', name: '家居百货', children: [
        { id: 'furniture', name: '家具软装' },
        { id: 'bedding', name: '床品家纺' },
        { id: 'kitchenware', name: '厨具餐具' },
        { id: 'storage', name: '收纳清洁' },
        { id: 'daily-goods', name: '日用百货' }
      ] },
      { id: 'jewelry', name: '珠宝配饰', children: [
        { id: 'gold', name: '黄金珠宝' },
        { id: 'diamond', name: '钻石婚嫁' },
        { id: 'jade', name: '玉石文玩' },
        { id: 'watch-glasses', name: '手表眼镜' },
        { id: 'accessories', name: '潮流饰品' }
      ] },
      { id: 'pet-goods', name: '宠物用品', children: [
        { id: 'pet-food', name: '宠物主粮' },
        { id: 'pet-snacks', name: '宠物零食' },
        { id: 'pet-supplies', name: '宠物日用' },
        { id: 'pet-smart', name: '智能宠物设备' }
      ] },
      { id: 'books-toys', name: '图书文创', children: [
        { id: 'books', name: '图书音像' },
        { id: 'stationery', name: '文具手账' },
        { id: 'cultural-creative', name: '文创周边' },
        { id: 'musical-instrument', name: '乐器' }
      ] }
    ]
  },
  {
    id: 'beauty',
    name: '美业健康',
    children: [
      { id: 'skin', name: '美容护肤', children: [
        { id: 'facial', name: '面部护理' },
        { id: 'spa', name: 'SPA水疗' },
        { id: 'skin-mgmt', name: '皮肤管理' },
        { id: 'body-care', name: '身体护理' }
      ] },
      { id: 'hair', name: '美发造型', children: [
        { id: 'haircut', name: '剪发烫染' },
        { id: 'scalp', name: '头皮养护' },
        { id: 'barber', name: '男士理发' },
        { id: 'wig', name: '假发接发' }
      ] },
      { id: 'nail-lash', name: '美甲美睫', children: [
        { id: 'nail', name: '美甲' },
        { id: 'lash', name: '美睫' },
        { id: 'brow', name: '纹绣' },
        { id: 'makeup-service', name: '化妆造型' }
      ] },
      { id: 'medical-beauty', name: '轻医美', children: [
        { id: 'anti-aging', name: '抗衰提升' },
        { id: 'laser', name: '光电项目' },
        { id: 'injection', name: '注射美容' },
        { id: 'body-shaping', name: '身材管理' }
      ] },
      { id: 'wellness', name: '养生按摩', children: [
        { id: 'massage', name: '推拿按摩' },
        { id: 'moxa', name: '艾灸理疗' },
        { id: 'foot-spa', name: '足浴' },
        { id: 'sauna', name: '汗蒸桑拿' }
      ] },
      { id: 'fitness', name: '健身瑜伽', children: [
        { id: 'gym', name: '健身房' },
        { id: 'yoga', name: '瑜伽普拉提' },
        { id: 'dance', name: '舞蹈工作室' },
        { id: 'boxing', name: '搏击拳馆' },
        { id: 'swimming', name: '游泳馆' }
      ] }
    ]
  },
  {
    id: 'education',
    name: '教育培训',
    children: [
      { id: 'kids-quality', name: '少儿素质', children: [
        { id: 'art-class', name: '美术书法' },
        { id: 'music-class', name: '音乐器乐' },
        { id: 'coding-class', name: '少儿编程' },
        { id: 'sports-class', name: '体育体能' },
        { id: 'chess-class', name: '棋类思维' },
        { id: 'stem-class', name: '科学实验' }
      ] },
      { id: 'after-school', name: '课后成长', children: [
        { id: 'homework-care', name: '课后托管' },
        { id: 'reading-writing', name: '阅读写作' },
        { id: 'memory-training', name: '专注力训练' }
      ] },
      { id: 'vocational', name: '职业技能', children: [
        { id: 'it-training', name: 'IT互联网' },
        { id: 'design-training', name: '设计剪辑' },
        { id: 'chef-training', name: '烹饪技能' },
        { id: 'beauty-training', name: '美业技能' },
        { id: 'license-exam', name: '资格考证' },
        { id: 'live-training', name: '电商直播' }
      ] },
      { id: 'language', name: '语言培训', children: [
        { id: 'english', name: '英语' },
        { id: 'japanese-korean', name: '日韩语' },
        { id: 'european', name: '法德西语' },
        { id: 'chinese-edu', name: '对外汉语' }
      ] },
      { id: 'advanced-exam', name: '升学深造', children: [
        { id: 'kaoyan', name: '考研' },
        { id: 'civil-service', name: '考公考编' },
        { id: 'study-abroad', name: '留学申请' },
        { id: 'mba', name: 'MBA在职提升' }
      ] },
      { id: 'early-edu', name: '早教托育', children: [
        { id: 'nursery', name: '托育园' },
        { id: 'parent-child', name: '亲子早教' },
        { id: 'sensory-training', name: '感统训练' }
      ] },
      { id: 'adult-interest', name: '成人兴趣', children: [
        { id: 'adult-art', name: '成人美术' },
        { id: 'adult-music', name: '成人乐器' },
        { id: 'photography-class', name: '摄影课程' },
        { id: 'tea-flower', name: '茶艺花艺' }
      ] }
    ]
  },
  {
    id: 'local-services',
    name: '本地生活',
    children: [
      { id: 'home-service', name: '家政保洁', children: [
        { id: 'cleaning', name: '日常保洁' },
        { id: 'deep-clean', name: '深度开荒' },
        { id: 'nanny', name: '保姆月嫂' },
        { id: 'elder-care', name: '居家养老' }
      ] },
      { id: 'repair', name: '维修安装', children: [
        { id: 'appliance-repair', name: '家电维修' },
        { id: 'lock-service', name: '开锁换锁' },
        { id: 'house-repair', name: '房屋维修' },
        { id: 'pipe-service', name: '管道疏通' }
      ] },
      { id: 'moving', name: '搬家货运', children: [
        { id: 'home-moving', name: '居民搬家' },
        { id: 'office-moving', name: '企业搬迁' },
        { id: 'city-freight', name: '同城货运' }
      ] },
      { id: 'laundry', name: '洗衣洗护', children: [
        { id: 'clothes-care', name: '衣物洗护' },
        { id: 'luxury-care', name: '奢品养护' },
        { id: 'shoe-care', name: '洗鞋修鞋' }
      ] },
      { id: 'photography', name: '摄影写真', children: [
        { id: 'portrait', name: '个人写真' },
        { id: 'wedding-photo', name: '婚纱摄影' },
        { id: 'id-photo', name: '证件照' },
        { id: 'product-photo', name: '商业摄影' }
      ] },
      { id: 'pet-service', name: '宠物服务', children: [
        { id: 'grooming', name: '宠物美容' },
        { id: 'boarding', name: '宠物寄养' },
        { id: 'vet', name: '宠物医院' },
        { id: 'pet-training', name: '宠物训练' }
      ] },
      { id: 'wedding-event', name: '婚庆庆典', children: [
        { id: 'wedding-planning', name: '婚礼策划' },
        { id: 'event-planning', name: '宴会策划' },
        { id: 'host-service', name: '司仪主持' }
      ] }
    ]
  },
  {
    id: 'medical',
    name: '医疗健康',
    children: [
      { id: 'dental', name: '口腔齿科', children: [
        { id: 'implant', name: '种植牙' },
        { id: 'ortho', name: '正畸矫正' },
        { id: 'kids-dental', name: '儿童齿科' },
        { id: 'teeth-whitening', name: '洁牙美白' }
      ] },
      { id: 'eye-care', name: '眼科视光', children: [
        { id: 'myopia', name: '近视防控' },
        { id: 'glasses-fitting', name: '配镜验光' },
        { id: 'eye-surgery', name: '屈光手术' }
      ] },
      { id: 'checkup', name: '体检中心', children: [
        { id: 'annual-checkup', name: '年度体检' },
        { id: 'enterprise-checkup', name: '企业团检' },
        { id: 'special-checkup', name: '专项筛查' }
      ] },
      { id: 'tcm', name: '中医理疗', children: [
        { id: 'tcm-clinic', name: '中医门诊' },
        { id: 'acupuncture', name: '针灸推拿' },
        { id: 'tcm-tonic', name: '膏方调理' }
      ] },
      { id: 'pharmacy', name: '药店药品', children: [
        { id: 'retail-pharmacy', name: '连锁药房' },
        { id: 'health-supplement', name: '营养保健' },
        { id: 'medical-device', name: '家用医疗器械' }
      ] },
      { id: 'psychology', name: '心理咨询', children: [
        { id: 'individual-counsel', name: '个人咨询' },
        { id: 'family-counsel', name: '婚姻家庭' },
        { id: 'teen-counsel', name: '青少年心理' }
      ] },
      { id: 'rehab', name: '康复护理', children: [
        { id: 'postpartum-rehab', name: '产后康复' },
        { id: 'sports-rehab', name: '运动康复' },
        { id: 'nursing-home', name: '康养机构' }
      ] }
    ]
  },
  {
    id: 'finance',
    name: '金融保险',
    children: [
      { id: 'bank-loan', name: '银行信贷', children: [
        { id: 'consumer-loan', name: '消费信贷' },
        { id: 'business-loan', name: '经营贷款' },
        { id: 'mortgage', name: '房贷按揭' }
      ] },
      { id: 'insurance', name: '保险经纪', children: [
        { id: 'family-insurance', name: '家庭保障' },
        { id: 'health-insurance', name: '健康险' },
        { id: 'car-insurance', name: '车险' },
        { id: 'enterprise-insurance', name: '企业团险' }
      ] },
      { id: 'investment', name: '投资理财', children: [
        { id: 'wealth-mgmt', name: '财富管理' },
        { id: 'fund', name: '基金定投' },
        { id: 'pension-plan', name: '养老规划' }
      ] },
      { id: 'tax-planning', name: '财税规划', children: [
        { id: 'personal-tax', name: '个税规划' },
        { id: 'corporate-tax', name: '企业税务' }
      ] }
    ]
  },
  {
    id: 'realestate',
    name: '房产家装',
    children: [
      { id: 'new-house', name: '新房销售', children: [
        { id: 'residential', name: '住宅楼盘' },
        { id: 'commercial-property', name: '商铺公寓' },
        { id: 'villa', name: '别墅洋房' }
      ] },
      { id: 'house-agency', name: '二手房租售', children: [
        { id: 'resale-house', name: '二手房买卖' },
        { id: 'renting', name: '租房公寓' },
        { id: 'office-leasing', name: '写字楼租赁' }
      ] },
      { id: 'custom-furniture', name: '全屋定制', children: [
        { id: 'whole-house', name: '整屋定制' },
        { id: 'cabinet', name: '橱柜衣柜' },
        { id: 'door-window', name: '门窗阳光房' }
      ] },
      { id: 'decoration', name: '装修设计', children: [
        { id: 'full-decoration', name: '整装装修' },
        { id: 'partial-renovation', name: '局部翻新' },
        { id: 'soft-decoration', name: '软装设计' },
        { id: 'office-decoration', name: '工装办公' }
      ] },
      { id: 'building-materials', name: '建材家具', children: [
        { id: 'tiles-floor', name: '瓷砖地板' },
        { id: 'paint-wall', name: '涂料墙面' },
        { id: 'lighting', name: '灯具照明' },
        { id: 'bathroom', name: '卫浴洁具' }
      ] },
      { id: 'property', name: '物业服务', children: [
        { id: 'residential-property', name: '住宅物业' },
        { id: 'commercial-mgmt', name: '商业运营' }
      ] }
    ]
  },
  {
    id: 'auto',
    name: '汽车出行',
    children: [
      { id: 'new-car', name: '新车销售', children: [
        { id: 'ev-car', name: '新能源车' },
        { id: 'fuel-car', name: '燃油车' },
        { id: 'luxury-car', name: '豪华品牌' }
      ] },
      { id: 'used-car', name: '二手车', children: [
        { id: 'used-car-sale', name: '二手车零售' },
        { id: 'car-recycle', name: '高价收车' }
      ] },
      { id: 'car-maintenance', name: '汽车养护', children: [
        { id: 'maintenance', name: '保养维修' },
        { id: 'car-wash', name: '洗车美容' },
        { id: 'tire-service', name: '轮胎电瓶' },
        { id: 'car-film', name: '贴膜改色' }
      ] },
      { id: 'ev-charging', name: '新能源充换电', children: [
        { id: 'charging-station', name: '充电站' },
        { id: 'home-charger', name: '家充安装' }
      ] },
      { id: 'car-rental', name: '租车代驾', children: [
        { id: 'self-drive', name: '自驾租车' },
        { id: 'chauffeur', name: '代驾服务' },
        { id: 'wedding-car', name: '婚车租赁' }
      ] },
      { id: 'driving-school', name: '驾校培训', children: [
        { id: 'c-license', name: 'C照速成' },
        { id: 'motorcycle-license', name: '摩托车驾照' }
      ] }
    ]
  },
  {
    id: 'travel',
    name: '文旅酒店',
    children: [
      { id: 'hotel', name: '酒店民宿', children: [
        { id: 'boutique-hotel', name: '精品酒店' },
        { id: 'homestay', name: '特色民宿' },
        { id: 'resort', name: '度假酒店' },
        { id: 'hostel', name: '青旅客栈' }
      ] },
      { id: 'scenic', name: '景区乐园', children: [
        { id: 'theme-park', name: '主题乐园' },
        { id: 'natural-scenic', name: '自然风景区' },
        { id: 'cultural-site', name: '人文古迹' },
        { id: 'hot-spring', name: '温泉滑雪' }
      ] },
      { id: 'travel-agency', name: '旅行社', children: [
        { id: 'domestic-tour', name: '国内游' },
        { id: 'outbound-tour', name: '出境游' },
        { id: 'customized-tour', name: '定制游' },
        { id: 'study-tour', name: '研学旅行' }
      ] },
      { id: 'show-ticket', name: '票务演出', children: [
        { id: 'concert', name: '演唱会音乐节' },
        { id: 'theater', name: '话剧演出' },
        { id: 'exhibition-ticket', name: '展览展会' }
      ] },
      { id: 'outdoor', name: '露营户外', children: [
        { id: 'camping', name: '露营基地' },
        { id: 'hiking', name: '徒步登山' },
        { id: 'water-sports', name: '水上运动' }
      ] }
    ]
  },
  {
    id: 'internet',
    name: '互联网软件',
    children: [
      { id: 'ai-apps', name: 'AI智能应用', children: [
        { id: 'ai-marketing', name: 'AI营销获客' },
        { id: 'ai-design', name: 'AI设计生成' },
        { id: 'ai-agent', name: '智能体客服' },
        { id: 'ai-office', name: 'AI办公提效' }
      ] },
      { id: 'saas', name: 'SaaS企业软件', children: [
        { id: 'crm-scrm', name: 'CRM/SCRM' },
        { id: 'erp-oa', name: 'ERP/OA' },
        { id: 'hr-saas', name: '人事薪酬系统' },
        { id: 'retail-saas', name: '收银会员系统' }
      ] },
      { id: 'ecom-platform', name: '电商平台服务', children: [
        { id: 'store-operation', name: '店铺代运营' },
        { id: 'live-ecom', name: '直播电商服务' },
        { id: 'cross-border', name: '跨境电商' }
      ] },
      { id: 'miniapp-dev', name: '小程序开发', children: [
        { id: 'miniapp-custom', name: '小程序定制' },
        { id: 'app-dev', name: 'APP开发' },
        { id: 'website-dev', name: '网站建设' }
      ] },
      { id: 'cyber-security', name: '网络安全', children: [
        { id: 'security-service', name: '安全服务' },
        { id: 'data-protection', name: '数据合规' }
      ] }
    ]
  },
  {
    id: 'biz-services',
    name: '企业服务',
    children: [
      { id: 'reg-tax', name: '工商财税', children: [
        { id: 'company-reg', name: '公司注册' },
        { id: 'bookkeeping', name: '代理记账' },
        { id: 'qualification', name: '资质代办' }
      ] },
      { id: 'legal', name: '法律服务', children: [
        { id: 'corporate-legal', name: '企业法务' },
        { id: 'contract-review', name: '合同审查' },
        { id: 'ip-service', name: '知识产权' }
      ] },
      { id: 'hr-service', name: '人力资源', children: [
        { id: 'recruiting', name: '招聘猎头' },
        { id: 'labor-dispatch', name: '劳务派遣' },
        { id: 'social-security', name: '社保代缴' }
      ] },
      { id: 'ad-marketing', name: '广告营销', children: [
        { id: 'brand-design', name: '品牌设计' },
        { id: 'digital-marketing', name: '数字营销' },
        { id: 'content-agency', name: '内容代运营' },
        { id: 'outdoor-ad', name: '户外广告' }
      ] },
      { id: 'printing', name: '印刷物料', children: [
        { id: 'business-printing', name: '商务印刷' },
        { id: 'packaging-printing', name: '包装印刷' },
        { id: 'signage', name: '标识标牌' }
      ] },
      { id: 'office-rental', name: '办公租赁', children: [
        { id: 'shared-office', name: '共享办公' },
        { id: 'office-equipment', name: '办公设备租赁' }
      ] }
    ]
  },
  {
    id: 'franchise',
    name: '招商加盟',
    children: [
      { id: 'food-franchise', name: '餐饮加盟', children: [
        { id: 'tea-franchise', name: '茶饮加盟' },
        { id: 'snack-franchise', name: '小吃加盟' },
        { id: 'restaurant-franchise', name: '正餐加盟' }
      ] },
      { id: 'retail-franchise', name: '零售加盟', children: [
        { id: 'convenience-franchise', name: '便利店加盟' },
        { id: 'brand-franchise', name: '品牌专卖加盟' }
      ] },
      { id: 'edu-franchise', name: '教育加盟', children: [
        { id: 'quality-edu-franchise', name: '素质教育加盟' },
        { id: 'early-edu-franchise', name: '早教托育加盟' }
      ] },
      { id: 'beauty-franchise', name: '美业加盟', children: [
        { id: 'skin-franchise', name: '皮肤管理加盟' },
        { id: 'nail-franchise', name: '美甲美睫加盟' }
      ] },
      { id: 'service-franchise', name: '服务业加盟', children: [
        { id: 'laundry-franchise', name: '洗衣加盟' },
        { id: 'home-franchise', name: '家政加盟' },
        { id: 'pet-franchise', name: '宠物店加盟' }
      ] }
    ]
  },
  {
    id: 'agriculture',
    name: '农业批发',
    children: [
      { id: 'produce', name: '农产品生鲜', children: [
        { id: 'fruits', name: '水果' },
        { id: 'vegetables', name: '蔬菜' },
        { id: 'grain-oil', name: '粮油米面' },
        { id: 'eggs-poultry', name: '禽蛋肉类' }
      ] },
      { id: 'nursery-plants', name: '苗木花卉', children: [
        { id: 'flowers', name: '鲜花绿植' },
        { id: 'seedlings', name: '苗木种苗' },
        { id: 'garden-supplies', name: '园艺资材' }
      ] },
      { id: 'aquatic', name: '水产养殖', children: [
        { id: 'fresh-aquatic', name: '淡水水产' },
        { id: 'seafood-wholesale', name: '海鲜批发' }
      ] },
      { id: 'wholesale-market', name: '批发市场', children: [
        { id: 'farm-wholesale', name: '农贸批发' },
        { id: 'commodity-wholesale', name: '小商品批发' }
      ] },
      { id: 'agri-supplies', name: '农资农机', children: [
        { id: 'fertilizer-seed', name: '种子化肥' },
        { id: 'agri-machine', name: '农机设备' }
      ] }
    ]
  },
  {
    id: 'manufacturing',
    name: '制造工业',
    children: [
      { id: 'machinery', name: '机械设备', children: [
        { id: 'industrial-machine', name: '工业设备' },
        { id: 'food-machine', name: '食品机械' },
        { id: 'construction-machine', name: '工程机械' }
      ] },
      { id: 'electronics', name: '电子元件', children: [
        { id: 'components', name: '元器件' },
        { id: 'pcb-assembly', name: 'PCB与代工' },
        { id: 'sensors', name: '传感器仪表' }
      ] },
      { id: 'packaging', name: '包装定制', children: [
        { id: 'carton-box', name: '纸箱彩盒' },
        { id: 'gift-box', name: '礼盒定制' },
        { id: 'flexible-packaging', name: '软包袋膜' }
      ] },
      { id: 'hardware', name: '五金建材', children: [
        { id: 'hardware-tools', name: '五金工具' },
        { id: 'steel-materials', name: '钢材型材' },
        { id: 'fasteners', name: '紧固件' }
      ] },
      { id: 'textile', name: '纺织皮革', children: [
        { id: 'fabric', name: '面料布艺' },
        { id: 'garment-oem', name: '服装代工' }
      ] }
    ]
  },
  {
    id: 'mother-kids',
    name: '母婴亲子',
    children: [
      { id: 'confinement', name: '月子中心', children: [
        { id: 'confinement-center', name: '月子会所' },
        { id: 'confinement-meal', name: '月子餐' }
      ] },
      { id: 'kids-play', name: '亲子乐园', children: [
        { id: 'indoor-playground', name: '室内乐园' },
        { id: 'outdoor-farm', name: '亲子农场' },
        { id: 'kids-park', name: '蹦床攀岩' }
      ] },
      { id: 'kids-photo', name: '儿童摄影', children: [
        { id: 'newborn-photo', name: '新生儿摄影' },
        { id: 'kids-portrait', name: '儿童写真' },
        { id: 'family-photo', name: '全家福' }
      ] },
      { id: 'toys-clothing', name: '玩具童装', children: [
        { id: 'toys', name: '玩具积木' },
        { id: 'baby-products', name: '婴童用品' },
        { id: 'kids-clothing', name: '童装童鞋' }
      ] },
      { id: 'maternity-care', name: '孕产护理', children: [
        { id: 'maternity-photo', name: '孕妇写真' },
        { id: 'postpartum-care', name: '产后护理' },
        { id: 'lactation', name: '催乳通乳' }
      ] }
    ]
  },
  {
    id: 'entertainment',
    name: '娱乐休闲',
    children: [
      { id: 'ktv-bar', name: 'KTV酒吧', children: [
        { id: 'ktv', name: '量贩KTV' },
        { id: 'bar', name: '酒吧清吧' },
        { id: 'livehouse', name: 'Livehouse' }
      ] },
      { id: 'esports', name: '电竞网咖', children: [
        { id: 'esports-hotel', name: '电竞酒店' },
        { id: 'internet-cafe', name: '网咖' }
      ] },
      { id: 'board-game', name: '桌游棋牌', children: [
        { id: 'board-game-cafe', name: '桌游吧' },
        { id: 'chess-room', name: '棋牌室' },
        { id: 'mahjong', name: '自动麻将馆' }
      ] },
      { id: 'script-game', name: '剧本杀密室', children: [
        { id: 'script-murder', name: '剧本杀' },
        { id: 'escape-room', name: '密室逃脱' },
        { id: 'vr-experience', name: 'VR体验馆' }
      ] },
      { id: 'leisure-sports', name: '休闲运动', children: [
        { id: 'billiards', name: '台球馆' },
        { id: 'bowling', name: '保龄球' },
        { id: 'archery-gokart', name: '射箭卡丁车' }
      ] }
    ]
  },
  {
    id: 'public',
    name: '公益政务',
    children: [
      { id: 'community', name: '社区活动', children: [
        { id: 'community-service', name: '便民服务' },
        { id: 'community-culture', name: '文化活动' }
      ] },
      { id: 'charity', name: '公益组织', children: [
        { id: 'donation', name: '捐赠倡导' },
        { id: 'volunteer', name: '志愿招募' },
        { id: 'environmental', name: '环保行动' }
      ] },
      { id: 'expo', name: '展会论坛', children: [
        { id: 'industry-expo', name: '行业展会' },
        { id: 'summit-forum', name: '峰会论坛' },
        { id: 'job-fair', name: '招聘会' }
      ] }
    ]
  }
];

/** 按 id 路径解析出节点序列；遇到无效 id 即截断。 */
export function nodesForPath(path: string[]): IndustryNode[] {
  const nodes: IndustryNode[] = [];
  let level: IndustryNode[] | undefined = industryTaxonomy;
  for (const id of path) {
    const found: IndustryNode | undefined = level?.find((node) => node.id === id);
    if (!found) break;
    nodes.push(found);
    level = found.children;
  }
  return nodes;
}

/** 某一层的候选列表（path 为已选中的前缀）。 */
export function childrenAt(path: string[], level: number): IndustryNode[] {
  if (level === 0) return industryTaxonomy;
  const nodes = nodesForPath(path.slice(0, level));
  return nodes[level - 1]?.children ?? [];
}

/** 把路径补全到叶子：每层取第一个子节点。 */
export function extendToLeaf(path: string[]): string[] {
  const nodes = nodesForPath(path);
  const result = nodes.map((node) => node.id);
  let cursor = nodes[nodes.length - 1];
  while (cursor?.children?.length) {
    cursor = cursor.children[0];
    result.push(cursor.id);
  }
  return result.length ? result : defaultIndustryPath();
}

export function defaultIndustryPath(): string[] {
  return extendToLeafFromTop(industryTaxonomy[0]);
}

function extendToLeafFromTop(root: IndustryNode): string[] {
  const result = [root.id];
  let cursor = root;
  while (cursor.children?.length) {
    cursor = cursor.children[0];
    result.push(cursor.id);
  }
  return result;
}

export function industryNamesFromPath(path: string[]): string[] {
  return nodesForPath(path).map((node) => node.name);
}

/** 最终写入项目 industry 字段、进入 prompt 的字符串。 */
export function industryStringFromPath(path: string[]): string {
  return industryNamesFromPath(path).join(INDUSTRY_PATH_SEPARATOR);
}
