import { contractors, regions, statuses, types } from "@/lib/mock-data";
import { DashboardFilters } from "@/types/dashboard";

interface FilterPanelProps {
  filters: DashboardFilters;
  onChange: (key: keyof DashboardFilters, value: string) => void;
  onSearch: () => void;
  onReset: () => void;
}

const selectClass =
  "h-10 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:border-brand-500 focus:outline-none";

export function FilterPanel({ filters, onChange, onSearch, onReset }: FilterPanelProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4">
      <h2 className="mb-3 text-base font-semibold text-slate-900">공사 검색 필터</h2>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-6">
        <input
          type="date"
          className={selectClass}
          value={filters.date}
          onChange={(event) => onChange("date", event.target.value)}
        />

        <select
          className={selectClass}
          value={filters.contractor}
          onChange={(event) => onChange("contractor", event.target.value)}
        >
          {contractors.map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>

        <select className={selectClass} value={filters.status} onChange={(event) => onChange("status", event.target.value)}>
          {statuses.map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>

        <select className={selectClass} value={filters.region} onChange={(event) => onChange("region", event.target.value)}>
          {regions.map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>

        <select className={selectClass} value={filters.type} onChange={(event) => onChange("type", event.target.value)}>
          {types.map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>

        <div className="flex gap-2">
          <button
            onClick={onSearch}
            className="h-10 flex-1 rounded-md bg-brand-500 px-3 text-sm font-semibold text-white hover:bg-brand-700"
          >
            검색
          </button>
          <button
            onClick={onReset}
            className="h-10 flex-1 rounded-md border border-slate-200 px-3 text-sm font-semibold text-slate-700"
          >
            초기화
          </button>
        </div>
      </div>
    </section>
  );
}
