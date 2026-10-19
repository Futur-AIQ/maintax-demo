import { DatePill } from "@/components/layout/DatePill";
import { PageHeader } from "@/components/layout/PageHeader";
import { PlantSwitcher } from "@/components/layout/PlantSwitcher";
import { Placeholder } from "@/components/layout/Placeholder";

export default function ReliabilityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Reliability Engineering"
        title="Reliability"
        subtitle="Mean time between failures, repair times and the assets that cause the most trouble."
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
