// ========== MBTI 32 题测试 ==========
// 评分算法：每个维度 8 题，每题选一个方向 +1 分
// 百分比 = 该方向得分 / 该维度总题数 × 100%
// 平局打破规则：倾向于 I, N, F, P（社会中相对少数，需更大偏好强度）

const questions = [
  // ===== E/I 维度 (8题) =====
  { text: "周末你更倾向于怎样度过？", dim: "EI", options: [
    { text: "约朋友聚会、参加活动，人越多越开心", value: "E" },
    { text: "一个人看书、追剧，享受独处时光", value: "I" }
  ]},
  { text: "在一个大型社交场合，你通常会：", dim: "EI", options: [
    { text: "主动和陌生人多聊几句，拓展人脉", value: "E" },
    { text: "先观察，只和熟悉的人交流", value: "I" }
  ]},
  { text: "哪种描述更符合你的沟通方式？", dim: "EI", options: [
    { text: "边想边说，在表达中理清思路", value: "E" },
    { text: "想好了再说，心里先打一遍腹稿", value: "I" }
  ]},
  { text: "累了一天，如何恢复精力？", dim: "EI", options: [
    { text: "找朋友聚聚、出去走走，和人互动", value: "E" },
    { text: "关掉手机、自己安静待着", value: "I" }
  ]},
  { text: "小组讨论时，你更倾向于：", dim: "EI", options: [
    { text: "积极发言，带动讨论氛围", value: "E" },
    { text: "仔细听，偶尔在关键点发言", value: "I" }
  ]},
  { text: "遇到困难时，你的第一反应是：", dim: "EI", options: [
    { text: "找朋友倾诉，听听别人的建议", value: "E" },
    { text: "自己先消化，理清思路再行动", value: "I" }
  ]},
  { text: "对于结识新朋友，你的态度是：", dim: "EI", options: [
    { text: "很兴奋，朋友圈越大越好", value: "E" },
    { text: "随缘，几个深交的朋友就够了", value: "I" }
  ]},
  { text: "工作时，你更喜欢哪种环境？", dim: "EI", options: [
    { text: "开放式工位，随时能和人交流", value: "E" },
    { text: "独立空间，能专注思考不被打扰", value: "I" }
  ]},

  // ===== S/N 维度 (8题) =====
  { text: "解决新问题时，你更依赖什么？", dim: "SN", options: [
    { text: "过往经验和已验证的可靠方法", value: "S" },
    { text: "直觉和灵感，尝试全新思路", value: "N" }
  ]},
  { text: "阅读一本书，你最关注什么？", dim: "SN", options: [
    { text: "情节、细节和人物的具体言行", value: "S" },
    { text: "隐喻、主题和背后的深层含义", value: "N" }
  ]},
  { text: "哪种工作方式让你更舒适？", dim: "SN", options: [
    { text: "步骤清晰、有章可循、注重实操", value: "S" },
    { text: "自由发挥、探索可能性、构思蓝图", value: "N" }
  ]},
  { text: "描述一个苹果，你会先说：", dim: "SN", options: [
    { text: "红色、圆形、光滑的表皮", value: "S" },
    { text: "健康、象征知识、让人想到牛顿", value: "N" }
  ]},
  { text: "旅行前做攻略，你的风格是：", dim: "SN", options: [
    { text: "查具体攻略，记下地址和交通方式", value: "S" },
    { text: "了解当地文化背景，大概知道就行", value: "N" }
  ]},
  { text: "学习中，你更擅长：", dim: "SN", options: [
    { text: "记忆事实、数据和具体例子", value: "S" },
    { text: "理解概念、模型和理论框架", value: "N" }
  ]},
  { text: "朋友分享一个创业点子，你首先：", dim: "SN", options: [
    { text: "想怎么落地执行、需要哪些资源", value: "S" },
    { text: "想这个模式的潜力和未来前景", value: "N" }
  ]},
  { text: "你更信任哪种信息？", dim: "SN", options: [
    { text: "亲眼所见、亲身经历的事实", value: "S" },
    { text: "逻辑推理和直觉判断", value: "N" }
  ]},

  // ===== T/F 维度 (8题) =====
  { text: "朋友向你倾诉烦恼，你的第一反应是：", dim: "TF", options: [
    { text: "帮 TA 分析问题，给出解决建议", value: "T" },
    { text: "先共情安慰，让 TA 感到被理解", value: "F" }
  ]},
  { text: "做重要决定时，你更看重：", dim: "TF", options: [
    { text: "逻辑、公平和客观事实", value: "T" },
    { text: "人情、和谐和对身边人的影响", value: "F" }
  ]},
  { text: "团队讨论有分歧时，你倾向于：", dim: "TF", options: [
    { text: "分析方案利弊，坚持最优解", value: "T" },
    { text: "照顾大家感受，寻求共识", value: "F" }
  ]},
  { text: "以下哪句更符合你？", dim: "TF", options: [
    { text: "真相 > 和气", value: "T" },
    { text: "关系 > 对错", value: "F" }
  ]},
  { text: "评价一部电影，你更强调：", dim: "TF", options: [
    { text: "剧情逻辑是否严密、有没有漏洞", value: "T" },
    { text: "情感是否动人、人物有没有共鸣", value: "F" }
  ]},
  { text: "同事犯了错误影响进度，你会：", dim: "TF", options: [
    { text: "直接指出问题，讨论怎么改进", value: "T" },
    { text: "先考虑对方的感受，委婉提出", value: "F" }
  ]},
  { text: "收到一份生日礼物，你最在意：", dim: "TF", options: [
    { text: "实用不实用、性价比如何", value: "T" },
    { text: "对方有没有用心、有没有心意", value: "F" }
  ]},
  { text: "你是哪种类型的领导？", dim: "TF", options: [
    { text: "以结果为导向，对事不对人", value: "T" },
    { text: "以人为本，关心团队成员成长", value: "F" }
  ]},

  // ===== J/P 维度 (8题) =====
  { text: "面对截止日期，你通常：", dim: "JP", options: [
    { text: "提前做计划，分阶段逐步完成", value: "J" },
    { text: "截止前冲刺，压力激发创造力", value: "P" }
  ]},
  { text: "工作日早晨，你更喜欢：", dim: "JP", options: [
    { text: "按计划行事，一天安排得明明白白", value: "J" },
    { text: "看心情决定今天做什么", value: "P" }
  ]},
  { text: "桌面或文件的整理情况是：", dim: "JP", options: [
    { text: "井井有条，每样东西都有位置", value: "J" },
    { text: "随性摆放，但我知道东西在哪", value: "P" }
  ]},
  { text: "做决定时，你更偏向：", dim: "JP", options: [
    { text: "尽快敲定，不想一直悬着", value: "J" },
    { text: "保持开放，说不定有更好的选择", value: "P" }
  ]},
  { text: "你对变化的感受是：", dim: "JP", options: [
    { text: "变化让人不安，喜欢稳定可预期", value: "J" },
    { text: "变化带来新鲜感，一成不变才无聊", value: "P" }
  ]},
  { text: "朋友临时叫你出去玩，你：", dim: "JP", options: [
    { text: "今天没安排这事啊，有点纠结", value: "J" },
    { text: "太棒了说走就走，计划随时可调整", value: "P" }
  ]},
  { text: "购物时，你更像：", dim: "JP", options: [
    { text: "列好清单直奔目标，买完就走", value: "J" },
    { text: "逛逛看看，说不定发现意外惊喜", value: "P" }
  ]},
  { text: "哪种状态更让你满意？", dim: "JP", options: [
    { text: "任务清空那一刻的完成感和秩序感", value: "J" },
    { text: "随时有新的可能、不被约束的自由感", value: "P" }
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
    btn.textContent = opt.text;
    btn.addEventListener("click", () => selectOption(opt.value));
    container.appendChild(btn);
  });

  const card = document.querySelector(".q-card");
  card.style.animation = "none";
  card.offsetHeight;
  card.style.animation = "fadeIn 0.35s ease";
}

// ========== 选择答案 ==========
function selectOption(value) {
  scores[value]++;
  currentQ++;
  if (currentQ < questions.length) {
    renderQ();
  } else {
    showResult();
  }
}

// ========== 判断人格类型 ==========
// 评分算法：每个维度 8 题，每题为某个方向加 1 分
// 百分比 = 该方向得分 / 该维度总题数 × 100%
// 平局处理：倾向 I, N, F, P（社会中相对少数）
function calcType() {
  const dims = [
    { a: "E", b: "I", total: 8 },
    { a: "S", b: "N", total: 8 },
    { a: "T", b: "F", total: 8 },
    { a: "J", b: "P", total: 8 },
  ];

  let type = "";
  const pcts = {};
  dims.forEach(d => {
    const pct = Math.round((scores[d.a] / d.total) * 100);
    pcts[d.a] = pct;
    pcts[d.b] = 100 - pct;
    // 得分高的方向胜出，平局倾向 I/N/F/P
    if (scores[d.a] > scores[d.b]) type += d.a;
    else if (scores[d.a] < scores[d.b]) type += d.b;
    else type += d.b; // 平局 -> I, N, F, P
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

  // 评分详情
  document.getElementById("scoringHint").textContent =
    "(每个维度 8 题，百分比 = 该方向得分 / 8 × 100%，平局倾向少数方向 I/N/F/P)";

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
