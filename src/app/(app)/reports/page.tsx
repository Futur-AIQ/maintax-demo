import { PageHeader } from "@/components/layout/PageHeader";
import { Placeholder } from "@/components/layout/Placeholder";

export default function ReportsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Reports"
        title="Reports Dashboard"
        subtitle="Access comprehensive reports and insights to optimize your operations."
      />
      <Placeholder phase={8} />
    </>
  );
}
