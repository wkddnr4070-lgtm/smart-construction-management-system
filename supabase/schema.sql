-- Smart Construction Management System: Stage 3 base schema

create extension if not exists "pgcrypto";

create table if not exists construction_projects (
  id uuid primary key default gen_random_uuid(),
  project_no text not null unique,
  name text not null,
  project_type text not null,
  region text not null,
  address text,
  contractor text not null,
  start_date date not null,
  end_date date not null,
  status text not null default '예정',
  progress_rate int not null default 0,
  manager_name text,
  sap_key text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint progress_rate_range check (progress_rate between 0 and 100)
);

create table if not exists submissions (
  id uuid primary key default gen_random_uuid(),
  construction_project_id uuid not null references construction_projects(id) on delete cascade,
  submission_type text not null,
  submitter_name text not null,
  submitted_at timestamptz not null default now(),
  status text not null default '제출완료',
  reviewer_comment text,
  created_at timestamptz not null default now()
);

create table if not exists submission_files (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references submissions(id) on delete cascade,
  file_name text not null,
  file_path text not null,
  file_type text not null,
  uploaded_at timestamptz not null default now(),
  ai_analyzed boolean not null default false,
  ai_summary text
);

create table if not exists workflow_logs (
  id uuid primary key default gen_random_uuid(),
  construction_project_id uuid not null references construction_projects(id) on delete cascade,
  workflow_step text not null,
  actor_name text not null,
  action_status text not null,
  memo text,
  acted_at timestamptz not null default now()
);

create table if not exists mail_logs (
  id uuid primary key default gen_random_uuid(),
  construction_project_id uuid references construction_projects(id) on delete set null,
  subject text not null,
  recipients text[] not null,
  cc text[] default '{}',
  sent_at timestamptz not null default now(),
  attachment_paths text[] default '{}'
);

create table if not exists ai_analysis_results (
  id uuid primary key default gen_random_uuid(),
  submission_file_id uuid not null references submission_files(id) on delete cascade,
  analysis_type text not null,
  result_json jsonb not null,
  rule_score numeric(5,2),
  review_status text not null default '검토대기',
  reviewer_comment text,
  created_at timestamptz not null default now()
);

create index if not exists idx_projects_project_no on construction_projects(project_no);
create index if not exists idx_projects_status on construction_projects(status);
create index if not exists idx_submissions_project on submissions(construction_project_id);
create index if not exists idx_files_submission on submission_files(submission_id);
create index if not exists idx_workflow_project on workflow_logs(construction_project_id);
