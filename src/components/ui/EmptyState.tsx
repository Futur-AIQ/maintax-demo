import clsx from "clsx";
import type { ReactNode } from "react";
import { Icon, type IconName } from "@/lib/icons";

interface EmptyStateProps {
  icon?: IconName;
  children: ReactNode;
  /** A button under the message, such as "Clear filters". */
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon = "info", children, action, className }: EmptyStateProps) {
  return (
    <div
      className={clsx(
        "flex flex-col items-center gap-2.5 px-[18px] py-[34px] text-center text-[13px] text-muted",
        className,
      )}
    >
      <Icon name={icon} size={24} className="text-faint" />
      <span>{children}</span>
      {action}
    </div>
  );
}
