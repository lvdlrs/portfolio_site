import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const archivePage = defineType({
  name: "archivePage",
  title: "Akrivside",
  type: "document",
  icon: CogIcon,
  groups: [
    {
      name: "content",
      title: "Contents",
      default: true,
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
      validation: (Rule) => Rule.required().error("This field is required"),
      group: "content",
    }),
    defineField({
      name: "description",
      title: "Beskrivelse",
      type: "simpleRichText",
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
