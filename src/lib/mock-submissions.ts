import { SubmissionFileItem, SubmissionRecord } from "@/types/submission";

const now = new Date().toISOString();

export const initialSubmissionFiles: SubmissionFileItem[] = [
  {
    id: "file-1",
    name: "작업일보_2026-03-28.xlsx",
    type: "작업일보",
    sizeKb: 540,
    uploadedAt: now
  },
  {
    id: "file-2",
    name: "현장사진_역삼동_01.jpg",
    type: "현장사진",
    sizeKb: 1820,
    uploadedAt: now
  }
];

export const initialSubmissions: SubmissionRecord[] = [
  {
    id: "SUB-2026-001",
    projectNo: "CG-2026-001",
    projectName: "강남구 역삼동 저압배관 교체",
    contractor: "한빛도시가스건설",
    workDate: "2026-03-28",
    location: "서울 강남구 역삼동 00-1",
    startDate: "2026-03-20",
    endDate: "2026-04-03",
    workforce: 12,
    note: "오전 굴착 완료, 오후 배관 연결 예정",
    files: initialSubmissionFiles,
    status: "수정요청",
    submittedAt: now,
    reviewerComment: "준공도면 파일이 누락되었습니다. 보완 후 재제출해주세요."
  },
  {
    id: "SUB-2026-002",
    projectNo: "CG-2026-002",
    projectName: "김포 신도시 공급관 신설",
    contractor: "서해인프라",
    workDate: "2026-03-28",
    location: "경기 김포시 장기동",
    startDate: "2026-03-28",
    endDate: "2026-04-25",
    workforce: 9,
    note: "장비 반입 및 안전교육 완료",
    files: [
      {
        id: "file-3",
        name: "일일공사계획_김포.pdf",
        type: "일일계획",
        sizeKb: 420,
        uploadedAt: now
      }
    ],
    status: "제출완료",
    submittedAt: now,
    reviewerComment: "검토 진행 중"
  }
];
