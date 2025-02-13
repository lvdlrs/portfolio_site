import { INTERNAL_LINK_TYPES } from "@/sanity/lib/constants";
import { LinkIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const internalLink = defineType({
  name: "internalLink",
  title: "Intern lenke",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "reference",
      title: "Referanse",
      type: "reference",
      to: INTERNAL_LINK_TYPES.map((type) => ({ type })),
    }),
  ],
});
