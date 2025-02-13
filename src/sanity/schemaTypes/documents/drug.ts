import { toPlainText } from "next-sanity";
import { defineArrayMember, defineField, defineType } from "sanity";

function getSeverity(severity: string) {
  switch (severity) {
    case "standard":
      return "Standard dosering";
    case "low":
      return "Lite informasjon";
    case "medium":
      return "Kan ha bivirkninger";
    case "high":
      return "Endret dosering";
  }
}

export const drug = defineType({
  name: "drug",
  type: "document",
  title: "Legemiddel",
  groups: [
    {
      name: "general",
      title: "Generelt",
      default: true,
    },
    {
      name: "categories",
      title: "Kategorier",
    },
  ],
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Navn",
      group: "general",
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "name",
      },
      group: "general",
    }),
    defineField({
      name: "similar",
      type: "array",
      title: "Lignende legemidler",
      of: [defineArrayMember({ type: "string" })],
      group: "general",
    }),
    defineField({
      name: "productNames",
      type: "array",
      title: "Produktnavn",
      of: [defineArrayMember({ type: "string" })],
      group: "general",
    }),
    defineField({
      name: "categories",
      type: "array",
      title: "Kategorier",
      of: [{ type: "reference", to: [{ type: "drugCategory" }] }],
      validation: (Rule) =>
        Rule.required().error("Kategorier er påkrevd").max(1).unique(),
      group: "categories",
    }),
    defineField({
      name: "treatments",
      type: "array",
      title: "Behandlinger",
      of: [{ type: "reference", to: [{ type: "therapy" }] }],
      validation: (Rule) =>
        Rule.required().error("Behandlinger er påkrevd").max(1).unique(),
      group: "categories",
    }),
    defineField({
      name: "comments",
      title: "Kommentarer",
      type: "array",
      of: [
        defineArrayMember({
          name: "comment",
          title: "Kommentar",
          type: "object",
          fields: [
            defineField({
              name: "combinations",
              type: "array",
              title: "Kombinasjon",
              of: [
                defineArrayMember({
                  title: "Kombinasjon",
                  name: "combination",
                  type: "object",
                  fields: [
                    defineField({
                      name: "gene",
                      type: "reference",
                      to: [{ type: "gene" }],
                      validation: (Rule) =>
                        Rule.required().error("Gene er påkrevd"),
                    }),
                    defineField({
                      name: "result",
                      type: "reference",
                      to: [{ type: "result" }],
                      validation: (Rule) =>
                        Rule.required().error("Resultat er påkrevd"),
                    }),
                  ],
                  preview: {
                    select: {
                      gene: "gene.name",
                      result: "result.result",
                    },
                    prepare: (selection) => ({
                      title: `${selection.gene} - ${selection.result}`,
                    }),
                  },
                }),
              ],
            }),
            defineField({
              name: "comment",
              type: "array",
              title: "Kommentar",
              of: [
                defineArrayMember({
                  type: "block",
                  styles: [{ title: "Normal", value: "normal" }],
                }),
              ],
            }),
            defineField({
              name: "severity",
              type: "string",
              title: "Alvorlighet",
              options: {
                list: [
                  {
                    title: "Standard dosering",
                    value: "standard",
                  },
                  {
                    title: "Lite informasjon",
                    value: "low",
                  },

                  {
                    title: "Kan ha bivirkninger",
                    value: "medium",
                  },
                  {
                    title: "Endret dosering",
                    value: "high",
                  },
                ],
              },
            }),
          ],
          preview: {
            select: {
              gene: "combinations.0.gene.name",
              result: "combinations.0.result.result",
              severity: "severity",
            },
            prepare: (selection) => {
              return {
                title: `${selection.gene} - ${selection.result}`,
                subtitle: getSeverity(selection.severity),
              };
            },
          },
        }),
      ],
      group: "general",
    }),
  ],
});
