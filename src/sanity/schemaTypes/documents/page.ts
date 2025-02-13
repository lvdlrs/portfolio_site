import { DashboardIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Side",
  type: "document",
  icon: DashboardIcon,
  groups: [
    { title: "Innhold", name: "content", default: true },
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
      validation: (Rule) => Rule.required().error("Feltet er påkrevd"),
      group: "content",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (Rule) => Rule.required().error("Feltet er påkrevd"),
      options: {
        source: "title",
      },
      group: "content",
    }),
    defineField({
      name: "contentType",
      title: "Innholdstype",
      type: "string",
      options: {
        list: [
          { title: "Tekstinnhold", value: "text" },
          { title: "Sidebygger", value: "builder" },
        ],
      },
      initialValue: "text",
      validation: (Rule) => Rule.required().error("Feltet er påkrevd"),
      group: "content",
    }),
    defineField({
      name: "content",
      title: "Innhold",
      type: "defaultRichText",
      hidden: ({ parent }) => parent?.contentType !== "text",
      group: "content",
    }),
    defineField({
      name: "pageBuilder",
      title: "Innhold",
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
