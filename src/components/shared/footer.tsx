import Link from "next/link";
import { LayoutQueryResult } from "@/sanity/types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "../portable-text";

export type FooterNavigation = NonNullable<LayoutQueryResult>["footer"];

export function Footer(props: FooterNavigation) {
  const showFooterNavigation = Boolean(props.footerNavigation?.length ?? 0 > 0);

  return (
    <footer className="bg-background-accent px-4 pb-4 pt-10 text-foreground">
      <div className="mx-auto max-w text-sm">
        <div className="pb-12 pt-6">
          <div className="flex flex-col gap-6 md:flex-row md:justify-between">
            <div className="max-w-[628px]">
              <Link className="block" href="/">
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
            </div>
            <div>
              {showFooterNavigation && (
                <ul className="flex h-fit flex-wrap gap-x-6 gap-y-2">
                  {props.footerNavigation?.map((menuItem) => (
                    <li key={menuItem._key} className="max-w-md">
                      <Link
                        href={`/${menuItem.href}`}
                        className="block w-fit text-sm font-medium text-foreground underline-offset-[6px] hover:underline"
                      >
                        {menuItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          {props.description?.text && (
            <div className="prose mt-6 text-[16px] leading-[1.55] text-black">
              <PortableText value={props.description.text ?? []} />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
          <p>
            {props.title} &copy; {new Date().getFullYear()}
          </p>
          <div>
            <p>
              Nettside av{" "}
              <Link
                className="hover:underline"
                target="_blank"
                href="https://fjellvann.no"
              >
                Fjellvann
              </Link>
              , en del av{" "}
              <Link
                className="hover:underline"
                target="_blank"
                href="https://solidmedia.no"
              >
                Solid Media
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
