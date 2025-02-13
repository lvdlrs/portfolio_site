"use client";

import { exitPreview } from "@/lib/actions";
import { useDraftModeEnvironment } from "next-sanity/hooks";
import { usePathname } from "next/navigation";
import { useTransition } from "react";

export function DisableDraftMode() {
  const environment = useDraftModeEnvironment();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  if (environment !== "live") {
    return null;
  }

  function onExitPreview() {
    startTransition(() => exitPreview(pathname));
  }

  return (
    <button
      disabled={isPending}
      onClick={onExitPreview}
      className="fixed bottom-4 right-4 text-[20px] leading-normal bg-gray-50 px-4 py-2 bg-blue-light-muted rounded-lg text-foreground font-medium"
    >
      Lukk forhåndsvisning
    </button>
  );
}
