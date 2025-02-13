import { BlockElementIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const fullWidthVideo = defineType({
  name: "fullWidthVideo",
  title: "Fullbredde video",
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
      title: "Contents",
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
        title: title || "Full bredde video",
        subtitle: title ? "Full bredde video" : undefined,
        media,
      };
    },
  },
});
