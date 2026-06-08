import { DashboardAnalysis } from "../types/dashboard";

const STORAGE_KEY = "iotcanvas_sessions";
const MAX_SESSIONS = 5;

export interface MemorySession {
  id: string;
  prd: string;
  dashboardType: string;
  widgetCount: number;
  createdAt: string;
}

export class MemoryService {
  saveSession(prd: string, analysis: DashboardAnalysis): void {
    const history = this.getHistory();

    const session: MemorySession = {
      id: crypto.randomUUID(),
      prd,
      dashboardType: analysis.dashboardType,
      widgetCount: analysis.widgets.length,
      createdAt: new Date().toISOString(),
    };

    const updated = [session, ...history].slice(0, MAX_SESSIONS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  getHistory(): MemorySession[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as MemorySession[]) : [];
    } catch {
      return [];
    }
  }
}
