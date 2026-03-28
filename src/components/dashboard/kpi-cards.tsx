import { DashboardKPI } from "@/types/dashboard";

interface KpiCardsProps {
  kpis: DashboardKPI[];
}

export function KpiCards({ kpis }: KpiCardsProps) {
  return (
    <section className="grid grid-cols-2 gap-3 xl:grid-cols-6">
      {kpis.map((kpi) => (
        <article key={kpi.label} className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">{kpi.label}</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{kpi.value}</p>
          <p className="mt-1 text-xs text-slate-400">{kpi.hint}</p>
        </article>
      ))}
    </section>
  );
}
