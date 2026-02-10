import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "당신의 기록 DNA는? | PKM 유형 진단",
  description: "7가지 질문으로 알아보는 나만의 기록 스타일. 건축가, 정원사, 학생, 사서 — 당신은 어떤 유형?",
  openGraph: {
    title: "당신의 기록 DNA는?",
    description: "7가지 질문으로 알아보는 나만의 기록 스타일",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
