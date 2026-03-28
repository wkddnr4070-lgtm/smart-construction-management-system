import { ConstructionProject } from "@/types/dashboard";

interface SummaryPanelsProps {
  projects: ConstructionProject[];
}

export function SummaryPanels({ projects }: SummaryPanelsProps) {
  const byRegion = projects.reduce<Record<string, number>>((acc, project) => {
    acc[project.region] = (acc[project.region] ?? 0) + 1;
    return acc;
  }, {});

  const byContractor = projects.reduce<Record<string, number>>((acc, project) => {
    acc[project.contractor] = (acc[project.contractor] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
      <article className="rounded-xl border border-slate-200 bg-white p-4">
        <h3 className="text-sm font-semibold text-slate-900">지역별 공사 분포</h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          {Object.entries(byRegion).map(([region, count]) => (
            <li key={region} className="flex justify-between">
              <span>{region}</span>
              <span className="font-semibold text-slate-800">{count}건</span>
            </li>
          ))}
        </ul>
      </article>

      <article className="rounded-xl border border-slate-200 bg-white p-4">
        <h3 className="text-sm font-semibold text-slate-900">협력사별 진행 건수</h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          {Object.entries(byContractor).map(([contractor, count]) => (
            <li key={contractor} className="flex justify-between">
              <span>{contractor}</span>
              <span className="font-semibold text-slate-800">{count}건</span>
            </li>
          ))}
        </ul>
      </article>

      <article className="rounded-xl border border-slate-200 bg-white p-4">
        <h3 className="text-sm font-semibold text-slate-900">주요 알림</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
          <li>지연 공사 1건: 부천 중동 압력조정기 교체</li>
          <li>승인 대기 총 {projects.reduce((sum, p) => sum + p.pendingApprovals, 0)}건</li>
          <li>금일 시작 예정 공사 확인 필요</li>
        </ul>
      </article>
    </section>
  );
}
