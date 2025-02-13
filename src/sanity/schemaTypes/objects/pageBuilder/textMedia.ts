import { BlockElementIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const textMedia = defineType({
  name: "textMedia",
  title: "Tekst og media",
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
      title: "Stiler",
    },
  ],
  fields: [
    defineField({
      name: "mediaType",
      title: "Mediatype",
      type: "string",
      options: {
        list: [
          { title: "Bilde", value: "image" },
          { title: "Video", value: "video" },
        ],
      },
      initialValue: "image",
      validation: (Rule) => Rule.required().error("Feltet er påkrevd"),
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
      of: [{ type: "link" }],
      group: "content",
    }),
    defineField({
      name: "mediaPlacement",
      title: "Plassering av media",
      type: "string",
      options: {
        list: [
          { title: "Venstre", value: "left" },
          { title: "Høyre", value: "right" },
        ],
      },
      initialValue: "left",
      validation: (Rule) => Rule.required().error("Feltet er påkrevd"),
      group: "styles",
    }),
    defineField({
      name: "variant",
      title: "Seksjonvariant",
      type: "string",
      options: {
        list: [
          { title: "Standard", value: "default" },
          { title: "Alternativ", value: "alternative" },
        ],
      },
      initialValue: "default",
      validation: (Rule) => Rule.required().error("Feltet er påkrevd"),
      group: "styles",
    }),
    defineField({
      name: "layout",
      title: "Utseende",
      type: "string",
      options: {
        list: [
          { title: "Standard", value: "default" },
          { title: "Full skjerm", value: "fullscreen" },
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
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: title || "Tekst og media",
        subtitle: title ? "Tekst og media" : undefined,
        media,
      };
    },
  },
});
