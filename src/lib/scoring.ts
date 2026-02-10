import {
  type PKMType,
  type OutputType,
  type BottleneckType,
  type Choice,
  questions,
  maturityLevels,
  aiLevels,
} from "@/data/questions";

export interface QuizResult {
  // 기록 성향
  primaryType: PKMType;
  secondaryType: PKMType | null;
  styleCounts: Record<PKMType, number>;

  // PKM 성숙도
  maturityScore: number;
  maturityLevel: number;
  maturityLabel: string;
  maturityDescription: string;

  // AI 활용도
  aiScore: number;
  aiLevel: number;
  aiLabel: string;
  aiDescription: string;

  // 아웃풋 성향
  outputType: OutputType;

  // 기록 병목
  bottleneck: BottleneckType;

  // 레이더 차트 데이터 (0-100)
  radarScores: {
    style: number;
    maturity: number;
    ai: number;
    output: number;
    bottleneck: number;
  };
}

export function calculateResult(answers: Choice[]): QuizResult {
  // 기록 성향
  const styleCounts: Record<PKMType, number> = {
    architect: 0,
    gardener: 0,
    student: 0,
    librarian: 0,
  };
  answers.forEach((a) => {
    if (a.type) styleCounts[a.type]++;
  });
  const sortedStyles = (Object.entries(styleCounts) as [PKMType, number][]).sort(
    (a, b) => b[1] - a[1]
  );
  const primaryType = sortedStyles[0][0];
  const secondaryType = sortedStyles[1][1] > 0 ? sortedStyles[1][0] : null;

  // 스타일 점수 (최고 유형 비율)
  const styleScore = Math.round((sortedStyles[0][1] / 7) * 100);

  // PKM 성숙도
  const maturityAnswers = answers.filter(
    (_, i) => questions[i].category === "maturity"
  );
  const maturityScore = maturityAnswers.reduce((sum, a) => sum + (a.score ?? 0), 0);
  const maturityInfo = maturityLevels.find(
    (l) => maturityScore >= l.min && maturityScore <= l.max
  ) ?? maturityLevels[0];
  const maturityPercent = Math.round((maturityScore / 12) * 100);

  // AI 활용도
  const aiAnswers = answers.filter((_, i) => questions[i].category === "ai");
  const aiScore = aiAnswers.reduce((sum, a) => sum + (a.score ?? 0), 0);
  const aiInfo = aiLevels.find(
    (l) => aiScore >= l.min && aiScore <= l.max
  ) ?? aiLevels[0];
  const aiPercent = Math.round((aiScore / 12) * 100);

  // 아웃풋 성향
  const outputCounts: Record<OutputType, number> = {
    inner: 0,
    sharer: 0,
    practical: 0,
    hybrid: 0,
  };
  answers.forEach((a) => {
    if (a.outputType) outputCounts[a.outputType]++;
  });
  const outputType = (
    Object.entries(outputCounts) as [OutputType, number][]
  ).sort((a, b) => b[1] - a[1])[0][0];

  // 아웃풋 점수 (공유형/실무형이면 높게)
  const outputScoreMap: Record<OutputType, number> = {
    inner: 40,
    sharer: 90,
    practical: 80,
    hybrid: 65,
  };
  const outputPercent = outputScoreMap[outputType];

  // 기록 병목
  const bottleneckCounts: Record<BottleneckType, number> = {
    start: 0,
    sustain: 0,
    organize: 0,
    apply: 0,
  };
  answers.forEach((a) => {
    if (a.bottleneck) bottleneckCounts[a.bottleneck]++;
  });
  const bottleneck = (
    Object.entries(bottleneckCounts) as [BottleneckType, number][]
  ).sort((a, b) => b[1] - a[1])[0][0];

  // 병목 점수 (활용 병목일수록 성숙도 높음)
  const bottleneckScoreMap: Record<BottleneckType, number> = {
    start: 25,
    sustain: 45,
    organize: 65,
    apply: 85,
  };
  const bottleneckPercent = bottleneckScoreMap[bottleneck];

  return {
    primaryType,
    secondaryType,
    styleCounts,
    maturityScore,
    maturityLevel: maturityInfo.level,
    maturityLabel: maturityInfo.label,
    maturityDescription: maturityInfo.description,
    aiScore,
    aiLevel: aiInfo.level,
    aiLabel: aiInfo.label,
    aiDescription: aiInfo.description,
    outputType,
    bottleneck,
    radarScores: {
      style: styleScore,
      maturity: maturityPercent,
      ai: aiPercent,
      output: outputPercent,
      bottleneck: bottleneckPercent,
    },
  };
}
