"use client";

import { toast } from "@/components/ui";

/** Fixed bottom-right pill. Opens the presenter panel (Phase 6). */
export function PresenterBadge() {
  return (
    <button
      type="button"
      title="Presenter controls"
      onClick={() => toast("Presenter controls are not available yet.", "info")}
      className="fixed right-4 bottom-3.5 z-[60] flex items-center gap-2 rounded-full border border-[#23345c] bg-toast py-2 pr-3.5 pl-2.5 text-[12px] font-medium text-white shadow-pop"
    >
      <i className="size-2 rounded-full bg-[#4ade80]" aria-hidden />
      Demo · Sample data
    </button>
  );
}
