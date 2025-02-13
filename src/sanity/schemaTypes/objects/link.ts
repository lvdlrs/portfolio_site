import { INTERNAL_LINK_TYPES } from "@/sanity/lib/constants";
import { defineField, defineType } from "sanity";

export const link = defineType({
  name: "link",
  title: "Lenke",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Tekst",
      type: "string",
      validation: (Rule) => Rule.required().error("Feltet er påkrevd"),
    }),
    defineField({
      name: "linkType",
      title: "Lenketype",
      type: "string",
      options: {
        list: [
          { title: "Intern lenke", value: "internal" },
          { title: "Ekstern lenke", value: "external" },
        ],
      },
      initialValue: "internal",
      validation: (Rule) => Rule.required().error("Feltet er påkrevd"),
    }),
    defineField({
      name: "internalLink",
      title: "Intern lenke",
      type: "reference",
      to: INTERNAL_LINK_TYPES.map((type) => ({ type })),
      hidden: ({ parent }) => parent?.linkType !== "internal",
    }),
    defineField({
      name: "externalLink",
      title: "Ekstern lenke",
      type: "externalLink",
      hidden: ({ parent }) => parent?.linkType !== "external",
    }),
  ],
});
