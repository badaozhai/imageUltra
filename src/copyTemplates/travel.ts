import type { CopyTemplate } from './template';

export const travelTemplates: Record<string, CopyTemplate[]> = {
  travel: [
    { brand: '山隐民宿', subtitle: '周末逃离城市计划', sellingPoints: '山景房 / 管家服务 / 免费早餐', price: '连住两晚立减200', benefit: '预订赠下午茶' }
  ],
  hotel: [
    { brand: '山隐民宿', subtitle: '推窗是山，落脚是家', sellingPoints: '山景大床房 / 管家服务 / 地道早餐', price: '工作日特惠399元/晚', benefit: '连住2晚送下午茶' },
    { brand: '澜庭度假酒店', subtitle: '一价全包的亲子假期', sellingPoints: '恒温泳池 / 儿童乐园 / 双早双晚', price: '亲子套餐1288元', benefit: '赠乐园门票2张' }
  ],
  homestay: [
    { brand: '山隐民宿', subtitle: '院子、柴火、慢下来的两天', sellingPoints: '独栋小院 / 围炉煮茶 / 宠物友好', price: '小院整租888元/晚', benefit: '工作日立减150' }
  ],
  scenic: [
    { brand: '云上花谷', subtitle: '此刻花期正好', sellingPoints: '万亩花海 / 玻璃栈道 / 小火车环游', price: '门票特惠59元', benefit: '1.2米以下儿童免票' },
    { brand: '雾凇温泉谷', subtitle: '泡在山里的暖冬', sellingPoints: '山景汤池 / 室内外双区 / 含浴巾汗蒸', price: '温泉门票128元', benefit: '住宿客免费泡汤' }
  ],
  'travel-agency': [
    { brand: '远方旅行社', subtitle: '把行程交给我们，把风景留给自己', sellingPoints: '纯玩无购物 / 小团出行 / 领队全程', price: '云南6日游2980元', benefit: '提前30天订减300' },
    { brand: '少年行研学营', subtitle: '行走的课堂，看见更大的世界', sellingPoints: '名校线路 / 双辅导员带队 / 每日成长记录', price: '暑期研学营4980元', benefit: '两人同报各减400' }
  ],
  'show-ticket': [
    { brand: '星夜演出票务', subtitle: '热门演出，好位先抢', sellingPoints: '官方授权 / 电子票秒出 / 连座保障', price: '早鸟票8折', benefit: '会员优先购' },
    { brand: '城市艺术中心', subtitle: '这个周末，去看一场现场', sellingPoints: '话剧音乐剧轮演 / 学生票专区 / 地铁直达', price: '学生票80元起', benefit: '会员购票88折' }
  ],
  outdoor: [
    { brand: '荒野营地', subtitle: '周末去野，星空下露营', sellingPoints: '拎包入住 / 篝火晚会 / 亲子活动', price: '两天一夜398元/人', benefit: '4人成团减100' },
    { brand: '溯溪俱乐部', subtitle: '夏天就该泡在溪水里', sellingPoints: '专业领队 / 装备全包 / 保险齐全', price: '单日活动268元', benefit: '老带新各减50' }
  ]
};
