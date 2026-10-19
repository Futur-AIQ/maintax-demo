"use client";

import { useSyncExternalStore } from "react";
import { Menu, MenuHeading, MenuItem, MenuSeparator } from "@/components/ui";
import { fD, fT } from "@/lib/format";
import { Icon } from "@/lib/icons";

export const pillBtn =
  "inline-flex h-[38px] items-center gap-2 rounded-[9px] border border-line bg-white px-3 text-[13px] font-medium whitespace-nowrap";

const RANGES = ["Today", "Last 7 days", "Last 30 days", "Last 90 days"];

// The clock ticks every 30s. The snapshot is the current minute, so it only changes when the label would.
const subscribe = (tick: () => void) => {
  const id = window.setInterval(tick, 30_000);
  return () => window.clearInterval(id);
};
const minuteNow = () => Math.floor(Date.now() / 60_000) * 60_000;

/** Live "Oct 19, 2026  14:32", or null during server rendering. */
export function useClock(): number | null {
  return useSyncExternalStore(subscribe, minuteNow, () => null);
}

/** Calendar icon and the live date and time. The range menu is fixed in the demo. */
export function DatePill() {
  const now = useClock();
  return (
    <Menu
      width={230}
      aria-label="Date range"
      trigger={(p) => (
        <button type="button" {...p} className={`${pillBtn} hover:bg-surface-2`}>
          <Icon name="cal" size={16} />
          <span className="min-w-[118px] tabular-nums">{now === null ? " " : `${fD(now)}  ${fT(now)}`}</span>
          <Icon name="down" size={14} />
        </button>
      )}
    >
      <MenuHeading>Date range</MenuHeading>
      {RANGES.map((r, i) => (
        <MenuItem key={r} icon="cal" checked={i === 1}>
          {r}
        </MenuItem>
      ))}
      <MenuSeparator />
      <p className="px-2.5 py-1.5 text-[11.5px] text-muted">Ranges are fixed in this demo.</p>
    </Menu>
  );
}

/** Green dot and "Plant Online". Not interactive. */
export function OnlinePill() {
  return (
    <span className={pillBtn}>
      <i className="size-2 rounded-full bg-[#16a36b]" aria-hidden />
      Plant Online
    </span>
  );
}
