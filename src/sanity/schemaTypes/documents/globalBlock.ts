import { defineArrayMember, defineField, defineType } from "sanity";
import { blocks } from "../objects/pageBuilder";
import { EarthAmericasIcon } from "@sanity/icons";

export const globalBlock = defineType({
  name: "globalBlock",
  title: "Global blokk",
  type: "document",
  icon: EarthAmericasIcon,
  fields: [
    defineField({
      name: "title",
      title: "Intern tittel",
      type: "string",
      description: "Brukes for å identifisere blokken i CMS-et",
      validation: (Rule) => Rule.required().error("Feltet er påkrevd"),
    }),
    defineField({
      name: "blocks",
      title: "Blocks",
      type: "array",
      of: [
        ...blocks.map((block) => {
          return defineArrayMember({
            type: block.name,
          });
        }),
      ],
      validation: (Rule) =>
        Rule.required()
          .error("Feltet er påkrevd")
          .min(1)
          .max(1)
          .error("Det kan kun være én blokk"),
      options: {
        insertMenu: {
          views: [{ name: "grid" }],
        },
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title,
      };
    },
  },
});
