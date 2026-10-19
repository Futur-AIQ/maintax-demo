import { type ReactNode, Suspense } from "react";
import { AppShell, ShellSkeleton } from "@/components/layout/AppShell";

// The shell reads the URL (active nav item, menus). On dynamic routes the URL is only known at request
// time, so the prerendered HTML shows the skeleton and the shell streams in.
export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<ShellSkeleton />}>
      <AppShell>{children}</AppShell>
    </Suspense>
  );
}
