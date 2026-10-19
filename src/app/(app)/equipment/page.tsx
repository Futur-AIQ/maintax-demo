import { DatePill, OnlinePill } from "@/components/layout/DatePill";
import { PageHeader } from "@/components/layout/PageHeader";
import { PlantSwitcher } from "@/components/layout/PlantSwitcher";
import { Placeholder } from "@/components/layout/Placeholder";

export default function EquipmentPage() {
  return (
    <>
      <PageHeader
        eyebrow="Equipment Monitoring"
        title="Equipment Monitoring"
        subtitle="Real-time visibility into your equipment health, status and performance."
        actions={
          <>
            <DatePill />
            <OnlinePill />
            <PlantSwitcher />
          </>
        }
      />
      <Placeholder phase={4} />
    </>
  );
}
