import { urlFor } from "@/sanity/lib/image";
import { Container } from "../container";
import { PageBuilderBlock } from "../page-builder";
import { PortableText } from "../portable-text";
import { LinkButton } from "../shared/link-button";
import { YouTube } from "../elements/youtube";
import { cn, generateImageAspect } from "@/lib/utils";
import { ProseContent } from "../prose-content";
import { Breadcrumbs } from "../elements/breadcrumbs";

type FullWidthVIdeoProps = Extract<
  PageBuilderBlock,
  { _type: "fullWidthVideo" }
>;

export function FullWidthVIdeo(
  props: FullWidthVIdeoProps & {
    isHero?: boolean;
  },
) {
  const Heading = props.isHero ? "h1" : "h2";

  const showLinks = Boolean(props.links?.length ?? 0 > 0);

  const aspectRatio = props.video?.thumbnail
    ? generateImageAspect(props.video?.thumbnail)
    : 1;

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
            <ProseContent>
              <PortableText value={props.content.text ?? []} />
            </ProseContent>
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
        {props.video && (
          <YouTube
            title={props.video.title ?? ""}
            id={props.video.videoUrl ?? ""}
            aspectRatio={aspectRatio}
            thumbnail={
              props.video.thumbnail?.asset?._ref
                ? urlFor(props.video.thumbnail)?.url()
                : undefined
            }
          />
        )}
      </section>
    </Container>
  );
}
