import { BlockElementIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { mediaPreview } from "sanity-plugin-icon-manager";

export const cardSection = defineType({
  name: "cardSection",
  title: "Card Section",
  type: "object",
  icon: BlockElementIcon,
  groups: [
    {
      title: "Contents",
      name: "content",
      default: true,
    },
    {
      title: "Style",
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
      title: "Description",
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
      name: "cards",
      title: "Contents",
      type: "array",
      of: [
        defineArrayMember({
          name: "card",
          title: "Kort",
          type: "object",
          fields: [
            defineField({
              name: "icon",
              type: "icon.manager",
              title: "Icon",
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "content",
              title: "Description",
              type: "simpleRichText",
            }),
          ],
          preview: {
            select: {
              title: "title",
              media: "icon",
            },
            prepare({ title, media }) {
              return {
                title: title || "Map",
                subtitle: title ? "Map" : undefined,
                media: mediaPreview(media),
              };
            },
          },
        }),
      ],
      group: "content",
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
        title: title || "Card Section",
        subtitle: title ? "Card Section" : undefined,
      };
    },
  },
});
