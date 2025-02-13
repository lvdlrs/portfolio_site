import { BlockElementIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const textContent = defineType({
  name: "textContent",
  title: "Tekst",
  type: "object",
  icon: BlockElementIcon,
  groups: [
    { title: "Innhold", name: "content", default: true },
    { title: "Stiler", name: "styles" },
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
      title: "Innhold",
      type: "simpleRichText",
      group: "content",
    }),
    defineField({
      name: "links",
      title: "Lenker",
      type: "array",
      of: [{ type: "link" }],
      group: "content",
    }),
    defineField({
      name: "alignment",
      title: "Justering",
      type: "string",
      options: {
        list: [
          { title: "Venstre", value: "left" },
          { title: "Midten", value: "center" },
          { title: "Høyre", value: "right" },
        ],
      },
      initialValue: "left",
      group: "styles",
      validation: (Rule) => Rule.required().error("Feltet er påkrevd"),
    }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Standard", value: "default" },
          { title: "Alternativ", value: "alternative" },
        ],
      },
      initialValue: "default",
      group: "styles",
      validation: (Rule) => Rule.required().error("Feltet er påkrevd"),
    }),
    defineField({
      name: "layout",
      title: "Utseende",
      type: "string",
      options: {
        list: [
          { title: "Standard", value: "default" },
          { title: "Kolonner", value: "columns" },
        ],
      },
      initialValue: "default",
      group: "styles",
      hidden: ({ parent }) => parent?.alignment !== "left",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "Tekst",
        subtitle: title ? "Tekst" : undefined,
      };
    },
  },
});
