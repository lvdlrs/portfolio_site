import { PortableText } from "next-sanity";
import { Container } from "../container";
import { PageBuilderBlock } from "../page-builder";
import { LinkButton } from "../shared/link-button";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { ProseContent } from "../prose-content";

type AccordionSectionProps = Extract<
  PageBuilderBlock,
  { _type: "accordionSection" }
>;

export function AccordionSection(
  props: AccordionSectionProps & {
    isHero?: boolean;
  },
) {
  const Heading = props.isHero ? "h1" : "h2";

  const showLinks = Boolean(props.links?.length ?? 0 > 0);
  const showAccordion = Boolean(props.items?.length ?? 0 > 0);
  return (
    <Container isHero={props.isHero}>
      <section
        className={cn(
          "mx-auto py-12 md:py-24",
          props.layout === "default" ? "max-w" : "max-w-prose",
        )}
      >
        <div className="grid gap-10 md:grid-cols-2">
          {props.title && (
            <Heading
              className={cn(
                "font-semibold text-foreground",
                props.isHero ? "text-3xl sm:text-5xl" : "text-2xl sm:text-4xl",
              )}
            >
              {props.title}
            </Heading>
          )}
          <div>
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
        </div>
        {showAccordion && (
          <div className="mt-8">
            <Accordion type="single" collapsible>
              {props.items?.map((item) => (
                <AccordionItem key={item._key} value={item._key}>
                  <AccordionTrigger>{item.title}</AccordionTrigger>
                  <AccordionContent>
                    <PortableText value={item.content.text ?? []} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </section>
    </Container>
  );
}
