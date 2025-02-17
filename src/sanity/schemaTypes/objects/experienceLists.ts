import { CaseIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const experienceList = defineType({
  name: "experienceList",
  title: "Experiences List",
  type: "object",
  icon: CaseIcon,
  fields: [
    defineField({
        name: "pretitle",
        title: "Pretitle",
        type: "string",
    }),
    defineField({
      name: "position",
      title: "Position",
      type: "string",
    }),
    defineField({
        name: "company",
        title: "Company",
        type: "string",
    }),
    defineField({
        name: "content",
        title: "Details",
        type: "simpleRichText",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title,
      };
    },
  },
});
