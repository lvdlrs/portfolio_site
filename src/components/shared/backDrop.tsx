"use client"
import { usePathname } from "next/navigation";

export function BackDrop(){
    const pathname = usePathname();

  const currentType = pathname == '/' ? 'frontPage' : 'page';

    return(
      currentType === 'frontPage' ? <div className="fixed h-[200%] w-full -rotate-[15deg] -left-[83%] -top-1/2 bg-black dark:bg-white"></div> : ""
    )
}