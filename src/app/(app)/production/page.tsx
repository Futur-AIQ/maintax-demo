import { DatePill } from "@/components/layout/DatePill";
import { PageHeader } from "@/components/layout/PageHeader";
import { PlantSwitcher } from "@/components/layout/PlantSwitcher";
import { Placeholder } from "@/components/layout/Placeholder";

export default function ProductionPage() {
  return (
    <>
      <PageHeader
        eyebrow="Production Performance"
        title="Production"
        subtitle="Output against target, overall equipment effectiveness, and the assets holding each line back."
        actions={
          <>
            <DatePill />
            <PlantSwitcher />
          </>
        }
      />
      <Placeholder phase={8} />
    </>
  );
}
