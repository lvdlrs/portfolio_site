import { sanity } from "@/sanity/lib/fetch";
import { defineQuery } from "next-sanity";
import {
  IMAGE_FRAGMENT,
  ICON_LINK_FRAGMENT,
  SEO_FRAGMENT,
} from "./fragments";

export async function getLayoutData() {
  const layoutQuery = defineQuery(
    `*[_type == "siteSettings"][0]{
      googleTagManagerId,
      "header": {
          title,
          logo {
            ${IMAGE_FRAGMENT}
          },
          headerNavigation[]{
            _key,
            ${ICON_LINK_FRAGMENT}
          }
        }
      }`,
  );

  return await sanity({
    query: layoutQuery,
  });
}

export async function getContentMeta(slug: string, type: string) {
  const contentMetaQuery = defineQuery(
    `*[_type == $type && slug.current == $slug][0]{
      ${SEO_FRAGMENT}
    }`,
  );

  return await sanity({
    query: contentMetaQuery,
    params: { slug, type },
  });
}

export async function getHomePageMeta() {
  const homePageMeta = defineQuery(
    `*[_type == "frontPage"][0]{
      ${SEO_FRAGMENT}
    }`,
  );

  return await sanity({
    query: homePageMeta,
  });
}

export async function getLayoutMeta() {
  const layoutMeta = defineQuery(
    `*[_type == "siteSettings"][0]{
      ${SEO_FRAGMENT}
    }`,
  );

  return await sanity({
    query: layoutMeta,
  });
}
