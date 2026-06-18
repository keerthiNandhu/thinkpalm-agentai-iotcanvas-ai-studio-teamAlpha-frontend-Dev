import { DashboardAnalysis } from "../types/dashboard";

const STORAGE_KEY = "iotcanvas_sessions";
const MAX_SESSIONS = 20;

export interface MemorySession {
  id: string;
  prd: string;
  dashboardType: string;
  widgetCount: number;
  createdAt: string;
  updatedAt: string;
  runCount: number;
}

export class MemoryService {
  saveSession(prd: string, analysis: DashboardAnalysis): void {
    const history = this.getHistory();

    // Normalize PRD for dedup: trim + collapse whitespace
    const normalizedPrd = prd.trim().replace(/\s+/g, " ");

    // Check if a session with the same PRD already exists
    const existingIndex = history.findIndex(
      (s) => s.prd.trim().replace(/\s+/g, " ") === normalizedPrd
    );

    let updated: MemorySession[];

    if (existingIndex !== -1) {
      // Update the existing entry in-place, bump it to top, increment run count
      const existing = history[existingIndex];
      const refreshed: MemorySession = {
        ...existing,
        dashboardType: analysis.dashboardType,
        widgetCount: analysis.widgets.length,
        updatedAt: new Date().toISOString(),
        runCount: existing.runCount + 1,
      };
      const rest = history.filter((_, i) => i !== existingIndex);
      updated = [refreshed, ...rest].slice(0, MAX_SESSIONS);
    } else {
      // Brand new PRD — insert at top
      const session: MemorySession = {
        id: crypto.randomUUID(),
        prd: normalizedPrd,
        dashboardType: analysis.dashboardType,
        widgetCount: analysis.widgets.length,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        runCount: 1,
      };
      updated = [session, ...history].slice(0, MAX_SESSIONS);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  getHistory(): MemorySession[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as MemorySession[];
      // Back-fill missing fields for older stored sessions
      return parsed.map((s) => ({
        ...s,
        updatedAt: s.updatedAt ?? s.createdAt,
        runCount: s.runCount ?? 1,
      }));
    } catch {
      return [];
    }
  }

  deleteSession(id: string): void {
    const updated = this.getHistory().filter((s) => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
}
