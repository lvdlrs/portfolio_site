import { defineField, defineType } from "sanity";

export const result = defineType({
  name: "result",
  title: "Resultat",
  type: "document",
  fields: [
    defineField({
      name: "result",
      title: "Resultat",
      type: "string",
      validation: (Rule) => Rule.required().error("Resultat er påkrevd"),
    }),
  ],
});
