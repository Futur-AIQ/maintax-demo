"use client";

import clsx from "clsx";
import { type TabItem, rovingKeys } from "./Tabs";

interface SegmentedProps<T extends string> {
  items: TabItem<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Translucent track for the dark scenario bar. */
  dark?: boolean;
  className?: string;
  "aria-label"?: string;
}

export function Segmented<T extends string>({ items, value, onChange, dark, className, ...aria }: SegmentedProps<T>) {
  return (
    <div
      role="radiogroup"
      className={clsx("inline-flex gap-0.5 rounded-lg p-[3px]", dark ? "bg-white/10" : "bg-gray-50", className)}
      onKeyDown={rovingKeys(items, value, onChange)}
      {...aria}
    >
      {items.map((t) => {
        const on = t.value === value;
        return (
          <button
            key={t.value}
            type="button"
            role="radio"
            aria-checked={on}
            tabIndex={on ? 0 : -1}
            onClick={() => onChange(t.value)}
            className={clsx(
              "rounded-md px-[11px] py-1 text-[12px] font-semibold whitespace-nowrap",
              on && "bg-white shadow-[0_1px_3px_rgba(11,20,55,.12)]",
              on ? (dark ? "text-ink" : "text-blue") : dark ? "text-[#c8d3ea]" : "text-ink-2",
            )}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
