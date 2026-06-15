# IoTCanvas AI Studio — Architecture Specification Write-up

This document outlines the design and structural architecture of **IoTCanvas AI Studio**, a Next.js-based Multi-Agent system for automated telemetry dashboard planning.

---

## 1. Core Architecture Design

The application follows a modular pipeline flow mapping raw text product requirement specifications (PRDs) into structured React/Tailwind frontend code:

```
[ pasted requirements doc ]
         ↓
 1. RequirementAnalysisAgent (Parser)
         ↓  [Suggested Widgets + Reasons]
 2. WidgetRecommendationTool (Priorities)
         ↓  [Weighted Telemetries list]
 3. DashboardPlanningAgent (Layout sections mapping)
         ↓  [Sections: Top, Main, Right]
 4. TailwindLayoutTool (Responsive grid calculation)
         ↓  [Tailwind grid-cols class]
 5. ComponentTree (Interactive node modifier)
         ↓  [Real-time updates]
 6. Preview / Code Preview (Live site rendering & StackBlitz output)
```

---

## 2. Multi-Agent & Tool Pipeline Roles

The workspace utilizes dedicated agents and utility tools:

### Agents
1. **`RequirementAnalysisAgent`**: Scans input requirements text using keyword classification mappings. Detects key indicators (temperature, battery status, device uptime, warning alerts) and translates them into appropriate widget selections accompanied by logical reason strings.
2. **`DashboardPlanningAgent`**: Receives suggested widget lists and distributes them logically across three layout dashboard panels: **Top Panel** (critical high level aggregates), **Main Panel** (telemetry visualizations), and **Right Panel** (alert feeds). Distribution is calculated dynamically based on threshold rules.
3. **`ComponentGenerationAgent`**: Standardizes the formatting structure of exported TSX files by generating clean, production ready sections.

### Tools
1. **`WidgetRecommendationTool`**: Assigns weight and priority levels (`high` / `medium`) to widgets based on their telemetry roles (e.g. alerts/temperature tracking are marked high priority).
2. **`TailwindLayoutTool`**: Dynamically calculates grid columns based on active widget counts (e.g. 1 widget = 1 col, 2-3 widgets = 2 cols, 4-6 widgets = 3 cols, 7+ widgets = 4 cols) to prevent rendering layout squishing.
3. **`PreviewTool` & `ExportTool`**: Handles browser-level live previews, raw code copying, and Vite project compiling.

---

## 3. Storage & IDE Integration Exporter

- **MemoryService**: Serializes the session state and saves it locally in browser `localStorage`. Keeps history limited to the 5 most recent sessions and enables instant recall.
- **StackBlitz Exporter**: An inline compiler that bundles Vite configurations, tsconfig options, Tailwind CSS parameters, PostCSS modules, the custom layout code, and the source code of the four widgets (`DeviceCard`, `TemperatureChart`, `BatteryGauge`, `AlertPanel`) into a unified workspace. It submits a programmatical POST request to StackBlitz to launch a running cloud workspace in one click.

---

## 4. Collaboration Model

Developed collaboratively by **Keerthi C** and **Kavya Sebastian**. Responsibilities were shared across architectural planning, frontend layout rendering, and pipeline state verification.
