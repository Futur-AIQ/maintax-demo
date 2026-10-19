import clsx from "clsx";
import { fN } from "@/lib/format";
import { Icon } from "@/lib/icons";

/** 1 2 3 4 5, or 1 … 4 5 6 … 31: the first and last page, the current page and its neighbours. */
export function pageNumbers(page: number, pages: number): (number | "…")[] {
  if (pages <= 5) return Array.from({ length: pages }, (_, i) => i + 1);
  const out: (number | "…")[] = [1];
  if (page > 3) out.push("…");
  for (let i = Math.max(2, page - 1); i <= Math.min(pages - 1, page + 1); i++) out.push(i);
  if (page < pages - 2) out.push("…");
  out.push(pages);
  return out;
}

interface PagerProps {
  page: number;
  total: number;
  perPage: number;
  onChange: (page: number) => void;
}

const pg = "inline-grid h-[30px] min-w-[30px] place-items-center rounded-[7px] text-[12.5px] text-ink-2 tabular-nums";

/** "Showing 1–8 of 248", then previous, page numbers and next. */
export function Pager({ page, total, perPage, onChange }: PagerProps) {
  const pages = Math.max(1, Math.ceil(total / perPage));
  const from = total ? (page - 1) * perPage + 1 : 0;
  const to = Math.min(page * perPage, total);
  return (
    <nav aria-label="Pagination" className="flex flex-wrap items-center gap-1.5 border-t border-line-2 px-4 py-3">
      <span className="mr-auto text-[12.5px] text-muted tabular-nums">
        Showing {fN(from)}–{fN(to)} of {fN(total)}
      </span>
      <button
        type="button"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className={clsx(pg, "hover:bg-gray-50 disabled:opacity-45 disabled:hover:bg-transparent")}
      >
        <Icon name="left" size={14} />
      </button>
      {pageNumbers(page, pages).map((n, i) =>
        n === "…" ? (
          <span key={`gap${i}`} aria-hidden className={pg}>
            …
          </span>
        ) : (
          <button
            key={n}
            type="button"
            aria-label={`Page ${n}`}
            aria-current={n === page ? "page" : undefined}
            onClick={() => onChange(n)}
            className={clsx(
              pg,
              n === page ? "border border-blue-100 bg-blue-50 font-semibold text-blue" : "hover:bg-gray-50",
            )}
          >
            {n}
          </button>
        ),
      )}
      <button
        type="button"
        aria-label="Next page"
        disabled={page >= pages}
        onClick={() => onChange(page + 1)}
        className={clsx(pg, "hover:bg-gray-50 disabled:opacity-45 disabled:hover:bg-transparent")}
      >
        <Icon name="right" size={14} />
      </button>
    </nav>
  );
}
