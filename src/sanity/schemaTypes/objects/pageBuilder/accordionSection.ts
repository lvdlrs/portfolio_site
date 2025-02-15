import { BlockElementIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const accordionSection = defineType({
  name: "accordionSection",
  title: "Accordion",
  type: "object",
  icon: BlockElementIcon,
  groups: [
    {
      title: "Contents",
      name: "content",
      default: true,
    },
    {
      title: "Styles",
      name: "styles",
    },
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
      of: [
        defineArrayMember({
          type: "link",
        }),
      ],
      group: "content",
    }),
    defineField({
      name: "items",
      title: "Accordion Items",
      type: "array",
      of: [
        defineArrayMember({
          name: "item",
          title: "Contents",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required().error("Feltet er påkrevd"),
            }),
            defineField({
              name: "content",
              title: "Description",
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
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "Full width", value: "default" },
          { title: "Centered", value: "centered " },
        ],
      },
      initialValue: "default",
      validation: (Rule) => Rule.required().error("The field is required"),
      group: "styles",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "Accordion",
        subtitle: title ? "Accordion" : undefined,
      };
    },
  },
});
