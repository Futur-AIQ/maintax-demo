import clsx from "clsx";
import { healthColor, probabilityColor } from "@/lib/colors";

function Track({ value, color, width = 56 }: { value: number; color: string; width?: number }) {
  return (
    <span className="block h-1.5 shrink-0 overflow-hidden rounded-[3px] bg-gray-50" style={{ width }}>
      <i className="block h-full rounded-[3px]" style={{ width: `${Math.max(0, Math.min(100, value))}%`, background: color }} />
    </span>
  );
}

interface HealthBarProps {
  value: number;
  /** Small colored % above the bar, as in the equipment table. */
  stacked?: boolean;
  /** Color the % and make it semibold. */
  colored?: boolean;
  className?: string;
}

/** 56px track colored by health band, with the % beside it (or above it when stacked). */
export function HealthBar({ value, stacked, colored, className }: HealthBarProps) {
  const color = healthColor(value);
  if (stacked) {
    return (
      <div className={clsx("flex flex-col items-start gap-[3px]", className)} aria-label={`Health ${value}%`}>
        <span className="text-[10.5px] font-semibold tabular-nums" style={{ color }}>
          {value}%
        </span>
        <Track value={value} color={color} />
      </div>
    );
  }
  return (
    <div className={clsx("flex items-center gap-2", className)}>
      <Track value={value} color={color} />
      <span className={clsx("tabular-nums", colored && "font-semibold")} style={colored ? { color } : undefined}>
        {value}%
      </span>
    </div>
  );
}

/** % then a 54px blue bar. */
export function ConfidenceBar({ value, className }: { value: number; className?: string }) {
  return (
    <div className={clsx("flex items-center gap-2", className)}>
      <span className="w-8 tabular-nums">{value}%</span>
      <Track value={value} color="#1b5fe8" width={54} />
    </div>
  );
}

/** Failure probability: red ≥60, orange ≥45, else blue. */
export function ProbabilityBar({ value, className }: { value: number; className?: string }) {
  const color = probabilityColor(value);
  return (
    <div className={clsx("flex items-center gap-2", className)}>
      <Track value={value} color={color} />
      <span className="font-semibold tabular-nums" style={{ color }}>
        {value}%
      </span>
    </div>
  );
}
