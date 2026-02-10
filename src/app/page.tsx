"use client";

import { useState, useCallback, useEffect } from "react";
import {
  questions,
  typeResults,
  outputResults,
  bottleneckResults,
  type Choice,
  type PKMType,
} from "@/data/questions";
import { calculateResult, type QuizResult } from "@/lib/scoring";
import RadarChart from "@/components/RadarChart";
import { getCombinationInfo } from "@/data/combinations";
import { getStrengths, getImprovements, getToolRecommendations, getResourceRecommendations } from "@/data/insights";

/* ─── URL Encoding ─── */
function encodeAnswers(answers: Choice[]): string {
  return answers
    .map((choice, i) => {
      const q = questions[i];
      const idx = q.choices.indexOf(choice);
      return String.fromCharCode(97 + idx); // a, b, c, d
    })
    .join("");
}

function decodeAnswers(code: string): Choice[] | null {
  if (code.length !== questions.length) return null;
  try {
    return code.split("").map((ch, i) => {
      const idx = ch.charCodeAt(0) - 97;
      if (idx < 0 || idx >= questions[i].choices.length) return null;
      return questions[i].choices[idx];
    }).filter((c): c is Choice => c !== null);
  } catch {
    return null;
  }
}

/* ─── Intro Screen ─── */
function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center space-y-8">
        <div className="space-y-3">
          <p className="text-6xl">🧬</p>
          <h1 className="text-3xl font-bold tracking-tight">
            당신의 기록 DNA는?
          </h1>
          <p className="text-[var(--color-text-muted)] text-lg leading-relaxed">
            20가지 질문으로 알아보는
            <br />
            나만의 PKM × AI 분석 리포트
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          {(["architect", "gardener", "student", "librarian"] as PKMType[]).map(
            (t) => (
              <div
                key={t}
                className="rounded-xl p-3 border border-[var(--color-border)] bg-[var(--color-card)]"
              >
                <span className="text-2xl">{typeResults[t].emoji}</span>
                <p className="font-medium mt-1">{typeResults[t].name}</p>
              </div>
            )
          )}
        </div>

        <div className="text-left text-sm text-[var(--color-text-muted)] space-y-1 bg-[var(--color-card)] rounded-xl p-4 border border-[var(--color-border)]">
          <p className="font-medium text-[var(--color-text)]">📊 분석 항목</p>
          <p>• 기록 성향 — 어떻게 기록하는가</p>
          <p>• PKM 성숙도 — 기록 습관이 얼마나 자리잡혔는가</p>
          <p>• AI 활용도 — AI를 기록에 얼마나 활용하는가</p>
          <p>• 아웃풋 성향 — 기록을 어디에 쓰는가</p>
          <p>• 기록 병목 — 어디서 막히는가</p>
        </div>

        <button
          onClick={onStart}
          className="w-full py-4 rounded-2xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold text-lg transition-colors cursor-pointer"
        >
          진단 시작하기
        </button>

        <p className="text-xs text-[var(--color-text-muted)]">
          약 3분 소요 · 생산적생산자 @productibe
        </p>
      </div>
    </div>
  );
}

/* ─── Category Label ─── */
const categoryLabels: Record<string, { label: string; emoji: string }> = {
  style: { label: "기록 성향", emoji: "✍️" },
  maturity: { label: "PKM 성숙도", emoji: "📈" },
  ai: { label: "AI 활용도", emoji: "🤖" },
  output: { label: "아웃풋 성향", emoji: "🎯" },
  bottleneck: { label: "기록 병목", emoji: "🔍" },
};

/* ─── Question Screen ─── */
function QuestionScreen({
  questionIndex,
  onAnswer,
}: {
  questionIndex: number;
  onAnswer: (choice: Choice) => void;
}) {
  const q = questions[questionIndex];
  const progress = ((questionIndex + 1) / questions.length) * 100;
  const cat = categoryLabels[q.category];
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = useCallback(
    (choice: Choice, idx: number) => {
      if (selected !== null) return;
      setSelected(idx);
      setTimeout(() => {
        onAnswer(choice);
        setSelected(null);
      }, 300);
    },
    [selected, onAnswer]
  );

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg w-full space-y-6">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-[var(--color-text-muted)]">
            <span>
              {cat.emoji} {cat.label}
            </span>
            <span>
              {questionIndex + 1} / {questions.length}
            </span>
          </div>
          <div className="h-1.5 bg-[var(--color-border)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--color-primary)] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <h2 className="text-xl font-bold whitespace-pre-line leading-relaxed pt-2">
          {q.question}
        </h2>

        {/* Choices */}
        <div className="space-y-3">
          {q.choices.map((choice, i) => (
            <button
              key={i}
              onClick={() => handleSelect(choice, i)}
              className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                selected === i
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 scale-[0.98]"
                  : "border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5"
              }`}
            >
              <span className="text-[var(--color-text-muted)] mr-3 font-mono text-sm">
                {String.fromCharCode(65 + i)}
              </span>
              {choice.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Score Bar ─── */
function ScoreBar({
  label,
  value,
  color,
  sublabel,
}: {
  label: string;
  value: number;
  color: string;
  sublabel?: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span className="text-[var(--color-text-muted)]">
          {sublabel ?? `${value}%`}
        </span>
      </div>
      <div className="h-2 bg-[var(--color-border)] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

/* ─── Diagnosis Text Generator ─── */
function getDiagnosis(result: QuizResult): string {
  const { primaryType, maturityLevel, aiLevel } = result;
  const typeName = typeResults[primaryType].name;

  if (maturityLevel >= 4 && aiLevel >= 3) {
    return `${typeName}형 기록 스타일을 기반으로, PKM과 AI를 높은 수준으로 통합하고 있습니다. 기록이 시스템이 된 단계입니다.`;
  }
  if (maturityLevel >= 3 && aiLevel <= 2) {
    return `${typeName}형으로 꾸준히 기록하고 있지만, AI 활용에서 아직 기회를 놓치고 있습니다. AI를 기록에 연결하면 효율이 크게 올라갈 수 있습니다.`;
  }
  if (maturityLevel <= 2 && aiLevel >= 3) {
    return `AI는 적극적으로 활용하지만, 기록 습관이 아직 약합니다. ${typeName}형 성향에 맞는 간단한 기록 루틴부터 시작하면 AI 활용 효과가 배가됩니다.`;
  }
  if (maturityLevel <= 2 && aiLevel <= 2) {
    return `기록과 AI 모두 시작 단계입니다. ${typeName}형 성향을 살려 가벼운 기록 습관부터 만들어보세요. 작은 시작이 큰 변화를 만듭니다.`;
  }
  return `${typeName}형 기록 스타일이 뚜렷합니다. PKM 습관을 한 단계 끌어올리고, AI와의 연결을 강화하면 기록이 진짜 자산이 됩니다.`;
}

/* ─── Action Plan Generator ─── */
function getActionPlan(result: QuizResult): string[] {
  const actions: string[] = [];
  const bn = bottleneckResults[result.bottleneck];
  actions.push(bn.action);

  if (result.aiLevel <= 2) {
    actions.push(
      "이번 주에 AI에게 최근 메모 하나를 붙여넣고 \"핵심 3줄로 요약해줘\"라고 시켜보세요."
    );
  } else {
    actions.push(
      "자주 쓰는 AI에 나만의 프롬프트 템플릿을 저장해두고 반복 활용해보세요."
    );
  }

  if (result.maturityLevel <= 2) {
    actions.push(
      "하루 1분, 잠들기 전에 오늘 가장 인상 깊었던 한 가지만 적는 습관을 시작해보세요."
    );
  } else {
    actions.push(
      "주 1회 '메모 리뷰 타임'을 캘린더에 넣고 지난 기록을 훑어보세요."
    );
  }

  return actions;
}

/* ─── Result Screen ─── */
function ResultScreen({
  result,
  answerCode,
  onRestart,
}: {
  result: QuizResult;
  answerCode: string;
  onRestart: () => void;
}) {
  const primary = typeResults[result.primaryType];
  const secondary = result.secondaryType
    ? typeResults[result.secondaryType]
    : null;
  const output = outputResults[result.outputType];
  const bn = bottleneckResults[result.bottleneck];
  const [copied, setCopied] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [gateName, setGateName] = useState("");
  const [gateEmail, setGateEmail] = useState("");

  const handleUnlock = () => {
    if (!gateName.trim() || !gateEmail.trim() || !gateEmail.includes("@")) return;
    // Store lead data in localStorage + URL param for retrieval
    const leadData = {
      name: gateName,
      email: gateEmail,
      type: `${primary.name}${secondary ? ` × ${secondary.name}` : ""}`,
      maturityLevel: result.maturityLevel,
      aiLevel: result.aiLevel,
      timestamp: new Date().toISOString(),
      answerCode,
    };
    // Save to localStorage for now (Tally/webhook integration later)
    const leads = JSON.parse(localStorage.getItem("pkm-quiz-leads") || "[]");
    leads.push(leadData);
    localStorage.setItem("pkm-quiz-leads", JSON.stringify(leads));
    setUnlocked(true);
  };

  const diagnosis = getDiagnosis(result);
  const actions = getActionPlan(result);

  // Set URL with answer code
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("r", answerCode);
    window.history.replaceState({}, "", url.toString());
  }, [answerCode]);

  const radarData = [
    {
      label: "기록 성향",
      value: result.radarScores.style,
      color: primary.color,
    },
    {
      label: "PKM 성숙도",
      value: result.radarScores.maturity,
      color: "#22c55e",
    },
    { label: "AI 활용도", value: result.radarScores.ai, color: "#06b6d4" },
    { label: "아웃풋", value: result.radarScores.output, color: "#a855f7" },
    { label: "성장 단계", value: result.radarScores.bottleneck, color: "#f59e0b" },
  ];

  const getShareUrl = () => {
    if (typeof window === "undefined") return "";
    const url = new URL(window.location.href);
    url.searchParams.set("r", answerCode);
    return url.toString();
  };

  const shareText = `나의 기록 DNA: ${primary.emoji} ${primary.name}${secondary ? ` × ${secondary.emoji} ${secondary.name}` : ""}\nPKM 성숙도: Lv.${result.maturityLevel} ${result.maturityLabel}\nAI 활용도: Lv.${result.aiLevel} ${result.aiLabel}\n\n"${primary.quote}"\n\n당신의 기록 DNA는? 👉 ${getShareUrl()}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="max-w-lg w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <p className="text-xs font-medium tracking-widest text-[var(--color-text-muted)] uppercase">
            PKM × AI 분석 리포트
          </p>
          <p className="text-6xl">{primary.emoji}</p>
          <div>
            <h1 className="text-3xl font-bold">{primary.name}</h1>
            <p className="text-[var(--color-text-muted)] mt-1">
              {primary.nickname}
            </p>
          </div>
          {secondary && (
            <p className="text-sm">
              <span className="text-[var(--color-text-muted)]">
                서브 유형:{" "}
              </span>
              {secondary.emoji} {secondary.name}
            </p>
          )}
        </div>

        {/* Radar Chart */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4">
          <RadarChart data={radarData} />
        </div>

        {/* Diagnosis */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 space-y-3">
          <p className="font-semibold">📌 핵심 진단</p>
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            {diagnosis}
          </p>
        </div>

        {/* Score Bars */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 space-y-4">
          <p className="font-semibold">📊 상세 분석</p>
          <ScoreBar
            label={`✍️ 기록 성향 — ${primary.emoji} ${primary.name}`}
            value={result.radarScores.style}
            color={primary.color}
          />
          <ScoreBar
            label="📈 PKM 성숙도"
            value={result.radarScores.maturity}
            color="#22c55e"
            sublabel={`Lv.${result.maturityLevel} ${result.maturityLabel}`}
          />
          <ScoreBar
            label="🤖 AI 활용도"
            value={result.radarScores.ai}
            color="#06b6d4"
            sublabel={`Lv.${result.aiLevel} ${result.aiLabel}`}
          />
          <ScoreBar
            label={`🎯 아웃풋 — ${output.emoji} ${output.name}`}
            value={result.radarScores.output}
            color="#a855f7"
          />
          <ScoreBar
            label={`🔍 성장 단계 — ${bn.emoji} ${bn.name}`}
            value={result.radarScores.bottleneck}
            color="#f59e0b"
          />
        </div>

        {/* Combination Card */}
        {(() => {
          const combo = getCombinationInfo(result.primaryType, result.secondaryType);
          return (
            <div
              className="rounded-2xl border p-5 space-y-4"
              style={{
                borderColor: primary.color + "40",
                background: primary.color + "08",
              }}
            >
              <div>
                <p className="font-semibold text-lg">
                  {primary.emoji} {combo.title}
                </p>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">
                  {primary.name}{secondary ? ` × ${secondary.name}` : ""} 조합
                </p>
              </div>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                {combo.description}
              </p>
              <div className="rounded-xl bg-[var(--color-bg)] p-3 text-sm">
                <span className="font-semibold text-[var(--color-primary)]">💡 Tip — </span>
                <span className="text-[var(--color-text-muted)]">{combo.tip}</span>
              </div>
              <blockquote
                className="border-l-2 pl-4 italic text-[var(--color-text-muted)] text-sm"
                style={{ borderColor: primary.color }}
              >
                &ldquo;{primary.quote}&rdquo;
              </blockquote>
            </div>
          );
        })()}

        {/* Strengths */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 space-y-3">
          <p className="font-semibold">💪 강점</p>
          {getStrengths(result).map((s, i) => (
            <div key={i} className="flex gap-3 text-sm">
              <span className="shrink-0 text-green-400 mt-0.5">✓</span>
              <p className="text-[var(--color-text-muted)] leading-relaxed">{s}</p>
            </div>
          ))}
        </div>

        {/* ── EMAIL GATE ── */}
        {!unlocked ? (
          <>
            {/* Blurred preview */}
            <div className="relative">
              <div className="blur-[6px] pointer-events-none select-none space-y-6">
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 space-y-3">
                  <p className="font-semibold">⚡ 개선 포인트</p>
                  <div className="flex gap-3 text-sm">
                    <span className="shrink-0 text-orange-400 mt-0.5">→</span>
                    <p className="text-[var(--color-text-muted)]">구조를 잡는 데 시간을 쓰느라 실제 기록량이 줄어들 수 있습니다.</p>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <span className="shrink-0 text-orange-400 mt-0.5">→</span>
                    <p className="text-[var(--color-text-muted)]">기록 습관이 아직 불규칙합니다. 매일 1분이라도 적는 루틴이 필요합니다.</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 space-y-3">
                  <p className="font-semibold">🛠️ 맞춤 도구 추천</p>
                  <div className="rounded-xl bg-[var(--color-bg)] p-3 text-sm">
                    <p className="font-semibold">Notion</p>
                    <p className="text-[var(--color-text-muted)]">데이터베이스와 관계형 구조가 분류 체계에 최적입니다.</p>
                  </div>
                </div>
              </div>
              {/* Overlay CTA */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 text-center space-y-4 max-w-sm mx-4 shadow-2xl">
                  <div className="space-y-2">
                    <p className="text-2xl">🔒</p>
                    <p className="font-semibold">상세 분석 리포트 잠금 해제</p>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      개선 포인트, 맞춤 도구 추천, 학습 자료,<br />
                      액션 플랜까지 전체 리포트를 확인하세요.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="이름"
                      value={gateName}
                      onChange={(e) => setGateName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                    />
                    <input
                      type="email"
                      placeholder="이메일"
                      value={gateEmail}
                      onChange={(e) => setGateEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                    />
                    <button
                      onClick={handleUnlock}
                      disabled={!gateName.trim() || !gateEmail.trim() || !gateEmail.includes("@")}
                      className="w-full py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold transition-colors cursor-pointer"
                    >
                      🔓 전체 리포트 보기
                    </button>
                  </div>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    유형별 맞춤 가이드를 이메일로 보내드립니다.
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Improvements */}
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 space-y-3">
              <p className="font-semibold">⚡ 개선 포인트</p>
              {getImprovements(result).map((s, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <span className="shrink-0 text-orange-400 mt-0.5">→</span>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">{s}</p>
                </div>
              ))}
            </div>

            {/* Tool Recommendations */}
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 space-y-4">
              <p className="font-semibold">🛠️ 맞춤 도구 추천</p>
              <div className="space-y-3">
                {getToolRecommendations(result).map((tool, i) => (
                  <div key={i} className="rounded-xl bg-[var(--color-bg)] p-3 text-sm space-y-1">
                    <p className="font-semibold">{tool.name}</p>
                    <p className="text-[var(--color-text-muted)]">{tool.reason}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Resource Recommendations */}
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 space-y-4">
              <p className="font-semibold">📚 추천 학습 자료</p>
              <div className="space-y-3">
                {getResourceRecommendations(result).map((res, i) => (
                  <div key={i} className="flex gap-3 text-sm">
                    <span className="shrink-0 text-lg">{res.type.split(" ")[0]}</span>
                    <div>
                      <p className="font-medium">{res.title}</p>
                      <p className="text-[var(--color-text-muted)] text-xs mt-0.5">{res.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottleneck & Actions */}
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 space-y-4">
              <p className="font-semibold">🎯 이번 주 액션 플랜</p>
              <p className="text-xs text-[var(--color-text-muted)]">
                {bn.emoji} {bn.name} — {bn.description}
              </p>
              <div className="space-y-3">
                {actions.map((action, i) => (
                  <div key={i} className="flex gap-3 text-sm">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)]/20 text-[var(--color-primary)] flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    <p className="text-[var(--color-text-muted)] leading-relaxed">
                      {action}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 text-center space-y-3">
              <p className="font-semibold">📬 @productibe 팔로우하고 더 많은 팁 받기</p>
              <a
                href="https://www.threads.net/@productibe"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold transition-colors"
              >
                Threads에서 팔로우하기
              </a>
            </div>
          </>
        )}

        {/* Share & Restart */}
        <div className="flex gap-3">
          <button
            onClick={handleCopy}
            className="flex-1 py-3 rounded-xl border border-[var(--color-border)] hover:bg-[var(--color-card)] transition-colors cursor-pointer text-sm"
          >
            {copied ? "✅ 복사됨!" : "📋 결과 공유"}
          </button>
          <button
            onClick={onRestart}
            className="flex-1 py-3 rounded-xl border border-[var(--color-border)] hover:bg-[var(--color-card)] transition-colors cursor-pointer text-sm"
          >
            🔄 다시 하기
          </button>
        </div>

        <p className="text-center text-xs text-[var(--color-text-muted)]">
          생산적생산자 @productibe
        </p>
      </div>
    </div>
  );
}

/* ─── Main ─── */
export default function Home() {
  const [screen, setScreen] = useState<"intro" | "quiz" | "result">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Choice[]>([]);
  const [answerCode, setAnswerCode] = useState("");
  const [result, setResult] = useState<QuizResult | null>(null);

  // Check URL for shared result on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("r");
    if (code) {
      const decoded = decodeAnswers(code);
      if (decoded && decoded.length === questions.length) {
        const r = calculateResult(decoded);
        setAnswers(decoded);
        setAnswerCode(code);
        setResult(r);
        setScreen("result");
      }
    }
  }, []);

  const handleStart = () => {
    // Clear URL params
    window.history.replaceState({}, "", window.location.pathname);
    setScreen("quiz");
    setCurrentQ(0);
    setAnswers([]);
    setAnswerCode("");
    setResult(null);
  };

  const handleAnswer = useCallback(
    (choice: Choice) => {
      const newAnswers = [...answers, choice];
      setAnswers(newAnswers);

      if (currentQ + 1 < questions.length) {
        setCurrentQ(currentQ + 1);
      } else {
        const code = encodeAnswers(newAnswers);
        const r = calculateResult(newAnswers);
        setAnswerCode(code);
        setResult(r);
        setScreen("result");
      }
    },
    [answers, currentQ]
  );

  if (screen === "intro") return <IntroScreen onStart={handleStart} />;
  if (screen === "quiz")
    return (
      <QuestionScreen questionIndex={currentQ} onAnswer={handleAnswer} />
    );
  if (result)
    return <ResultScreen result={result} answerCode={answerCode} onRestart={handleStart} />;

  return null;
}
