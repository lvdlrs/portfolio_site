import { INTERNAL_LINK_TYPES } from "@/sanity/lib/constants";
import { defineField, defineType } from "sanity";

export const linkwithicon = defineType({
  name: "linkicon",
  title: "Link",
  type: "object",
  fields: [
    defineField({
        name: "icon",
        type: "icon.manager",
        title: "Icon",
      }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required().error("This field is required"),
    }),
    defineField({
      name: "linkType",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Internal", value: "internal" },
          { title: "External", value: "external" },
        ],
      },
      initialValue: "internal",
      validation: (Rule) => Rule.required().error("This field is required."),
    }),
    defineField({
      name: "internalLink",
      title: "Internal link",
      type: "reference",
      to: INTERNAL_LINK_TYPES.map((type) => ({ type })),
      hidden: ({ parent }) => parent?.linkType !== "internal",
    }),
    defineField({
      name: "externalLink",
      title: "External link",
      type: "externalLink",
      hidden: ({ parent }) => parent?.linkType !== "external",
    }),
  ],
});
