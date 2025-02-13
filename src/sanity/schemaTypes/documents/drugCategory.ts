import { defineField, defineType } from "sanity";

export const drugCategory = defineType({
  name: "drugCategory",
  type: "document",
  title: "Legemiddelkategori",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Navn",
      validation: (Rule) => Rule.required().error("Navn er påkrevd"),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required().error("Slug er påkrevd"),
    }),
  ],
});
