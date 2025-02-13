import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const frontPage = defineType({
  name: "frontPage",
  title: "Homepage",
  type: "document",
  icon: HomeIcon,
  groups: [
    { title: "Contents", name: "content", default: true },
    { title: "SEO", name: "seo" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Internal Title",
      type: "string",
      hidden: true,
      readOnly: true,
      initialValue: "Homepage",
    }),
    defineField({
      name: "pageBuilder",
      title: "Contents",
      type: "pageBuilder",
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
