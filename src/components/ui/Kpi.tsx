import clsx from "clsx";
import type { ReactNode } from "react";
import type { IconName } from "@/lib/icons";
import { Card } from "./Card";
import { Tile, type TileTone } from "./Tile";

export type KpiSubColor = "green" | "red" | "amber" | "blue" | "orange" | "purple";

const subColors: Record<KpiSubColor, string> = {
  green: "text-green",
  red: "text-red",
  amber: "text-amber-text",
  blue: "text-blue",
  orange: "text-orange",
  purple: "text-purple",
};

interface KpiProps {
  icon: IconName;
  tone: TileTone;
  label: ReactNode;
  /** Omit for the ring and gauge variants, which pass the figure as children. */
  value?: ReactNode;
  unit?: ReactNode;
  /** Line under the value, such as "On Track" or "Requires Attention". */
  sub?: ReactNode;
  subColor?: KpiSubColor;
  /** A <Delta />. */
  delta?: ReactNode;
  /** Comparison label under the delta, such as "vs. last 24h". */
  cmp?: ReactNode;
  className?: string;
  /** Extra content between the header and the value: a Ring, an ArcGauge. */
  children?: ReactNode;
}

export function Kpi({ icon, tone, label, value, unit, sub, subColor, delta, cmp, className, children }: KpiProps) {
  return (
    <Card className={clsx("flex flex-col gap-1.5 px-4 pt-4 pb-3.5", className)}>
      <div className="flex items-center gap-2.5 text-[12.5px] font-semibold text-ink">
        <Tile icon={icon} tone={tone} />
        <span>{label}</span>
      </div>
      {children}
      {value !== undefined && (
        <div className="text-[28px] leading-[1.1] font-bold tracking-[-.02em] tabular-nums">
          {value}
          {unit && <small className="ml-[3px] text-[14px] font-semibold text-ink-2">{unit}</small>}
        </div>
      )}
      {sub && <div className={clsx("text-[12.5px] font-semibold", subColor && subColors[subColor])}>{sub}</div>}
      {delta && <div>{delta}</div>}
      {cmp && <div className="text-[11.5px] text-muted">{cmp}</div>}
    </Card>
  );
}
