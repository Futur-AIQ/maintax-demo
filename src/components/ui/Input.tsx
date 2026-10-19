import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";
import { Icon } from "@/lib/icons";

export const inputClass = clsx(
  "h-9 w-full rounded-lg border border-line bg-white px-[11px] text-[13px] placeholder:text-faint",
  "focus:border-[#a9c2fb] focus:shadow-[0_0_0_3px_rgba(27,95,232,.12)] focus:outline-none",
  "disabled:bg-surface-2 disabled:text-muted",
);

export function Input({ className, type = "text", ...rest }: ComponentProps<"input">) {
  return <input type={type} className={clsx(inputClass, className)} {...rest} />;
}

export function Textarea({ className, ...rest }: ComponentProps<"textarea">) {
  return (
    <textarea
      className={clsx(inputClass, "h-auto min-h-20 resize-y py-[9px] leading-[1.5]", className)}
      {...rest}
    />
  );
}

/** Native select with the appearance reset and a custom chevron. Pass <option> children. */
export function Select({ className, ...rest }: ComponentProps<"select">) {
  return (
    <div className={clsx("relative", className)}>
      <select className={clsx(inputClass, "appearance-none pr-[30px]")} {...rest} />
      <Icon
        name="down"
        size={14}
        strokeWidth={2}
        className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-muted"
      />
    </div>
  );
}

/** Small search field for card toolbars. Pass aria-label when there is no visible label. */
export function SearchInput({ className, ...rest }: Omit<ComponentProps<"input">, "type">) {
  return (
    <div className={clsx("relative flex items-center", className)}>
      <Icon name="search" size={15} className="pointer-events-none absolute left-2.5 text-muted" />
      <input type="search" className={clsx(inputClass, "pl-8 [&::-webkit-search-cancel-button]:hidden")} {...rest} />
    </div>
  );
}

interface FieldProps {
  label: string;
  htmlFor?: string;
  className?: string;
  children: ReactNode;
}

/** Label above a control, as in the prototype's forms. */
export function Field({ label, htmlFor, className, children }: FieldProps) {
  return (
    <div className={clsx("flex flex-col gap-[5px]", className)}>
      <label htmlFor={htmlFor} className="text-[12px] font-semibold text-ink-2">
        {label}
      </label>
      {children}
    </div>
  );
}
