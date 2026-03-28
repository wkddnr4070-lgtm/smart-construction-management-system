"use client";

import { FilterPanel } from "@/components/dashboard/filter-panel";
import { KpiCards } from "@/components/dashboard/kpi-cards";
import { ProjectTable } from "@/components/dashboard/project-table";
import { SummaryPanels } from "@/components/dashboard/summary-panels";
import { AppShell } from "@/components/layout/app-shell";
import { createKpis, filterProjects } from "@/lib/dashboard-utils";
import { mockProjects } from "@/lib/mock-data";
import { DashboardFilters } from "@/types/dashboard";
import { useMemo, useState } from "react";

const defaultFilters: DashboardFilters = {
  date: "",
  contractor: "전체",
  status: "전체",
  region: "전체",
  type: "전체"
};

export default function HomePage() {
  const [draftFilters, setDraftFilters] = useState<DashboardFilters>(defaultFilters);
  const [activeFilters, setActiveFilters] = useState<DashboardFilters>(defaultFilters);

  const filteredProjects = useMemo(() => filterProjects(mockProjects, activeFilters), [activeFilters]);
  const kpis = useMemo(() => createKpis(filteredProjects), [filteredProjects]);

  const handleFilterChange = (key: keyof DashboardFilters, value: string) => {
    setDraftFilters((previous) => ({ ...previous, [key]: value }));
  };

  const handleSearch = () => {
    setActiveFilters(draftFilters);
  };

  const handleReset = () => {
    setDraftFilters(defaultFilters);
    setActiveFilters(defaultFilters);
  };

  return (
    <AppShell>
      <div className="space-y-4">
        <FilterPanel filters={draftFilters} onChange={handleFilterChange} onSearch={handleSearch} onReset={handleReset} />
        <KpiCards kpis={kpis} />
        <SummaryPanels projects={filteredProjects} />
        <ProjectTable projects={filteredProjects} />
      </div>
    </AppShell>
  );
}
