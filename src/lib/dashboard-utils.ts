import { ConstructionProject, DashboardFilters, DashboardKPI } from "@/types/dashboard";

const isAll = (value: string) => !value || value === "전체";

export function filterProjects(projects: ConstructionProject[], filters: DashboardFilters) {
  return projects.filter((project) => {
    const matchDate = !filters.date || project.startDate <= filters.date;
    const matchContractor = isAll(filters.contractor) || project.contractor === filters.contractor;
    const matchStatus = isAll(filters.status) || project.status === filters.status;
    const matchRegion = isAll(filters.region) || project.region === filters.region;
    const matchType = isAll(filters.type) || project.type === filters.type;

    return matchDate && matchContractor && matchStatus && matchRegion && matchType;
  });
}

export function createKpis(projects: ConstructionProject[]): DashboardKPI[] {
  const today = new Date().toISOString().slice(0, 10);

  return [
    { label: "전체 공사", value: projects.length, hint: "등록된 공사 기준" },
    {
      label: "오늘 예정",
      value: projects.filter((project) => project.startDate === today).length,
      hint: `${today} 시작 예정`
    },
    {
      label: "진행중",
      value: projects.filter((project) => project.status === "진행중").length,
      hint: "실시간 공정 모니터링"
    },
    {
      label: "지연",
      value: projects.filter((project) => project.status === "지연").length,
      hint: "우선 조치 필요"
    },
    {
      label: "승인 대기",
      value: projects.reduce((sum, project) => sum + project.pendingApprovals, 0),
      hint: "검토 요청 건수"
    },
    {
      label: "준공 대기",
      value: projects.filter((project) => project.status === "준공대기").length,
      hint: "준공계 생성 대상"
    }
  ];
}

export function formatDate(value: string) {
  if (!value) {
    return "-";
  }

  return new Date(value).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
}
