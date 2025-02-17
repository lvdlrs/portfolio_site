"use client";
import { LayoutQueryResult } from "@/sanity/types";
import { MenuItem } from "./menu-item";
import DarkModeToggle from "./darkModeToggle";

export type HeaderProps = NonNullable<LayoutQueryResult>["header"];

export function Header(props: HeaderProps) {

  const showNav = Boolean(props.headerNavigation?.length ?? 0 > 0);

  if( !showNav ) return;

  return (
    <>
      <DarkModeToggle />
    <header className="fixed -bottom-[30px] md:bottom-[unset] md:top-1/2 left-0 md:left-[unset] md:right-[30px] -translate-y-1/2 z-50 px-4 py-2 md:py-0 md:px-0 drop-shadow-md shadow-white-dark bg-white md:bg-[transparent] dark:md:bg-[transparent] w-full md:w-auto md:bg-opacity-0 md:drop-shadow-none">
      <nav
        className=""
      >
          <ul className="flex flex-row gap-4 md:flex-col">
            {props?.headerNavigation?.map((item)=>{
              return(
                <li key={item._key}>
                  <MenuItem label={item.label} href={"/"+item.href} icon={item.icon ? { metadata: { inlineSvg: item.icon.metadata?.inlineSvg ?? ""} } : undefined}  />
                </li>
              )
            })}
          </ul>
      </nav>
    </header>
      </>
  );
}
