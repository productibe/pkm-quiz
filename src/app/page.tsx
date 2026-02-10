"use client";

import { useState } from "react";
import { questions, typeResults, type PKMType } from "@/data/questions";

function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center space-y-8">
        <div className="space-y-2">
          <p className="text-5xl">🧬</p>
          <h1 className="text-3xl font-bold tracking-tight">
            당신의 기록 DNA는?
          </h1>
          <p className="text-[var(--color-text-muted)] text-lg">
            7가지 질문으로 알아보는 나만의 기록 스타일
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

        <button
          onClick={onStart}
          className="w-full py-4 rounded-2xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold text-lg transition-colors cursor-pointer"
        >
          시작하기
        </button>

        <p className="text-xs text-[var(--color-text-muted)]">
          약 2분 소요 · 생산적생산자 @productibe
        </p>
      </div>
    </div>
  );
}

function QuestionScreen({
  questionIndex,
  onAnswer,
}: {
  questionIndex: number;
  onAnswer: (type: PKMType) => void;
}) {
  const q = questions[questionIndex];
  const progress = ((questionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg w-full space-y-8">
        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-[var(--color-text-muted)]">
            <span>Q{questionIndex + 1}</span>
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
        <h2 className="text-xl font-bold whitespace-pre-line leading-relaxed">
          {q.question}
        </h2>

        {/* Choices */}
        <div className="space-y-3">
          {q.choices.map((choice, i) => (
            <button
              key={i}
              onClick={() => onAnswer(choice.type)}
              className="w-full text-left p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all cursor-pointer"
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

function ResultScreen({
  primary,
  secondary,
  onRestart,
}: {
  primary: PKMType;
  secondary: PKMType | null;
  onRestart: () => void;
}) {
  const result = typeResults[primary];
  const sub = secondary ? typeResults[secondary] : null;
  const [copied, setCopied] = useState(false);

  const shareText = `나의 기록 DNA: ${result.emoji} ${result.name}${sub ? ` × ${sub.emoji} ${sub.name}` : ""}\n\n"${result.quote}"\n\n당신의 기록 DNA는? 👉`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full space-y-8">
        {/* Result header */}
        <div className="text-center space-y-4">
          <p className="text-6xl">{result.emoji}</p>
          <div>
            <p className="text-sm text-[var(--color-text-muted)] mb-1">
              당신의 기록 DNA
            </p>
            <h1 className="text-3xl font-bold">{result.name}</h1>
            <p className="text-[var(--color-text-muted)] mt-1">
              {result.nickname}
            </p>
          </div>
          {sub && (
            <p className="text-sm">
              <span className="text-[var(--color-text-muted)]">
                서브 유형:{" "}
              </span>
              <span>
                {sub.emoji} {sub.name}
              </span>
            </p>
          )}
        </div>

        {/* Type card */}
        <div
          className="rounded-2xl border p-6 space-y-5"
          style={{
            borderColor: result.color + "40",
            background: result.color + "08",
          }}
        >
          <p className="leading-relaxed">{result.description}</p>

          <div className="space-y-3 text-sm">
            <div>
              <span className="font-semibold text-[var(--color-primary)]">
                💪 강점
              </span>
              <p className="mt-1 text-[var(--color-text-muted)]">
                {result.strength}
              </p>
            </div>
            <div>
              <span className="font-semibold text-orange-400">⚡ 약점</span>
              <p className="mt-1 text-[var(--color-text-muted)]">
                {result.weakness}
              </p>
            </div>
            <div>
              <span className="font-semibold text-purple-400">
                🌱 성장 포인트
              </span>
              <p className="mt-1 text-[var(--color-text-muted)]">
                {result.growth}
              </p>
            </div>
            <div>
              <span className="font-semibold text-blue-400">🛠️ 추천 도구</span>
              <p className="mt-1 text-[var(--color-text-muted)]">
                {result.tools}
              </p>
            </div>
          </div>

          <blockquote
            className="border-l-2 pl-4 italic text-[var(--color-text-muted)]"
            style={{ borderColor: result.color }}
          >
            &ldquo;{result.quote}&rdquo;
          </blockquote>
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 text-center space-y-3">
          <p className="font-semibold">📬 나에게 맞는 기록법이 궁금하다면?</p>
          <p className="text-sm text-[var(--color-text-muted)]">
            유형별 맞춤 PKM 가이드를 무료로 보내드립니다.
          </p>
          <a
            href="https://www.threads.net/@productibe"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold transition-colors"
          >
            @productibe 팔로우하기
          </a>
        </div>

        {/* Share & restart */}
        <div className="flex gap-3">
          <button
            onClick={handleCopy}
            className="flex-1 py-3 rounded-xl border border-[var(--color-border)] hover:bg-[var(--color-card)] transition-colors cursor-pointer text-sm"
          >
            {copied ? "✅ 복사됨!" : "📋 결과 복사"}
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

export default function Home() {
  const [screen, setScreen] = useState<"intro" | "quiz" | "result">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<PKMType[]>([]);

  const handleStart = () => {
    setScreen("quiz");
    setCurrentQ(0);
    setAnswers([]);
  };

  const handleAnswer = (type: PKMType) => {
    const newAnswers = [...answers, type];
    setAnswers(newAnswers);

    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setScreen("result");
    }
  };

  const getResults = () => {
    const counts: Record<PKMType, number> = {
      architect: 0,
      gardener: 0,
      student: 0,
      librarian: 0,
    };
    answers.forEach((a) => counts[a]++);
    const sorted = (Object.entries(counts) as [PKMType, number][]).sort(
      (a, b) => b[1] - a[1]
    );
    return {
      primary: sorted[0][0],
      secondary: sorted[1][1] > 0 ? sorted[1][0] : null,
    };
  };

  if (screen === "intro") return <IntroScreen onStart={handleStart} />;
  if (screen === "quiz")
    return <QuestionScreen questionIndex={currentQ} onAnswer={handleAnswer} />;

  const { primary, secondary } = getResults();
  return (
    <ResultScreen
      primary={primary}
      secondary={secondary}
      onRestart={handleStart}
    />
  );
}
