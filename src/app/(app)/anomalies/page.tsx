import { DatePill } from "@/components/layout/DatePill";
import { PageHeader } from "@/components/layout/PageHeader";
import { PlantSwitcher } from "@/components/layout/PlantSwitcher";
import { Placeholder } from "@/components/layout/Placeholder";

export default function AnomaliesPage() {
  return (
    <>
      <PageHeader
        eyebrow="AI Anomaly Detection"
        title="Anomaly Dashboard"
        subtitle="Detect and analyze anomalies in real-time using AI. Stay ahead of issues and prevent costly downtime."
        actions={
          <>
            <DatePill />
            <PlantSwitcher />
          </>
        }
      />
      <Placeholder phase={5} />
    </>
  );
}
