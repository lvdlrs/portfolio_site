import Image from "next/image";
import { Container } from "../container";
import { PageBuilderBlock } from "../page-builder";
import { PortableText } from "../portable-text";
import { LinkButton } from "../shared/link-button";
import { urlFor } from "@/sanity/lib/image";
import { cn, generateImageAspect } from "@/lib/utils";
import { ProseContent } from "../prose-content";
import { Breadcrumbs } from "../elements/breadcrumbs";

type FullWidthImageProps = Extract<
  PageBuilderBlock,
  { _type: "fullWidthImage" }
>;

export function FullWidthImage(
  props: FullWidthImageProps & {
    isHero?: boolean;
  },
) {
  const Heading = props.isHero ? "h1" : "h2";

  const showLinks = Boolean(props.links?.length ?? 0 > 0);

  const aspectRatio = generateImageAspect(props.image);
  return (
    <Container isHero={props.isHero}>
      <section className="max-w mx-auto py-12 md:py-24">
        <div className="mx-auto max-w-prose">
        {props.isHero && (
              <div className="mb-6">
                <Breadcrumbs />
              </div>
            )}
          {props.title && (
            <Heading
              className={cn(
                "text-foreground font-semibold",
                props.isHero ? "text-3xl sm:text-5xl" : "text-2xl sm:text-4xl",
              )}
            >
              {props.title}
            </Heading>
          )}
          {props.content?.text && (
            <div className="mt-8">
              <ProseContent>
                <PortableText value={props.content.text ?? []} />
              </ProseContent>
            </div>
          )}
          {showLinks && (
            <div className="mt-8">
              <ul className="flex flex-col gap-4 sm:flex-row sm:items-center">
                {props.links?.map((link, index) => (
                  <li key={link._key}>
                    <LinkButton
                      href={link.href}
                      variant={index === 0 ? "default" : "ghost"}
                    >
                      {link.label}
                    </LinkButton>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {props.image.asset?._ref && (
          <div className="mt-8">
            <Image
              src={urlFor(props.image)?.maxWidth(1440).url() ?? ""}
              alt={props.image.alt ?? ""}
              width={1440}
              height={Math.round(1440 / aspectRatio)}
              className="block rounded object-cover"
              loading={props.isHero ? "eager" : "lazy"}
              priority={props.isHero}
            />
          </div>
        )}
      </section>
    </Container>
  );
}
