import { defineField, defineType } from "sanity";

export const allele = defineType({
  title: "Allele",
  name: "allele",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Allele navn",
      validation: (Rule) => Rule.required().error("Allele navn er påkrevd"),
    }),
    defineField({
      name: "id",
      type: "slug",
      title: "ID",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required().error("Allele ID er påkrevd"),
      hidden: ({ parent }) => !parent?.name,
    }),
  ],
});
