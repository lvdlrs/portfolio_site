import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Sideinnstillinger",
  type: "document",
  icon: CogIcon,
  groups: [
    {
      title: "Innhold",
      name: "content",
      default: true,
    },
    {
      title: "Sporing",
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
      title: "Sitetittel",
      type: "string",
      validation: (Rule) => Rule.required().error("Feltet er påkrevd"),
      group: "content",
    }),
    defineField({
      name: "description",
      title: "Sidebeskrivelse",
      type: "simpleRichText",
      group: "content",
    }),
    defineField({
      name: "headerNavigation",
      title: "Topp navigasjon",
      type: "array",
      of: [
        defineField({
          name: "menuItem",
          title: "Menypunkt",
          type: "link",
        }),
      ],
      group: "content",
    }),
    defineField({
      name: "footerNavigation",
      title: "Bunn navigasjon",
      type: "array",
      of: [
        defineField({
          name: "menuItem",
          title: "Menypunkt",
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
