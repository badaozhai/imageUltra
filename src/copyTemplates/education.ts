import type { CopyTemplate } from './template';

export const educationTemplates: Record<string, CopyTemplate[]> = {
  education: [
    { brand: '启航成长中心', subtitle: '系统课程助力高效提升', sellingPoints: '小班教学 / 专属规划 / 阶段测评', price: '试听课9.9元', benefit: '报名赠学习礼包' }
  ],
  'kids-quality': [
    { brand: '小画家美术', subtitle: '让孩子的想象力落在纸上', sellingPoints: '小班教学 / 作品集输出 / 考级通道', price: '体验课19.9元', benefit: '报名送画材礼盒' },
    { brand: '酷码少儿编程', subtitle: '从兴趣到思维的编程启蒙', sellingPoints: '图形化入门 / 赛事辅导 / 师资认证', price: '4节体验课99元', benefit: '完课送机器人套件' }
  ],
  'art-class': [
    { brand: '小画家美术', subtitle: '一支画笔，画出专注力', sellingPoints: '创意+基本功并重 / 期末画展 / 美院师资', price: '暑期班特惠980元', benefit: '老带新各减200' }
  ],
  'music-class': [
    { brand: '乐鸣琴行', subtitle: '第一节钢琴课，从兴趣开始', sellingPoints: '一对一授课 / 考级直通 / 免费练琴房', price: '体验课39元', benefit: '报名送考级教材' }
  ],
  'coding-class': [
    { brand: '酷码少儿编程', subtitle: '玩着玩着，逻辑就通了', sellingPoints: 'Scratch到Python / 信奥赛路线 / 双师课堂', price: '编程体验营99元', benefit: '送编程器材包' }
  ],
  'sports-class': [
    { brand: '飞跃体能馆', subtitle: '能跑能跳，才有好状态', sellingPoints: '体适能测评 / 篮球跳绳专项 / 中考体育冲刺', price: '体验课29元', benefit: '报名送运动手环' }
  ],
  'after-school': [
    { brand: '安心学堂', subtitle: '放学后的第二个课堂', sellingPoints: '接送无忧 / 作业辅导 / 习惯养成', price: '托管月卡680元', benefit: '试托一周仅99' },
    { brand: '阅写营', subtitle: '读得进去，写得出来', sellingPoints: '分级阅读 / 写作方法课 / 月度成果册', price: '阅读营月卡399元', benefit: '送精选书单' }
  ],
  vocational: [
    { brand: '职途学院', subtitle: '学一门吃饭的硬本事', sellingPoints: '项目实战 / 就业推荐 / 终身复训', price: '早鸟价立减1000', benefit: '分期0利息' },
    { brand: '主播训练营', subtitle: '从0到1开播变现', sellingPoints: '实操起号 / 话术拆解 / 供应链对接', price: '7天集训营1980元', benefit: '结营推荐合作商家' }
  ],
  'it-training': [
    { brand: '职途学院', subtitle: '转行IT，从项目实战开始', sellingPoints: '企业级项目 / 大厂讲师 / 就业内推', price: '全栈班早鸟价减1000', benefit: '先学习后付费' }
  ],
  language: [
    { brand: '言外语社', subtitle: '开口说，才算学会', sellingPoints: '外教小班 / 场景对话 / 免费水平测试', price: '体验课0元', benefit: '报名减1000元' },
    { brand: '樱木日语', subtitle: '从五十音到自由会话', sellingPoints: '中外教结合 / 留学考级双线 / 周末班', price: 'N5入门班1280元', benefit: '送全套讲义' }
  ],
  'advanced-exam': [
    { brand: '登科考研', subtitle: '这一年，全力以赴', sellingPoints: '全程督学 / 院校规划 / 真题精讲', price: '全程班5980元', benefit: '早报送暑期集训' },
    { brand: '上岸公考学堂', subtitle: '行测申论，一次上岸', sellingPoints: '模块精讲 / 全真模考 / 面试封闭营', price: '笔试系统班3980元', benefit: '不过线重学一期' }
  ],
  kaoyan: [
    { brand: '登科考研', subtitle: '目标院校，一战上岸', sellingPoints: '择校规划 / 全程督学 / 复试指导', price: '全程班5980元', benefit: '6月前报名减800' }
  ],
  'civil-service': [
    { brand: '上岸公考学堂', subtitle: '今年省考，就差一个方法', sellingPoints: '分模块提分 / 申论批改 / 历年真题库', price: '冲刺班2980元', benefit: '送面试礼仪课' }
  ],
  'study-abroad': [
    { brand: '远航留学', subtitle: '把背景规划做在申请前', sellingPoints: '前招生官文书 / 选校定位 / 全程透明', price: '申请套餐29800元起', benefit: '免费评估录取概率' }
  ],
  'early-edu': [
    { brand: '芽芽托育', subtitle: '离家近的安心托付', sellingPoints: '持证保育 / 实时监控 / 营养三餐', price: '半日托月费1980元', benefit: '试托3天仅199' },
    { brand: '童乐亲子早教', subtitle: '高质量陪伴的一小时', sellingPoints: '0-3岁分龄课 / 亲子共学 / 感统教具', price: '体验课49元', benefit: '报名送绘本礼包' }
  ],
  'adult-interest': [
    { brand: '生活美学社', subtitle: '下班后，给自己留一门课', sellingPoints: '零基础友好 / 小班沙龙 / 成果可带走', price: '单次体验68元', benefit: '月卡4次仅199' },
    { brand: '映像摄影课堂', subtitle: '用手机也能拍出大片', sellingPoints: '周末外拍 / 修图实操 / 作品点评', price: '入门班599元', benefit: '送修图预设包' }
  ]
};
