import { PageHeader } from "@/components/layout/PageHeader";
import { Placeholder } from "@/components/layout/Placeholder";

export default function AssistantPage() {
  return (
    <>
      <PageHeader
        eyebrow="AI Assistant"
        title="AI Assistant"
        subtitle="Ask about equipment health, failures, downtime and maintenance. Answers use the live plant data."
      />
      <Placeholder phase={9} />
    </>
  );
}
