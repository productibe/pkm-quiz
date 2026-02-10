import {
  type AILevel,
  type AICategory,
  type AIChoice,
  aiQuestions,
  aiLevelResults,
  aiCategoryLabels,
} from "@/data/ai-questions";

export interface AIResult {
  // 총점 및 레벨
  totalScore: number;
  level: AILevel;
  levelInfo: {
    emoji: string;
    name: string;
    nickname: string;
    description: string;
    pkmConnection: string;
    color: string;
  };

  // 카테고리별 점수
  categoryScores: {
    usage: number;
    prompt: number;
    integration: number;
    output: number;
  };

  // 카테고리별 퍼센트 (레이더 차트용)
  categoryPercents: {
    usage: number;
    prompt: number;
    integration: number;
    output: number;
  };

  // 카테고리별 라벨 (예: usage → "활용자")
  categoryLabels: {
    usage: string;
    prompt: string;
    integration: string;
    output: string;
  };
}

// 카테고리별 최대 점수 계산
const categoryMaxScores = {
  usage: aiQuestions.filter((q) => q.category === "usage").length * 3, // 6문항 * 3 = 18
  prompt: aiQuestions.filter((q) => q.category === "prompt").length * 3, // 5문항 * 3 = 15
  integration: aiQuestions.filter((q) => q.category === "integration").length * 3, // 5문항 * 3 = 15
  output: aiQuestions.filter((q) => q.category === "output").length * 3, // 4문항 * 3 = 12
};

// 점수 → 레벨 라벨 매핑 (카테고리별 특성화)
function getCategoryLabel(category: AICategory, score: number, maxScore: number): string {
  const percent = (score / maxScore) * 100;

  if (category === "usage") {
    if (percent <= 30) return "관망자";
    if (percent <= 50) return "체험자";
    if (percent <= 70) return "활용자";
    if (percent <= 85) return "파워유저";
    return "설계자";
  }

  if (category === "prompt") {
    if (percent <= 30) return "단순형";
    if (percent <= 50) return "조건형";
    if (percent <= 75) return "맥락형";
    return "시스템형";
  }

  if (category === "integration") {
    if (percent <= 30) return "분리형";
    if (percent <= 50) return "수동형";
    if (percent <= 75) return "연결형";
    return "통합형";
  }

  if (category === "output") {
    if (percent <= 30) return "수용형";
    if (percent <= 50) return "편집형";
    if (percent <= 75) return "재구성형";
    return "창작형";
  }

  return "";
}

export function calculateAIResult(answers: AIChoice[]): AIResult {
  // 총점 계산
  const totalScore = answers.reduce((sum, a) => sum + a.score, 0);

  // 레벨 배정
  let level: AILevel = "observer";
  for (const [levelKey, levelData] of Object.entries(aiLevelResults)) {
    if (totalScore >= levelData.minScore && totalScore <= levelData.maxScore) {
      level = levelKey as AILevel;
      break;
    }
  }

  const levelInfo = {
    emoji: aiLevelResults[level].emoji,
    name: aiLevelResults[level].name,
    nickname: aiLevelResults[level].nickname,
    description: aiLevelResults[level].description,
    pkmConnection: aiLevelResults[level].pkmConnection,
    color: aiLevelResults[level].color,
  };

  // 카테고리별 점수
  const categoryScores = {
    usage: 0,
    prompt: 0,
    integration: 0,
    output: 0,
  };

  answers.forEach((answer, i) => {
    const q = aiQuestions[i];
    categoryScores[q.category] += answer.score;
  });

  // 카테고리별 퍼센트
  const categoryPercents = {
    usage: Math.round((categoryScores.usage / categoryMaxScores.usage) * 100),
    prompt: Math.round((categoryScores.prompt / categoryMaxScores.prompt) * 100),
    integration: Math.round(
      (categoryScores.integration / categoryMaxScores.integration) * 100
    ),
    output: Math.round((categoryScores.output / categoryMaxScores.output) * 100),
  };

  // 카테고리별 라벨
  const categoryLabels = {
    usage: getCategoryLabel("usage", categoryScores.usage, categoryMaxScores.usage),
    prompt: getCategoryLabel("prompt", categoryScores.prompt, categoryMaxScores.prompt),
    integration: getCategoryLabel(
      "integration",
      categoryScores.integration,
      categoryMaxScores.integration
    ),
    output: getCategoryLabel("output", categoryScores.output, categoryMaxScores.output),
  };

  return {
    totalScore,
    level,
    levelInfo,
    categoryScores,
    categoryPercents,
    categoryLabels,
  };
}
