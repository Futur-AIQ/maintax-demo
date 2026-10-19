"use client";

import { useParams } from "next/navigation";
import { PageHeader } from "./PageHeader";
import { Placeholder } from "./Placeholder";

interface DetailPlaceholderProps {
  back: { href: string; label: string };
  phase: number;
}

/** Detail route stub: back link and the ID from the URL. Needs a Suspense ancestor (the (app) layout has one). */
export function DetailPlaceholder({ back, phase }: DetailPlaceholderProps) {
  const { id } = useParams<{ id: string }>();
  return (
    <>
      <PageHeader back={back} title={decodeURIComponent(id)} />
      <Placeholder phase={phase} />
    </>
  );
}
