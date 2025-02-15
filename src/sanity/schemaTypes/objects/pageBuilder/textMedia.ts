import { BlockElementIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const textMedia = defineType({
  name: "textMedia",
  title: "Image with text",
  type: "object",
  icon: BlockElementIcon,
  groups: [
    {
      title: "Contents",
      name: "content",
      default: true,
    },
    {
      name: "media",
      title: "Media",
    },
    {
      name: "styles",
      title: "Styles",
    },
  ],
  fields: [
    defineField({
      name: "mediaType",
      title: "Media Type",
      type: "string",
      options: {
        list: [
          { title: "Bilde", value: "image" },
          { title: "Video", value: "video" },
        ],
      },
      initialValue: "image",
      validation: (Rule) => Rule.required().error("This field is required"),
      group: "media",
    }),
    defineField({
      name: "image",
      title: "Media",
      type: "image",
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent?.mediaType !== "image",
      group: "media",
    }),
    defineField({
      name: "video",
      title: "Media",
      type: "video",
      hidden: ({ parent }) => parent?.mediaType !== "video",
      group: "media",
    }),
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
      name: "mediaPlacement",
      title: "Image position",
      type: "string",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Right", value: "right" },
        ],
      },
      initialValue: "left",
      validation: (Rule) => Rule.required().error("This field is required"),
      group: "styles",
    }),
    defineField({
      name: "mediaSize",
      title: "Image size",
      type: "string",
      options: {
        list: [
          { title: "Small", value: "threefourth" },
          { title: "Default", value: "default" },
        ],
      },
      initialValue: "default",
      validation: (Rule) => Rule.required().error("This field is required"),
      group: "styles",
    }),
    defineField({
      name: "variant",
      title: "Section Style",
      type: "string",
      options: {
        list: [
          { title: "Standard", value: "default" },
          { title: "Alternative", value: "alternative" },
        ],
      },
      initialValue: "default",
      validation: (Rule) => Rule.required().error("This field is required"),
      group: "styles",
    }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "Standard", value: "default" },
          { title: "Full Screen", value: "fullscreen" },
        ],
      },
      initialValue: "default",
      validation: (Rule) => Rule.required().error("This field is required"),
      group: "styles",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: title || "Image with text",
        subtitle: title ? "Image with text" : undefined,
        media,
      };
    },
  },
});
