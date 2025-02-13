import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

export function LinkButton({
  variant = "default",
  inverted = false,
  ...props
}: {
  href: string | null;
  children: ReactNode;
  variant?: "default" | "ghost";
  inverted?: boolean;
}) {
  const isPhoneLink = props.href?.startsWith("tel:");
  const isEmailLink = props.href?.startsWith("mailto:");

  const isIconButton = isPhoneLink || isEmailLink;

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
            variant === "ghost" && inverted,
          "pl-11": isIconButton,
        },
      )}
      href={props.href ?? "#"}
    >
      {isPhoneLink && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="absolute left-5 top-1/2 size-4 -translate-y-1/2"
        >
          <path
            fillRule="evenodd"
            d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
            clipRule="evenodd"
          />
        </svg>
      )}
      {isEmailLink && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="absolute left-5 top-1/2 size-4 -translate-y-1/2"
        >
          <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
          <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
        </svg>
      )}
      <span>{props.children}</span>
    </Link>
  );
}
