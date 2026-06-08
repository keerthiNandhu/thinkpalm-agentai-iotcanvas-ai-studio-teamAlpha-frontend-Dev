export interface WidgetAnalysis {
  name: string;
  reason: string;
}

export interface DashboardAnalysis {
  dashboardType: string;
  widgets: WidgetAnalysis[];
}

export interface LayoutSection {
  name: string;
  widgets: string[];
}

export interface DashboardPlan {
  sections: LayoutSection[];
  tailwind: string;
}

export interface Dashboard {}

export interface DashboardComponent {}

export interface DashboardWidget {}

export interface PipelineState {}
