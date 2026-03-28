import { formatDate } from "@/lib/dashboard-utils";
import { ConstructionProject, ProjectStatus } from "@/types/dashboard";
import Link from "next/link";

interface ProjectTableProps {
  projects: ConstructionProject[];
}

const badgeClassMap: Record<ProjectStatus, string> = {
  예정: "bg-slate-100 text-slate-700",
  진행중: "bg-blue-50 text-blue-700",
  지연: "bg-rose-50 text-rose-700",
  준공대기: "bg-emerald-50 text-emerald-700"
};

export function ProjectTable({ projects }: ProjectTableProps) {
  if (!projects.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
        조건에 맞는 공사가 없습니다. 필터를 조정해주세요.
      </div>
    );
  }

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-4 py-3">
        <h2 className="text-base font-semibold text-slate-900">공사 목록</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-500">
            <tr>
              <th className="px-4 py-3">공사번호</th>
              <th className="px-4 py-3">공사명</th>
              <th className="px-4 py-3">협력사</th>
              <th className="px-4 py-3">지역</th>
              <th className="px-4 py-3">기간</th>
              <th className="px-4 py-3">공정률</th>
              <th className="px-4 py-3">상태</th>
              <th className="px-4 py-3 text-right">작업</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-800">{project.projectNo}</td>
                <td className="px-4 py-3">{project.name}</td>
                <td className="px-4 py-3">{project.contractor}</td>
                <td className="px-4 py-3">{project.region}</td>
                <td className="px-4 py-3">{formatDate(project.startDate)} ~ {formatDate(project.endDate)}</td>
                <td className="px-4 py-3">{project.progressRate}%</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${badgeClassMap[project.status]}`}>
                    {project.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="inline-flex gap-2">
                    <Link href="/submissions" className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700">
                      상세보기
                    </Link>
                    <Link href="/documents" className="rounded-md bg-brand-500 px-3 py-1.5 text-xs font-medium text-white">
                      보고서 생성
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
