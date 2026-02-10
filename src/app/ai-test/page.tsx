"use client";

import { useState, useCallback, useEffect } from "react";
import {
  aiQuestions,
  aiLevelResults,
  aiCategoryLabels,
  type AIChoice,
  type AILevel,
} from "@/data/ai-questions";
import { calculateAIResult, type AIResult } from "@/lib/ai-scoring";
import RadarChart from "@/components/RadarChart";
import Link from "next/link";

/* ─── URL Encoding ─── */
function encodeAnswers(answers: AIChoice[]): string {
  return answers
    .map((choice, i) => {
      const q = aiQuestions[i];
      const idx = q.choices.indexOf(choice);
      return String.fromCharCode(97 + idx); // a, b, c, d
    })
    .join("");
}

function decodeAnswers(code: string): AIChoice[] | null {
  if (code.length !== aiQuestions.length) return null;
  try {
    return code
      .split("")
      .map((ch, i) => {
        const idx = ch.charCodeAt(0) - 97;
        if (idx < 0 || idx >= aiQuestions[i].choices.length) return null;
        return aiQuestions[i].choices[idx];
      })
      .filter((c): c is AIChoice => c !== null);
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
          <p className="text-6xl">🤖</p>
          <h1 className="text-3xl font-bold tracking-tight">
            당신의 AI 활용, 몇 레벨인가요?
          </h1>
          <p className="text-[var(--color-text-muted)] text-lg leading-relaxed">
            20가지 질문으로 알아보는
            <br />
            AI 활용 레벨 분석 리포트
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 text-sm">
          {(["observer", "experimenter", "practitioner", "poweruser", "architect"] as AILevel[]).map(
            (level) => (
              <div
                key={level}
                className="rounded-xl p-3 border border-[var(--color-border)] bg-[var(--color-card)] flex items-center gap-3"
              >
                <span className="text-2xl">{aiLevelResults[level].emoji}</span>
                <div className="text-left flex-1">
                  <p className="font-medium">{aiLevelResults[level].name}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    {aiLevelResults[level].nickname}
                  </p>
                </div>
              </div>
            )
          )}
        </div>

        <div className="text-left text-sm text-[var(--color-text-muted)] space-y-1 bg-[var(--color-card)] rounded-xl p-4 border border-[var(--color-border)]">
          <p className="font-medium text-[var(--color-text)]">📊 분석 항목</p>
          <p>• AI 활용 단계 — 얼마나 자주, 어떻게 쓰는가</p>
          <p>• 프롬프트 설계력 — 얼마나 잘 시키는가</p>
          <p>• 기록 연결도 — AI와 기록이 연결되어 있는가</p>
          <p>• 아웃풋 전환력 — 결과물을 어떻게 활용하는가</p>
        </div>

        <button
          onClick={onStart}
          className="w-full py-4 rounded-2xl bg-[#06b6d4] hover:bg-[#0891b2] text-white font-semibold text-lg transition-colors cursor-pointer"
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

/* ─── Question Screen ─── */
function QuestionScreen({
  questionIndex,
  onAnswer,
}: {
  questionIndex: number;
  onAnswer: (choice: AIChoice) => void;
}) {
  const q = aiQuestions[questionIndex];
  const progress = ((questionIndex + 1) / aiQuestions.length) * 100;
  const cat = aiCategoryLabels[q.category];
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = useCallback(
    (choice: AIChoice, idx: number) => {
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
              {questionIndex + 1} / {aiQuestions.length}
            </span>
          </div>
          <div className="h-1.5 bg-[var(--color-border)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#06b6d4] rounded-full transition-all duration-500 ease-out"
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
                  ? "border-[#06b6d4] bg-[#06b6d4]/10 scale-[0.98]"
                  : "border-[var(--color-border)] bg-[var(--color-card)] hover:border-[#06b6d4] hover:bg-[#06b6d4]/5"
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
  sublabel,
}: {
  label: string;
  value: number;
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
          style={{ width: `${value}%`, backgroundColor: "#06b6d4" }}
        />
      </div>
    </div>
  );
}

/* ─── Insight Generator ─── */
function getInsight(result: AIResult): string {
  const { level, categoryPercents } = result;

  // 가장 높은/낮은 카테고리 찾기
  const categories = [
    { name: "활용 빈도", key: "usage", value: categoryPercents.usage },
    { name: "프롬프트", key: "prompt", value: categoryPercents.prompt },
    { name: "기록 연결", key: "integration", value: categoryPercents.integration },
    { name: "아웃풋", key: "output", value: categoryPercents.output },
  ];
  const sorted = [...categories].sort((a, b) => b.value - a.value);
  const highest = sorted[0];
  const lowest = sorted[3];

  if (lowest.key === "integration") {
    return `${highest.name}은 강하지만, 기록과의 연결이 약합니다. 여기가 다음 레벨의 열쇠입니다.`;
  }

  if (lowest.key === "prompt") {
    return `AI를 자주 쓰지만, 프롬프트 설계에서 아직 기회를 놓치고 있습니다.`;
  }

  if (level === "architect") {
    return `AI와 기록을 시스템으로 연결한 상태입니다. 이제 이 시스템을 다른 사람에게 가르칠 차례입니다.`;
  }

  if (level === "poweruser") {
    return `AI 활용 수준이 높습니다. 기록 연결을 강화하면 반복 작업이 줄고 품질이 올라갑니다.`;
  }

  return `AI를 꾸준히 활용하고 있습니다. 기록과의 연결을 강화하면 한 단계 더 올라갈 수 있습니다.`;
}

/* ─── Action Generator ─── */
function getActions(result: AIResult): string[] {
  const actions: string[] = [];
  const { level, categoryPercents } = result;

  // integration이 낮으면
  if (categoryPercents.integration < 50) {
    actions.push(
      "이번 주에 AI에게 최근 메모 하나를 붙여넣고 맥락을 제공해보세요."
    );
  } else {
    actions.push("자주 쓰는 맥락을 템플릿화해서 재사용해보세요.");
  }

  // prompt가 낮으면
  if (categoryPercents.prompt < 50) {
    actions.push(
      '질문할 때 "역할 + 배경 + 출력 형식"을 명시해보세요. 결과가 달라집니다.'
    );
  } else {
    actions.push("자주 쓰는 프롬프트를 메모장에 정리해서 라이브러리를 만들어보세요.");
  }

  // output이 낮으면
  if (categoryPercents.output < 50) {
    actions.push(
      "AI 결과물을 그대로 쓰지 말고, 내 관점으로 한 번 재구성해보세요."
    );
  } else {
    actions.push("좋은 AI 결과물은 노트 시스템에 저장해서 재활용하세요.");
  }

  return actions;
}

/* ─── Result Screen ─── */
function ResultScreen({
  result,
  answerCode,
  onRestart,
}: {
  result: AIResult;
  answerCode: string;
  onRestart: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [gateName, setGateName] = useState("");
  const [gateEmail, setGateEmail] = useState("");

  const handleUnlock = () => {
    if (!gateName.trim() || !gateEmail.trim() || !gateEmail.includes("@"))
      return;
    const leadData = {
      name: gateName,
      email: gateEmail,
      level: result.levelInfo.name,
      totalScore: result.totalScore,
      timestamp: new Date().toISOString(),
      answerCode,
    };
    const leads = JSON.parse(
      localStorage.getItem("ai-test-leads") || "[]"
    );
    leads.push(leadData);
    localStorage.setItem("ai-test-leads", JSON.stringify(leads));
    setUnlocked(true);
  };

  const insight = getInsight(result);
  const actions = getActions(result);

  // Set URL with answer code
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("r", answerCode);
    window.history.replaceState({}, "", url.toString());
  }, [answerCode]);

  const radarData = [
    {
      label: "활용 빈도",
      value: result.categoryPercents.usage,
      color: "#06b6d4",
    },
    {
      label: "프롬프트",
      value: result.categoryPercents.prompt,
      color: "#8b5cf6",
    },
    {
      label: "기록 연결",
      value: result.categoryPercents.integration,
      color: "#f59e0b",
    },
    {
      label: "아웃풋",
      value: result.categoryPercents.output,
      color: "#10b981",
    },
  ];

  const getShareUrl = () => {
    if (typeof window === "undefined") return "";
    const url = new URL(window.location.href);
    url.searchParams.set("r", answerCode);
    return url.toString();
  };

  const shareText = `나의 AI 활용 레벨: ${result.levelInfo.emoji} ${result.levelInfo.name}\n"${result.levelInfo.nickname}"\n\n점수: ${result.totalScore}/60점\n\n당신의 AI 활용 레벨은? 👉 ${getShareUrl()}`;

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
            AI 활용 레벨 분석 리포트
          </p>
          <p className="text-6xl">{result.levelInfo.emoji}</p>
          <div>
            <h1 className="text-3xl font-bold">{result.levelInfo.name}</h1>
            <p className="text-[var(--color-text-muted)] mt-1">
              {result.levelInfo.nickname}
            </p>
          </div>
          <p className="text-sm text-[var(--color-text-muted)]">
            총점: {result.totalScore} / 60점
          </p>
        </div>

        {/* Radar Chart */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4">
          <RadarChart data={radarData} />
        </div>

        {/* Insight */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 space-y-3">
          <p className="font-semibold">💡 핵심 인사이트</p>
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            {insight}
          </p>
        </div>

        {/* Score Bars */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 space-y-4">
          <p className="font-semibold">📊 카테고리별 분석</p>
          <ScoreBar
            label={`🤖 AI 활용 단계 — ${result.categoryLabels.usage}`}
            value={result.categoryPercents.usage}
          />
          <ScoreBar
            label={`📝 프롬프트 설계력 — ${result.categoryLabels.prompt}`}
            value={result.categoryPercents.prompt}
          />
          <ScoreBar
            label={`🔗 기록 연결도 — ${result.categoryLabels.integration}`}
            value={result.categoryPercents.integration}
          />
          <ScoreBar
            label={`🎯 아웃풋 전환력 — ${result.categoryLabels.output}`}
            value={result.categoryPercents.output}
          />
        </div>

        {/* PKM Connection (중요!) */}
        <div
          className="rounded-2xl border p-5 space-y-3"
          style={{
            borderColor: result.levelInfo.color + "40",
            background: result.levelInfo.color + "08",
          }}
        >
          <p className="font-semibold text-lg">
            🔗 AI를 더 잘 쓰려면 기록이 필요합니다
          </p>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            {result.levelInfo.pkmConnection}
          </p>
          <div className="rounded-xl bg-[var(--color-bg)] p-3 text-sm">
            <span className="font-semibold" style={{ color: result.levelInfo.color }}>
              💡 핵심 —{" "}
            </span>
            <span className="text-[var(--color-text-muted)]">
              프롬프트를 잘 쓰는 게 아니라, 맥락을 잘 쌓는 사람이 AI를 잘 씁니다.
            </span>
          </div>
        </div>

        {/* ── EMAIL GATE ── */}
        {!unlocked ? (
          <>
            {/* Blurred preview */}
            <div className="relative">
              <div className="blur-[6px] pointer-events-none select-none space-y-6">
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 space-y-3">
                  <p className="font-semibold">🎯 이번 주 액션 플랜</p>
                  <div className="flex gap-3 text-sm">
                    <span className="shrink-0">1</span>
                    <p className="text-[var(--color-text-muted)]">
                      AI에게 최근 메모를 붙여넣고 맥락을 제공해보세요.
                    </p>
                  </div>
                </div>
              </div>
              {/* Overlay CTA */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 text-center space-y-4 max-w-sm mx-4 shadow-2xl">
                  <div className="space-y-2">
                    <p className="text-2xl">🔒</p>
                    <p className="font-semibold">액션 플랜 잠금 해제</p>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      레벨별 맞춤 액션 플랜과
                      <br />
                      AI × PKM 연결 가이드를 확인하세요.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="이름"
                      value={gateName}
                      onChange={(e) => setGateName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[#06b6d4] transition-colors"
                    />
                    <input
                      type="email"
                      placeholder="이메일"
                      value={gateEmail}
                      onChange={(e) => setGateEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[#06b6d4] transition-colors"
                    />
                    <button
                      onClick={handleUnlock}
                      disabled={
                        !gateName.trim() ||
                        !gateEmail.trim() ||
                        !gateEmail.includes("@")
                      }
                      className="w-full py-3 rounded-xl bg-[#06b6d4] hover:bg-[#0891b2] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold transition-colors cursor-pointer"
                    >
                      🔓 전체 리포트 보기
                    </button>
                  </div>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    레벨별 맞춤 가이드를 이메일로 보내드립니다.
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Actions */}
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 space-y-4">
              <p className="font-semibold">🎯 이번 주 액션 플랜</p>
              <div className="space-y-3">
                {actions.map((action, i) => (
                  <div key={i} className="flex gap-3 text-sm">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-[#06b6d4]/20 text-[#06b6d4] flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    <p className="text-[var(--color-text-muted)] leading-relaxed">
                      {action}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cross Promo - PKM Quiz */}
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 space-y-3">
              <p className="font-semibold">🧬 기록 DNA도 궁금하다면?</p>
              <p className="text-sm text-[var(--color-text-muted)]">
                AI를 잘 쓰려면 기록이 필요합니다. 당신의 기록 성향을 진단해보세요.
              </p>
              <Link
                href="/"
                className="inline-block w-full text-center py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold transition-colors"
              >
                👉 PKM 유형 진단하기
              </Link>
            </div>

            {/* CTA */}
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 text-center space-y-3">
              <p className="font-semibold">
                📬 @productibe 팔로우하고 더 많은 팁 받기
              </p>
              <a
                href="https://www.threads.net/@productibe"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full py-3 rounded-xl bg-[#06b6d4] hover:bg-[#0891b2] text-white font-semibold transition-colors"
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
export default function AITestPage() {
  const [screen, setScreen] = useState<"intro" | "quiz" | "result">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<AIChoice[]>([]);
  const [answerCode, setAnswerCode] = useState("");
  const [result, setResult] = useState<AIResult | null>(null);

  // Check URL for shared result on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("r");
    if (code) {
      const decoded = decodeAnswers(code);
      if (decoded && decoded.length === aiQuestions.length) {
        const r = calculateAIResult(decoded);
        setAnswers(decoded);
        setAnswerCode(code);
        setResult(r);
        setScreen("result");
      }
    }
  }, []);

  const handleStart = () => {
    window.history.replaceState({}, "", window.location.pathname);
    setScreen("quiz");
    setCurrentQ(0);
    setAnswers([]);
    setAnswerCode("");
    setResult(null);
  };

  const handleAnswer = useCallback(
    (choice: AIChoice) => {
      const newAnswers = [...answers, choice];
      setAnswers(newAnswers);

      if (currentQ + 1 < aiQuestions.length) {
        setCurrentQ(currentQ + 1);
      } else {
        const code = encodeAnswers(newAnswers);
        const r = calculateAIResult(newAnswers);
        setAnswerCode(code);
        setResult(r);
        setScreen("result");
      }
    },
    [answers, currentQ]
  );

  if (screen === "intro") return <IntroScreen onStart={handleStart} />;
  if (screen === "quiz")
    return <QuestionScreen questionIndex={currentQ} onAnswer={handleAnswer} />;
  if (result)
    return (
      <ResultScreen
        result={result}
        answerCode={answerCode}
        onRestart={handleStart}
      />
    );

  return null;
}
