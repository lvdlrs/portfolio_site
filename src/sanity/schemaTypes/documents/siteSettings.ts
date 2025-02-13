import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  groups: [
    {
      title: "Contents",
      name: "content",
      default: true,
    },
    {
      title: "Analytics",
      name: "analytics",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      group: "content",
    }),
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
      validation: (Rule) => Rule.required().error("Feltet er påkrevd"),
      group: "content",
    }),
    defineField({
      name: "description",
      title: "Site Description",
      type: "simpleRichText",
      group: "content",
    }),
    defineField({
      name: "headerNavigation",
      title: "Main Manvigation",
      type: "array",
      of: [
        defineField({
          name: "menuItem",
          title: "Menu Item",
          type: "link",
        }),
      ],
      group: "content",
    }),
    defineField({
      name: "googleTagManagerId",
      title: "Google Tag Manager ID",
      type: "string",
      validation: (Rule) =>
        Rule.custom((value) => {
          if (value && !/GTM-[A-Z0-9]{6,}$/.test(value)) {
            return "Ugyldig Google Tag Manager ID";
          }

          return true;
        }),
      group: "analytics",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
});
