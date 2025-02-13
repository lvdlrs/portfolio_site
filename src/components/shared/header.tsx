"use client";

import { urlFor } from "@/sanity/lib/image";
import { LayoutQueryResult } from "@/sanity/types";
import Image from "next/image";
import Link from "next/link";
import { MenuItem } from "./menu-item";
import { MobileMenu } from "./mobile-menu";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export type HeaderProps = NonNullable<LayoutQueryResult>["header"];

export function Header(props: HeaderProps) {
  const pathname = usePathname();

  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-50 mx-auto w-full px-2.5">
      <nav
        className={cn(
          "mx-auto mt-2.5 flex h-header items-center rounded-lg bg-white px-4 shadow",
          isHome ? "w-fit justify-center" : "max-w justify-between",
        )}
      >
        {!isHome && (
          <Link
            className="relative z-40 block text-3xl/none font-bold text-primary hover:text-foreground"
            href="/"
          >
            {props.logo?.asset?._ref ? (
              <Image
                src={urlFor(props.logo)?.width(100).url() ?? ""}
                alt={props.title}
                width={100}
                height={Math.floor(
                  100 / (props.logo.metadata?.aspectRatio ?? 1),
                )}
              />
            ) : (
              props.title || "Missing title"
            )}
          </Link>
        )}
        <div>
          <ul className="hidden items-center gap-8 md:flex">
            {props?.headerNavigation?.map((menuItem) => {
              return (
                <li key={menuItem._key}>
                  <MenuItem href={`/${menuItem.href}`}>
                    {menuItem.label}
                  </MenuItem>
                </li>
              );
            })}
          </ul>
          <div className="block md:hidden">
            <MobileMenu navigation={props.headerNavigation ?? []} />
          </div>
        </div>
      </nav>
    </header>
  );
}
