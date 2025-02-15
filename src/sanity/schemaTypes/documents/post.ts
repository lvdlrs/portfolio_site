import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Artikkel",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { title: "Contents", name: "content", default: true },
    { title: "SEO", name: "seo" },
  ],
  fields: [
    defineField({
      name: "featuredImage",
      title: "Fremhevet bilde",
      type: "image",
      options: {
        hotspot: true,
      },
      group: "content",
    }),
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
      validation: (Rule) => Rule.required().error("This field is required"),
      group: "content",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (Rule) => Rule.required().error("This field is required"),
      options: {
        source: "title",
      },
      group: "content",
    }),
    defineField({
      name: "tags",
      title: "Emner",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "tag" }],
        }),
      ],
      validation: (Rule) =>
        Rule.required()
          .error("This field is required")
          .unique()
          .error("Kan ikke ha duplikater"),
      group: "content",
    }),
    defineField({
      name: "content",
      title: "Contents",
      type: "defaultRichText",
      group: "content",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
});
