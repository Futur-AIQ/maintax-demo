import { PageHeader } from "@/components/layout/PageHeader";
import { Placeholder } from "@/components/layout/Placeholder";

export default function DowntimePage() {
  return (
    <>
      <PageHeader
        eyebrow="Downtime Analytics"
        title="Downtime Dashboard"
        subtitle="Monitor and analyze downtime across your facility for better operational efficiency."
      />
      <Placeholder phase={8} />
    </>
  );
}
