export type PKMType = "architect" | "gardener" | "student" | "librarian";

export interface Choice {
  text: string;
  type: PKMType;
}

export interface Question {
  id: number;
  question: string;
  choices: Choice[];
}

export const questions: Question[] = [
  {
    id: 1,
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
    question: "가장 공감 가는 문장은?",
    choices: [
      { text: "체계가 없으면 불안하다", type: "architect" },
      { text: "연결되는 순간이 가장 짜릿하다", type: "gardener" },
      { text: "이해하지 못하면 넘어갈 수 없다", type: "student" },
      { text: "좋은 건 일단 저장하고 본다", type: "librarian" },
    ],
  },
];

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
