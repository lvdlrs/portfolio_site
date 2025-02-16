import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

export function LinkButtonIcon({
  variant = "default",
  inverted = false,
  ...props
}: {
  href: string | null;
  children: ReactNode;
  variant?: "default" | "ghost";
  inverted?: boolean;
}) {

  return (
    <Link
      className={cn(
        "rounded-md relative block text-center sm:w-fit whitespace-nowrap border-2 px-7 py-4 text-base/none font-medium transition-all",
        {
          "hover:bg-foreground bg-primary border-transparent text-white":
            variant === "default",
          "text-primary hover:border-primary bg-background border-transparent":
            variant === "ghost",
          "text-primary hover:border-primary border-transparent bg-white":
            variant === "ghost" && inverted
        },
      )}
      href={props.href ?? "#"}
    >
      <span>{props.children}</span>
    </Link>
  );
}
