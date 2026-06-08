"use client";

import { DashboardAnalysis } from "../types/dashboard";

interface DashboardSummaryProps {
  analysis: DashboardAnalysis | null;
}

export default function DashboardSummary({ analysis }: DashboardSummaryProps) {
  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>Dashboard Summary</h2>

      {!analysis ? (
        <p style={styles.empty}>No dashboard generated yet.</p>
      ) : (
        <>
          <div style={styles.typeRow}>
            <span style={styles.label}>Dashboard Type</span>
            <span style={styles.badge}>{analysis.dashboardType}</span>
          </div>

          <hr style={styles.divider} />

          <h3 style={styles.subheading}>
            Recommended Widgets ({analysis.widgets.length})
          </h3>

          {analysis.widgets.length === 0 ? (
            <p style={styles.empty}>
              No widgets matched. Try mentioning temperature, battery, alert, or
              device.
            </p>
          ) : (
            <ul style={styles.list}>
              {analysis.widgets.map((widget, idx) => (
                <li key={idx} style={styles.listItem}>
                  <div style={styles.widgetName}>{widget.name}</div>
                  <div style={styles.widgetReason}>{widget.reason}</div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    padding: "24px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    background: "#ffffff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
    height: "100%",
  },
  heading: {
    margin: 0,
    fontSize: "18px",
    fontWeight: 600,
    color: "#1a202c",
  },
  subheading: {
    margin: 0,
    fontSize: "14px",
    fontWeight: 600,
    color: "#4a5568",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  typeRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  label: {
    fontSize: "13px",
    color: "#718096",
    fontWeight: 500,
  },
  badge: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#4f46e5",
    background: "#eef2ff",
    padding: "2px 10px",
    borderRadius: "999px",
  },
  divider: {
    border: "none",
    borderTop: "1px solid #e2e8f0",
    margin: "0",
  },
  empty: {
    fontSize: "14px",
    color: "#a0aec0",
    fontStyle: "italic",
    margin: 0,
  },
  list: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  listItem: {
    padding: "12px 14px",
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
    background: "#f7fafc",
  },
  widgetName: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#2d3748",
    marginBottom: "4px",
  },
  widgetReason: {
    fontSize: "13px",
    color: "#718096",
  },
};
