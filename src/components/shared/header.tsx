"use client";
import { LayoutQueryResult } from "@/sanity/types";
import { MenuItem } from "./menu-item";

export type HeaderProps = NonNullable<LayoutQueryResult>["header"];

export function Header(props: HeaderProps) {

  const showNav = Boolean(props.headerNavigation?.length ?? 0 > 0);

  if( !showNav ) return;

  return (
    <header className="fixed bottom-0 md:bottom-[unset] md:top-1/2 left-0 md:left-[unset] md:right-[30px] -translate-y-1/2 z-50">
      <nav
        className=""
      >
          <ul className="flex flex-row gap-4 md:flex-col">
            {props?.headerNavigation?.map((item)=>{
              return(
                <li key={item._key}>
                  <MenuItem label={item.label} href={"/"+item.href} icon={item.icon} />
                </li>
              )
            })}
          </ul>
      </nav>
    </header>
  );
}
