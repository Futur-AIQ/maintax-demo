import type { IconName } from "@/lib/icons";

export interface NavItem {
  /** First path segment: "/equipment/P-104" belongs to "equipment". */
  route: string;
  label: string;
  icon: IconName;
}

/** Sidebar items, as in the prototype's NAV and NAV2. */
export const NAV: NavItem[] = [
  { route: "dashboard", label: "Dashboard", icon: "dash" },
  { route: "equipment", label: "Equipment", icon: "cog" },
  { route: "anomalies", label: "Anomalies", icon: "alert" },
  { route: "predictions", label: "Predictions", icon: "chartl" },
  { route: "maintenance", label: "Maintenance", icon: "wrench" },
  { route: "work-orders", label: "Work Orders", icon: "clip" },
  { route: "reliability", label: "Reliability", icon: "shieldc" },
  { route: "downtime", label: "Downtime", icon: "clock" },
  { route: "production", label: "Production", icon: "factory" },
  { route: "assistant", label: "AI Assistant", icon: "bot" },
  { route: "alerts", label: "Alerts", icon: "bell" },
  { route: "reports", label: "Reports", icon: "filec" },
];

export const NAV2: NavItem[] = [
  { route: "integrations", label: "Data & Integrations", icon: "db" },
  { route: "ai-models", label: "AI & Models", icon: "brain" },
  { route: "admin", label: "Administration", icon: "gear" },
  { route: "security", label: "Security", icon: "shield" },
];

/** "/equipment/P-104" → "equipment". */
export const routeOf = (pathname: string) => pathname.split("/")[1] ?? "";
