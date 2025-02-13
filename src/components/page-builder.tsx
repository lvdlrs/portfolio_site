"use client";

import { PageQueryResult } from "@/sanity/types";
import type { SanityDocument } from "@sanity/client";
import { createDataAttribute, useOptimistic } from "@sanity/visual-editing";
import { AccordionSection } from "./blocks/accordion-section";
import { CardSection } from "./blocks/card-section";
import { FullWidthImage } from "./blocks/full-width-image";
import { FullWidthVIdeo } from "./blocks/full-width-video";
import { TextContent } from "./blocks/text-content";
import { TextMedia } from "./blocks/text-media";

export type PageBuilderContent = Extract<
  NonNullable<NonNullable<PageQueryResult>["content"]>,
  { _type: "pageBuilder" }
>;
export type PageBuilderBlocks = NonNullable<PageBuilderContent["blocks"]>;
export type PageBuilderBlock = PageBuilderBlocks[number];

function PageBuilderBlock({
  isHero = false,
  ...props
}: { block: PageBuilderBlock } & {
  isHero?: boolean;
}) {
  if (props.block._type === "textMedia") {
    return <TextMedia {...props.block} isHero={isHero} />;
  }

  if (props.block._type === "fullWidthVideo") {
    return <FullWidthVIdeo {...props.block} isHero={isHero} />;
  }

  if (props.block._type === "textContent") {
    return <TextContent {...props.block} isHero={isHero} />;
  }

  if (props.block._type === "accordionSection") {
    return <AccordionSection {...props.block} isHero={isHero} />;
  }

  if (props.block._type === "fullWidthImage") {
    return <FullWidthImage {...props.block} isHero={isHero} />;
  }
  if (props.block._type === "cardSection") {
    return <CardSection {...props.block} isHero={isHero} />;
  }
}

type PageBuilderProps = {
  documentId: string;
  documentType: string;
  content: PageBuilderBlock[];
};

export function PageBuilder(props: PageBuilderProps) {
  const sections = useOptimistic<
    PageBuilderBlock[] | undefined | null,
    SanityDocument<PageBuilderProps>
  >(props.content, (currentSections, action) => {
    console.log(action.document);
    if (action.id === props.documentId && action.document.content) {
      return action.document.content;
    }

    return currentSections;
  });

  if (!sections?.length) {
    return null;
  }

  return (
    <div
      data-sanity={createDataAttribute({
        id: props.documentId,
        type: props.documentType,
        path: "pageBuilder.blocks",
      }).toString()}
    >
      {sections?.map((block, index) => {
        const isHero = index === 0;

        const currentBlock =
          block?._type === "globalContent" ? block?.globalBlock : block;

        return (
          <div
            data-sanity={createDataAttribute({
              id: props.documentId,
              type: props.documentType,
              path: `pageBuilder.blocks[_key=="${currentBlock?._key}"]`,
            }).toString()}
            key={currentBlock!._key}
          >
            <PageBuilderBlock block={currentBlock!} isHero={isHero} />
          </div>
        );
      })}
    </div>
  );
}
