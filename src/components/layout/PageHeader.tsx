import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/lib/icons";

interface PageHeaderProps {
  /** Uppercase eyebrow, such as "AI Anomaly Detection". */
  eyebrow?: ReactNode;
  /** Detail pages show a blue back link in place of the eyebrow. */
  back?: { href: string; label: string };
  title: ReactNode;
  subtitle?: ReactNode;
  /** Right-hand slot: DatePill, OnlinePill, PlantSwitcher, buttons. */
  actions?: ReactNode;
}

export function PageHeader({ eyebrow, back, title, subtitle, actions }: PageHeaderProps) {
  return (
    <div className="mb-[18px] flex flex-wrap items-start gap-4">
      <div className="min-w-0">
        {back ? (
          <Link href={back.href} className="mb-1.5 inline-flex items-center gap-[5px] text-[13px] font-semibold text-blue hover:underline">
            <Icon name="back" size={14} />
            {back.label}
          </Link>
        ) : (
          eyebrow && <div className="mb-1.5 text-[11.5px] font-semibold tracking-[.06em] text-ink-2 uppercase">{eyebrow}</div>
        )}
        <h1 className="flex flex-wrap items-center gap-3 text-[28px] leading-[1.15] font-bold tracking-[-.02em] max-sm:text-[23px]">
          {title}
        </h1>
        {subtitle && <p className="mt-[5px] text-[14px] text-muted">{subtitle}</p>}
      </div>
      {actions && <div className="ml-auto flex flex-wrap items-center gap-2.5">{actions}</div>}
    </div>
  );
}
