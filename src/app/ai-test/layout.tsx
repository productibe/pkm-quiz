import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI 활용 레벨 테스트 | 당신의 AI 활용, 몇 레벨인가요?",
  description:
    "20가지 질문으로 알아보는 AI 활용 레벨 분석 리포트. 활용 단계, 프롬프트 설계력, 기록 연결도, 아웃풋 전환력을 진단하고 맞춤 액션 플랜을 받아보세요.",
  openGraph: {
    title: "AI 활용 레벨 테스트",
    description:
      "프롬프트를 잘 쓰는 게 아니라, 맥락을 잘 쌓는 사람이 AI를 잘 씁니다.",
    type: "website",
  },
};

export default function AITestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
