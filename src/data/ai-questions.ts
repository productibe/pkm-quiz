export type AILevel = "observer" | "experimenter" | "practitioner" | "poweruser" | "architect";
export type AICategory = "usage" | "prompt" | "integration" | "output";

export interface AIChoice {
  text: string;
  score: number;
}

export interface AIQuestion {
  id: number;
  category: AICategory;
  question: string;
  choices: AIChoice[];
}

export const aiQuestions: AIQuestion[] = [
  // 1. usage
  {
    id: 1,
    category: "usage",
    question: "AI 도구를 얼마나 자주 사용하나요?",
    choices: [
      { text: "주 1~2회", score: 1 },
      { text: "거의 매일", score: 2 },
      { text: "거의 안 쓴다", score: 0 },
      { text: "하루에도 여러 번", score: 3 },
    ],
  },
  // 2. prompt
  {
    id: 2,
    category: "prompt",
    question: "AI에게 주로 어떻게 질문하나요?",
    choices: [
      { text: "짧게 한 줄로", score: 0 },
      { text: "시스템 프롬프트 + 예시 + 출력 형식까지", score: 3 },
      { text: "질문 + 간단한 배경 설명", score: 1 },
      { text: "역할 지정 + 조건 + 형식 요청", score: 2 },
    ],
  },
  // 3. integration
  {
    id: 3,
    category: "integration",
    question: "AI에게 질문할 때 자신의 메모/기록을 함께 주나요?",
    choices: [
      { text: "자주 내 메모를 맥락으로 제공한다", score: 2 },
      { text: "가끔 관련 내용을 복붙한다", score: 1 },
      { text: "내 기록이 AI의 기본 맥락으로 연결되어 있다", score: 3 },
      { text: "그런 적 없다", score: 0 },
    ],
  },
  // 4. output
  {
    id: 4,
    category: "output",
    question: "AI가 써준 글을 그대로 사용한 적이 있나요?",
    choices: [
      { text: "대부분 그대로 쓴다", score: 0 },
      { text: "구조만 참고하고 다시 쓴다", score: 2 },
      { text: "AI 초안을 내 관점으로 완전히 재구성한다", score: 3 },
      { text: "약간 수정해서 쓴다", score: 1 },
    ],
  },
  // 5. usage
  {
    id: 5,
    category: "usage",
    question: "현재 사용하는 AI 도구 개수는?",
    choices: [
      { text: "용도별로 다른 도구를 쓴다", score: 3 },
      { text: "2~3개", score: 1 },
      { text: "없거나 1개", score: 0 },
      { text: "4개 이상", score: 2 },
    ],
  },
  // 6. prompt
  {
    id: 6,
    category: "prompt",
    question: '"이 글을 요약해줘"라고 할 때, 보통 어떻게 시키나요?',
    choices: [
      { text: '"3줄로 요약해줘"', score: 1 },
      { text: '그냥 "요약해줘"', score: 0 },
      { text: '"핵심 논점 중심으로 3줄, 불릿 포인트로"', score: 2 },
      {
        text: '"내가 팀장에게 보고할 거야. 핵심 수치와 액션 아이템 중심으로 200자 내외"',
        score: 3,
      },
    ],
  },
  // 7. integration
  {
    id: 7,
    category: "integration",
    question: "AI가 생성한 결과물을 어디에 저장하나요?",
    choices: [
      { text: "대화창에 그대로 둔다", score: 1 },
      { text: "내 노트 시스템에 분류해서 저장한다", score: 3 },
      { text: "저장 안 한다", score: 0 },
      { text: "따로 복사해서 메모에 저장한다", score: 2 },
    ],
  },
  // 8. output
  {
    id: 8,
    category: "output",
    question: 'AI를 쓴 후 "이건 내 것이다"라고 느끼나요?',
    choices: [
      { text: "내가 수정했으니 내 것이다", score: 2 },
      { text: "그런 생각 안 해봤다", score: 0 },
      { text: "AI는 도구일 뿐, 판단과 방향은 내 것이다", score: 3 },
      { text: "솔직히 AI가 한 거라 좀 찜찜하다", score: 1 },
    ],
  },
  // 9. usage
  {
    id: 9,
    category: "usage",
    question: "AI를 가장 많이 쓰는 상황은?",
    choices: [
      { text: "글쓰기/번역", score: 1 },
      { text: "아이디어 발전/의사결정 보조", score: 3 },
      { text: "모르는 것 검색", score: 0 },
      { text: "업무 자동화/분석", score: 2 },
    ],
  },
  // 10. prompt
  {
    id: 10,
    category: "prompt",
    question: "자주 쓰는 프롬프트를 저장해두나요?",
    choices: [
      { text: "템플릿화해서 재사용한다", score: 3 },
      { text: "그런 거 안 한다", score: 0 },
      { text: "가끔 복사해둔다", score: 1 },
      { text: "메모장에 정리해뒀다", score: 2 },
    ],
  },
  // 11. integration
  {
    id: 11,
    category: "integration",
    question: '"AI가 나를 더 잘 알면 좋겠다"고 생각한 적 있나요?',
    choices: [
      { text: "내 기록/프로필을 AI에 연결해뒀다", score: 3 },
      { text: "생각해본 적 없다", score: 0 },
      { text: "가끔 그런 생각은 한다", score: 1 },
      { text: "그래서 매번 배경을 설명해준다", score: 2 },
    ],
  },
  // 12. output
  {
    id: 12,
    category: "output",
    question: "AI 결과물로 콘텐츠(글, 보고서, 발표)를 만들어본 적이 있나요?",
    choices: [
      { text: "자주, 업무에 활용한다", score: 2 },
      { text: "없다", score: 0 },
      { text: "AI가 내 콘텐츠 생산 파이프라인의 일부다", score: 3 },
      { text: "가끔", score: 1 },
    ],
  },
  // 13. usage
  {
    id: 13,
    category: "usage",
    question: "AI에게 결과물이 마음에 안 들면?",
    choices: [
      { text: "피드백을 주고 대화를 이어간다", score: 3 },
      { text: "다른 걸 물어본다", score: 0 },
      { text: "같은 질문을 다시 한다", score: 1 },
      { text: "조건을 바꿔서 다시 시킨다", score: 2 },
    ],
  },
  // 14. prompt
  {
    id: 14,
    category: "prompt",
    question: 'AI에게 "이건 좀 아닌데"라고 느꼈을 때?',
    choices: [
      { text: "질문을 바꿔본다", score: 1 },
      { text: "왜 틀렸는지 분석하고 프롬프트를 개선한다", score: 3 },
      { text: "포기하고 직접 한다", score: 0 },
      { text: '"이 부분은 이렇게 바꿔줘"라고 수정 요청', score: 2 },
    ],
  },
  // 15. integration
  {
    id: 15,
    category: "integration",
    question: "과거 AI 대화 내용을 다시 찾아본 적이 있나요?",
    choices: [
      { text: "가끔 찾아서 참고한다", score: 2 },
      { text: "없다", score: 0 },
      { text: "있는데 못 찾았다", score: 1 },
      { text: "중요한 대화는 따로 정리해둔다", score: 3 },
    ],
  },
  // 16. output
  {
    id: 16,
    category: "output",
    question: "가장 공감 가는 문장은?",
    choices: [
      { text: '"AI는 편하지만 아직 보조 수준이다"', score: 1 },
      { text: '"AI 덕분에 일하는 방식이 바뀌었다"', score: 2 },
      { text: '"AI 없이 일하던 때로 돌아갈 수 없다"', score: 3 },
      { text: '"AI가 뭘 할 수 있는지 아직 잘 모르겠다"', score: 0 },
    ],
  },
  // 17. usage
  {
    id: 17,
    category: "usage",
    question: "AI가 없어지면 어떤 느낌일까요?",
    choices: [
      { text: "별 상관없다", score: 0 },
      { text: "업무가 마비된다", score: 3 },
      { text: "좀 불편하겠다", score: 1 },
      { text: "꽤 곤란하다", score: 2 },
    ],
  },
  // 18. prompt
  {
    id: 18,
    category: "prompt",
    question: "다른 사람의 프롬프트 팁을 보면?",
    choices: [
      { text: "따라해본다", score: 2 },
      { text: "내 상황에 맞게 변형해서 적용한다", score: 3 },
      { text: "관심 없다", score: 0 },
      { text: "읽어본다", score: 1 },
    ],
  },
  // 19. integration
  {
    id: 19,
    category: "integration",
    question: '"기록이 잘 되어 있으면 AI를 더 잘 쓸 수 있다"에 동의하나요?',
    choices: [
      { text: "동의한다, 하지만 실천은 못 하고 있다", score: 2 },
      { text: "동의하고, 실제로 그렇게 하고 있다", score: 3 },
      { text: "무슨 말인지 모르겠다", score: 0 },
      { text: "그런 것 같기도 하다", score: 1 },
    ],
  },
  // 20. usage
  {
    id: 20,
    category: "usage",
    question: "새로운 AI 도구가 나오면?",
    choices: [
      { text: "뉴스로 본다", score: 1 },
      { text: "기존 워크플로우에 적용할 수 있는지 테스트한다", score: 3 },
      { text: "관심 없다", score: 0 },
      { text: "직접 써본다", score: 2 },
    ],
  },
];

// ── AI 레벨 결과 데이터 ──

export interface AILevelResult {
  level: AILevel;
  emoji: string;
  name: string;
  nickname: string;
  description: string;
  pkmConnection: string;
  color: string;
  minScore: number;
  maxScore: number;
}

export const aiLevelResults: Record<AILevel, AILevelResult> = {
  observer: {
    level: "observer",
    emoji: "👀",
    name: "AI 관망자",
    nickname: "AI, 들어는 봤는데…",
    description:
      "아직 AI를 본격적으로 활용하지 않는 단계입니다. AI에 대한 호기심은 있지만 어디서부터 시작해야 할지 막막할 수 있습니다.",
    pkmConnection:
      "시작하기 전에 하나만 기억하세요 — AI는 당신이 준 정보만큼만 똑똑합니다. 평소 메모 습관이 AI 활용의 기초가 됩니다.",
    color: "#94a3b8",
    minScore: 0,
    maxScore: 15,
  },
  experimenter: {
    level: "experimenter",
    emoji: "🧪",
    name: "AI 체험자",
    nickname: "가끔 물어보긴 하는데…",
    description:
      "AI를 써보지만 검색 대용 수준입니다. 가끔 ChatGPT에 질문하지만 체계적으로 활용하지는 않습니다.",
    pkmConnection:
      "AI에게 좋은 답을 받으려면 좋은 맥락이 필요합니다. 오늘부터 생각나는 것을 한 줄씩 적어보세요. 그게 AI에게 줄 최고의 프롬프트가 됩니다.",
    color: "#60a5fa",
    minScore: 16,
    maxScore: 30,
  },
  practitioner: {
    level: "practitioner",
    emoji: "⚡",
    name: "AI 활용자",
    nickname: "이제 없으면 좀 불편해",
    description:
      "업무에 AI를 적극 활용하지만 체계적이진 않습니다. AI 도구를 쓰고는 있지만, 매번 새로 질문하고 결과물을 휘발시키고 있을 수 있습니다.",
    pkmConnection:
      "AI를 매번 새로 가르치고 있지 않나요? 자주 쓰는 맥락을 기록해두면, AI에게 반복 설명할 필요가 없어집니다. 기록이 곧 프롬프트 라이브러리입니다.",
    color: "#a78bfa",
    minScore: 31,
    maxScore: 42,
  },
  poweruser: {
    level: "poweruser",
    emoji: "🚀",
    name: "AI 파워유저",
    nickname: "AI가 내 팀원이다",
    description:
      "여러 AI 도구를 능숙하게 활용합니다. 프롬프트 설계도 능숙하고, 용도별로 다른 도구를 적재적소에 사용합니다.",
    pkmConnection:
      "AI를 잘 쓰시네요. 그런데 AI의 결과물이 휘발되고 있진 않나요? 좋은 결과를 기록 시스템에 쌓아두면, 반복 작업이 줄고 품질이 올라갑니다.",
    color: "#f97316",
    minScore: 43,
    maxScore: 52,
  },
  architect: {
    level: "architect",
    emoji: "🏗️",
    name: "AI 설계자",
    nickname: "AI 워크플로우를 직접 만든다",
    description:
      "AI와 기록이 시스템으로 연결된 상태입니다. 단순히 도구를 쓰는 게 아니라, AI를 자신의 워크플로우에 완전히 통합했습니다.",
    pkmConnection:
      "이미 AI와 기록을 연결하고 계시네요. 다음 단계는 이 시스템을 다른 사람에게 가르치는 것입니다. 당신의 워크플로우가 콘텐츠가 됩니다.",
    color: "#06b6d4",
    minScore: 53,
    maxScore: 60,
  },
};

// ── 카테고리 라벨 ──

export const aiCategoryLabels: Record<
  AICategory,
  { label: string; emoji: string; description: string }
> = {
  usage: {
    label: "AI 활용 단계",
    emoji: "🤖",
    description: "AI를 얼마나 자주, 어떻게 사용하는가",
  },
  prompt: {
    label: "프롬프트 설계력",
    emoji: "📝",
    description: "AI에게 얼마나 잘 시키는가",
  },
  integration: {
    label: "기록 연결도",
    emoji: "🔗",
    description: "AI와 기록이 얼마나 연결되어 있는가",
  },
  output: {
    label: "아웃풋 전환력",
    emoji: "🎯",
    description: "AI 결과물을 어떻게 활용하는가",
  },
};
