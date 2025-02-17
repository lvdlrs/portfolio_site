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
        "rounded-[35px] uppercase overflow-hidden relative flex items-center text-center sm:w-fit whitespace-nowrap border-2 pl-7 pr-16 py-5 text-base/none font-medium transition-all before:-z-[1] before:absolute before:top-0 before:right-0 before:left-0 before:bottom-0 before:translate-x-full before:transition-all before:duration-300 before:ease-out hover:before:translate-x-0 before:bg-foreground dark:before:bg-white",
        {
          "border-2 border-foreground hover:text-white dark:hover:text-foreground dark:border-white dark:text-white":
            variant === "default",
          "border-2 border-foreground bg-foreground text-white hover:text-foreground dark:hover:text-white dark:border-white dark:bg-white dark:text-foreground":
            variant === "ghost"
        },
      )}
      href={props.href ?? "#"}
    >
      <span>{props.children}</span>
      {props.icon?.metadata?.inlineSvg && (
        <span
          className="size-[55px] rounded-full flex items-center justify-center absolute top-0 -right-[2px] bg-foreground text-white dark:bg-white dark:text-black"
          dangerouslySetInnerHTML={{
            __html: props.icon.metadata.inlineSvg,
          }}
        />
      )}
    </Link>
  );
}
