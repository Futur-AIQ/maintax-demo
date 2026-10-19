import { PageHeader } from "@/components/layout/PageHeader";
import { Placeholder } from "@/components/layout/Placeholder";

export default function WorkOrdersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Maintenance Execution"
        title="Work Orders"
        subtitle="Create, schedule and complete maintenance work. AI-suggested jobs are marked."
      />
      <Placeholder phase={7} />
    </>
  );
}
