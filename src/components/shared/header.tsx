"use client";
import { LayoutQueryResult } from "@/sanity/types";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Dock, DockIcon, DockItem, DockLabel } from "../ui/dock";

export type HeaderProps = NonNullable<LayoutQueryResult>["header"];

export function Header(props: HeaderProps) {

  return (
    <header className="fixed left-1/2 -translate-x-1/2 bottom-[50px] z-50 mx-auto w-fit px-2.5">
      <nav
        className=""
      >
        <div>
          <Dock className='items-end pb-3' magnification={60}>
          {props?.headerNavigation?.map((item) => (
            <DockItem
              key={item._key}
              className='aspect-square rounded-full bg-white-dark dark:bg-black relative'
            >
              <Link href={item.href} className="absolute top-0 left-0 w-full h-full block"></Link>
              <DockLabel>{item.label}</DockLabel>
              {item.icon?.metadata?.inlineSvg && (
                <DockIcon>
                  <div
                    className="block"
                    dangerouslySetInnerHTML={{
                      __html: item.icon.metadata.inlineSvg,
                    }}
                  />
                </DockIcon>
                )}              
            </DockItem>
          ))}
        </Dock>
        </div>
      </nav>
    </header>
  );
}
