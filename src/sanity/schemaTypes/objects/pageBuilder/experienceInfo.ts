import { CaseIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const experienceInfo = defineType({
  name: "experienceInfo",
  title: "Experiences",
  type: "object",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
        name: "experiencelist",
        title: "List",
        type: "array",
        of: [{ type: "experienceList" }],
    })
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "Experiences",
      };
    },
  },
});
