import clsx from "clsx";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icon, type IconName } from "@/lib/icons";

export function Card({ className, ...rest }: ComponentProps<"section">) {
  return (
    <section
      className={clsx("min-w-0 rounded-card border border-line bg-surface shadow-card", className)}
      {...rest}
    />
  );
}

interface CardHeaderProps {
  title: ReactNode;
  icon?: IconName;
  /** Small muted suffix after the title, for example "last 24 hours". */
  suffix?: ReactNode;
  /** Right-hand slot: ViewAll, a Segmented, buttons. */
  right?: ReactNode;
  className?: string;
}

export function CardHeader({ title, icon, suffix, right, className }: CardHeaderProps) {
  return (
    <div className={clsx("flex min-h-[52px] flex-wrap items-center gap-2.5 px-[18px] pt-[15px] pb-2.5", className)}>
      {icon && <Icon name={icon} className="shrink-0 text-blue" />}
      <h3 className="flex items-baseline gap-1.5 text-[15px] font-semibold">
        {title}
        {suffix && <small className="text-[12.5px] font-normal text-muted">{suffix}</small>}
      </h3>
      {right && <div className="ml-auto flex items-center gap-2.5">{right}</div>}
    </div>
  );
}

export function CardBody({ className, ...rest }: ComponentProps<"div">) {
  return <div className={clsx("px-[18px] pt-1 pb-4", className)} {...rest} />;
}

/** The blue "View All →" link on the right of a card header. */
export function ViewAll({ href, children = "View All" }: { href: string; children?: ReactNode }) {
  return (
    <Link
      href={href}
      className="ml-auto inline-flex items-center gap-[5px] text-[12.5px] font-medium whitespace-nowrap text-blue hover:underline"
    >
      {children}
      <Icon name="arrow" size={13} />
    </Link>
  );
}
