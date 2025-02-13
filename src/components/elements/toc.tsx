"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import slugify from "slugify";

export function Toc(props: { headings: string[]; title: string }) {
  const pathname = usePathname();
  return (
    <div>
      <p className="text-[18px] font-medium leading-[1.35] text-foreground">
        {props.title}
      </p>
      <ul className="mt-2.5 grid gap-2">
        {props.headings.map((heading, index) => {
          const slug = slugify(heading, {
            lower: true,
          });
          return (
            <li key={slug + index}>
              <Link
                href={`${pathname}#${slug}`}
                className="bg-blue-light-muted border-blue-light-muted block w-fit rounded-[4px] border px-[5px] py-[2.5px] text-[16px] font-[440] leading-[1.55] tracking-[0.32px] text-foreground hover:border-primary"
              >
                {heading}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
