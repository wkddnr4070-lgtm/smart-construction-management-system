export type ProjectStatus = "예정" | "진행중" | "지연" | "준공대기";

export interface ConstructionProject {
  id: string;
  projectNo: string;
  name: string;
  contractor: string;
  region: string;
  type: string;
  startDate: string;
  endDate: string;
  progressRate: number;
  status: ProjectStatus;
  pendingApprovals: number;
}

export interface DashboardKPI {
  label: string;
  value: number;
  hint: string;
}

export interface DashboardFilters {
  date: string;
  contractor: string;
  status: string;
  region: string;
  type: string;
}
