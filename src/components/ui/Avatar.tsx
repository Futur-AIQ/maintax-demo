import clsx from "clsx";
import { hash } from "@/lib/format";

const COLORS = ["#1b5fe8", "#13a37f", "#7c4ddb", "#f57c20", "#0ea5b7", "#e5383f", "#5b6cf0", "#d39400"];

export const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

interface AvatarProps {
  name: string;
  size?: number;
  /** Fixed background; otherwise one is picked from a hash of the name. */
  color?: string;
  className?: string;
}

/** White initials on a colored circle. */
export function Avatar({ name, size = 32, color, className }: AvatarProps) {
  return (
    <span
      aria-hidden
      className={clsx("inline-grid shrink-0 place-items-center rounded-full font-semibold text-white", className)}
      style={{
        width: size,
        height: size,
        fontSize: Math.round(size * 0.38),
        background: color ?? COLORS[hash(name) % COLORS.length],
      }}
    >
      {initials(name)}
    </span>
  );
}
