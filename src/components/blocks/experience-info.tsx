import { cn, generateImageAspect } from "@/lib/utils";

import { Container } from "../container";
import { PageBuilderBlock } from "../page-builder";
import { PortableText } from "../portable-text";
import { LinkButtonIcon } from "../shared/link-button-icon";
import { YouTube } from "../elements/youtube";
import { ProseContent } from "../prose-content";
import { AnimatedGroup } from "../ui/animatedGroupMotion";

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
            <div className="flex flex-col gap-4">
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
            <AnimatedGroup
            className='grid grid-cols-2 gap-y-5 md:gap-x-4 md:gap-y-8'
            variants={{
                container: {
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                    staggerChildren: 0.05,
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
                <div key={item._key} className="relative flex gap-4">
                    {props.icon?.metadata?.inlineSvg && (
                        <span
                        className="size-10 rounded-full flex items-center justify-center absolute top-0 -right-[2px] bg-foreground text-white"
                        dangerouslySetInnerHTML={{
                            __html: props.icon.metadata.inlineSvg,
                        }}
                        />
                    )}
                    <div className="flex flex-col gap-2">
                        {item.pretitle && <p className="text-xs/none py-1 rounded-lg bg-grey-medium text-white text-opacity-70">{item.pretitle}</p>}
                    </div>
                </div>
            ))}
            </AnimatedGroup>
        </div>
    </Container>
    )
  );
}
