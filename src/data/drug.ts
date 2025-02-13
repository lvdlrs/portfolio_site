import { sanity } from "@/sanity/lib/fetch";
import { defineQuery } from "next-sanity";

export async function getCategoryDrugs() {
  const categoryDrugs = defineQuery(`
    *[_type == "therapy"] | order(name asc) {
      name,
      _id,
      "drugs": *[_type == "drug" && references(^._id)] {
        name,
        _id,
        slug,
        productNames
      }
    }
  `);

  return sanity({
    query: categoryDrugs,
  });
}

export async function getPossibleDrugPhenotypes(drugs: string[]) {
  const possibleDrugPhenotypes = defineQuery(`
    {
      "drugs": *[_type == "drug" && slug.current in $drugs]|order(name asc) {
        _id,
        name,
        slug,
      },
      "genes": *[_type == "gene" && _id in array::unique(*[_type == 'drug' && slug.current in $drugs].comments[].combinations[].gene._ref)]|order(name asc) {
        name,
        id,
        isDuplicate,
        alleles[]-> {
          name,
          id
        },
        phenotypes[]{
          _key,
          alleles[]-> {
            name,
            id
          },
          result->{
            _id,
            result
          }
        }
      }
    }
  `);

  return await sanity({
    query: possibleDrugPhenotypes,
    params: { drugs },
  });
}

export async function getDrugComments(
  comments: Array<{
    gene: string;
    result: string;
  }>,
) {
  let query = "";
  query = `&& (${comments
    .map((comment) => {
      return `"${comment.gene}" in comments[].combinations[].gene->id.current  && "${comment.result}" in comments[].combinations[].result._ref`;
    })
    .join(" || ")})`;

  const drugComments = defineQuery(`
    *[_type == "drug" ${query}] {
      _id,
      name,
      slug,
      comments[] {
        combinations[] {
          "gene": gene->name,
        },
        severity,
        comment
      }
    }
  `);

  return await sanity({
    query: drugComments,
  });
}
