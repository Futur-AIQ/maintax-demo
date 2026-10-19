import { PageHeader } from "@/components/layout/PageHeader";
import { PlantSwitcher } from "@/components/layout/PlantSwitcher";
import { Placeholder } from "@/components/layout/Placeholder";

export default function IntegrationsPage() {
  return (
    <>
      <PageHeader
        eyebrow={"Data & Integrations"}
        title={"Data & Integrations"}
        subtitle="Industrial data sources, sensors and business systems connected to MaintaX."
        actions={
          <>
            <PlantSwitcher />
          </>
        }
      />
      <Placeholder phase={9} />
    </>
  );
}
