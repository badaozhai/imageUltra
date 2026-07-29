import type { CopyTemplate } from './template';

export const entertainmentTemplates: Record<string, CopyTemplate[]> = {
  entertainment: [
    { brand: '谜境剧本杀', subtitle: '周末组队开新本', sellingPoints: '全息场景 / 专业DM / 新本首发', price: '工作日5折', benefit: '组队赠饮品' }
  ],
  'ktv-bar': [
    { brand: '声浪KTV', subtitle: '今晚的麦，谁也别想抢', sellingPoints: '新装包厢 / 千万曲库 / 酒水超市价', price: '欢唱3小时99元', benefit: '会员生日免包厢费' },
    { brand: '屿后清吧', subtitle: '下班后的微醺一小时', sellingPoints: '驻唱现场 / 特调鸡尾酒 / 不设最低消费', price: '特调买一送一', benefit: '周三女士之夜' }
  ],
  esports: [
    { brand: '元域电竞馆', subtitle: '满血配置，开黑首选', sellingPoints: '4090显卡 / 电竞椅 / 包夜套餐', price: '5小时套餐39元', benefit: '充100送30' },
    { brand: '元域电竞酒店', subtitle: '开黑到天亮，倒头就能睡', sellingPoints: '双人电竞房 / 高配外设 / 夜宵配送', price: '电竞房288元/晚', benefit: '连住两晚送早餐' }
  ],
  'board-game': [
    { brand: '棋乐桌游吧', subtitle: '一桌好友，一晚欢乐', sellingPoints: '500+桌游 / 专人教学 / 零食畅吃', price: '工作日畅玩39元/人', benefit: '4人同行1人免单' },
    { brand: '雀友自动麻将馆', subtitle: '想搓就搓，包间安静', sellingPoints: '全自动机麻 / 独立包间 / 茶水无限续', price: '包间25元/小时', benefit: '充值送时长' }
  ],
  'script-game': [
    { brand: '谜境剧本杀', subtitle: '走进剧情，做一次主角', sellingPoints: '实景搭建 / 专业DM / 新本首发', price: '工作日车票5折', benefit: '拼车成团送照片直出' },
    { brand: '逃离方舟密室', subtitle: '60分钟，能逃出去吗', sellingPoints: '机关实景 / 恐怖/合家欢双线 / NPC互动', price: '双人票139元', benefit: '通关送合影打印' }
  ],
  'leisure-sports': [
    { brand: '九号台球俱乐部', subtitle: '约一局，手感正热', sellingPoints: '国标球台 / 助教陪练 / 24小时营业', price: '台费29元/小时', benefit: '充值送陪练课' },
    { brand: '飞驰卡丁车馆', subtitle: '过弯的快乐，踩下去就懂', sellingPoints: '专业赛道 / 计时排名 / 新手教学圈', price: '单局票88元', benefit: '三局套票送头套' }
  ]
};
