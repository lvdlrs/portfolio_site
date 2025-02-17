import { cn, generateImageAspect } from "@/lib/utils";

import { Container } from "../container";
import { PageBuilderBlock } from "../page-builder";
import { PortableText } from "../portable-text";
import { LinkButtonIcon } from "../shared/link-button-icon";
import { YouTube } from "../elements/youtube";
import { ProseContent } from "../prose-content";
import { AnimatedGroup } from "../ui/animatedGroupMotion";
import { InView } from "../ui/inViewMotion";

type ExperienceInfoProps = Extract<PageBuilderBlock, { _type: "experienceInfo" }>;

export function ExperienceInfo(
  props: ExperienceInfoProps & {
    isHero?: boolean;
  },
) {
  const showExperiences = Boolean(props.list?.length ?? 0 > 0);

  const Heading = props.isHero ? "h1" : "h2";

  return (
    showExperiences && (
        <Container isHero={props.isHero}>
            <div className="flex flex-col gap-6">
            {props.title && (
                <InView
                variants={{
                  hidden: { opacity: 0, y: 100, filter: 'blur(4px)' },
                  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
                }}
                viewOptions={{ margin: '0px 0px -100px 0px' }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                <Heading
                className={cn(
                    "text-foreground font-bold dark:text-white text-center",
                    props.isHero
                    ? "text-4xl lg:text-6xl"
                    : "text-3xl lg:text-4xl",
                )}
                >
                {props.title}
                </Heading>
                </InView>
            )}
            <AnimatedGroup
            className='grid grid-cols-2 gap-y-5 md:gap-x-4 md:gap-y-8'
            variants={{
                container: {
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                    staggerChildren: 0.1,
                    },
                },
                },
                item: {
                hidden: { opacity: 0, y: 40, filter: 'blur(4px)' },
                visible: {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    transition: {
                    duration: 1.2,
                    type: 'spring',
                    bounce: 0.3,
                    },
                },
                },
            }}
            >
            {props.list?.map((item)=>( 
                <div key={item._key} className="relative flex gap-4 before:absolute before:top-0 before:left-5 before:h-full before:w-[1px] before:bg-grey">
                    {props.icon?.metadata?.inlineSvg && (
                        <span
                        className="size-10 rounded-full flex items-center justify-center bg-foreground text-white relative z-[2]"
                        dangerouslySetInnerHTML={{
                            __html: props.icon.metadata.inlineSvg,
                        }}
                        />
                    )}
                    <div className="flex flex-col gap-3">
                        {item.pretitle && <p className="text-xs/none py-[6px] px-[6px] w-fit rounded-lg bg-black text-white dark:bg-white dark:text-black">{item.pretitle}</p>}
                        {(item.position || item.company) && <p className="uppercase flex items-center gap-2 text-lg font-bold">{item.position}{item.company && (<span className="opacity-50 relative pl-[14px]"><span className="w-[10px] h-[2px] bg-black block absolute left-0 top-[12px] dark:bg-grey"></span>{item.company}</span>)}</p>}
                        {item.content?.text && (
                        <div className="relative prose prose-sm dark:prose-li:marker:text-white prose-li:my-0 dark:text-white">
                            <PortableText value={item.content.text ?? []} />
                        </div>
                        )}
                    </div>
                </div>
            ))}
            </AnimatedGroup>
        </div>
    </Container>
    )
  );
}
