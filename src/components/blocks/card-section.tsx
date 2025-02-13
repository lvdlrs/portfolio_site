import { cn } from "@/lib/utils";
import { Container } from "../container";
import { PageBuilderBlock } from "../page-builder";
import { PortableText } from "../portable-text";
import { ProseContent } from "../prose-content";
import { LinkButton } from "../shared/link-button";
import { GridContainer } from "../elements/grid-container";

type CardSectionProps = Extract<PageBuilderBlock, { _type: "cardSection" }>;

export function CardSection(
  props: CardSectionProps & {
    isHero?: boolean;
  },
) {
  const showLinks = Boolean(props.links?.length ?? 0 > 0);
  const showCards = Boolean(props.cards?.length ?? 0 > 0);
  const showDescription = Boolean(props.content?.text ?? 0 > 0);

  const showSectionHeader = !!props.title || showDescription || showLinks;
  return (
    <Container variant={props.variant} isHero={props.isHero}>
      <section className="mx-auto max-w space-y-16 py-12 md:py-24">
        {showSectionHeader && (
          <div className="max-w-prose">
            {props.title && (
              <h2 className="text-2xl font-semibold text-foreground sm:text-4xl">
                {props.title}
              </h2>
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
        )}
        {showCards && (
          <div>
            <GridContainer>
              {props.cards?.map((card) => (
                <div
                  key={card._key}
                  className={cn(
                    "rounded p-8 text-foreground",
                    props.variant === "alternative"
                      ? "bg-white"
                      : "bg-background",
                  )}
                >
                  {card.icon?.metadata?.inlineSvg && (
                    <div
                      className="mb-4"
                      dangerouslySetInnerHTML={{
                        __html: card.icon.metadata.inlineSvg,
                      }}
                    />
                  )}
                  <h3 className="text-2xl font-semibold">{card.title}</h3>
                  {card.content?.text && (
                    <div className="mt-2">
                      <ProseContent size="small">
                        <PortableText value={card.content.text} />
                      </ProseContent>
                    </div>
                  )}
                </div>
              ))}
            </GridContainer>
          </div>
        )}
      </section>
    </Container>
  );
}
