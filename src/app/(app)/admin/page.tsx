import { PageHeader } from "@/components/layout/PageHeader";
import { Placeholder } from "@/components/layout/Placeholder";

export default function AdminPage() {
  return (
    <>
      <PageHeader
        eyebrow="Administration"
        title={"Users & Administration"}
        subtitle="Manage users, teams, roles and access controls for your organization."
      />
      <Placeholder phase={10} />
    </>
  );
}
