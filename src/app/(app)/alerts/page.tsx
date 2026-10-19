import { PageHeader } from "@/components/layout/PageHeader";
import { PlantSwitcher } from "@/components/layout/PlantSwitcher";
import { Placeholder } from "@/components/layout/Placeholder";

export default function AlertsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Alerts"
        title="Alerts"
        subtitle="Alarms raised by rules and by the AI. Acknowledge what you are handling and resolve what is fixed."
        actions={
          <>
            <PlantSwitcher />
          </>
        }
      />
      <Placeholder phase={5} />
    </>
  );
}
