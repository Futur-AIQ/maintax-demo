import clsx from "clsx";
import { fN } from "@/lib/format";
import { Icon } from "@/lib/icons";

interface DeltaProps {
  value: number | null | undefined;
  /** True when a rise is good (output), false when a rise is bad (alerts, downtime). */
  goodUp?: boolean;
  suffix?: string;
  decimals?: number;
  className?: string;
}

/** Arrow and value: green when the change is good, red when bad, "No change" at 0. */
export function Delta({ value, goodUp = true, suffix = "", decimals = 0, className }: DeltaProps) {
  const cls = "inline-flex items-center gap-[3px] text-[12px] font-semibold tabular-nums";
  if (!value) return <span className={clsx(cls, "text-muted", className)}>No change</span>;
  const up = value > 0;
  const good = up === goodUp;
  return (
    <span className={clsx(cls, good ? "text-green" : "text-red", className)}>
      <Icon name={up ? "up" : "dn"} size={12} strokeWidth={2.4} />
      <span className="sr-only">{up ? "Up" : "Down"} </span>
      {fN(Math.abs(value), decimals)}
      {suffix}
    </span>
  );
}
