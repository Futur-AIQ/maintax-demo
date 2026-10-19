import clsx from "clsx";
import type { ComponentProps } from "react";
import { Icon, type IconName } from "@/lib/icons";

export type ButtonVariant = "primary" | "secondary" | "outline-blue" | "danger" | "amber";
export type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary: "border-blue bg-blue text-white hover:bg-blue-600",
  secondary: "border-line bg-white hover:bg-surface-2",
  "outline-blue": "border-blue bg-white text-blue hover:bg-blue-50",
  danger: "border-[#f5c2c4] bg-[#fff7f7] text-red hover:bg-red-50",
  amber: "border-amber bg-amber text-[#3a2600] hover:brightness-95",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-[30px] px-2.5 text-[12.5px] gap-1.5",
  md: "h-[38px] px-[15px] text-[13px] gap-2",
  lg: "h-11 px-5 text-[14px] gap-2",
};

/** Button classes, for links that look like buttons. */
export function buttonClass(variant: ButtonVariant = "secondary", size: ButtonSize = "md", className?: string) {
  return clsx(
    "inline-flex shrink-0 items-center justify-center rounded-lg border font-semibold whitespace-nowrap transition-colors duration-150",
    "disabled:pointer-events-none disabled:opacity-45 aria-disabled:pointer-events-none aria-disabled:opacity-45",
    variants[variant],
    sizes[size],
    className,
  );
}

interface ButtonProps extends ComponentProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Leading icon. */
  icon?: IconName;
}

export function Button({ variant = "secondary", size = "md", icon, className, children, type = "button", ...rest }: ButtonProps) {
  return (
    <button type={type} className={buttonClass(variant, size, className)} {...rest}>
      {icon && <Icon name={icon} size={size === "sm" ? 14 : 16} />}
      {children}
    </button>
  );
}

interface IconButtonProps extends Omit<ComponentProps<"button">, "children"> {
  icon: IconName;
  "aria-label": string;
  iconSize?: number;
}

/** A 32px icon-only button. The aria-label is required. */
export function IconButton({ icon, iconSize = 18, className, type = "button", ...rest }: IconButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        "inline-grid size-8 shrink-0 place-items-center rounded-lg text-muted transition-colors duration-150 hover:bg-gray-50 hover:text-ink",
        "disabled:pointer-events-none disabled:opacity-45",
        className,
      )}
      {...rest}
    >
      <Icon name={icon} size={iconSize} />
    </button>
  );
}
