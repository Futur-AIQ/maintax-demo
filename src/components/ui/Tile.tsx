import clsx from "clsx";
import { Icon, type IconName } from "@/lib/icons";

export type TileTone = "blue" | "green" | "red" | "amber" | "orange" | "purple" | "gray" | "solid-blue";

export const tileTones: Record<TileTone, string> = {
  blue: "bg-blue-50 text-blue",
  green: "bg-green-50 text-green",
  red: "bg-red-50 text-red",
  amber: "bg-amber-50 text-amber-icon",
  orange: "bg-orange-50 text-orange",
  purple: "bg-purple-50 text-purple",
  gray: "bg-gray-50 text-muted",
  "solid-blue": "bg-blue text-white",
};

interface TileProps {
  icon: IconName | (string & {});
  tone?: TileTone;
  /** Tile size in px: 38 for KPIs, 34 in lists, 30 in table cells. */
  size?: number;
  iconSize?: number;
  className?: string;
}

/** A tinted rounded square holding an icon. */
export function Tile({ icon, tone = "blue", size = 38, iconSize, className }: TileProps) {
  return (
    <span
      className={clsx("grid shrink-0 place-items-center", tileTones[tone], className)}
      style={{ width: size, height: size, borderRadius: size >= 38 ? 10 : size >= 34 ? 9 : 8 }}
    >
      <Icon name={icon} size={iconSize ?? (size >= 38 ? 19 : 16)} />
    </span>
  );
}
