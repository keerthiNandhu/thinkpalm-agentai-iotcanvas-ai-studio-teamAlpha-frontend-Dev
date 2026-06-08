import { DashboardPlan, LayoutSection } from "../types/dashboard";

export class DashboardPlanningAgent {
  planDashboard(widgets: string[]): DashboardPlan {
    const count = widgets.length;
    const sections: LayoutSection[] = [];

    if (count === 0) {
      return { sections: [], tailwind: "grid gap-6 grid-cols-1" };
    }

    if (count <= 2) {
      // 1–2 widgets: Top only
      sections.push({ name: "Top", widgets });
    } else if (count <= 4) {
      // 3–4 widgets: Top + Main
      sections.push({ name: "Top", widgets: widgets.slice(0, 2) });
      sections.push({ name: "Main", widgets: widgets.slice(2) });
    } else {
      // 5+ widgets: Top + Main + Right
      sections.push({ name: "Top", widgets: widgets.slice(0, 2) });
      sections.push({ name: "Main", widgets: widgets.slice(2, 4) });
      sections.push({ name: "Right", widgets: widgets.slice(4) });
    }

    const tailwind = this._gridClass(count);
    return { sections, tailwind };
  }

  private _gridClass(count: number): string {
    if (count === 1) return "grid gap-6 grid-cols-1";
    if (count <= 3) return "grid gap-6 grid-cols-2";
    if (count <= 6) return "grid gap-6 grid-cols-3";
    return "grid gap-6 grid-cols-4";
  }
}
