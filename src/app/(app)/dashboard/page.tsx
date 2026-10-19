import { DatePill, OnlinePill } from "@/components/layout/DatePill";
import { PageHeader } from "@/components/layout/PageHeader";
import { Placeholder } from "@/components/layout/Placeholder";

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Operations Dashboard"
        title="Plant Overview"
        subtitle="Real-time insights into your equipment, production and maintenance operations."
        actions={
          <>
            <DatePill />
            <OnlinePill />
          </>
        }
      />
      <Placeholder phase={3} />
    </>
  );
}
