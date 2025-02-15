import { BlockElementIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const fullWidthImage = defineType({
  name: "fullWidthImage",
  title: "Fullwidth Image",
  type: "object",
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "content",
      title: "Contents",
      type: "simpleRichText",
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
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error("This field is required"),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
    prepare({ media, title }) {
      return {
        title: title || "Fullwidth Image",
        subtitle: title ? "Fullwidth Image" : undefined,
        media,
      };
    },
  },
});
