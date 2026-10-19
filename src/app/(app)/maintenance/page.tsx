import { PageHeader } from "@/components/layout/PageHeader";
import { PlantSwitcher } from "@/components/layout/PlantSwitcher";
import { Placeholder } from "@/components/layout/Placeholder";

export default function MaintenancePage() {
  return (
    <>
      <PageHeader
        eyebrow="Maintenance Planning"
        title="Maintenance"
        subtitle="Schedule of preventive, predictive and corrective work, with planned production stops."
        actions={
          <>
            <PlantSwitcher />
          </>
        }
      />
      <Placeholder phase={7} />
    </>
  );
}
