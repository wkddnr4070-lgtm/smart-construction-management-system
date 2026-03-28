export type SubmissionStatus = "임시저장" | "제출완료" | "수정요청";

export interface SubmissionFileItem {
  id: string;
  name: string;
  type: "작업일보" | "일일계획" | "준공도면" | "현장사진" | "산안비증빙" | "기타";
  sizeKb: number;
  uploadedAt: string;
}

export interface SubmissionFormValues {
  projectNo: string;
  projectName: string;
  contractor: string;
  workDate: string;
  location: string;
  startDate: string;
  endDate: string;
  workforce: number;
  note: string;
  files: SubmissionFileItem[];
}

export interface SubmissionRecord extends SubmissionFormValues {
  id: string;
  status: SubmissionStatus;
  submittedAt: string;
  reviewerComment?: string;
}
