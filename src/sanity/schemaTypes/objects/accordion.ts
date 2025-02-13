import { CollapseIcon } from "@sanity/icons";
import { defineArrayMember, defineField } from "sanity";

export const accordion = defineField({
  name: "accordion",
  title: "Accordion",
  type: "object",
  icon: CollapseIcon,
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
    }),
    defineField({
      name: "items",
      title: "Contents",
      type: "array",
      of: [
        defineArrayMember({
          name: "item",
          title: "Item",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Tittel",
              type: "string",
              validation: (Rule) => Rule.required().error("Feltet er påkrevd"),
            }),
            defineField({
              name: "content",
              title: "Contents",
              type: "simpleRichText",
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "NedtrekkContents",
        subtitle: title ? "NedtrekkContents" : undefined,
      };
    },
  },
});
