import { urlFor } from "@/sanity/lib/image";
import {
  PortableTextComponentProps,
  PortableTextMarkComponentProps,
  PortableTextProps,
  PortableText as RawPortableText,
} from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { PortableTextBlock } from "sanity";
import slugify from "slugify";
import { YouTube } from "./elements/youtube";
import { Accordion, AccordionItem } from "./ui/accordion";

type ImageProps = {
  alt?: string;
  caption?: string;
  asset?: {
    _ref: string;
    _type: "reference";
  };
  metadata?: {
    aspectRatio: number;
    height: number;
    width: number;
  };
};

export function PortableText(props: PortableTextProps) {
  return (
    <RawPortableText
      {...props}
      components={{
        block: {
          h2: (props) => {
            const text =
              Array.isArray(props.children) &&
              typeof props.children[0] === "string"
                ? props.children[0]
                : "";
            const slug = slugify(text ?? "", {
              lower: true,
            });
            return (
              <h2 id={slug} className="scroll-mt-[calc(var(--header)+39px)]">
                {props.children}
              </h2>
            );
          },
        },
        marks: {
          internaLink: (
            props: PortableTextMarkComponentProps<{
              _type: "internalLink";
              slug: string;
            }>,
          ) => {
            return <Link href={`/${props.value?.slug}`}>{props.children}</Link>;
          },
          externalLink: (
            props: PortableTextMarkComponentProps<{
              _type: "externalLink";
              url: string;
            }>,
          ) => {
            return (
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={props.value?.url ?? "#"}
              >
                {props.children}
              </Link>
            );
          },
        },
        types: {
          image: (
            props: PortableTextComponentProps<
              {
                _type: "image";
              } & ImageProps
            >,
          ) => {
            if (!props.value.asset?._ref) return null;
            const aspectRatio = props.value.metadata?.aspectRatio ?? 1;

            const imageWidth = 1200;
            const imageHeight = Math.round(imageWidth / aspectRatio);

            const elementWidth = 800;
            const elementHeight = Math.round(elementWidth / aspectRatio);

            return (
              <figure>
                <Image
                  src={
                    urlFor(props.value.asset)
                      .width(imageWidth)
                      .height(imageHeight)
                      .url() ?? ""
                  }
                  alt={props.value.alt ?? ""}
                  width={elementWidth}
                  height={elementHeight}
                  className="rounded-lg"
                />
                {props.value.caption && (
                  <figcaption>{props.value.caption}</figcaption>
                )}
              </figure>
            );
          },
          video: (
            props: PortableTextComponentProps<{
              _type: "video";
              _key: string;
              title: string;
              videoUrl?: string;
              thumbnail?: ImageProps;
            }>,
          ) => {
            return (
              <YouTube
                id={props.value.videoUrl ?? ""}
                title={props.value.title}
              />
            );
          },
          accordion: (
            props: PortableTextComponentProps<{
              _type: "accordion";
              _key: string;
              title?: string;
              items: Array<{
                _key: string;
                title?: string;
                content?: {
                  text: PortableTextBlock[];
                };
              }>;
            }>,
          ) => {
            return (
              <div>
                {props.value.title && (
                  <p>
                    <strong>{props.value.title}</strong>
                  </p>
                )}
                <Accordion type="single" collapsible size="small">
                  {props.value.items.map((item) => (
                    <AccordionItem
                      title={item.title ?? ""}
                      key={item._key}
                      value={item._key}
                    >
                      <div className="prose">
                        <PortableText value={item.content?.text ?? []} />
                      </div>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            );
          },
        },
      }}
    />
  );
}
