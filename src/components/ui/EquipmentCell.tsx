import { Tile } from "./Tile";
// Phase 2 copies seed/ to src/data; switch this import to "@/data" then.
import { TYPES } from "../../../seed/reference";

interface EquipmentCellProps {
  name: string;
  id: string;
  /** Equipment type ("Pump", "Heat exchanger"…), which picks the icon. */
  type: string;
  /** Line under the name. Defaults to the ID. */
  sub?: string;
}

/** 30px blue tile with the type icon, the name, and the ID below. */
export function EquipmentCell({ name, id, type, sub }: EquipmentCellProps) {
  return (
    <div className="flex items-center gap-2.5">
      <Tile icon={TYPES[type]?.icon ?? "box"} size={30} />
      <span className="min-w-0">
        <b className="block text-[13px] font-medium">{name}</b>
        <small className="block text-[11.5px] text-muted">{sub ?? id}</small>
      </span>
    </div>
  );
}
