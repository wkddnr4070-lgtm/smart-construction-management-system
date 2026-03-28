import { appConfig } from "@/lib/config";
import { getDataSourceMode } from "@/lib/data-source";
import { mockProjects } from "@/lib/mock-data";
import { ConstructionProject } from "@/types/dashboard";

export interface CreateProjectInput {
  projectNo: string;
  name: string;
  type: string;
  region: string;
  address: string;
  contractor: string;
  startDate: string;
  endDate: string;
  managerName: string;
  sapKey: string;
}

const mockStore: ConstructionProject[] = [...mockProjects];

export async function listProjects(): Promise<ConstructionProject[]> {
  const mode = getDataSourceMode();

  if (mode === "mock") {
    return [...mockStore];
  }

  const response = await fetch(`${appConfig.supabaseUrl}/rest/v1/construction_projects?select=*`, {
    headers: {
      apikey: appConfig.supabaseAnonKey,
      Authorization: `Bearer ${appConfig.supabaseAnonKey}`
    },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Supabase 프로젝트 목록 조회에 실패했습니다.");
  }

  const rows = await response.json();
  return rows.map((row: any) => ({
    id: row.id,
    projectNo: row.project_no,
    name: row.name,
    contractor: row.contractor,
    region: row.region,
    type: row.project_type,
    startDate: row.start_date,
    endDate: row.end_date,
    progressRate: row.progress_rate,
    status: row.status,
    pendingApprovals: 0
  })) as ConstructionProject[];
}

export async function createProject(input: CreateProjectInput): Promise<ConstructionProject> {
  const mode = getDataSourceMode();

  if (mode === "mock") {
    const created: ConstructionProject = {
      id: `PJT-${Date.now()}`,
      projectNo: input.projectNo,
      name: input.name,
      contractor: input.contractor,
      region: input.region,
      type: input.type,
      startDate: input.startDate,
      endDate: input.endDate,
      progressRate: 0,
      status: "예정",
      pendingApprovals: 0
    };
    mockStore.unshift(created);
    return created;
  }

  const payload = {
    project_no: input.projectNo,
    name: input.name,
    project_type: input.type,
    region: input.region,
    address: input.address,
    contractor: input.contractor,
    start_date: input.startDate,
    end_date: input.endDate,
    status: "예정",
    progress_rate: 0,
    manager_name: input.managerName,
    sap_key: input.sapKey
  };

  const response = await fetch(`${appConfig.supabaseUrl}/rest/v1/construction_projects`, {
    method: "POST",
    headers: {
      apikey: appConfig.supabaseAnonKey,
      Authorization: `Bearer ${appConfig.supabaseAnonKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Supabase 프로젝트 등록에 실패했습니다.");
  }

  const [row] = await response.json();
  return {
    id: row.id,
    projectNo: row.project_no,
    name: row.name,
    contractor: row.contractor,
    region: row.region,
    type: row.project_type,
    startDate: row.start_date,
    endDate: row.end_date,
    progressRate: row.progress_rate,
    status: row.status,
    pendingApprovals: 0
  } as ConstructionProject;
}
