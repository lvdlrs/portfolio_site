"use client";

import { urlFor } from "@/sanity/lib/image";
import { LayoutQueryResult } from "@/sanity/types";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Dock, DockIcon, DockItem, DockLabel } from "../ui/dock";
import {
  Activity,
  Component,
  HomeIcon,
  Mail,
  Package,
  ScrollText,
  SunMoon,
} from 'lucide-react';

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
              className='aspect-square rounded-full bg-white-dark dark:bg-black'
            >
              <DockLabel>{item.label}</DockLabel>
              {item.label == 'Home' ? <DockIcon><HomeIcon className='h-full w-full text-primary dark:text-white' /></DockIcon> : ""}
              
            </DockItem>
          ))}
        </Dock>
        </div>
      </nav>
    </header>
  );
}
