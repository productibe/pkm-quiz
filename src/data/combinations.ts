import type { PKMType } from "./questions";

// 주유형 × 서브유형 조합 해석 (16개)
export const combinationDescriptions: Record<string, {
  title: string;
  description: string;
  tip: string;
}> = {
  // 건축가 주유형
  "architect×gardener": {
    title: "구조 속의 정원사",
    description: "체계적인 프레임 안에서 아이디어가 자유롭게 연결되는 것을 즐깁니다. 폴더 구조는 잡되, 안에서는 유연하게 메모를 엮어나가는 스타일입니다.",
    tip: "MOC(Map of Content) 방식이 가장 잘 맞습니다. 큰 틀은 설계하되, 메모 간 링크는 자유롭게 두세요.",
  },
  "architect×student": {
    title: "학습 설계자",
    description: "배운 것을 체계적으로 분류하고 구조화하는 데 뛰어납니다. 수업 노트, 독서 노트가 깔끔하게 정리되어 있을 가능성이 높습니다.",
    tip: "노트를 '주제별 허브 페이지'로 묶어보세요. 학습 내용이 하나의 지식 체계가 됩니다.",
  },
  "architect×librarian": {
    title: "아카이브 장인",
    description: "수집한 자료를 완벽하게 분류하는 능력이 탁월합니다. 태그, 폴더, 속성을 활용해 어떤 자료든 즉시 찾아낼 수 있는 시스템을 구축합니다.",
    tip: "과분류 주의. 분류 체계는 3단계 이내로 유지하고, 검색에도 의존하는 연습을 해보세요.",
  },

  // 정원사 주유형
  "gardener×architect": {
    title: "자유로운 설계자",
    description: "아이디어를 자유롭게 뿌리면서도 가끔 구조를 잡아주는 밸런스 감각이 있습니다. 창의성과 체계 사이에서 줄타기를 잘합니다.",
    tip: "월 1회 '구조화 데이'를 만들어보세요. 평소에는 자유롭게 적고, 한 달에 한 번 정리하는 리듬이 맞습니다.",
  },
  "gardener×student": {
    title: "탐구하는 정원사",
    description: "호기심을 따라 메모를 남기고, 그 과정에서 깊이 있는 학습이 이뤄집니다. 배움이 자연스럽게 연결되는 경험을 자주 합니다.",
    tip: "에버그린 노트 방식을 시도해보세요. 짧은 메모를 점점 발전시켜 하나의 완성된 생각으로 키우는 겁니다.",
  },
  "gardener×librarian": {
    title: "수집하는 탐험가",
    description: "흥미로운 것을 발견하면 일단 모으고, 나중에 예상치 못한 연결을 발견합니다. 영감의 원천이 풍부한 타입입니다.",
    tip: "'인박스' 하나를 만들어 두고 일단 던져넣으세요. 주 1회 훑어보면서 연결고리를 찾는 루틴을 추가하면 완벽합니다.",
  },

  // 학생 주유형
  "student×architect": {
    title: "체계적 학습자",
    description: "배운 내용을 구조화해서 저장하는 능력이 뛰어납니다. 커리큘럼을 직접 설계할 수 있을 만큼 학습의 전체 그림을 잘 봅니다.",
    tip: "학습한 것을 남에게 가르치는 형태로 정리해보세요. 아웃풋이 급격히 늘어납니다.",
  },
  "student×gardener": {
    title: "발견하는 학습자",
    description: "공부하다가 뜻밖의 연결을 발견하는 순간을 사랑합니다. 학습이 단순 암기가 아닌 창의적 연결로 이어지는 타입입니다.",
    tip: "학습 노트에 '이것은 ___와 연결된다' 한 줄을 추가하는 습관을 만들어보세요.",
  },
  "student×librarian": {
    title: "학구적 수집가",
    description: "좋은 자료를 모으고, 그것을 깊이 있게 소화하는 데 시간을 아끼지 않습니다. 인풋의 양과 질 모두 높은 타입입니다.",
    tip: "수집한 것 중 '이번 주에 소화할 3개'만 골라보세요. 인풋을 아웃풋으로 전환하는 속도가 빨라집니다.",
  },

  // 사서 주유형
  "librarian×architect": {
    title: "정리하는 수집가",
    description: "모은 자료를 체계적으로 분류하는 것에 만족감을 느낍니다. 디지털 서재가 누구보다 잘 정돈되어 있습니다.",
    tip: "저장할 때 '한 줄 메모'를 붙이는 습관 하나면 충분합니다. 나중에 검색할 때 그 한 줄이 결정적 단서가 됩니다.",
  },
  "librarian×gardener": {
    title: "영감의 수집가",
    description: "다양한 소스에서 자료를 모으고, 그 사이에서 예상 못한 아이디어를 발견합니다. 레퍼런스가 곧 창작의 씨앗이 되는 타입입니다.",
    tip: "주 1회 수집한 자료를 펼쳐놓고 '이 중 2개를 연결하면?'이라고 자문해보세요.",
  },
  "librarian×student": {
    title: "지식의 도서관장",
    description: "자료를 모으는 데서 그치지 않고, 중요한 것은 깊이 학습합니다. 넓이와 깊이를 동시에 추구하는 균형잡힌 타입입니다.",
    tip: "수집:학습 비율을 7:3에서 5:5로 조정해보세요. 소화하는 시간을 늘리면 기록의 가치가 배가됩니다.",
  },
};

// 같은 유형이 주+서브인 경우 (서브 없음)
export const soloDescriptions: Record<PKMType, {
  title: string;
  description: string;
  tip: string;
}> = {
  architect: {
    title: "순수 건축가",
    description: "압도적으로 체계를 중시합니다. 구조와 분류가 곧 사고의 방식이고, 시스템 없이는 불안한 타입입니다.",
    tip: "완벽한 시스템은 없습니다. '70% 구조 + 30% 유연성'을 의식적으로 연습해보세요.",
  },
  gardener: {
    title: "순수 정원사",
    description: "완전한 자유 연결형. 메모 사이의 우연한 만남을 가장 사랑하고, 구조에 얽매이는 것을 싫어합니다.",
    tip: "최소한의 인박스 하나만 만들어두세요. 자유롭되, 흩어지지 않는 지점을 찾는 게 핵심입니다.",
  },
  student: {
    title: "순수 학생",
    description: "학습 그 자체에 몰입하는 타입. 이해하지 못하면 절대 넘어가지 않으며, 자기 언어로 재구성해야 직성이 풀립니다.",
    tip: "배운 것을 48시간 내에 한 문단으로 써보세요. '완벽한 요약'을 기다리면 아무것도 남지 않습니다.",
  },
  librarian: {
    title: "순수 사서",
    description: "수집의 달인. 좋은 자료를 발견하는 눈이 탁월하고, 필요한 사람에게 딱 맞는 자료를 꺼내줄 수 있습니다.",
    tip: "저장한 것 중 이번 주에 하나만 '내 말로 바꿔 적어보세요'. 수집이 학습으로 전환되는 경험을 하게 됩니다.",
  },
};

export function getCombinationInfo(primary: PKMType, secondary: PKMType | null) {
  if (!secondary || primary === secondary) {
    return soloDescriptions[primary];
  }
  const key = `${primary}×${secondary}`;
  return combinationDescriptions[key] ?? soloDescriptions[primary];
}
