import { defineField, defineType } from "sanity";

export const therapy = defineType({
  name: "therapy",
  type: "document",
  title: "Terapi",
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
