import { sanity } from "@/sanity/lib/fetch";
import { defineQuery } from "next-sanity";
import {
  DEFAULT_RICH_TEXT_FRAGMENT,
  IMAGE_FRAGMENT,
  PAGE_BUILDER_FRAGMENT,
} from "./fragments";

export async function getPage(slug: string) {
  const pageQuery = defineQuery(
    `*[_type == "page" && slug.current == $slug][0]{
      _id,
      _type,
      title,
      "content": select(
        contentType == "text" => content{
          _type,
          "image": ^.image {
            ${IMAGE_FRAGMENT}
          },
          text[]{
            ${DEFAULT_RICH_TEXT_FRAGMENT}
          },
          "tableOfContents": text[style == "h2"]{
            _key,
            "text": coalesce(children[0].text, "")
          },
        },
        contentType == "builder" => pageBuilder {
          _type,
          blocks[]{
            ${PAGE_BUILDER_FRAGMENT}
          }
        }
      ),
    }`,
  );

  return await sanity({
    query: pageQuery,
    params: {
      slug,
    },
  });
}

export async function getHomePage() {
  const homePageQuery = defineQuery(
    `*[_type == "frontPage"][0]{
      _id,
      _type,
      title,
      "content": pageBuilder {
        _type,
        blocks[]{
          ${PAGE_BUILDER_FRAGMENT}
        }
      }
    }`,
  );

  return await sanity({
    query: homePageQuery,
  });
}
