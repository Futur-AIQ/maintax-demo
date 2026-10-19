"use client";

import clsx from "clsx";
import { useState } from "react";
import { Menu, MenuHeading, MenuItem } from "@/components/ui";
import { Icon } from "@/lib/icons";
import { PLANT_OPTS, type PlantSel } from "../../../seed";
import { pillBtn } from "./DatePill";

interface PlantSwitcherProps {
  /**
   * "overview": the top-bar button on the dashboard (prefs.ovPlant, default Mesaieed).
   * "filter": the page-header pill on list pages (prefs.plant, default All Plants).
   */
  kind?: "overview" | "filter";
}

// Phase 2 moves the selection into the persisted prefs (ovPlant / plant).
export function PlantSwitcher({ kind = "filter" }: PlantSwitcherProps) {
  const overview = kind === "overview";
  const [plant, setPlant] = useState<PlantSel>(overview ? "MES" : "ALL");
  const name = PLANT_OPTS.find(([k]) => k === plant)?.[1] ?? "All Plants";
  return (
    <Menu
      align={overview ? "left" : "right"}
      width={290}
      aria-label="Plant"
      trigger={(p) => (
        <button
          type="button"
          {...p}
          className={clsx(
            overview
              ? "inline-flex h-10 items-center gap-[9px] rounded-[10px] border border-line bg-white px-3 text-[13px] font-semibold whitespace-nowrap"
              : pillBtn,
            "hover:bg-surface-2",
          )}
        >
          <Icon name="build" size={overview ? 17 : 16} />
          <span className={clsx(overview && "max-sm:sr-only")}>{name}</span>
          <Icon name="down" size={overview ? 15 : 14} />
        </button>
      )}
    >
      <MenuHeading>{overview ? "Plant overview" : "Plant"}</MenuHeading>
      {PLANT_OPTS.map(([k, n]) => (
        <MenuItem key={k} icon="build" checked={k === plant} onSelect={() => setPlant(k)}>
          {n}
        </MenuItem>
      ))}
    </Menu>
  );
}
