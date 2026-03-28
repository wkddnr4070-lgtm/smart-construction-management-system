"use client";

import { formatFileSize, toSubmissionRecord, validateSubmissionForm } from "@/lib/submission-utils";
import { SubmissionFileItem, SubmissionFormValues, SubmissionRecord } from "@/types/submission";
import { ChangeEvent, useMemo, useState } from "react";

const fileTypes: SubmissionFileItem["type"][] = ["작업일보", "일일계획", "준공도면", "현장사진", "산안비증빙", "기타"];

const defaultFormValues: SubmissionFormValues = {
  projectNo: "",
  projectName: "",
  contractor: "",
  workDate: "",
  location: "",
  startDate: "",
  endDate: "",
  workforce: 1,
  note: "",
  files: []
};

interface SubmissionFormProps {
  onSaved: (record: SubmissionRecord) => void;
}

const inputClass = "h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700";

export function SubmissionForm({ onSaved }: SubmissionFormProps) {
  const [form, setForm] = useState<SubmissionFormValues>(defaultFormValues);
  const [selectedFileType, setSelectedFileType] = useState<SubmissionFileItem["type"]>("작업일보");
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const fileCountByType = useMemo(() => {
    return form.files.reduce<Record<string, number>>((acc, file) => {
      acc[file.type] = (acc[file.type] ?? 0) + 1;
      return acc;
    }, {});
  }, [form.files]);

  const onChangeText = (key: keyof SubmissionFormValues, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const addFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const fileItem: SubmissionFileItem = {
      id: `file-${Date.now()}`,
      name: file.name,
      type: selectedFileType,
      sizeKb: Math.max(1, Math.round(file.size / 1024)),
      uploadedAt: new Date().toISOString()
    };

    setForm((prev) => ({ ...prev, files: [...prev.files, fileItem] }));
    event.target.value = "";
  };

  const deleteFile = (fileId: string) => {
    setForm((prev) => ({ ...prev, files: prev.files.filter((file) => file.id !== fileId) }));
  };

  const handleSave = (submit: boolean) => {
    setSuccessMessage("");
    if (submit) {
      const result = validateSubmissionForm(form);
      if (!result.isValid) {
        setErrors(result.errors);
        return;
      }
    }

    setErrors([]);
    const status = submit ? "제출완료" : "임시저장";
    const record = toSubmissionRecord(form, status);
    onSaved(record);
    setSuccessMessage(submit ? "제출이 완료되었습니다." : "임시저장되었습니다.");

    if (submit) {
      setForm(defaultFormValues);
    }
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-900">협력사 공사자료 접수</h2>
        <span className="rounded-md bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700">PoC 2단계</span>
      </div>

      {errors.length > 0 && (
        <div className="mb-3 rounded-md border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
          <p className="font-semibold">제출 전에 아래 항목을 확인해주세요.</p>
          <ul className="mt-1 list-disc pl-5">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {successMessage && <div className="mb-3 rounded-md bg-emerald-50 p-3 text-sm text-emerald-700">{successMessage}</div>}

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <input className={inputClass} placeholder="공사번호" value={form.projectNo} onChange={(e) => onChangeText("projectNo", e.target.value)} />
        <input className={inputClass} placeholder="공사명" value={form.projectName} onChange={(e) => onChangeText("projectName", e.target.value)} />
        <input className={inputClass} placeholder="협력사명" value={form.contractor} onChange={(e) => onChangeText("contractor", e.target.value)} />
        <input className={inputClass} type="date" value={form.workDate} onChange={(e) => onChangeText("workDate", e.target.value)} />
        <input className={inputClass} placeholder="위치 정보" value={form.location} onChange={(e) => onChangeText("location", e.target.value)} />
        <input
          className={inputClass}
          type="number"
          min={1}
          value={form.workforce}
          onChange={(e) => setForm((prev) => ({ ...prev, workforce: Number(e.target.value) || 0 }))}
        />
        <input className={inputClass} type="date" value={form.startDate} onChange={(e) => onChangeText("startDate", e.target.value)} />
        <input className={inputClass} type="date" value={form.endDate} onChange={(e) => onChangeText("endDate", e.target.value)} />
        <input className={inputClass} placeholder="비고" value={form.note} onChange={(e) => onChangeText("note", e.target.value)} />
      </div>

      <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
        <h3 className="text-sm font-semibold text-slate-900">파일 업로드</h3>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <select
            className="h-9 rounded-md border border-slate-200 bg-white px-3 text-sm"
            value={selectedFileType}
            onChange={(e) => setSelectedFileType(e.target.value as SubmissionFileItem["type"])}
          >
            {fileTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
          <label className="inline-flex h-9 cursor-pointer items-center rounded-md border border-slate-200 bg-white px-3 text-sm">
            파일추가
            <input type="file" className="hidden" onChange={addFile} />
          </label>
        </div>

        <ul className="mt-3 space-y-2">
          {form.files.length === 0 ? (
            <li className="text-sm text-slate-500">업로드된 파일이 없습니다.</li>
          ) : (
            form.files.map((file) => (
              <li key={file.id} className="flex items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm">
                <div>
                  <p className="font-medium text-slate-700">[{file.type}] {file.name}</p>
                  <p className="text-xs text-slate-500">{formatFileSize(file.sizeKb)} · {new Date(file.uploadedAt).toLocaleString("ko-KR")}</p>
                </div>
                <button className="rounded-md border border-rose-200 px-2 py-1 text-xs text-rose-700" onClick={() => deleteFile(file.id)}>
                  삭제
                </button>
              </li>
            ))
          )}
        </ul>

        <div className="mt-3 text-xs text-slate-500">
          파일 상태: {Object.entries(fileCountByType).map(([type, count]) => `${type} ${count}건`).join(" / ") || "없음"}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700" onClick={() => handleSave(false)}>
          임시저장
        </button>
        <button className="rounded-md bg-brand-500 px-3 py-2 text-sm font-semibold text-white" onClick={() => handleSave(true)}>
          제출
        </button>
        <button className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700">수정</button>
      </div>
    </section>
  );
}
