export type PKMType = "architect" | "gardener" | "student" | "librarian";
export type OutputType = "inner" | "sharer" | "practical" | "hybrid";
export type BottleneckType = "start" | "sustain" | "organize" | "apply";

export interface Choice {
  text: string;
  type?: PKMType;
  outputType?: OutputType;
  bottleneck?: BottleneckType;
  score?: number;
}

export interface Question {
  id: number;
  category: "style" | "maturity" | "ai" | "output" | "bottleneck";
  question: string;
  choices: Choice[];
}

export const questions: Question[] = [
  // ── 기록 성향 (Q1-Q7) ──
  {
    id: 1,
    category: "style",
    question: "새로운 노트 앱을 깔았다.\n가장 먼저 하는 행동은?",
    choices: [
      { text: "폴더/카테고리 구조부터 만든다", type: "architect" },
      { text: "아무 페이지나 열고 떠오르는 생각을 적는다", type: "gardener" },
      { text: "사용법 튜토리얼을 먼저 본다", type: "student" },
      { text: "기존 앱에 있던 자료를 옮기기 시작한다", type: "librarian" },
    ],
  },
  {
    id: 2,
    category: "style",
    question: "유튜브에서 좋은 영상을 발견했다.\n당신의 반응은?",
    choices: [
      { text: "주제별 재생목록에 분류한다", type: "architect" },
      { text: "인상 깊었던 한 문장을 메모한다", type: "gardener" },
      { text: "영상 내용을 요약 정리한다", type: "student" },
      { text: "\"나중에 보기\"에 저장한다", type: "librarian" },
    ],
  },
  {
    id: 3,
    category: "style",
    question: "메모가 100개 쌓였다.\n가장 먼저 드는 생각은?",
    choices: [
      { text: "태그를 다시 정리해야겠다", type: "architect" },
      { text: "어떤 메모끼리 연결될까?", type: "gardener" },
      { text: "다시 읽으면서 핵심만 추려야지", type: "student" },
      { text: "잘 모아뒀으니 필요할 때 검색하면 돼", type: "librarian" },
    ],
  },
  {
    id: 4,
    category: "style",
    question: "친구가 \"너 그 자료 어디서 봤어?\"라고 물었다.\n당신은?",
    choices: [
      { text: "정확한 폴더 경로를 알려준다", type: "architect" },
      { text: "이것저것 연결하다 나온 건데… 어디더라", type: "gardener" },
      { text: "직접 정리한 요약 노트를 공유한다", type: "student" },
      { text: "즐겨찾기에서 바로 꺼내준다", type: "librarian" },
    ],
  },
  {
    id: 5,
    category: "style",
    question: "당신의 메모장을 남이 본다면\n어떤 반응일까?",
    choices: [
      { text: "\"와, 체계적이다\"", type: "architect" },
      { text: "\"이게 다 연결이 된다고?\"", type: "gardener" },
      { text: "\"독서 노트가 진짜 많다\"", type: "student" },
      { text: "\"링크 모음집이네\"", type: "librarian" },
    ],
  },
  {
    id: 6,
    category: "style",
    question: "프로젝트를 시작할 때\n당신의 스타일은?",
    choices: [
      { text: "전체 구조와 단계를 먼저 설계한다", type: "architect" },
      { text: "관련 아이디어를 자유롭게 브레인덤프한다", type: "gardener" },
      { text: "비슷한 사례와 레퍼런스를 먼저 공부한다", type: "student" },
      { text: "쓸 만한 자료와 템플릿을 먼저 모은다", type: "librarian" },
    ],
  },
  {
    id: 7,
    category: "style",
    question: "가장 공감 가는 문장은?",
    choices: [
      { text: "체계가 없으면 불안하다", type: "architect" },
      { text: "연결되는 순간이 가장 짜릿하다", type: "gardener" },
      { text: "이해하지 못하면 넘어갈 수 없다", type: "student" },
      { text: "좋은 건 일단 저장하고 본다", type: "librarian" },
    ],
  },

  // ── PKM 성숙도 (Q8-Q11) ──
  {
    id: 8,
    category: "maturity",
    question: "현재 메모/기록 습관에\n가장 가까운 것은?",
    choices: [
      { text: "거의 적지 않는다. 머릿속으로 해결한다", score: 0 },
      { text: "가끔 적지만 어디에 적었는지 잊어버린다", score: 1 },
      { text: "꾸준히 적고, 나만의 장소가 있다", score: 2 },
      { text: "적은 걸 정기적으로 다시 보고 활용한다", score: 3 },
    ],
  },
  {
    id: 9,
    category: "maturity",
    question: "한 달 전에 적은 메모를\n다시 찾아본 적이 있는가?",
    choices: [
      { text: "메모를 안 적어서 해당 없음", score: 0 },
      { text: "적긴 했는데 찾을 수 없었다", score: 1 },
      { text: "찾아서 읽어봤다", score: 2 },
      { text: "찾아서 새로운 작업에 활용했다", score: 3 },
    ],
  },
  {
    id: 10,
    category: "maturity",
    question: "기록을 위한 도구나 시스템이\n있는가?",
    choices: [
      { text: "없다. 카톡 나에게 보내기 정도?", score: 0 },
      { text: "앱은 있지만 체계 없이 쓰고 있다", score: 1 },
      { text: "나름의 분류 체계를 만들어 쓰고 있다", score: 2 },
      { text: "도구 + 루틴 + 정리 주기까지 정착됐다", score: 3 },
    ],
  },
  {
    id: 11,
    category: "maturity",
    question: "기록한 내용이 실제 결과물로\n이어진 적이 있는가?",
    choices: [
      { text: "없다", score: 0 },
      { text: "가끔, 우연히", score: 1 },
      { text: "종종, 의도적으로", score: 2 },
      { text: "거의 항상. 기록이 곧 초안이 된다", score: 3 },
    ],
  },

  // ── AI 활용도 (Q12-Q15) ──
  {
    id: 12,
    category: "ai",
    question: "AI 도구(ChatGPT, Claude 등)를\n얼마나 자주 쓰는가?",
    choices: [
      { text: "안 쓴다 / 잘 모른다", score: 0 },
      { text: "가끔 궁금한 것을 물어본다", score: 1 },
      { text: "업무나 학습에 주 3회 이상 활용한다", score: 2 },
      { text: "매일 쓴다. 없으면 불편하다", score: 3 },
    ],
  },
  {
    id: 13,
    category: "ai",
    question: "AI에게 질문할 때 맥락을\n함께 주는 편인가?",
    choices: [
      { text: "AI를 안 써서 해당 없음", score: 0 },
      { text: "그냥 단순하게 질문한다", score: 1 },
      { text: "가끔 배경 설명을 덧붙인다", score: 2 },
      { text: "항상 역할, 맥락, 출력 형식까지 지정한다", score: 3 },
    ],
  },
  {
    id: 14,
    category: "ai",
    question: "AI의 결과물을\n어떻게 처리하는가?",
    choices: [
      { text: "AI를 안 써서 해당 없음", score: 0 },
      { text: "그대로 복사해서 쓴다", score: 1 },
      { text: "수정/보완해서 내 것으로 만든다", score: 2 },
      { text: "내 기록 시스템에 저장하고 연결한다", score: 3 },
    ],
  },
  {
    id: 15,
    category: "ai",
    question: "AI와 자신의 기록을\n연결해서 써본 적이 있는가?",
    choices: [
      { text: "생각해본 적 없다", score: 0 },
      { text: "해보고 싶지만 방법을 모른다", score: 1 },
      { text: "가끔 메모를 복사해서 AI에게 넣는다", score: 2 },
      { text: "자동화하거나 시스템으로 연결해뒀다", score: 3 },
    ],
  },

  // ── 아웃풋 성향 (Q16-Q18) ──
  {
    id: 16,
    category: "output",
    question: "기록한 것을\n주로 어디에 활용하는가?",
    choices: [
      { text: "활용하지 않는다. 적는 것 자체가 목적", outputType: "inner" },
      { text: "블로그, SNS, 뉴스레터 등 콘텐츠로 발행", outputType: "sharer" },
      { text: "업무 보고서, 프로젝트 기획 등 실무에 활용", outputType: "practical" },
      { text: "상황에 따라 다르다", outputType: "hybrid" },
    ],
  },
  {
    id: 17,
    category: "output",
    question: "\"기록의 가치\"라고 하면\n가장 먼저 떠오르는 것은?",
    choices: [
      { text: "생각을 정리하고 마음이 편해지는 것", outputType: "inner" },
      { text: "다른 사람에게 도움이 되는 콘텐츠가 되는 것", outputType: "sharer" },
      { text: "더 나은 의사결정과 실행이 가능해지는 것", outputType: "practical" },
      { text: "위 모두 해당한다", outputType: "hybrid" },
    ],
  },
  {
    id: 18,
    category: "output",
    question: "이상적인 기록 시스템을 갖추면\n가장 하고 싶은 것은?",
    choices: [
      { text: "매일 짧은 회고/일기를 쓰는 것", outputType: "inner" },
      { text: "일주일에 한 편씩 글을 발행하는 것", outputType: "sharer" },
      { text: "프로젝트마다 재사용 가능한 자료를 만드는 것", outputType: "practical" },
      { text: "전부 다 하고 싶다", outputType: "hybrid" },
    ],
  },

  // ── 기록 병목 (Q19-Q20) ──
  {
    id: 19,
    category: "bottleneck",
    question: "기록에서 가장 어렵다고\n느끼는 단계는?",
    choices: [
      { text: "뭘 적어야 할지 모르겠다", bottleneck: "start" },
      { text: "시작은 하지만 꾸준히 못 한다", bottleneck: "sustain" },
      { text: "쌓이기만 하고 정리를 못 하겠다", bottleneck: "organize" },
      { text: "정리는 하는데 써먹지를 못 하겠다", bottleneck: "apply" },
    ],
  },
  {
    id: 20,
    category: "bottleneck",
    question: "기록을 더 잘하기 위해\n가장 필요한 것은?",
    choices: [
      { text: "\"뭘 적어야 하는지\" 알려주는 가이드", bottleneck: "start" },
      { text: "매일 자동으로 알림을 주는 루틴", bottleneck: "sustain" },
      { text: "메모를 분류하고 연결하는 방법", bottleneck: "organize" },
      { text: "기록을 아웃풋으로 전환하는 프로세스", bottleneck: "apply" },
    ],
  },
];

// ── 유형 결과 데이터 ──

export interface TypeResult {
  type: PKMType;
  emoji: string;
  name: string;
  nickname: string;
  description: string;
  strength: string;
  weakness: string;
  growth: string;
  tools: string;
  quote: string;
  color: string;
}

export const typeResults: Record<PKMType, TypeResult> = {
  architect: {
    type: "architect",
    emoji: "🏗️",
    name: "건축가",
    nickname: "설계도 먼저 그리는 사람",
    description:
      "폴더 구조부터 짜고 시작하는 체계파. 시스템이 갖춰져야 안심이 되는 당신은, 정보를 논리적으로 분류하고 빠르게 찾을 수 있는 환경을 만드는 데 탁월합니다.",
    strength: "체계적이고 검색이 빠르다. 누가 봐도 정리된 시스템.",
    weakness: "구조 만드느라 정작 메모를 안 할 때가 있다.",
    growth: "구조는 70%만 잡고, 나머지는 쓰면서 만들어가기.",
    tools: "Notion, Capacities",
    quote: "완벽한 시스템보다 쓰이는 시스템이 진짜입니다.",
    color: "#3b82f6",
  },
  gardener: {
    type: "gardener",
    emoji: "🌱",
    name: "정원사",
    nickname: "씨앗을 뿌리고 기다리는 사람",
    description:
      "메모를 뿌려놓고 연결이 자라길 기다리는 발견파. 예상 못한 곳에서 아이디어가 터지는 경험을 아는 당신은, 자유로운 사고와 창의적 연결에 강합니다.",
    strength: "예상 못한 연결에서 아이디어가 터진다.",
    weakness: "어디에 뭘 적었는지 본인도 모를 때가 있다.",
    growth: "주 1회 '정원 산책'(메모 리뷰) 루틴 만들기.",
    tools: "Obsidian, Logseq",
    quote: "씨앗은 뿌렸으니, 가끔 물도 줘야 자랍니다.",
    color: "#22c55e",
  },
  student: {
    type: "student",
    emoji: "📚",
    name: "학생",
    nickname: "이해해야 넘어가는 사람",
    description:
      "배운 걸 정리해야 직성이 풀리는 학습파. 깊이 있게 소화하고 자기 언어로 바꿔야 진짜 공부라고 믿는 당신은, 인풋의 질이 남다릅니다.",
    strength: "깊이 있는 지식 체화. 정리한 건 확실히 자기 것.",
    weakness: "인풋에 비해 아웃풋이 적을 수 있다.",
    growth: "'완벽한 요약' 대신 '3줄 핵심'으로 속도 올리기.",
    tools: "Notion, Readwise",
    quote: "정리하는 것도 중요하지만, 써먹는 것이 진짜 공부입니다.",
    color: "#a855f7",
  },
  librarian: {
    type: "librarian",
    emoji: "📖",
    name: "사서",
    nickname: "일단 저장하고 보는 사람",
    description:
      "좋은 건 일단 모아두고 보는 수집파. 필요한 순간에 딱 맞는 자료를 꺼내줄 수 있는 당신은, 레퍼런스의 보물창고를 가지고 있습니다.",
    strength: "필요한 자료를 빠르게 찾아줄 수 있다.",
    weakness: "저장만 하고 다시 안 볼 위험이 있다.",
    growth: "저장할 때 '왜 저장했는지' 한 줄 메모 붙이기.",
    tools: "Raindrop, Pocket, Tana",
    quote: "저장은 시작일 뿐, 꺼내 쓸 때 비로소 내 것이 됩니다.",
    color: "#f59e0b",
  },
};

export interface OutputResult {
  type: OutputType;
  emoji: string;
  name: string;
  description: string;
}

export const outputResults: Record<OutputType, OutputResult> = {
  inner: {
    type: "inner",
    emoji: "📝",
    name: "내면형",
    description: "기록을 통해 생각을 정리하고 자기 성찰에 활용합니다.",
  },
  sharer: {
    type: "sharer",
    emoji: "📢",
    name: "공유형",
    description: "기록을 콘텐츠로 가공해 세상과 나누는 데 가치를 둡니다.",
  },
  practical: {
    type: "practical",
    emoji: "💼",
    name: "실무형",
    description: "기록을 업무와 프로젝트 실행에 직접 연결합니다.",
  },
  hybrid: {
    type: "hybrid",
    emoji: "🔄",
    name: "혼합형",
    description: "상황에 따라 내면, 공유, 실무를 넘나드는 유연한 기록가입니다.",
  },
};

export interface BottleneckResult {
  type: BottleneckType;
  emoji: string;
  name: string;
  description: string;
  action: string;
}

export const bottleneckResults: Record<BottleneckType, BottleneckResult> = {
  start: {
    type: "start",
    emoji: "🚪",
    name: "시작 병목",
    description: "무엇을 기록해야 할지 막막한 단계입니다.",
    action: "하루 끝에 '오늘 가장 기억에 남는 한 가지'만 적어보세요.",
  },
  sustain: {
    type: "sustain",
    emoji: "🔄",
    name: "지속 병목",
    description: "시작은 하지만 습관으로 정착되지 않는 단계입니다.",
    action: "매일 같은 시간, 같은 장소에서 5분만 기록하는 루틴을 만들어보세요.",
  },
  organize: {
    type: "organize",
    emoji: "🔍",
    name: "정리 병목",
    description: "기록은 쌓이지만 분류/연결이 안 되는 단계입니다.",
    action: "주 1회 '정리 시간'을 캘린더에 넣고, 최근 메모 10개만 태그를 달아보세요.",
  },
  apply: {
    type: "apply",
    emoji: "🎯",
    name: "활용 병목",
    description: "정리는 잘하지만 결과물로 전환이 안 되는 단계입니다.",
    action: "이번 주 메모 중 하나를 골라 SNS 한 문단으로 바꿔보세요.",
  },
};

// ── 성숙도/AI 레벨 라벨 ──

export const maturityLevels = [
  { min: 0, max: 2, level: 1, label: "비기록자", description: "아직 기록 습관이 형성되지 않았습니다." },
  { min: 3, max: 5, level: 2, label: "메모 초보", description: "가끔 기록하지만 체계가 부족합니다." },
  { min: 6, max: 7, level: 3, label: "습관 형성", description: "꾸준히 기록하는 습관이 잡혀가고 있습니다." },
  { min: 8, max: 10, level: 4, label: "활용자", description: "기록을 실제 아웃풋으로 연결하고 있습니다." },
  { min: 11, max: 12, level: 5, label: "시스템 운영자", description: "기록이 자동화된 시스템으로 정착되었습니다." },
];

export const aiLevels = [
  { min: 0, max: 2, level: 1, label: "미사용", description: "AI를 아직 활용하지 않고 있습니다." },
  { min: 3, max: 5, level: 2, label: "탐색기", description: "AI를 가끔 써보는 단계입니다." },
  { min: 6, max: 8, level: 3, label: "활용자", description: "AI를 업무와 학습에 적극 활용하고 있습니다." },
  { min: 9, max: 12, level: 4, label: "통합자", description: "AI와 기록 시스템을 연결해 시너지를 내고 있습니다." },
];
