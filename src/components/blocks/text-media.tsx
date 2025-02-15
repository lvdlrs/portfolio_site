import { cn, generateImageAspect } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { Container } from "../container";
import { PageBuilderBlock } from "../page-builder";
import { PortableText } from "../portable-text";
import { LinkButton } from "../shared/link-button";
import { YouTube } from "../elements/youtube";
import { ProseContent } from "../prose-content";

type TextMediaProps = Extract<PageBuilderBlock, { _type: "textMedia" }>;

export function TextMedia(
  props: TextMediaProps & {
    isHero?: boolean;
  },
) {
  const isMediaLeft = props.mediaPlacement === "left";
  const isThreeFourth = props.mediaSize === "threefourth";
  const media = props.media;
  const isVideoMedia = media?._type === "video";
  const showMedia = Boolean(
    isVideoMedia ? media.thumbnail?.asset?._ref : media?.asset?._ref,
  );
  const aspectRatio = showMedia
    ? generateImageAspect(isVideoMedia ? media.thumbnail! : media!)
    : 1;

  const showLinks = Boolean(props.links?.length ?? 0 > 0);

  const Heading = props.isHero ? "h1" : "h2";

  return (
    <Container isHero={props.isHero} variant={props.variant}>
      <section
        className={cn("max-w mx-auto py-12 md:py-24", {
          "min-h-[calc(100vh-var(--header))]": props.layout === "fullscreen",
        })}
      >
        <div
          className={cn(
            "flex flex-col-reverse gap-12 md:flex-row md:items-center",
            {
              "md:flex-row-reverse": isMediaLeft,
            },
          )}
        >
          <div className={cn("basis-1/2",{
            "basis-3/5": isThreeFourth
          })}>

            {props.title && (
              <Heading
                className={cn(
                  "text-foreground font-semibold",
                  props.isHero
                    ? "text-3xl sm:text-5xl"
                    : "text-2xl sm:text-4xl",
                )}
              >
                {props.title}
              </Heading>
            )}
            {props.content?.text && (
              <div className="mt-6">
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
          <div className={cn("basis-1/2",{
            "basis-2/5": isThreeFourth
          })}>
            {isVideoMedia && (
              <YouTube
                id={media.videoUrl ?? ""}
                title={media.title ?? ""}
                aspectRatio={aspectRatio}
                thumbnail={
                  media.thumbnail?.asset?._ref
                    ? urlFor(media.thumbnail).maxWidth(1200).url()
                    : undefined
                }
              />
            )}
            {!isVideoMedia && media?.asset?._ref && (
              <Image
                src={urlFor(media).maxWidth(1200).url() ?? ""}
                width={800}
                height={Math.floor(800 / aspectRatio)}
                alt={media.alt ?? ""}
                className="block max-w-full rounded-3xl"
                priority={props.isHero}
                loading={props.isHero ? "eager" : "lazy"}
              />
            )}
          </div>
        </div>
      </section>
    </Container>
  );
}
