import { DatePill } from "@/components/layout/DatePill";
import { PageHeader } from "@/components/layout/PageHeader";
import { Placeholder } from "@/components/layout/Placeholder";

export default function SecurityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Security"
        title="Security"
        subtitle="Sign-in, access policies, data retention and a full audit trail."
        actions={
          <>
            <DatePill />
          </>
        }
      />
      <Placeholder phase={10} />
    </>
  );
}
