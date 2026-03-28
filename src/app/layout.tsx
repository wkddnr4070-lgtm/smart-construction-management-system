import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart 도시가스 공사관리",
  description: "도시가스 공사관리 PoC 대시보드"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
