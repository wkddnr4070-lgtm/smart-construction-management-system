"use client";

import { SubmissionForm } from "@/components/submissions/submission-form";
import { SubmissionList } from "@/components/submissions/submission-list";
import { AppShell } from "@/components/layout/app-shell";
import { initialSubmissions } from "@/lib/mock-submissions";
import { SubmissionRecord } from "@/types/submission";
import { useState } from "react";

export default function SubmissionsPage() {
  const [records, setRecords] = useState<SubmissionRecord[]>(initialSubmissions);

  const handleSaved = (record: SubmissionRecord) => {
    setRecords((prev) => [record, ...prev]);
  };

  return (
    <AppShell>
      <div className="space-y-4">
        <SubmissionForm onSaved={handleSaved} />
        <SubmissionList records={records} />
      </div>
    </AppShell>
  );
}
