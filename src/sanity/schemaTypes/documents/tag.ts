import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const tag = defineType({
  name: "tag",
  title: "Emne",
  type: "document",
  icon: TagIcon,

  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
      validation: (Rule) => Rule.required().error("Feltet er påkrevd"),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required().error("Feltet er påkrevd"),
    }),
  ],
});
