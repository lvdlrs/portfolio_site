"use client";

import { unslugify } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type Breadcrumb = { title: string; href: string };

export function Breadcrumbs(props: {
  crumbs?: Breadcrumb[];
  current?: string;
}) {
  const pathname = usePathname();

  const crumbs =
    props.crumbs ??
    pathname
      .split("/")
      .filter(Boolean)
      .map((crumb) => ({ title: unslugify(crumb), href: crumb }));

  const current = crumbs.at(-1);

  if (!current) {
    return null;
  }

  return (
    <div className="w-fit">
      <ul className="flex items-center gap-2">
        <li className="text-foreground flex gap-2 text-sm/none">
          <Link
            className="decoration-primary underline underline-offset-2"
            href="/"
          >
            Home
          </Link>
          <span className="opacity-70">/</span>
        </li>

        {crumbs.map((crumb) => {
          const isCurrent = crumb.href === current.href;

          if (isCurrent) {
            return (
              <li
                className="text-foreground max-w-md overflow-ellipsis whitespace-nowrap text-sm/none"
                key={crumb.href}
              >
                {props.current ? props.current : crumb.title}
              </li>
            );
          }

          return (
            <li
              key={crumb.href}
              className="text-foreground flex gap-2 text-sm/none"
            >
              <Link
                className="decoration-primary whitespace-nowrap underline underline-offset-2"
                href={`${crumb.href.startsWith("/") ? crumb.href : `/${crumb.href}`}`}
              >
                {crumb.title}
              </Link>
              <span className="opacity-70">/</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
