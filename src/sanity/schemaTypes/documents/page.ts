import { DashboardIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Side",
  type: "document",
  icon: DashboardIcon,
  groups: [
    { title: "Contents", name: "content", default: true },
    { title: "SEO", name: "seo" },
  ],
  fields: [
    defineField({
      name: "image",
      title: "Bilde",
      type: "image",
      group: "content",
      hidden: ({ parent }) => parent?.contentType !== "text",
    }),
    defineField({
      name: "title",
      title: "Sidetittel",
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
      name: "contentType",
      title: "Contentsstype",
      type: "string",
      options: {
        list: [
          { title: "TekstContents", value: "text" },
          { title: "Sidebygger", value: "builder" },
        ],
      },
      initialValue: "text",
      validation: (Rule) => Rule.required().error("This field is required"),
      group: "content",
    }),
    defineField({
      name: "content",
      title: "Contents",
      type: "defaultRichText",
      hidden: ({ parent }) => parent?.contentType !== "text",
      group: "content",
    }),
    defineField({
      name: "pageBuilder",
      title: "Contents",
      type: "pageBuilder",
      hidden: ({ parent }) => parent?.contentType !== "builder",
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
