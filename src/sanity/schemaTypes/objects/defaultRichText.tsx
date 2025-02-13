import { ImageIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const defaultRichText = defineType({
  name: "defaultRichText",
  title: "Innhold",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Tekst",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Overskift 2", value: "h2" },
            { title: "Overskrift 3", value: "h3" },
            { title: "Overskrift 4", value: "h4" },
            { title: "Sitat", value: "blockquote" },
          ],
          marks: {
            annotations: [
              defineArrayMember({
                type: "internalLink",
              }),
              defineArrayMember({
                type: "externalLink",
              }),
            ],
          },
        }),
        defineArrayMember({
          name: "image",
          title: "Bilde",
          type: "image",
          icon: ImageIcon,
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: "alt",
              title: "Alternativ tekst",
              type: "string",
              description:
                "Beskriv bildet for skjermlesere, brukt for svaksynte",
              validation: (Rule) => Rule.required().error("Feltet er påkrevd"),
            }),
            defineField({
              name: "caption",
              title: "Bildetekst",
              type: "string",
            }),
          ],
        }),
        defineField({
          name: "video",
          title: "Video",
          type: "video",
        }),
        defineField({
          name: "accordion",
          title: "Nedtrekkinnhold",
          type: "accordion",
        }),
      ],
    }),
  ],
});
