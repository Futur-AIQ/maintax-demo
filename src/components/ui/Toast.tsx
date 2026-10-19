"use client";

import clsx from "clsx";
import Link from "next/link";
import { Icon, type IconName } from "@/lib/icons";
import { type ToastType, useUi } from "@/store/ui-store";

export { toast, type ToastType } from "@/store/ui-store";

const icons: Record<ToastType, { name: IconName; className: string }> = {
  ok: { name: "checkc", className: "text-[#4ade80]" },
  info: { name: "spark", className: "text-[#93b4ff]" },
  warn: { name: "alert", className: "text-[#fbbf24]" },
  crit: { name: "alert", className: "text-[#fecaca]" },
};

/** Mount once (AppShell). Toasts stack at the bottom center. */
export function Toaster() {
  const toasts = useUi((s) => s.toasts);
  const dismiss = useUi((s) => s.dismissToast);
  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed bottom-[22px] left-1/2 z-[100] flex w-[min(560px,calc(100%-32px))] -translate-x-1/2 flex-col items-center gap-2"
    >
      {toasts.map((t) => {
        const { name, className } = icons[t.type];
        return (
          <div
            key={t.id}
            className={clsx(
              "pointer-events-auto flex max-w-full animate-[pop_.2s_ease] items-center gap-2.5 rounded-[11px] px-4 py-[11px] text-[13px] text-white shadow-pop transition-opacity duration-300",
              t.type === "crit" ? "bg-toast-crit" : "bg-toast",
              t.leaving && "opacity-0",
            )}
          >
            <Icon name={name} className={className} />
            <span>
              {t.message}
              {t.link && (
                <Link href={t.link.href} onClick={() => dismiss(t.id)} className="ml-1.5 font-semibold text-[#9ec0ff] hover:underline">
                  {t.link.label}
                </Link>
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
}
