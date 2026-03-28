import { SubmissionFileItem, SubmissionFormValues, SubmissionRecord, SubmissionStatus } from "@/types/submission";

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

const requiredFileTypes: SubmissionFileItem["type"][] = ["작업일보", "일일계획", "현장사진"];

export function validateSubmissionForm(values: SubmissionFormValues): ValidationResult {
  const errors: string[] = [];

  if (!values.projectNo.trim()) {
    errors.push("공사번호는 필수입니다.");
  }
  if (!values.projectName.trim()) {
    errors.push("공사명은 필수입니다.");
  }
  if (!values.contractor.trim()) {
    errors.push("협력사명은 필수입니다.");
  }
  if (!values.workDate) {
    errors.push("작업일자를 선택해주세요.");
  }
  if (!values.location.trim()) {
    errors.push("위치 정보는 필수입니다.");
  }
  if (!values.startDate || !values.endDate) {
    errors.push("공사기간(시작/종료)을 모두 입력해주세요.");
  }
  if (values.startDate && values.endDate && values.startDate > values.endDate) {
    errors.push("공사 시작일은 종료일보다 늦을 수 없습니다.");
  }
  if (!Number.isFinite(values.workforce) || values.workforce <= 0) {
    errors.push("투입 인력은 1명 이상이어야 합니다.");
  }

  for (const requiredType of requiredFileTypes) {
    const hasType = values.files.some((file) => file.type === requiredType);
    if (!hasType) {
      errors.push(`필수 첨부파일이 누락되었습니다: ${requiredType}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function toSubmissionRecord(values: SubmissionFormValues, status: SubmissionStatus): SubmissionRecord {
  return {
    ...values,
    id: `SUB-${Date.now()}`,
    submittedAt: new Date().toISOString(),
    status,
    reviewerComment: status === "임시저장" ? "임시저장 상태입니다." : "접수 완료, 담당자 검토 대기"
  };
}

export function formatFileSize(sizeKb: number) {
  if (sizeKb >= 1024) {
    return `${(sizeKb / 1024).toFixed(1)} MB`;
  }
  return `${sizeKb} KB`;
}
