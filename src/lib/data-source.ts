import { isSupabaseConfigured } from "@/lib/config";

export type DataSourceMode = "mock" | "supabase-rest";

export function getDataSourceMode(): DataSourceMode {
  return isSupabaseConfigured() ? "supabase-rest" : "mock";
}
