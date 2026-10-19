import Link from "next/link";
import { Suspense } from "react";
import { AppShell, ShellSkeleton } from "@/components/layout/AppShell";
import { buttonClass } from "@/components/ui";
import { Icon } from "@/lib/icons";

export default function NotFound() {
  return (
    <Suspense fallback={<ShellSkeleton />}>
      <AppShell>
        <div className="flex flex-col items-center gap-2.5 px-5 py-20 text-center text-[13px] text-muted">
          <Icon name="search" size={30} className="text-faint" />
          <b className="text-[15px] font-semibold text-ink">This page could not be found.</b>
          <Link href="/dashboard" className={buttonClass()}>
            Back to Dashboard
          </Link>
        </div>
      </AppShell>
    </Suspense>
  );
}
