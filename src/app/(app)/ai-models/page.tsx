import { DatePill } from "@/components/layout/DatePill";
import { PageHeader } from "@/components/layout/PageHeader";
import { Placeholder } from "@/components/layout/Placeholder";

export default function AiModelsPage() {
  return (
    <>
      <PageHeader
        eyebrow={"AI & Model Management"}
        title="AI Models"
        subtitle="Manage and monitor AI models that power predictive maintenance and operational intelligence."
        actions={
          <>
            <DatePill />
          </>
        }
      />
      <Placeholder phase={9} />
    </>
  );
}
