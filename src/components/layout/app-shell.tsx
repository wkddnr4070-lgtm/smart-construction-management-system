"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const menus = [
  { label: "대시보드", href: "/" },
  { label: "공사계획", href: "/projects" },
  { label: "제출서류", href: "/submissions" },
  { label: "승인관리", href: "/approvals" },
  { label: "착공·기성·준공계", href: "/documents" },
  { label: "메일 발송", href: "/mails" },
  { label: "AI 분석 결과", href: "/ai-analysis" },
  { label: "설정", href: "/settings" }
];

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Smart 도시가스 공사관리</h1>
            <p className="text-sm text-slate-500">역할: 공사관리담당자 · 오늘 기준 진행현황 요약 제공</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="rounded-md border border-brand-100 bg-brand-50 px-3 py-2 text-sm font-medium text-brand-700">
              빠른 이동
            </button>
            <button className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-600">알림 3건</button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] grid-cols-[220px_1fr] gap-6 p-6">
        <aside className="rounded-xl border border-slate-200 bg-white p-3">
          <nav className="space-y-1">
            {menus.map((menu) => {
              const active = pathname === menu.href;
              return (
                <Link
                  key={menu.label}
                  href={menu.href}
                  className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                    active ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {menu.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main>{children}</main>
      </div>
    </div>
  );
}
