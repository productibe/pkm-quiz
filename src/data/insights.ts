import type { QuizResult } from "@/lib/scoring";
import type { PKMType } from "./questions";

// ── 강점 3개 생성 ──
export function getStrengths(result: QuizResult): string[] {
  const strengths: string[] = [];
  const { primaryType, maturityLevel, aiLevel, outputType } = result;

  // 유형 기반 강점
  const typeStrengths: Record<PKMType, string> = {
    architect: "정보를 체계적으로 구조화하는 능력이 뛰어납니다.",
    gardener: "서로 다른 아이디어를 연결하는 창의적 사고력이 강합니다.",
    student: "학습한 내용을 깊이 있게 내면화하는 능력이 탁월합니다.",
    librarian: "필요한 자료를 빠르게 수집하고 찾아내는 감각이 뛰어납니다.",
  };
  strengths.push(typeStrengths[primaryType]);

  // 성숙도 기반 강점
  if (maturityLevel >= 4) {
    strengths.push("기록을 실제 결과물로 전환하는 습관이 자리잡혀 있습니다.");
  } else if (maturityLevel >= 3) {
    strengths.push("꾸준히 기록하는 습관의 기반이 갖춰져 있습니다.");
  } else {
    strengths.push("기록의 필요성을 인식하고 있어, 시작할 준비가 되어 있습니다.");
  }

  // AI/아웃풋 기반 강점
  if (aiLevel >= 3) {
    strengths.push("AI를 적극 활용해 생산성을 높이고 있습니다.");
  } else if (outputType === "sharer") {
    strengths.push("기록을 콘텐츠로 발행하는 아웃풋 지향성이 강합니다.");
  } else if (outputType === "practical") {
    strengths.push("기록을 실무에 바로 연결하는 실행력이 있습니다.");
  } else {
    strengths.push("자기 성찰을 통해 생각을 깊이 있게 다듬는 힘이 있습니다.");
  }

  return strengths;
}

// ── 개선점 3개 생성 ──
export function getImprovements(result: QuizResult): string[] {
  const improvements: string[] = [];
  const { primaryType, maturityLevel, aiLevel, bottleneck } = result;

  // 유형 기반 개선점
  const typeWeaknesses: Record<PKMType, string> = {
    architect: "구조를 잡는 데 시간을 쓰느라 실제 기록량이 줄어들 수 있습니다.",
    gardener: "메모가 흩어져 나중에 찾기 어려워질 수 있습니다.",
    student: "완벽한 정리를 추구하다 보면 아웃풋 속도가 느려질 수 있습니다.",
    librarian: "저장했다는 사실만으로 학습했다고 착각할 위험이 있습니다.",
  };
  improvements.push(typeWeaknesses[primaryType]);

  // 성숙도 기반 개선점
  if (maturityLevel <= 2) {
    improvements.push("기록 습관이 아직 불규칙합니다. 매일 1분이라도 적는 루틴이 필요합니다.");
  } else if (maturityLevel === 3) {
    improvements.push("기록은 꾸준하지만, 다시 꺼내 활용하는 빈도를 높여야 합니다.");
  } else {
    improvements.push("현재 시스템을 더 단순화할 여지가 있는지 점검해보세요.");
  }

  // AI 기반 개선점
  if (aiLevel <= 1) {
    improvements.push("AI 도구를 아직 활용하지 않고 있습니다. 기록 효율을 높일 큰 기회를 놓치고 있습니다.");
  } else if (aiLevel === 2) {
    improvements.push("AI를 단순 질문용으로만 쓰고 있습니다. 기록과 연결하면 효과가 배가됩니다.");
  } else {
    improvements.push("AI 의존도가 높을 수 있습니다. '내 생각 먼저, AI는 보조' 원칙을 지켜보세요.");
  }

  return improvements;
}

// ── 맞춤 도구 추천 ──
export interface ToolRecommendation {
  name: string;
  reason: string;
}

export function getToolRecommendations(result: QuizResult): ToolRecommendation[] {
  const tools: ToolRecommendation[] = [];
  const { primaryType, maturityLevel, aiLevel } = result;

  // 유형 기반 메인 도구
  const typeTools: Record<PKMType, ToolRecommendation> = {
    architect: { name: "Notion", reason: "데이터베이스와 관계형 구조가 건축가형 분류 체계에 최적입니다." },
    gardener: { name: "Obsidian", reason: "그래프 뷰와 백링크가 정원사형 자유 연결에 딱 맞습니다." },
    student: { name: "Readwise Reader", reason: "하이라이트 → 노트 자동 연결이 학습형 워크플로우에 적합합니다." },
    librarian: { name: "Raindrop.io", reason: "강력한 태깅과 검색으로 수집한 자료를 즉시 찾을 수 있습니다." },
  };
  tools.push(typeTools[primaryType]);

  // AI 레벨 기반 도구
  if (aiLevel <= 2) {
    tools.push({ name: "ChatGPT / Claude", reason: "메모를 붙여넣고 '요약해줘'부터 시작하면 AI 활용의 첫걸음이 됩니다." });
  } else {
    tools.push({ name: "Obsidian + AI 플러그인", reason: "기록과 AI를 하나의 환경에서 연결할 수 있습니다." });
  }

  // 성숙도 기반 도구
  if (maturityLevel <= 2) {
    tools.push({ name: "Apple 메모 / Google Keep", reason: "복잡한 앱보다 기본 앱으로 습관을 먼저 만드는 게 우선입니다." });
  } else {
    tools.push({ name: "Tana / Capacities", reason: "메모를 객체화하고 자동 연결하는 차세대 PKM 도구입니다." });
  }

  return tools;
}

// ── 맞춤 학습 자료 추천 ──
export interface ResourceRecommendation {
  title: string;
  type: string;
  reason: string;
}

export function getResourceRecommendations(result: QuizResult): ResourceRecommendation[] {
  const resources: ResourceRecommendation[] = [];
  const { primaryType, maturityLevel, aiLevel } = result;

  // 입문자
  if (maturityLevel <= 2) {
    resources.push({
      title: "제텔카스텐 — 글쓰는 인간의 도구",
      type: "📕 도서",
      reason: "기록이 왜 필요한지, 어떻게 시작하는지 기초를 다질 수 있습니다.",
    });
  }

  // 유형별
  if (primaryType === "architect" || primaryType === "librarian") {
    resources.push({
      title: "PARA 메서드 (Tiago Forte)",
      type: "📖 프레임워크",
      reason: "프로젝트-영역-리소스-아카이브로 정리하는 체계가 유형에 잘 맞습니다.",
    });
  }
  if (primaryType === "gardener" || primaryType === "student") {
    resources.push({
      title: "에버그린 노트 (Andy Matuschak)",
      type: "📖 프레임워크",
      reason: "메모를 점진적으로 발전시켜 나만의 지식으로 키우는 방법론입니다.",
    });
  }

  // AI 활용
  if (aiLevel <= 2) {
    resources.push({
      title: "AI로 나만의 지식 비서 만들기",
      type: "📬 뉴스레터",
      reason: "기록에 AI를 연결하는 실전 팁을 매주 받아볼 수 있습니다.",
    });
  }

  return resources;
}
