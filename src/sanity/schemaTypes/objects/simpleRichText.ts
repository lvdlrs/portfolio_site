import { defineArrayMember, defineField, defineType } from "sanity";

export const simpleRichText = defineType({
  name: "simpleRichText",
  title: "Contents",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Tekst",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
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
      ],
    }),
  ],
});
