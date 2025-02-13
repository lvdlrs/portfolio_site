import { BlockElementIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const accordionSection = defineType({
  name: "accordionSection",
  title: "Nedtrekk seksjon",
  type: "object",
  icon: BlockElementIcon,
  groups: [
    {
      title: "Contents",
      name: "content",
      default: true,
    },
    {
      title: "Stiler",
      name: "styles",
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "content",
      title: "Contents",
      type: "simpleRichText",
      group: "content",
    }),
    defineField({
      name: "links",
      title: "Lenker",
      type: "array",
      of: [
        defineArrayMember({
          type: "link",
        }),
      ],
      group: "content",
    }),
    defineField({
      name: "items",
      title: "NedtrekkContents",
      type: "array",
      of: [
        defineArrayMember({
          name: "item",
          title: "Contents",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Tittel",
              type: "string",
              validation: (Rule) => Rule.required().error("Feltet er påkrevd"),
            }),
            defineField({
              name: "content",
              title: "Beskrivelse",
              type: "simpleRichText",
              validation: (Rule) => Rule.required().error("Feltet er påkrevd"),
            }),
          ],
        }),
      ],
      group: "content",
    }),
    defineField({
      name: "layout",
      title: "Utseende",
      type: "string",
      options: {
        list: [
          { title: "Full bredde", value: "default" },
          { title: "Sentrert", value: "centered " },
        ],
      },
      initialValue: "default",
      validation: (Rule) => Rule.required().error("Feltet er påkrevd"),
      group: "styles",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "Nedtrekk seksjon",
        subtitle: title ? "Nedtrekk seksjon" : undefined,
      };
    },
  },
});
