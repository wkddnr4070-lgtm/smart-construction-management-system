"use client";

import { SubmissionRecord, SubmissionStatus } from "@/types/submission";
import { useMemo, useState } from "react";

type SortKey = "submittedAt" | "projectNo" | "status";

interface SubmissionListProps {
  records: SubmissionRecord[];
}

const badgeMap: Record<SubmissionStatus, string> = {
  임시저장: "bg-slate-100 text-slate-700",
  제출완료: "bg-blue-50 text-blue-700",
  수정요청: "bg-amber-50 text-amber-700"
};

export function SubmissionList({ records }: SubmissionListProps) {
  const [sortKey, setSortKey] = useState<SortKey>("submittedAt");
  const [desc, setDesc] = useState(true);

  const sorted = useMemo(() => {
    const list = [...records];
    list.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av < bv) return desc ? 1 : -1;
      if (av > bv) return desc ? -1 : 1;
      return 0;
    });
    return list;
  }, [records, sortKey, desc]);

  const changeSort = (key: SortKey) => {
    if (sortKey === key) {
      setDesc((p) => !p);
      return;
    }
    setSortKey(key);
    setDesc(true);
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <h2 className="text-base font-semibold text-slate-900">제출 내역</h2>
        <p className="text-xs text-slate-500">정렬: {sortKey} ({desc ? "내림차순" : "오름차순"})</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-500">
            <tr>
              <th className="px-4 py-3">
                <button className="font-semibold" onClick={() => changeSort("projectNo")}>공사번호</button>
              </th>
              <th className="px-4 py-3">공사명</th>
              <th className="px-4 py-3">협력사</th>
              <th className="px-4 py-3">
                <button className="font-semibold" onClick={() => changeSort("status")}>상태</button>
              </th>
              <th className="px-4 py-3">수정요청 확인</th>
              <th className="px-4 py-3">
                <button className="font-semibold" onClick={() => changeSort("submittedAt")}>제출시각</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td className="px-4 py-8 text-center text-slate-500" colSpan={6}>아직 제출 내역이 없습니다.</td>
              </tr>
            ) : (
              sorted.map((record) => (
                <tr key={record.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-medium text-slate-800">{record.projectNo}</td>
                  <td className="px-4 py-3">{record.projectName}</td>
                  <td className="px-4 py-3">{record.contractor}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${badgeMap[record.status]}`}>{record.status}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600">{record.reviewerComment ?? "-"}</td>
                  <td className="px-4 py-3">{new Date(record.submittedAt).toLocaleString("ko-KR")}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
