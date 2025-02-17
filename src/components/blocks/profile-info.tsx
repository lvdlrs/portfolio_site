import { cn, generateImageAspect } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { Container } from "../container";
import { PageBuilderBlock } from "../page-builder";
import { PortableText } from "../portable-text";
import { LinkButtonIcon } from "../shared/link-button-icon";
import { YouTube } from "../elements/youtube";
import { ProseContent } from "../prose-content";

type ProfileInfoProps = Extract<PageBuilderBlock, { _type: "profileInfo" }>;

export function ProfileInfo(
  props: ProfileInfoProps & {
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
            "flex flex-col-reverse gap-12 lg:flex-row lg:items-center",
            {
              "lg:flex-row-reverse": isMediaLeft,
            },
          )}
        >
          <div className={cn("basis-1/2",{
            "basis-3/5": isThreeFourth
          })}>
            {isThreeFourth ? (
              <div className="md:max-w-[700px] md:mx-auto text-center md:text-left">
                {(props.title || props.subtitle) && (
                    <div className="md:pl-[60px] relative md:before:block before:hidden before:left-0 before:absolute before:top-[30px] before:w-[50px] before:h-[2px] before:rounded-xl before:bg-foreground dark:before:bg-white">
                        {props.title && (
                            <Heading
                            className={cn(
                                "text-foreground font-bold dark:text-white",
                                props.isHero
                                ? "text-4xl lg:text-6xl"
                                : "text-3xl lg:text-5xl",
                            )}
                            >
                            {props.title}
                            </Heading>
                        )}
                        {props.subtitle && (
                            <span className={cn(
                                "text-grey-medium font-semibold font-serif dark:text-white dark:text-opacity-75",
                                props.isHero
                                ? "text-4xl lg:text-6xl"
                                : "text-3xl lg:text-5xl",
                            )}>{props.subtitle}</span>
                        )}
                    </div>
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
                <ul className="flex flex-col gap-4 items-center md:flex-row">
                  {props.links?.map((link, index) => (
                    <li key={link._key}>
                      <LinkButtonIcon
                        href={link.href}
                        variant={index === 0 ? "default" : "ghost"}
                        icon={link.icon ? { metadata: { inlineSvg: link.icon.metadata?.inlineSvg ?? ""} } : undefined} 
                        >
                        {link.label}
                        </LinkButtonIcon>
                    </li>
                  ))}
                </ul>
              </div>
            )}
              </div>

            ) : (
              <div className="text-center md:text-left">
                {(props.title || props.subtitle) && (
                    <div className="md:pl-[60px] relative before:left-0 before:block before:absolute before:top-[30px] before:w-[50px] before:h-[2px] before:rounded-xl before:bg-foreground dark:before:bg-white">
                        {props.title && (
                            <Heading
                            className={cn(
                                "text-foreground font-bold dark:text-white",
                                props.isHero
                                ? "text-4xl lg:text-6xl"
                                : "text-3xl lg:text-5xl",
                            )}
                            >
                            {props.title}
                            </Heading>
                        )}
                        {props.subtitle && (
                            <span className={cn(
                                "text-grey-medium font-semibold font-serif dark:text-white dark:text-opacity-75",
                                props.isHero
                                ? "text-4xl lg:text-6xl"
                                : "text-3xl lg:text-5xl",
                            )}>{props.subtitle}</span>
                        )}
                    </div>
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
                          <LinkButtonIcon
                            href={link.href}
                            variant={index === 0 ? "default" : "ghost"}
                            icon={link.icon ? { metadata: { inlineSvg: link.icon.metadata?.inlineSvg ?? ""} } : undefined} 
                          >
                            {link.label}
                          </LinkButtonIcon>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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
                className="block border-2 border-solid border-grey-medium md:border-none max-w-full w-[200px] h-[200px] lg:w-full lg:h-full aspect-square md:aspect-auto object-cover object-top lg:object-center mx-auto md:ml-0 md:mr-auto rounded-full lg:rounded-3xl"
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
