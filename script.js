// ========== MBTI 32 题 × 4 选项测试 ==========
// 评分算法：加权计分制（A=+3, B=+1, C=+1, D=+3）
// 每个维度 8 题，每题 4 选 1
// A=强烈倾向第一极  B=轻微倾向第一极  C=轻微倾向第二极  D=强烈倾向第二极
// 百分比 = 该极加权得分 / 两极加权总得分 × 100%
// 平局规则：4:4 原始票数 → 倾向 I、N、F、P（社会中相对少数）

const questions = [
  // ===== E/I 维度 (8题，每题 A/B→E  C/D→I) =====
  { text: "周末你更倾向于怎样度过？", dim: "EI", options: [
    { label: "A", text: "约朋友聚会、参加活动，人越多越开心", value: "E", weight: 3 },
    { label: "B", text: "和一两个好友小聚，轻松聊聊天", value: "E", weight: 1 },
    { label: "C", text: "大部分时间独处，偶尔和朋友联系", value: "I", weight: 1 },
    { label: "D", text: "完全一个人待着，看书追剧充电", value: "I", weight: 3 }
  ]},
  { text: "在大型社交场合，你通常会：", dim: "EI", options: [
    { label: "A", text: "主动结识新朋友，人群越热闹越有活力", value: "E", weight: 3 },
    { label: "B", text: "和认识的人聊天为主，顺便认识一两个新朋友", value: "E", weight: 1 },
    { label: "C", text: "安静待在角落，只和熟悉的几个朋友来往", value: "I", weight: 1 },
    { label: "D", text: "尽量避免这种场合，觉得消耗精力", value: "I", weight: 3 }
  ]},
  { text: "你更倾向于哪种沟通方式？", dim: "EI", options: [
    { label: "A", text: "边说边想，讲的过程中思路越来越清晰", value: "E", weight: 3 },
    { label: "B", text: "大概想好怎么说就直接讲出来", value: "E", weight: 1 },
    { label: "C", text: "先在心里推敲几遍，想清楚再说", value: "I", weight: 1 },
    { label: "D", text: "能用写的绝不用说的，文字比说话精确", value: "I", weight: 3 }
  ]},
  { text: "累了的时候，怎么恢复精力？", dim: "EI", options: [
    { label: "A", text: "找朋友一起出去逛逛，热闹的环境让我回血", value: "E", weight: 3 },
    { label: "B", text: "跟家人或对象一起吃顿饭聊聊天", value: "E", weight: 1 },
    { label: "C", text: "关掉手机、瘫在沙发上刷剧听歌", value: "I", weight: 1 },
    { label: "D", text: "完全与世隔绝地独处，任何人都不联系", value: "I", weight: 3 }
  ]},
  { text: "小组讨论时，你的表现是：", dim: "EI", options: [
    { label: "A", text: "随时随地都有想法，忍不住要分享出来", value: "E", weight: 3 },
    { label: "B", text: "有好的想法就发言，没有就听别人讲", value: "E", weight: 1 },
    { label: "C", text: "多听少说，只在关键处插一两句", value: "I", weight: 1 },
    { label: "D", text: "从头到尾专注听，几乎不怎么发言", value: "I", weight: 3 }
  ]},
  { text: "遇到困难时，你的第一反应是：", dim: "EI", options: [
    { label: "A", text: "立刻打电话找朋友倾诉，听听各种建议", value: "E", weight: 3 },
    { label: "B", text: "跟最亲近的一两个人聊聊", value: "E", weight: 1 },
    { label: "C", text: "先自己消化，想清楚了再选择性分享", value: "I", weight: 1 },
    { label: "D", text: "自己解决就好，不想麻烦别人", value: "I", weight: 3 }
  ]},
  { text: "对于社交的态度，哪种最接近你？", dim: "EI", options: [
    { label: "A", text: "社交是必需品，认识新朋友让我很兴奋", value: "E", weight: 3 },
    { label: "B", text: "喜欢社交，但不是非得一直在人群里", value: "E", weight: 1 },
    { label: "C", text: "有几个深交的朋友就够了，社交适可而止", value: "I", weight: 1 },
    { label: "D", text: "可以一个月不出门不见人，完全不觉得闷", value: "I", weight: 3 }
  ]},
  { text: "理想的工作环境是：", dim: "EI", options: [
    { label: "A", text: "开放式办公室，随时能和同事互动讨论", value: "E", weight: 3 },
    { label: "B", text: "有独立工位但也能随时找同事交流", value: "E", weight: 1 },
    { label: "C", text: "独立办公室或隔间，专注做自己的事", value: "I", weight: 1 },
    { label: "D", text: "在家远程办公，完全不受打扰地深度工作", value: "I", weight: 3 }
  ]},

  // ===== S/N 维度 (8题，每题 A/B→S  C/D→N) =====
  { text: "解决新问题时，你更依赖什么？", dim: "SN", options: [
    { label: "A", text: "完全是过往经验，做过的方法才靠谱", value: "S", weight: 3 },
    { label: "B", text: "以经验为基础，稍作调整和创新", value: "S", weight: 1 },
    { label: "C", text: "先凭直觉试试，再参考经验验证", value: "N", weight: 1 },
    { label: "D", text: "完全相信直觉和灵感，喜欢从零创新", value: "N", weight: 3 }
  ]},
  { text: "阅读一本书时，你更关注什么？", dim: "SN", options: [
    { label: "A", text: "故事的具体情节、细节和人物的言行", value: "S", weight: 3 },
    { label: "B", text: "情节脉络为主，细节记不住也没关系", value: "S", weight: 1 },
    { label: "C", text: "隐喻和主题比具体情节更有意思", value: "N", weight: 1 },
    { label: "D", text: "完全沉浸在书的思想世界，细节记不清", value: "N", weight: 3 }
  ]},
  { text: "哪种工作方式让你更舒适？", dim: "SN", options: [
    { label: "A", text: "必须有清晰的步骤、明确的规则才能安心", value: "S", weight: 3 },
    { label: "B", text: "有框架就行，细节可以边做边调整", value: "S", weight: 1 },
    { label: "C", text: "不喜欢被框死，只想了解大方向", value: "N", weight: 1 },
    { label: "D", text: "完全自由发挥，规则和步骤反而束缚创意", value: "N", weight: 3 }
  ]},
  { text: "描述一个苹果，你最先想到什么？", dim: "SN", options: [
    { label: "A", text: "红色、圆形、光滑的表皮、咬一口脆脆的", value: "S", weight: 3 },
    { label: "B", text: "健康的水果，维生素C含量高很好吃", value: "S", weight: 1 },
    { label: "C", text: "让人想到牛顿、伊甸园、科技logo", value: "N", weight: 1 },
    { label: "D", text: "知识、诱惑、创新、人类文明发展的符号", value: "N", weight: 3 }
  ]},
  { text: "旅行前做攻略，你的风格是：", dim: "SN", options: [
    { label: "A", text: "详细到每一小时的行程表，酒店餐厅全订好", value: "S", weight: 3 },
    { label: "B", text: "查好主要景点和交通，留一些自由空间", value: "S", weight: 1 },
    { label: "C", text: "了解当地文化和背景，到了随走随逛", value: "N", weight: 1 },
    { label: "D", text: "机票酒店搞定就行，剩下的听天由命", value: "N", weight: 3 }
  ]},
  { text: "学习中，你更擅长：", dim: "SN", options: [
    { label: "A", text: "记忆事实、数据和具体案例", value: "S", weight: 3 },
    { label: "B", text: "从具体例子出发，自己总结规律", value: "S", weight: 1 },
    { label: "C", text: "先理解理论框架，再用例子验证", value: "N", weight: 1 },
    { label: "D", text: "直接理解抽象概念和模型，例子可有可无", value: "N", weight: 3 }
  ]},
  { text: "朋友分享事业点子，你首先想到：", dim: "SN", options: [
    { label: "A", text: "怎么落地、需要什么资源、具体怎么操作", value: "S", weight: 3 },
    { label: "B", text: "听起来不错，想想怎么一步步实现", value: "S", weight: 1 },
    { label: "C", text: "这个模式前景很开阔，能做成大方向", value: "N", weight: 1 },
    { label: "D", text: "甚至联想到更远的未来和跨界可能性", value: "N", weight: 3 }
  ]},
  { text: "你更信任哪种信息？", dim: "SN", options: [
    { label: "A", text: "亲眼所见、亲身经历的，眼见为实", value: "S", weight: 3 },
    { label: "B", text: "可靠数据和一手资料报告", value: "S", weight: 1 },
    { label: "C", text: "基于事实的推断和专家观点", value: "N", weight: 1 },
    { label: "D", text: "直觉的第六感往往比数据还准", value: "N", weight: 3 }
  ]},

  // ===== T/F 维度 (8题，每题 A/B→T  C/D→F) =====
  { text: "朋友向你倾诉烦恼，你第一反应：", dim: "TF", options: [
    { label: "A", text: "直接分析问题，帮忙列出解决方案123", value: "T", weight: 3 },
    { label: "B", text: "先听再给出建议，保持理性和客观", value: "T", weight: 1 },
    { label: "C", text: "先表达理解，设身处地为对方难过", value: "F", weight: 1 },
    { label: "D", text: "抱抱、安慰，陪TA一起消化情绪", value: "F", weight: 3 }
  ]},
  { text: "做重要决定时，你更看重：", dim: "TF", options: [
    { label: "A", text: "完全以数据和逻辑为依据，不考虑人情", value: "T", weight: 3 },
    { label: "B", text: "逻辑优先，但也参考一下相关人员感受", value: "T", weight: 1 },
    { label: "C", text: "感受优先，但也会看看逻辑上通不通", value: "F", weight: 1 },
    { label: "D", text: "和谐与人情第一，数据再漂亮也不能伤感情", value: "F", weight: 3 }
  ]},
  { text: "团队讨论出现分歧，你倾向于：", dim: "TF", options: [
    { label: "A", text: "坚持最优方案，对事不对人直说", value: "T", weight: 3 },
    { label: "B", text: "分析各方利弊，选最合理的方案", value: "T", weight: 1 },
    { label: "C", text: "尽量达成共识，照顾到大家的感受", value: "F", weight: 1 },
    { label: "D", text: "和和气气最重要，方案好坏其次", value: "F", weight: 3 }
  ]},
  { text: "以下哪句更符合你？", dim: "TF", options: [
    { label: "A", text: "真相第一，哪怕说实话会让人不高兴", value: "T", weight: 3 },
    { label: "B", text: "该说的实话还是要说，但会注意措辞", value: "T", weight: 1 },
    { label: "C", text: "不是所有实话都值得说，关系更重要", value: "F", weight: 1 },
    { label: "D", text: "宁愿说善意的谎言也不伤害对方感情", value: "F", weight: 3 }
  ]},
  { text: "评价一部电影，你更看重：", dim: "TF", options: [
    { label: "A", text: "剧情逻辑是否严密、有没有漏洞和bug", value: "T", weight: 3 },
    { label: "B", text: "逻辑大致通顺就行，关键看有没有道理", value: "T", weight: 1 },
    { label: "C", text: "打动人最重要，逻辑有小瑕疵也可以接受", value: "F", weight: 1 },
    { label: "D", text: "情绪对了什么都对，不在乎情节是否严丝合缝", value: "F", weight: 3 }
  ]},
  { text: "同事犯了错影响项目进度，你会：", dim: "TF", options: [
    { label: "A", text: "立刻指出问题所在，直接聊怎么改进", value: "T", weight: 3 },
    { label: "B", text: "客观分析失误原因，温和但明确地指出来", value: "T", weight: 1 },
    { label: "C", text: "私下找对方委婉提出，避免伤自尊", value: "F", weight: 1 },
    { label: "D", text: "默默帮忙补救，不想让对方有压力", value: "F", weight: 3 }
  ]},
  { text: "收礼物时，你潜意识里最在意：", dim: "TF", options: [
    { label: "A", text: "实用价值和性价比，不实用的东西很浪费", value: "T", weight: 3 },
    { label: "B", text: "挺实用的就好，不太在意价格和心意", value: "T", weight: 1 },
    { label: "C", text: "知道对方用心挑了，心里就暖暖的", value: "F", weight: 1 },
    { label: "D", text: "哪怕一束野花，只要用心就是最好的礼物", value: "F", weight: 3 }
  ]},
  { text: "作为领导，你的风格更接近：", dim: "TF", options: [
    { label: "A", text: "结果导向，对事不对人，公平但有距离", value: "T", weight: 3 },
    { label: "B", text: "高标准严要求，但也重视团队能力建设", value: "T", weight: 1 },
    { label: "C", text: "人性化管理，关心每个人的发展和状态", value: "F", weight: 1 },
    { label: "D", text: "以团队凝聚力和归属感为核心来驱动", value: "F", weight: 3 }
  ]},

  // ===== J/P 维度 (8题，每题 A/B→J  C/D→P) =====
  { text: "面对截止日期，你通常怎么做？", dim: "JP", options: [
    { label: "A", text: "提前三周做规划表，每天按进度执行", value: "J", weight: 3 },
    { label: "B", text: "大致计划一下，按时推进不做太细致", value: "J", weight: 1 },
    { label: "C", text: "前期随性，最后几天集中火力冲刺", value: "P", weight: 1 },
    { label: "D", text: "靠DDL是第一生产力，压力越大效率越高", value: "P", weight: 3 }
  ]},
  { text: "工作日的早晨，你倾向哪种方式开始？", dim: "JP", options: [
    { label: "A", text: "按计划表精确执行，每个小时都有安排", value: "J", weight: 3 },
    { label: "B", text: "列出今天要做的几件事，有个大致规划", value: "J", weight: 1 },
    { label: "C", text: "看心情决定，没有固定的每日计划", value: "P", weight: 1 },
    { label: "D", text: "完全随机，今天想干啥干啥，不受计划约束", value: "P", weight: 3 }
  ]},
  { text: "你的桌面或工作区通常是：", dim: "JP", options: [
    { label: "A", text: "井井有条，每一件东西都有固定位置", value: "J", weight: 3 },
    { label: "B", text: "基本整洁，偶尔会乱但会定期整理", value: "J", weight: 1 },
    { label: "C", text: "随性摆放，乱中有序，我找得到就行", value: "P", weight: 1 },
    { label: "D", text: "乱成一团但很自在，整理反而找不到东西", value: "P", weight: 3 }
  ]},
  { text: "做决定时，你更偏向：", dim: "JP", options: [
    { label: "A", text: "信息够了就立刻拍板，不喜欢悬着", value: "J", weight: 3 },
    { label: "B", text: "稍微多考虑一下，但不喜欢拖太久", value: "J", weight: 1 },
    { label: "C", text: "多留几个选项，走走看看再做最终判断", value: "P", weight: 1 },
    { label: "D", text: "能拖就拖，说不定下一秒就有更好的选择", value: "P", weight: 3 }
  ]},
  { text: "面对变化，你的态度是：", dim: "JP", options: [
    { label: "A", text: "变化让人焦虑，稳定和可预期才安心", value: "J", weight: 3 },
    { label: "B", text: "可以接受小幅变化，但不要太频繁", value: "J", weight: 1 },
    { label: "C", text: "有变化挺好的，给生活加点料", value: "P", weight: 1 },
    { label: "D", text: "拥抱变化！一成不变才是真的折磨", value: "P", weight: 3 }
  ]},
  { text: "朋友突然约你今晚出去玩，你的反应：", dim: "JP", options: [
    { label: "A", text: "啊不行，今晚已经有安排了呢", value: "J", weight: 3 },
    { label: "B", text: "让我看看日程……好的今晚没什么要紧事", value: "J", weight: 1 },
    { label: "C", text: "哎呀行啊，反正也没啥特别计划", value: "P", weight: 1 },
    { label: "D", text: "走起！说走就走最开心了", value: "P", weight: 3 }
  ]},
  { text: "购物时，你的风格更像：", dim: "JP", options: [
    { label: "A", text: "提前列好购物清单，直奔货架拿完就走", value: "J", weight: 3 },
    { label: "B", text: "心里大概有数要买什么，顺便逛逛", value: "J", weight: 1 },
    { label: "C", text: "逛逛看看，说不定会发现意外惊喜", value: "P", weight: 1 },
    { label: "D", text: "进去随便逛，看到喜欢就买，从不定计划", value: "P", weight: 3 }
  ]},
  { text: "哪种状态让你更满足？", dim: "JP", options: [
    { label: "A", text: "所有事按计划完成，list全部打勾的那一刻", value: "J", weight: 3 },
    { label: "B", text: "事情基本按预期推进，没出什么大岔子", value: "J", weight: 1 },
    { label: "C", text: "今天过得自由充实，虽然不是按计划来的", value: "P", weight: 1 },
    { label: "D", text: "不被任何框框限制，自由自在最快乐", value: "P", weight: 3 }
  ]},
];

// ========== 16 种人格详细数据 ==========
const typeData = {
  INTJ: {
    role: "建筑师",
    overview: "富有想象力的战略家，喜欢把一切规划妥当再行动。你看重独立思考，习惯用逻辑和理性推动自己走向长期目标。对知识有强烈渴望，对自己和他人都有很高标准。",
    strengths: ["战略思维，擅长长远规划", "独立自主，不依赖他人意见", "对复杂问题能一针见血", "极高的执行力与自律能力"],
    growth: ["容易给人冷漠傲慢的印象", "对不如自己的人缺乏耐心", "情感表达偏弱，显得疏离", "偶尔过度追求完美而拖延"],
    careers: "科学家、工程师、律师、战略顾问、大学教授、软件架构师"
  },
  INTP: {
    role: "逻辑学家",
    overview: "拥有无穷好奇心的抽象思考者，喜欢拆解复杂系统和理论。你享受独处时的深度思考，对事物运作的「为什么」比「怎么做」更感兴趣。思维灵活开放，不轻易下结论。",
    strengths: ["逻辑分析能力极强", "思想开放，能容纳不同观点", "擅长发现系统中的漏洞", "学习速度快，能快速掌握新领域"],
    growth: ["容易忽略现实世界的琐碎事务", "社交场合可能显得心不在焉", "情感表达能力不足", "容易陷入无休止的分析瘫痪"],
    careers: "程序员、数学家、研究员、哲学家、数据分析师、游戏设计师"
  },
  ENTJ: {
    role: "指挥官",
    overview: "天生的领袖，果断、有远见且善于调动资源。你喜欢掌控局面、制定策略并带领团队实现雄心勃勃的目标。沟通直接高效，不怕做艰难决定。",
    strengths: ["卓越的领导力和组织能力", "果断坚定，敢于承担风险", "善于发现并发挥他人的优势", "强大的抗压能力和执行力"],
    growth: ["可能显得过于强势和咄咄逼人", "对感性表达缺乏耐心", "容易忽略他人的情感需求", "有时过于自信而忽视细节"],
    careers: "企业高管、创业者、管理顾问、投资银行家、军事指挥官、律师"
  },
  ENTP: {
    role: "辩论家",
    overview: "思维敏捷、机智善辩的创意者，享受智力上的交锋和新想法的碰撞。你不喜欢被规则束缚，总是在寻找更好的方法。是天生的创业者和点子王。",
    strengths: ["创意无限，擅长头脑风暴", "口才好，善于说服和辩论", "适应力强，快速应对变化", "对新鲜事物有天然的好奇心"],
    growth: ["容易三分钟热度，难以坚持", "有时为了辩论而辩论", "对重复性工作极度排斥", "可能显得不够靠谱、难以预测"],
    careers: "创业者、产品经理、律师、记者、市场策划、战略顾问"
  },
  INFJ: {
    role: "提倡者",
    overview: "安静而坚定，内心燃烧着让世界更美好的理想。你拥有惊人的洞察力和共情力，常常能看穿别人没说出口的话。不会轻易放弃自己的价值观。",
    strengths: ["深刻的洞察力和直觉", "真诚的同理心和关怀", "强大的坚持力和使命感", "擅长帮助他人发现潜能"],
    growth: ["容易过度付出导致耗竭", "对自己和他人都过高期待", "难以接受批评和冲突", "不擅长设立个人边界"],
    careers: "咨询师、作家、教育者、非营利组织负责人、人力资源、医疗健康"
  },
  INFP: {
    role: "调停者",
    overview: "内心世界丰富细腻的梦想家，忠于自己的价值观，不断追寻意义与美好。你温柔而坚定地相信善意能改变世界，拥有惊人的创造力和想象力。",
    strengths: ["极强的同理心和理解力", "丰富的想象力和创造力", "对价值观的坚定忠诚", "善于在混乱中找到和谐"],
    growth: ["容易过度理想化导致失望", "情绪波动大，易受外界影响", "做事效率受情绪影响明显", "面对现实问题有时逃避"],
    careers: "作家、设计师、艺术家、心理咨询师、社工、教育工作者"
  },
  ENFJ: {
    role: "主人公",
    overview: "富有魅力的天然领导者，善于发现他人的潜力并鼓励他们成长。你用真诚和热忱感染周围的每一个人，把帮助他人实现价值视为最大的使命。",
    strengths: ["卓越的人际交往和沟通能力", "善于激励他人发挥潜力", "强大的组织协调能力", "富有远见和理想主义精神"],
    growth: ["容易过度卷入他人的问题", "难以接受负面评价", "容易忽略自己的需求和感受", "有时做决定过于理想化"],
    careers: "教师、培训师、心理咨询师、人力资源总监、政治家、公关"
  },
  ENFP: {
    role: "竞选家",
    overview: "热情洋溢的自由灵魂，总是能看到生活美好的一面。你热爱新体验和深刻的人际联结，相信一切皆有可能。你的活力和创意能点亮任何一个房间。",
    strengths: ["极强的人际魅力和感染力", "创意无限，想法天马行空", "适应力强，不怕尝试新事物", "真诚地关心和鼓励他人"],
    growth: ["容易注意力分散，难以专注", "做事三分钟热度", "对批评和冲突特别敏感", "实际执行力偏弱"],
    careers: "记者、创业者、广告创意、演员、教育者、活动策划"
  },
  ISTJ: {
    role: "物流师",
    overview: "可靠务实的行动派，做事有条不紊、言出必行。你是团队中最值得信赖的基石，用数据和事实做决策、用执行力说话。传统和秩序对你来说非常重要。",
    strengths: ["极高的可靠性和责任感", "做事踏实细致，不易出错", "数据驱动，决策有理有据", "强大的组织和管理能力"],
    growth: ["可能显得固执，抗拒变化", "不太擅长表达情感", "对他人可能要求过高", "在需要灵活变通的场合吃力"],
    careers: "会计师、审计师、项目经理、军人、公务员、数据分析师"
  },
  ISFJ: {
    role: "守卫者",
    overview: "温暖低调的守护者，默默关心身边每一个人。你有惊人的记忆力（特别是关于人的细节），用行动而非言辞表达爱和忠诚。渴望和谐与安全的环境。",
    strengths: ["极高的忠诚度和可靠性", "对细节的敏锐观察力", "温暖的共情和关怀能力", "在幕后默默支持和付出"],
    growth: ["容易忽略自己的需求", "对变化和冲突感到不安", "不善于拒绝他人的请求", "可能因过度谦卑而失去机会"],
    careers: "护士、教师、行政管理人员、心理咨询师、社会工作者、客户服务"
  },
  ESTJ: {
    role: "总经理",
    overview: "出色的组织者和执行者，相信规则和秩序能让一切高效运转。你务实果断，善于把宏大构想落地为一步步可执行的具体计划。是天生的管理人才。",
    strengths: ["极强的执行力和组织能力", "务实理性，不空谈只干实事", "决策果断，雷厉风行", "对团队成员高标准且负责任"],
    growth: ["可能过于强势和直言不讳", "对创新和变化持谨慎态度", "有时忽略他人的情感需求", "容易把工作标准强加于人"],
    careers: "企业管理者、公务员、军官、法官、财务总监、运营总监"
  },
  ESFJ: {
    role: "领事",
    overview: "热情周到的社交灵魂，把维持和谐关系视为人生要义。你非常在意他人的感受，乐于提供实实在在的帮助，是朋友们心中最温暖的依靠。",
    strengths: ["高度的社交敏感和亲和力", "主动关心他人且乐于助人", "责任感强，做事有始有终", "善于营造和谐积极的氛围"],
    growth: ["可能过度寻求他人认可", "在冲突面前容易退缩", "过于关注他人而忽视自我", "对批评和否定非常敏感"],
    careers: "医生、教师、护士、行政管理、人力资源、销售、活动策划"
  },
  ISTP: {
    role: "鉴赏家",
    overview: "冷静客观的实干家，享受理解事物的运作原理并亲手解决问题。你喜欢自由灵活的生活方式，遇到危机时格外沉着冷静。是团队中最靠谱的应急专家。",
    strengths: ["极强的动手能力和实践技能", "冷静沉稳，危机中处变不惊", "逻辑清晰，数据分析能力强", "灵活适应，不拘泥于条条框框"],
    growth: ["可能显得冷淡疏离，不擅表达", "对长期规划缺乏兴趣", "容易无聊而半途而废", "在情感交流上略显笨拙"],
    careers: "工程师、技师、飞行员、法医、程序员、外科医生"
  },
  ISFP: {
    role: "探险家",
    overview: "温柔而富有艺术气质的灵魂，用感官体验世界的美好。你活在当下、珍惜每一刻，通过创造和体验来表达独特的自我。不喜欢冲突，用善意默默影响他人。",
    strengths: ["敏锐的审美和艺术感", "温柔友善，相处如沐春风", "善于发现生活中的小美好", "对价值观和个人空间极度忠诚"],
    growth: ["性格过于敏感，容易受伤", "不擅长长远规划和目标设定", "在竞争激烈的环境中不适", "有时过于内敛导致被忽视"],
    careers: "设计师、艺术家、摄影师、宠物医生、花艺师、心理咨询师"
  },
  ESTP: {
    role: "企业家",
    overview: "精力充沛的行动派，相信实践出真知。你活在当下、追求刺激和实际结果，是危机处理和谈判桌上的高手。你的快速反应和实用智慧无人能及。",
    strengths: ["超强的临场反应和应变能力", "务实果敢，敢于冒险", "善于说服和影响他人", "社交能力极强，人脉广泛"],
    growth: ["可能过于冒险而不计后果", "对理论和抽象思考缺乏耐心", "不善于长远规划和深度思考", "有时过于直接而伤到他人"],
    careers: "销售、创业者、急救人员、运动员、演员、市场营销"
  },
  ESFP: {
    role: "表演家",
    overview: "天生的舞台焦点，用热情和幽默感染身边每一个人。你享受生活中一切美好的感官体验，同时拥有务实的判断力。活在当下，让每一刻都精彩。",
    strengths: ["极强的感染力和社交能力", "乐观积极，善于调节氛围", "善于观察和适应不同环境", "务实又充满生活情趣"],
    growth: ["容易沉迷即时享乐而忽视责任", "对长期规划感到头疼", "在需要深度分析时感到吃力", "有时过于在意他人眼光"],
    careers: "演员、销售、旅游博主、活动策划、主持人、幼教、客户经理"
  },
};

// ========== 状态 ==========
let currentQ = 0;
// 加权得分：各极得分累加（A=+3, B=+1, C=+1, D=+3）
let scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

// ========== 页面切换 ==========
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// ========== 开始测试 ==========
function startTest() {
  currentQ = 0;
  scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  showScreen("test");
  renderQ();
}

// ========== 渲染题目 ==========
function renderQ() {
  const q = questions[currentQ];
  document.getElementById("questionText").textContent = q.text;
  document.getElementById("progressFill").style.width = ((currentQ / questions.length) * 100) + "%";
  document.getElementById("progressText").textContent = (currentQ + 1) + " / " + questions.length;

  const container = document.getElementById("optionsContainer");
  container.innerHTML = "";
  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "opt";
    btn.innerHTML = `<span class="opt-label">${opt.label}</span><span>${opt.text}</span>`;
    btn.addEventListener("click", () => selectOption(opt.value, opt.weight));
    container.appendChild(btn);
  });

  const card = document.querySelector(".q-card");
  card.style.animation = "none";
  card.offsetHeight;
  card.style.animation = "fadeIn 0.35s ease";
}

// ========== 选择答案（加权计分） ==========
function selectOption(value, weight) {
  scores[value] += weight;
  currentQ++;
  if (currentQ < questions.length) {
    renderQ();
  } else {
    showResult();
  }
}

// ========== 加权计算人格类型 ==========
// 每个维度 8 题 × 每题 max weight 3 = 每个极最多 24 分
// 百分比 = 该极得分 / 两极总得分 × 100%
// 平局（4 vs 4 原始票数相等时）倾向 I、N、F、P
function calcType() {
  const dims = [
    { a: "E", b: "I" },
    { a: "S", b: "N" },
    { a: "T", b: "F" },
    { a: "J", b: "P" },
  ];

  let type = "";
  const pcts = {};
  dims.forEach(d => {
    const pct = Math.round((scores[d.a] / (scores[d.a] + scores[d.b])) * 100);
    pcts[d.a] = pct;
    pcts[d.b] = 100 - pct;
    if (scores[d.a] > scores[d.b]) type += d.a;
    else if (scores[d.a] < scores[d.b]) type += d.b;
    else type += d.b; // 平局 → I, N, F, P
  });

  return { type, pcts };
}

// ========== 展示结果 ==========
function showResult() {
  const { type, pcts } = calcType();
  const data = typeData[type];

  document.getElementById("resultType").textContent = type;
  document.getElementById("resultRole").textContent = data.role;
  document.getElementById("resultDesc").textContent = data.overview;

  // 优势 & 成长
  document.getElementById("rStrengths").innerHTML =
    `<div class="trait-col strengths"><h4>优势</h4><ul>${data.strengths.map(s => `<li>${s}</li>`).join("")}</ul></div>`;
  document.getElementById("rGrowth").innerHTML =
    `<div class="trait-col growth"><h4>成长空间</h4><ul>${data.growth.map(g => `<li>${g}</li>`).join("")}</ul></div>`;

  // 职业方向
  document.getElementById("rCareers").textContent = data.careers;

  const bars = document.getElementById("resultBars");
  bars.innerHTML = "";
  const dimLabels = [
    { a: "E", b: "I", label: "外向 E / 内向 I" },
    { a: "S", b: "N", label: "实感 S / 直觉 N" },
    { a: "T", b: "F", label: "思维 T / 情感 F" },
    { a: "J", b: "P", label: "判断 J / 感知 P" },
  ];
  dimLabels.forEach(d => {
    const pct = pcts[d.a];
    const which = pct >= 50 ? d.a : d.b;
    bars.innerHTML += `
      <div class="bar-item">
        <div class="bar-label"><span>${d.label}</span><strong>${which} ${pct}%</strong></div>
        <div class="bar-track"><div class="bar-fill" style="width: ${pct}%"></div></div>
      </div>`;
  });

  showScreen("result");
}

// ========== 重新测试 ==========
function resetTest() {
  currentQ = 0;
  scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  showScreen("home");
}
