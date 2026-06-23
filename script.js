// ========== MBTI 数据 ==========

const questions = [
  // E/I 维度 (Extraversion / Introversion) — 4题
  { text: "周末你更倾向于怎样度过？", dimension: "EI", options: [
    { text: "约朋友聚会、参加活动，人越多越开心", value: "E" },
    { text: "一个人看书、追剧，享受独处时光", value: "I" }
  ]},
  { text: "在新环境里，你通常会：", dimension: "EI", options: [
    { text: "主动和陌生人搭话，快速融入", value: "E" },
    { text: "先观察一阵，等别人来接近自己", value: "I" }
  ]},
  { text: "哪种描述更接近你？", dimension: "EI", options: [
    { text: "说话时先说出来再整理思路，喜欢头脑风暴", value: "E" },
    { text: "想清楚了再开口，内心先打好腹稿", value: "I" }
  ]},
  { text: "累了一天，你如何恢复精力？", dimension: "EI", options: [
    { text: "找朋友聊聊、出去走走，和人在一起", value: "E" },
    { text: "关掉手机、瘫在沙发上，一个人充电", value: "I" }
  ]},

  // S/N 维度 (Sensing / Intuition) — 4题
  { text: "解决一个新问题时，你更依赖什么？", dimension: "SN", options: [
    { text: "过去的经验和已有的可靠方法", value: "S" },
    { text: "直觉和灵感，尝试全新的思路", value: "N" }
  ]},
  { text: "阅读一本书，你更关注？", dimension: "SN", options: [
    { text: "细节、剧情、人物具体的言行", value: "S" },
    { text: "隐喻、主题、背后的深层含义", value: "N" }
  ]},
  { text: "哪种工作方式让你更舒适？", dimension: "SN", options: [
    { text: "步骤清晰、有章可循、注重实际操作", value: "S" },
    { text: "自由发挥、探索可能性、构思大方向", value: "N" }
  ]},
  { text: "你看待世界更像：", dimension: "SN", options: [
    { text: "关注眼前具体实在的事物", value: "S" },
    { text: "喜欢联想未来和抽象概念", value: "N" }
  ]},

  // T/F 维度 (Thinking / Feeling) — 4题
  { text: "朋友向你倾诉烦恼，你的第一反应是：", dimension: "TF", options: [
    { text: "帮 TA 分析问题，给出解决建议", value: "T" },
    { text: "先共情安慰，让 TA 感到被理解", value: "F" }
  ]},
  { text: "做决定时，你更看重：", dimension: "TF", options: [
    { text: "逻辑、公平、客观事实", value: "T" },
    { text: "人情、和谐、对身边人的影响", value: "F" }
  ]},
  { text: "在团队讨论中，你倾向于：", dimension: "TF", options: [
    { text: "指出方案的漏洞，坚持理性分析", value: "T" },
    { text: "照顾大家的感受，避免冲突和尴尬", value: "F" }
  ]},
  { text: "以下哪句更符合你？", dimension: "TF", options: [
    { text: "真相比和气更重要", value: "T" },
    { text: "关系比对错更重要", value: "F" }
  ]},

  // J/P 维度 (Judging / Perceiving) — 4题
  { text: "面对截止日期，你通常：", dimension: "JP", options: [
    { text: "提前做好计划，分阶段逐步完成", value: "J" },
    { text: "截止前冲刺，享受压力带来的动力", value: "P" }
  ]},
  { text: "出门旅行，你的风格是：", dimension: "JP", options: [
    { text: "提前做好攻略，路线时间都安排好", value: "J" },
    { text: "定个大方向就行，随走随玩随变化", value: "P" }
  ]},
  { text: "日常生活中，你更喜欢：", dimension: "JP", options: [
    { text: "事情结束后划掉清单，享受完成感", value: "J" },
    { text: "保持开放，随时欢迎新的选项和变化", value: "P" }
  ]},
  { text: "哪种评价更像你？", dimension: "JP", options: [
    { text: "有规划、有条理、喜欢确定性", value: "J" },
    { text: "随性、灵活、享受不确定性", value: "P" }
  ]},
];

const results = {
  INTJ: { role: "建筑师", desc: "富有想象力和战略思维，喜欢独立思考和长期规划。你善于看到全局，习惯用逻辑和理性推动自己走向目标。对知识有强烈渴望，对自己和他人要求都很高。" },
  INTP: { role: "逻辑学家", desc: "拥有无穷的好奇心和创造力，喜欢探索抽象理论和复杂系统。你享受独处时的深度思考，对事物运作的「为什么」比「怎么做」更感兴趣。" },
  ENTJ: { role: "指挥官", desc: "天生领导者，果断、有远见且善于组织。你喜欢掌控局面、制定策略并带领团队实现雄心勃勃的目标，沟通直接高效。" },
  ENTP: { role: "辩论家", desc: "思维敏捷、机智能言，享受智力上的交锋和新点子的碰撞。你不喜欢被规则束缚，总是寻找更好的方法，是天生的创业者。" },
  INFJ: { role: "提倡者", desc: "安静而神秘，内心却燃烧着帮助世界的热情。你拥有极强的共情力和洞察力，善于理解他人未说出口的话，是理想主义的行动者。" },
  INFP: { role: "调停者", desc: "内心世界丰富细腻，充满诗意和理想。你忠于自己的价值观，总是追求意义与美好，用温柔的方式影响世界，极具创造力。" },
  ENFJ: { role: "主人公", desc: "富有魅力和感染力，是天生的教育者和引导者。你善于发现他人的潜力并鼓励他们成长，把帮助别人视为最大的使命感。" },
  ENFP: { role: "竞选家", desc: "热情、自由、充满可能性。你是社交场上最有活力的存在，热爱新体验和深刻的人际连接，总能看见事物美好的一面。" },
  ISTJ: { role: "物流师", desc: "可靠、务实、注重事实和细节。你言出必行，做事井井有条，是团队中最值得信赖的支柱。传统和秩序对你而言非常重要。" },
  ISFJ: { role: "守卫者", desc: "温暖低调的守护者，默默关心身边每一个人。你有惊人的记忆力（尤其是关于人的细节），用行动而非言语表达爱和忠诚。" },
  ESTJ: { role: "总经理", desc: "出色的组织者和执行者，你相信规则和秩序能让一切高效运转。你务实果断，善于把想法落地为可执行的具体计划。" },
  ESFJ: { role: "领事", desc: "热情周到，是社交圈中的贴心人物。你非常在意他人的感受和群体的和谐，乐于提供实际的帮助，是朋友们最温暖的港湾。" },
  ISTP: { role: "鉴赏家", desc: "冷静、务实、动手能力强，你享受理解事物如何运作并亲手解决问题。你喜欢灵活自由的生活，遇到危机时尤其沉着冷静。" },
  ISFP: { role: "探险家", desc: "温和、敏感且有艺术气质，你用感官体验世界之美，活在当下。你不喜欢冲突，通过创造和体验来表达独特的自我。" },
  ESTP: { role: "企业家", desc: "精力充沛、机智且善于临场发挥。你活在当下，追求刺激和实际结果，是天生的谈判高手和危机处理专家。" },
  ESFP: { role: "表演家", desc: "天生的表演者，热爱成为众人焦点。你用热情和幽默感染身边每一个人，享受生活中一切美好的感官体验——美食、音乐、欢笑。" },
};

// ========== 状态 ==========
let currentQuestion = 0;
let scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

// ========== 页面切换 ==========
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// ========== 开始测试 ==========
function startTest() {
  currentQuestion = 0;
  scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  showScreen("test");
  renderQuestion();
}

// ========== 渲染题目 ==========
function renderQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("questionText").textContent = q.text;

  const progress = ((currentQuestion) / questions.length) * 100;
  document.getElementById("progressFill").style.width = progress + "%";
  document.getElementById("progressText").textContent = (currentQuestion + 1) + " / " + questions.length;

  const container = document.getElementById("optionsContainer");
  container.innerHTML = "";

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "opt";
    btn.textContent = opt.text;
    btn.addEventListener("click", () => selectOption(opt.value));
    container.appendChild(btn);
  });

  // re-trigger animation
  const card = document.querySelector(".q-card");
  card.style.animation = "none";
  card.offsetHeight; // force reflow
  card.style.animation = "fadeIn 0.35s ease";
}

// ========== 选择答案 ==========
function selectOption(value) {
  scores[value]++;

  currentQuestion++;
  if (currentQuestion < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

// ========== 计算结果 ==========
function showResult() {
  const type =
    (scores.E > scores.I ? "E" : "I") +
    (scores.S > scores.N ? "S" : "N") +
    (scores.T > scores.F ? "T" : "F") +
    (scores.J > scores.P ? "J" : "P");

  // 平局时各有50%
  const getPct = (a, b) => Math.round((a / Math.max(a + b, 1)) * 100);

  const dimensions = [
    { left: "E", right: "I", label: "外向 E / 内向 I" },
    { left: "S", right: "N", label: "实感 S / 直觉 N" },
    { left: "T", right: "F", label: "思维 T / 情感 F" },
    { left: "J", right: "P", label: "判断 J / 感知 P" },
  ];

  document.getElementById("resultType").textContent = type;
  document.getElementById("resultRole").textContent = results[type].role;
  document.getElementById("resultDesc").textContent = results[type].desc;

  const barsDiv = document.getElementById("resultBars");
  barsDiv.innerHTML = "";
  dimensions.forEach(dim => {
    const pct = getPct(scores[dim.left], scores[dim.right]);
    const pctRight = 100 - pct;
    const which = type.includes(dim.left) ? dim.left : dim.right;
    barsDiv.innerHTML += `
      <div class="bar-item">
        <div class="bar-label">
          <span>${dim.label}</span>
          <strong>${which}</strong>
        </div>
        <div class="bar-track">
          <div class="bar-fill" style="width: ${pct}%"></div>
        </div>
      </div>`;
  });

  showScreen("result");
}

// ========== 重新测试 ==========
function resetTest() {
  currentQuestion = 0;
  scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  showScreen("home");
}
