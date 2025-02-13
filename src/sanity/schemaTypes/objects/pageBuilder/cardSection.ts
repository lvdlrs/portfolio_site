import { BlockElementIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { mediaPreview } from "sanity-plugin-icon-manager";

export const cardSection = defineType({
  name: "cardSection",
  title: "Kortseksjon",
  type: "object",
  icon: BlockElementIcon,
  groups: [
    {
      title: "Contents",
      name: "content",
      default: true,
    },
    {
      title: "Stiler",
      name: "styles",
    },
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
      title: "Beskrivelse",
      type: "simpleRichText",
      group: "content",
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
              title: "Ikon",
            }),
            defineField({
              name: "title",
              title: "Tittel",
              type: "string",
            }),
            defineField({
              name: "content",
              title: "Beskrivelse",
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
                title: title || "Kort",
                subtitle: title ? "Kort" : undefined,
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
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "Kortseksjon",
        subtitle: title ? "Kortseksjon" : undefined,
      };
    },
  },
});
