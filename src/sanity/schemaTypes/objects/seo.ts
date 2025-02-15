import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fieldsets: [
    {
      name: "robots",
      title: "Robots",
      options: {
        columns: 2,
      },
    },
  ],
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "index",
      title: "Index",
      type: "string",
      options: {
        list: ["index", "noindex"],
      },
      initialValue: "index",
      validation: (Rule) => Rule.required().error("Feltet er påkrevd"),
      fieldset: "robots",
    }),
    defineField({
      name: "follow",
      title: "Follow",
      type: "string",
      options: {
        list: ["follow", "nofollow"],
      },
      initialValue: "follow",
      validation: (Rule) => Rule.required().error("Feltet er påkrevd"),
      fieldset: "robots",
    }),
    defineField({
      name: "canonical",
      title: "Canonical URL",
      type: "string",
      description:
        "Ved å angi en kanonisk URL, kan du fortelle søkemotorer hvilken URL som er den primære for denne siden. Vil automatisk bruke siden sin URL om feltet er tomt.",
    }),
  ],
});
