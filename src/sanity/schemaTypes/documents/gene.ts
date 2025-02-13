import { SanityDocument } from "next-sanity";
import {
  defineArrayMember,
  defineField,
  defineType,
  ReferenceFilterResolverContext,
} from "sanity";

export const gene = defineType({
  title: "Gen",
  name: "gene",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Gene navn",
      validation: (Rule) => Rule.required().error("Gene navn er påkrevd"),
    }),
    defineField({
      name: "id",
      type: "slug",
      title: "ID",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required().error("Gene ID er påkrevd"),
      hidden: ({ parent }) => !parent?.name,
    }),
    defineField({
      name: "isDuplicate",
      title: "Er duplikat",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "alleles",
      title: "Mulige alleler",
      type: "array",
      of: [{ type: "reference", to: [{ type: "allele" }] }],
      options: {
        sortable: false,
      },
      validation: (Rule) =>
        Rule.required().error("Alleler er påkrevd").unique(),
    }),
    defineField({
      name: "phenotypes",
      title: "Fenotyper",
      type: "array",
      of: [
        defineField({
          name: "phenotype",
          title: "Fenotype",
          type: "object",
          fields: [
            defineField({
              name: "alleles",
              title: "Alleler",
              type: "array",
              of: [
                defineArrayMember({
                  type: "reference",
                  to: [{ type: "allele" }],
                  options: {
                    filter: ({
                      document,
                    }: {
                      document: SanityDocument<{
                        alleles: Array<{ _type: "reference"; _ref: string }>;
                      }>;
                    } & ReferenceFilterResolverContext) => {
                      const ids = document?.alleles?.map(
                        (allele) => allele._ref,
                      );
                      return {
                        filter: `_id in $ids`,
                        params: {
                          ids,
                        },
                      };
                    },
                  },
                  validation: (Rule) =>
                    Rule.custom((value, context) => {
                      const isPossible = context.document?.alleles?.some(
                        (allele) => allele._ref === value?._ref,
                      );
                      return isPossible
                        ? true
                        : "Allelen er ikke mulig for dette genet";
                    }),
                }),
              ],
              validation: (Rule) => Rule.required().error("Alleler er påkrevd"),
              options: {
                sortable: false,
              },
            }),
            defineField({
              name: "result",
              title: "Resultat",
              type: "reference",
              to: [{ type: "result" }],
              validation: (Rule) =>
                Rule.required().error("Resultat er påkrevd"),
            }),
          ],
          preview: {
            select: {
              allele1: "alleles.0.name",
              allele2: "alleles.1.name",
              allele3: "alleles.2.name",
              allele4: "alleles.3.name",
              allele5: "alleles.4.name",
              result: "result.result",
            },
            prepare: ({
              allele1,
              allele2,
              allele3,
              allele4,
              allele5,
              result,
            }) => {
              const alleles = [
                allele1,
                allele2,
                allele3,
                allele4,
                allele5,
              ].filter((allele) => allele);

              return {
                title: `${alleles.join(" + ")}`,
                subtitle: result,
              };
            },
          },
        }),
      ],
      hidden: ({ parent }) => !parent?.alleles,
      options: {
        sortable: false,
      },
    }),
  ],
});
