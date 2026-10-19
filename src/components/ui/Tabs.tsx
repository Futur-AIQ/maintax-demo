"use client";

import clsx from "clsx";
import type { KeyboardEvent, ReactNode } from "react";

export interface TabItem<T extends string> {
  value: T;
  label: ReactNode;
}

interface TabsProps<T extends string> {
  items: TabItem<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  "aria-label"?: string;
}

/** Moves focus and selection with the arrow keys, Home and End. */
export function rovingKeys<T extends string>(items: { value: T }[], value: T, onChange: (v: T) => void) {
  return (e: KeyboardEvent<HTMLElement>) => {
    const i = items.findIndex((t) => t.value === value);
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % items.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + items.length) % items.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = items.length - 1;
    if (next < 0) return;
    e.preventDefault();
    onChange(items[next].value);
    e.currentTarget.querySelectorAll<HTMLButtonElement>("button")[next]?.focus();
  };
}

function TabStrip<T extends string>({
  items,
  value,
  onChange,
  className,
  ...aria
}: TabsProps<T>) {
  return (
    <div
      role="tablist"
      className={clsx("mb-4 flex gap-1 overflow-x-auto border-b border-line", className)}
      onKeyDown={rovingKeys(items, value, onChange)}
      {...aria}
    >
      {items.map((t) => {
        const on = t.value === value;
        return (
          <button
            key={t.value}
            type="button"
            role="tab"
            aria-selected={on}
            tabIndex={on ? 0 : -1}
            onClick={() => onChange(t.value)}
            className={clsx(
              "-mb-px inline-flex items-center gap-[7px] border-b-2 px-3.5 pt-2.5 pb-[11px] text-[13px] font-medium whitespace-nowrap",
              on ? "border-blue text-blue" : "border-transparent text-ink-2 hover:text-ink",
            )}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

/** Underline tabs. */
export function Tabs<T extends string>(props: TabsProps<T>) {
  return <TabStrip {...props} />;
}

/** Underline tabs inside a white card strip (equipment detail, work order detail). */
export function CardTabs<T extends string>({ className, ...props }: TabsProps<T>) {
  return (
    <TabStrip {...props} className={clsx("rounded-card border border-line bg-white px-2.5 shadow-card", className)} />
  );
}

/** Equipment-type filter buttons: white with a border, the active one solid blue. */
export function PillTabs<T extends string>({ items, value, onChange, className, ...aria }: TabsProps<T>) {
  return (
    <div role="group" className={clsx("mb-4 flex flex-wrap gap-2", className)} {...aria}>
      {items.map((t) => {
        const on = t.value === value;
        return (
          <button
            key={t.value}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(t.value)}
            className={clsx(
              "h-9 rounded-[9px] border px-4 text-[13px] font-medium whitespace-nowrap transition-colors duration-150",
              on ? "border-blue bg-blue text-white" : "border-line bg-white text-ink-2 hover:bg-surface-2",
            )}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
