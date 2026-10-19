import { Card, EmptyState } from "@/components/ui";

/** Body of a page that is not built yet. Removed as each phase lands. */
export function Placeholder({ phase }: { phase: number }) {
  return (
    <Card>
      <EmptyState icon="layers">This page is built in Phase {phase}.</EmptyState>
    </Card>
  );
}
