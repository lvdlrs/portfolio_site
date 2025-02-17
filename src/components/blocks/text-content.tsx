import { cleanStega, cn } from "@/lib/utils";
import { Container } from "../container";
import { Breadcrumbs } from "../elements/breadcrumbs";
import { PageBuilderBlock } from "../page-builder";
import { PortableText } from "../portable-text";
import { ProseContent } from "../prose-content";
import { LinkButton } from "../shared/link-button";

type TextContentProps = Extract<PageBuilderBlock, { _type: "textContent" }>;

export function TextContent(
  props: TextContentProps & {
    isHero?: boolean;
  },
) {
  const Heading = props.isHero ? "h1" : "h2";

  const showLinks = Boolean(props.links?.length ?? 0 > 0);
  const variant = cleanStega(props.variant);
  const layout = cleanStega(props.layout ?? "default");
  const alignment = cleanStega(props.alignment);

  return (
    <Container variant={variant} isHero={props.isHero}>
      <section className="mx-auto max-w py-12 md:py-24">
        <div
          className={cn("max-w-prose", {
            "ml-auto": alignment === "right" && layout == "default",
            "mr-auto": alignment === "left" && layout == "default",
            "mx-auto text-center":
              alignment === "center" && layout == "default",
          })}
        >
          {props.isHero && (
            <div
              className={cn("mb-6 w-fit", {
                "mx-auto": alignment === "center",
              })}
            >
              <Breadcrumbs />
            </div>
          )}
          {props.title && (
            <Heading
              className={cn(
                "font-bold text-foreground relative",
                props.isHero ? "text-3xl sm:text-4xl md:text-6xl" : "text-2xl sm:text-5xl",
              )}
            >
              {props.title}
              {props.backdroptitle && (<span className="-z-[1] opacity-40 text-7xl md:text-[100px] text-grey-medium absolute -translate-y-1/2 -translate-x-1/2 left-1/2 top-1/2">{props.backdroptitle}</span>)}
            </Heading>
          )}
          {props.content?.text && (
            <div className="mt-6">
              <ProseContent centered={alignment == "center"}>
                <PortableText value={props.content.text ?? []} />
              </ProseContent>
            </div>
          )}
          {showLinks && (
            <div className="mt-8">
              <ul
                className={cn(
                  "flex flex-col gap-4 sm:flex-row sm:items-center",
                  {
                    "sm:justify-center": alignment === "center",
                  },
                )}
              >
                {props.links?.map((link, index) => (
                  <li key={link._key}>
                    <LinkButton
                      href={link.href}
                      variant={index === 0 ? "default" : "ghost"}
                      inverted={props.variant === "alternative"}
                    >
                      {link.label}
                    </LinkButton>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </Container>
  );
}
