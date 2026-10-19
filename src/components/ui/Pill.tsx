import clsx from "clsx";
import type { ReactNode } from "react";
import { Icon } from "@/lib/icons";

export type PillTone = "red" | "orange" | "amber" | "green" | "blue" | "purple" | "gray" | "solid";

const tones: Record<PillTone, string> = {
  red: "bg-red-50 text-red",
  orange: "bg-orange-50 text-orange-text",
  amber: "bg-amber-50 text-amber-text",
  green: "bg-green-50 text-green",
  blue: "bg-blue-50 text-blue",
  purple: "bg-purple-50 text-purple",
  gray: "bg-gray-50 text-muted",
  solid: "bg-red text-white",
};

interface PillProps {
  tone?: PillTone;
  /** Small ↑ before the label (High and Critical severities). */
  up?: boolean;
  className?: string;
  children: ReactNode;
}

export function Pill({ tone = "gray", up, className, children }: PillProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full px-[9px] py-[3px] text-[11.5px] leading-[1.4] font-semibold whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {up && <Icon name="up" size={11} strokeWidth={2.4} />}
      {children}
    </span>
  );
}

const severity: Record<string, [PillTone, boolean]> = {
  Critical: ["red", true],
  High: ["orange", true],
  Medium: ["amber", true],
  Low: ["green", false],
};

/** Critical red · High orange · Medium amber · Low green. Matches the prototype's sevPill. */
export function SeverityPill({ value, className }: { value: string; className?: string }) {
  const [tone, up] = severity[value] ?? ["gray", false];
  return (
    <Pill tone={tone} up={up} className={className}>
      {value}
    </Pill>
  );
}

/** Risk levels (Low, Medium, High) use the severity colors. */
export const RiskPill = SeverityPill;

const status: Record<string, PillTone> = {
  Active: "red",
  Investigating: "blue",
  Resolved: "green",
  "False positive": "gray",
  Running: "green",
  Idle: "blue",
  Maintenance: "purple",
  Warning: "orange",
  Critical: "red",
  Offline: "gray",
  Open: "amber",
  Scheduled: "blue",
  "In Progress": "purple",
  Completed: "green",
  Mitigated: "green",
  Pending: "amber",
  Inactive: "gray",
  Healthy: "green",
  Training: "amber",
  Connected: "green",
  "Not connected": "gray",
  New: "red",
  Acknowledged: "blue",
};

/** Anomaly, equipment, work-order, user, model and integration statuses. Unknown values are gray. */
export function StatusPill({ value, className }: { value: string; className?: string }) {
  return (
    <Pill tone={status[value] ?? "gray"} up={value === "Investigating"} className={className}>
      {value === "Healthy" && <Icon name="shield" size={11} strokeWidth={2.4} />}
      {value}
    </Pill>
  );
}

/** Good green · Fair amber · Poor red. */
export function ConditionPill({ value, className }: { value: string; className?: string }) {
  return (
    <Pill tone={value === "Good" ? "green" : value === "Fair" ? "amber" : "red"} className={className}>
      {value}
    </Pill>
  );
}
