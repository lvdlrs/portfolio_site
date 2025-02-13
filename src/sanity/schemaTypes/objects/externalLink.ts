import { LinkIcon } from "@sanity/icons";
import { defineType } from "sanity";

export const externalLink = defineType({
  name: "externalLink",
  title: "Ekstern lenke",
  type: "object",
  icon: LinkIcon,
  fields: [
    {
      name: "url",
      title: "URL",
      type: "url",
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ["https", "tel", "mailto", "http"],
          allowRelative: true,
        }),
    },
  ],
});
