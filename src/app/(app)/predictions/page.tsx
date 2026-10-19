import { DatePill } from "@/components/layout/DatePill";
import { PageHeader } from "@/components/layout/PageHeader";
import { PlantSwitcher } from "@/components/layout/PlantSwitcher";
import { Placeholder } from "@/components/layout/Placeholder";

export default function PredictionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Predictive Maintenance"
        title="Predictions"
        subtitle="Failures the AI expects, ranked by remaining useful life, with the recommended action for each."
        actions={
          <>
            <DatePill />
            <PlantSwitcher />
          </>
        }
      />
      <Placeholder phase={7} />
    </>
  );
}
