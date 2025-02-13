import { BlockElementIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const fullWidthImage = defineType({
  name: "fullWidthImage",
  title: "Fullbredde bilde",
  type: "object",
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
    }),
    defineField({
      name: "content",
      title: "Innhold",
      type: "simpleRichText",
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
    }),
    defineField({
      name: "image",
      title: "Bilde",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error("Feltet er påkrevd"),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
    prepare({ media, title }) {
      return {
        title: title || "Fullbredde bilde",
        subtitle: title ? "Fullbredde bilde" : undefined,
        media,
      };
    },
  },
});
