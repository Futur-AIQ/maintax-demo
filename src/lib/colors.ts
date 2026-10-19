// Color rules shared by bars, gauges and charts (CLAUDE.md "Design system").

/** Health band color: Healthy ≥80 green · At Risk 65–79 amber · Degraded 50–64 orange · Critical <50 red. */
export const healthColor = (h: number) => (h >= 80 ? "#13a37f" : h >= 65 ? "#f2b52c" : h >= 50 ? "#f57c20" : "#e5383f");

/** Failure probability color: red ≥60, orange ≥45, else blue. */
export const probabilityColor = (p: number) => (p >= 60 ? "#e5383f" : p >= 45 ? "#f57c20" : "#1b5fe8");
