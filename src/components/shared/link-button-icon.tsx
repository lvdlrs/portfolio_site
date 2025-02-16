import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

export function LinkButtonIcon({
  variant = "default",
  ...props
}: {
  icon?: {
    metadata?:{
        inlineSvg?: string
    }
  },
  href: string | null;
  children: ReactNode;
  variant?: "default" | "ghost";
}) {

  return (
    <Link
      className={cn(
        "rounded-md relative block text-center sm:w-fit whitespace-nowrap border-2 px-7 py-4 text-base/none font-medium transition-all",
        {
          "hover:bg-foreground bg-primary border-transparent text-white":
            variant === "default",
          "text-primary hover:border-primary bg-background border-transparent":
            variant === "ghost"
        },
      )}
      href={props.href ?? "#"}
    >
      <span>{props.children}</span>
      {props.icon?.metadata?.inlineSvg && (
        <span
          className="w-full h-full flex items-center justify-center"
          dangerouslySetInnerHTML={{
            __html: props.icon.metadata.inlineSvg,
          }}
        />
      )}
    </Link>
  );
}
