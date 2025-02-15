import { BlockElementIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const fullWidthVideo = defineType({
  name: "fullWidthVideo",
  title: "Fullwidth video",
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
      name: "video",
      title: "Video",
      type: "video",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "video.thumbnail",
    },
    prepare({ media, title }) {
      return {
        title: title || "Fullwidth Video",
        subtitle: title ? "Fullwidth Video" : undefined,
        media,
      };
    },
  },
});
