import { ConstructionProject } from "@/types/dashboard";

export const mockProjects: ConstructionProject[] = [
  {
    id: "PJT-001",
    projectNo: "CG-2026-001",
    name: "강남구 역삼동 저압배관 교체",
    contractor: "한빛도시가스건설",
    region: "서울/강남",
    type: "배관교체",
    startDate: "2026-03-20",
    endDate: "2026-04-03",
    progressRate: 62,
    status: "진행중",
    pendingApprovals: 2
  },
  {
    id: "PJT-002",
    projectNo: "CG-2026-002",
    name: "김포 신도시 공급관 신설",
    contractor: "서해인프라",
    region: "경기/김포",
    type: "신설공사",
    startDate: "2026-03-28",
    endDate: "2026-04-25",
    progressRate: 10,
    status: "예정",
    pendingApprovals: 1
  },
  {
    id: "PJT-003",
    projectNo: "CG-2026-003",
    name: "부천 중동 압력조정기 교체",
    contractor: "동행플랜트",
    region: "경기/부천",
    type: "설비교체",
    startDate: "2026-03-16",
    endDate: "2026-03-26",
    progressRate: 88,
    status: "지연",
    pendingApprovals: 3
  },
  {
    id: "PJT-004",
    projectNo: "CG-2026-004",
    name: "인천 청라 공급시설 증설",
    contractor: "한빛도시가스건설",
    region: "인천/서구",
    type: "증설공사",
    startDate: "2026-03-01",
    endDate: "2026-03-30",
    progressRate: 97,
    status: "준공대기",
    pendingApprovals: 1
  }
];

export const regions = ["전체", "서울/강남", "경기/김포", "경기/부천", "인천/서구"];
export const contractors = ["전체", "한빛도시가스건설", "서해인프라", "동행플랜트"];
export const statuses = ["전체", "예정", "진행중", "지연", "준공대기"];
export const types = ["전체", "배관교체", "신설공사", "설비교체", "증설공사"];
