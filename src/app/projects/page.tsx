"use client";

import { AppShell } from "@/components/layout/app-shell";
import { createProject, listProjects } from "@/lib/project-repository";
import { ConstructionProject } from "@/types/dashboard";
import { FormEvent, useEffect, useMemo, useState } from "react";

interface ProjectForm {
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

const defaultForm: ProjectForm = {
  projectNo: "",
  name: "",
  type: "배관교체",
  region: "서울/강남",
  address: "",
  contractor: "",
  startDate: "",
  endDate: "",
  managerName: "",
  sapKey: ""
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ConstructionProject[]>([]);
  const [form, setForm] = useState<ProjectForm>(defaultForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    void loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError("");
      const rows = await listProjects();
      setProjects(rows);
    } catch (e) {
      setError(e instanceof Error ? e.message : "프로젝트 목록 조회에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = useMemo(() => {
    const errors: string[] = [];
    if (!form.projectNo.trim()) errors.push("공사번호를 입력해주세요.");
    if (!form.name.trim()) errors.push("공사명을 입력해주세요.");
    if (!form.contractor.trim()) errors.push("협력사를 입력해주세요.");
    if (!form.startDate || !form.endDate) errors.push("공사기간을 입력해주세요.");
    if (form.startDate && form.endDate && form.startDate > form.endDate) errors.push("시작일/종료일 순서를 확인해주세요.");
    return errors;
  }, [form]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setMessage("");

    if (validateForm.length > 0) {
      setError(validateForm.join(" "));
      return;
    }

    try {
      setLoading(true);
      setError("");
      const created = await createProject(form);
      setProjects((prev) => [created, ...prev]);
      setForm(defaultForm);
      setMessage("공사계획이 등록되었습니다.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "공사계획 등록에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const onChange = (key: keyof ProjectForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const input = "h-10 rounded-md border border-slate-200 px-3 text-sm";

  return (
    <AppShell>
      <div className="space-y-4">
        <section className="rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="mb-3 text-base font-semibold text-slate-900">공사계획 등록</h2>

          {error && <p className="mb-2 rounded-md bg-rose-50 p-2 text-sm text-rose-700">{error}</p>}
          {message && <p className="mb-2 rounded-md bg-emerald-50 p-2 text-sm text-emerald-700">{message}</p>}

          <form className="grid grid-cols-1 gap-3 lg:grid-cols-5" onSubmit={handleSubmit}>
            <input className={input} placeholder="공사번호" value={form.projectNo} onChange={(e) => onChange("projectNo", e.target.value)} />
            <input className={input} placeholder="공사명" value={form.name} onChange={(e) => onChange("name", e.target.value)} />
            <select className={input} value={form.type} onChange={(e) => onChange("type", e.target.value)}>
              <option>배관교체</option>
              <option>신설공사</option>
              <option>설비교체</option>
              <option>증설공사</option>
            </select>
            <select className={input} value={form.region} onChange={(e) => onChange("region", e.target.value)}>
              <option>서울/강남</option>
              <option>경기/김포</option>
              <option>경기/부천</option>
              <option>인천/서구</option>
            </select>
            <input className={input} placeholder="상세주소" value={form.address} onChange={(e) => onChange("address", e.target.value)} />
            <input className={input} placeholder="협력사" value={form.contractor} onChange={(e) => onChange("contractor", e.target.value)} />
            <input className={input} type="date" value={form.startDate} onChange={(e) => onChange("startDate", e.target.value)} />
            <input className={input} type="date" value={form.endDate} onChange={(e) => onChange("endDate", e.target.value)} />
            <input className={input} placeholder="담당자" value={form.managerName} onChange={(e) => onChange("managerName", e.target.value)} />
            <input className={input} placeholder="SAP(ECP) Key" value={form.sapKey} onChange={(e) => onChange("sapKey", e.target.value)} />

            <div className="lg:col-span-5 flex gap-2">
              <button disabled={loading} className="rounded-md bg-brand-500 px-4 py-2 text-sm font-semibold text-white">등록</button>
              <button type="button" onClick={() => setForm(defaultForm)} className="rounded-md border border-slate-200 px-4 py-2 text-sm">초기화</button>
            </div>
          </form>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900">공사계획 목록</div>
          {loading ? (
            <p className="p-4 text-sm text-slate-500">불러오는 중...</p>
          ) : projects.length === 0 ? (
            <p className="p-4 text-sm text-slate-500">등록된 공사가 없습니다.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-left text-slate-500">
                  <tr>
                    <th className="px-4 py-3">공사번호</th>
                    <th className="px-4 py-3">공사명</th>
                    <th className="px-4 py-3">협력사</th>
                    <th className="px-4 py-3">지역</th>
                    <th className="px-4 py-3">상태</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id} className="border-t border-slate-100">
                      <td className="px-4 py-3 font-medium">{project.projectNo}</td>
                      <td className="px-4 py-3">{project.name}</td>
                      <td className="px-4 py-3">{project.contractor}</td>
                      <td className="px-4 py-3">{project.region}</td>
                      <td className="px-4 py-3">{project.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}
