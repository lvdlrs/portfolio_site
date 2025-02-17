import Link from "next/link";
import { usePathname } from "next/navigation";

export function MenuItem(props: { label: string; href: string, icon?: {
  metadata?:{
  inlineSvg?: string
  }
  } }) {
  
  const pathname = usePathname();

  const isActive = pathname === props.href;

  return (
      <Link href={props.href} className={`group/linkicon relative size-[50px] block rounded-[50%] duration-300 ${isActive ? "bg-black text-white hover:bg-black hover:text-white dark:bg-black-medium dark:text-white" : "bg-grey hover:bg-black hover:text-white dark:bg-grey dark:text-black dark:hover:bg-white"}`}>
      {props.icon?.metadata?.inlineSvg && (
        <div
          className="w-full h-full flex items-center justify-center"
          dangerouslySetInnerHTML={{
            __html: props.icon.metadata.inlineSvg,
          }}
        />
      )}
      {props.label ? <span className="absolute top-0 right-0 text-center -z-[1] opacity-0 uppercase rounded-tl-[30px] rounded-bl-[30px] transition-[opacity_transform] duration-300 block h-[50px] text-white dark:text-black px-6 leading-[50px] md:group-hover/linkicon:right-[28px] md:group-hover/linkicon:bg-black md:group-hover/linkicon:opacity-100 dark:md:group-hover/linkicon:bg-white">{props.label}</span>: ""}
      </Link>
  );
}
