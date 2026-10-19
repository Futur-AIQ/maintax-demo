"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type KeyboardEvent, useEffect, useId, useMemo, useRef, useState } from "react";
import { Icon, type IconName } from "@/lib/icons";
import { sampleDB } from "@/lib/sample-db";
import { PLANTS, TYPES } from "../../../seed";

interface Hit {
  href: string;
  icon: IconName | (string & {});
  title: string;
  sub: string;
}

interface Group {
  label: string;
  hits: Hit[];
}

/** Grouped matches, up to 5 per group, as in the prototype's searchResults. Client only. */
function search(query: string): Group[] {
  const q = query.trim().toLowerCase();
  const db = sampleDB();
  const eqById = new Map(db.eq.map((e) => [e.id, e]));
  const eqName = (id: string) => eqById.get(id)?.name ?? id;
  const eqs = db.eq.filter((e) => `${e.id} ${e.name} ${e.type} ${e.line}`.toLowerCase().includes(q)).slice(0, 5);
  const ans = db.an
    .filter((a) => `${a.id} ${eqName(a.eq)} ${a.type}`.toLowerCase().includes(q))
    .sort((a, b) => b.detectedAt - a.detectedAt)
    .slice(0, 5);
  const wos = db.wo.filter((w) => `${w.id} ${w.title}`.toLowerCase().includes(q)).slice(0, 5);
  return [
    {
      label: "Equipment",
      hits: eqs.map((e) => ({
        href: `/equipment/${e.id}`,
        icon: TYPES[e.type]?.icon ?? "box",
        title: e.name,
        sub: `${e.id} · ${PLANTS[e.plant].short} · ${e.line}`,
      })),
    },
    {
      label: "Anomalies",
      hits: ans.map((a) => ({
        href: `/anomalies/${a.id}`,
        icon: "alert",
        title: `${eqName(a.eq)} – ${a.type} Anomaly`,
        sub: `${a.id} · ${a.sev} · ${a.status}`,
      })),
    },
    {
      label: "Work Orders",
      hits: wos.map((w) => ({ href: `/work-orders/${w.id}`, icon: "clip", title: w.title, sub: `${w.id} · ${w.status}` })),
    },
  ].filter((g) => g.hits.length > 0);
}

/** Top-bar search. Results from 2 characters; arrow keys move, Enter opens, Esc closes. */
export function GlobalSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const listId = useId();
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [k, setK] = useState(0);
  // Navigating anywhere clears the search (reset during render, no effect needed).
  const [at, setAt] = useState(pathname);
  if (at !== pathname) {
    setAt(pathname);
    setQ("");
    setOpen(false);
  }

  const active = open && q.trim().length >= 2;
  const groups = useMemo(() => (active ? search(q) : []), [active, q]);
  const hits = groups.flatMap((g) => g.hits);
  const sel = hits.length ? Math.min(k, hits.length - 1) : -1;

  // Keep the highlighted row visible while the arrow keys move it.
  useEffect(() => {
    if (active && sel >= 0) document.getElementById(`${listId}-${sel}`)?.scrollIntoView({ block: "nearest" });
  }, [active, sel, listId]);

  // Outside click closes the results.
  useEffect(() => {
    if (!active) return;
    const onDown = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [active]);

  const reset = () => {
    setQ("");
    setK(0);
    setOpen(false);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      setOpen(false);
      inputRef.current?.blur();
      return;
    }
    if (!active || hits.length === 0) return;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setK((sel + (e.key === "ArrowDown" ? 1 : -1) + hits.length) % hits.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      reset();
      router.push(hits[sel].href);
    }
  };

  // Index of each group's first hit in the flat list the arrow keys walk.
  const starts = groups.map((_, gi) => groups.slice(0, gi).reduce((n, g) => n + g.hits.length, 0));
  return (
    <div ref={boxRef} className="relative min-w-0 flex-1 sm:max-w-[440px]">
      <Icon name="search" size={16} className="pointer-events-none absolute top-1/2 left-[13px] -translate-y-1/2 text-muted" />
      <input
        ref={inputRef}
        type="text"
        role="combobox"
        aria-label="Search"
        aria-expanded={active}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={active && sel >= 0 ? `${listId}-${sel}` : undefined}
        autoComplete="off"
        spellCheck={false}
        placeholder="Search equipment, sensors, anomalies, or anything…"
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setK(0);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        className={clsx(
          "h-10 w-full rounded-[10px] border border-transparent bg-surface-2 pr-9 pl-[38px] text-[13px] placeholder:text-muted",
          "focus:border-[#a9c2fb] focus:bg-white focus:shadow-[0_0_0_3px_rgba(27,95,232,.12)] focus:outline-none",
        )}
      />
      {q && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => {
            reset();
            inputRef.current?.focus();
          }}
          className="absolute top-1/2 right-2 grid size-6 -translate-y-1/2 place-items-center rounded-md text-blue hover:bg-blue-50"
        >
          <Icon name="x" size={15} strokeWidth={2.2} />
        </button>
      )}
      {active && (
        <div
          id={listId}
          role="listbox"
          aria-label="Search results"
          className={clsx(
            "absolute top-[46px] left-0 z-[60] max-h-[70vh] w-[min(480px,92vw)] animate-pop overflow-auto rounded-card border border-line bg-white p-1.5 shadow-pop",
            "max-sm:fixed max-sm:inset-x-2 max-sm:top-[60px] max-sm:w-auto",
          )}
        >
          {groups.length === 0 ? (
            <div className="p-[18px] text-center text-[13px] text-muted">No matches for “{q.trim()}”</div>
          ) : (
            groups.map((g, gi) => (
              <div key={g.label} role="group" aria-label={g.label}>
                <h5 aria-hidden className="mx-2.5 mt-2 mb-1 text-[11px] font-semibold tracking-[.06em] text-faint uppercase">
                  {g.label}
                </h5>
                {g.hits.map((h, hi) => {
                  const i = starts[gi] + hi;
                  return (
                    <Link
                      key={h.href}
                      id={`${listId}-${i}`}
                      href={h.href}
                      role="option"
                      aria-selected={i === sel}
                      tabIndex={-1}
                      onMouseEnter={() => setK(i)}
                      onClick={reset}
                      className={clsx(
                        "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px]",
                        i === sel && "bg-blue-50",
                      )}
                    >
                      <span className="grid size-7 shrink-0 place-items-center rounded-[7px] bg-blue-50 text-blue">
                        <Icon name={h.icon} size={15} />
                      </span>
                      <span className="min-w-0">
                        <b className="block truncate font-medium">{h.title}</b>
                        <small className="block truncate text-[11.5px] text-muted">{h.sub}</small>
                      </span>
                    </Link>
                  );
                })}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
