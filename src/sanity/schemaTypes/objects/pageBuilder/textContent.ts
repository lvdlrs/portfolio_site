import { BlockElementIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const textContent = defineType({
  name: "textContent",
  title: "Text",
  type: "object",
  icon: BlockElementIcon,
  groups: [
    { title: "Contents", name: "content", default: true },
    { title: "Styles", name: "styles" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
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
      title: "Links",
      type: "array",
      of: [{ type: "link" }],
      group: "content",
    }),
    defineField({
      name: "alignment",
      title: "Alignment",
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
      validation: (Rule) => Rule.required().error("This field is required"),
    }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Standard", value: "default" },
          { title: "Alternative", value: "alternative" },
        ],
      },
      initialValue: "default",
      group: "styles",
      validation: (Rule) => Rule.required().error("This field is required"),
    }),
    defineField({
      name: "layout",
      title: "Layout",
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
        title: title || "Text",
        subtitle: title ? "Text" : undefined,
      };
    },
  },
});
