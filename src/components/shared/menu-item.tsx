import Link from "next/link";
import { ReactNode } from "react";

export function MenuItem(props: { children: ReactNode; href: string }) {
  return (
    <Link
      href={props.href}
      className="block w-fit text-base text-foreground underline-offset-[6px] hover:underline"
    >
      {props.children}
    </Link>
  );
}
