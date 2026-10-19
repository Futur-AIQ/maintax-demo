"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { Toaster } from "@/components/ui";
import { useUi } from "@/store/ui-store";
import { PresenterBadge } from "./PresenterBadge";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

/** Sidebar, top bar, page content, toasts and the presenter badge. */
export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const drawerAt = useUi((s) => s.drawerAt);
  const closeDrawer = useUi((s) => s.closeDrawer);
  // The drawer belongs to the path it was opened on, so any navigation closes it.
  const drawerOpen = drawerAt === pathname;

  // While the drawer is open: focus its first link, Esc closes it.
  useEffect(() => {
    if (!drawerOpen) return;
    document.querySelector<HTMLElement>("#sidebar a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen, closeDrawer]);

  return (
    <div className="grid min-h-dvh grid-cols-[236px_minmax(0,1fr)] max-lg:grid-cols-[minmax(0,1fr)]">
      <Sidebar open={drawerOpen} />
      <div
        aria-hidden
        onClick={closeDrawer}
        className={clsx("fixed inset-0 z-35 bg-[rgba(6,20,43,.45)] lg:hidden", !drawerOpen && "hidden")}
      />
      <div className="flex min-w-0 flex-col">
        <Topbar drawerOpen={drawerOpen} />
        <main className="min-w-0 px-7 pt-[22px] pb-[70px] max-lg:px-4 max-lg:pt-[18px] max-lg:pb-[90px]">{children}</main>
      </div>
      <Toaster />
      <PresenterBadge />
    </div>
  );
}

/** Prerendered placeholder while the shell waits for the URL (dynamic routes) or the browser. */
export function ShellSkeleton() {
  return (
    <div className="grid min-h-dvh grid-cols-[236px_minmax(0,1fr)] max-lg:grid-cols-[minmax(0,1fr)]" aria-busy="true">
      <div className="sticky top-0 h-dvh bg-sb max-lg:hidden" />
      <div className="flex min-w-0 flex-col">
        <div className="h-16 border-b border-line bg-white" />
      </div>
    </div>
  );
}
