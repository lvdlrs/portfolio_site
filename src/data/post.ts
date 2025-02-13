import { ARCHIVE_PER_PAGE } from "@/lib/constants";
import { sanity } from "@/sanity/lib/fetch";
import { defineQuery } from "next-sanity";
import { z } from "zod";
import {
  DEFAULT_RICH_TEXT_FRAGMENT,
  IMAGE_FRAGMENT,
  SIMPLE_RICH_TEXT_FRAGMENT,
} from "./fragments";

export async function getPost(slug: string) {
  const postQuery = defineQuery(
    `*[_type == "post" && slug.current == $slug][0]{
    title,
     "tag": tags[0]->title,
     _createdAt,
    featuredImage {
      ${IMAGE_FRAGMENT}
    },
    content {
      text[]{
        ${DEFAULT_RICH_TEXT_FRAGMENT}
      }
    }
  }`,
  );

  return await sanity({
    query: postQuery,
    params: {
      slug,
    },
  });
}

const searchParamsSchema = z.object({
  page: z.coerce.number().min(1).default(1),
});

export async function getPosts({ page }: { page?: string }) {
  const searchParams = searchParamsSchema.safeParse({ page: page || 1 });

  const currentPage = searchParams.data?.page ? searchParams.data.page - 1 : 0;

  const start = currentPage * ARCHIVE_PER_PAGE;
  const limit = start + ARCHIVE_PER_PAGE;

  const postsQuery = defineQuery(
    `*[_type == "post"]|order(_createdAt desc)[$start...$limit]{
      _id,
      title,
      slug,
      _createdAt,
      featuredImage {
        ${IMAGE_FRAGMENT}
      },
      "excerpt": pt::text(content.text[0]),
      "tag": tags[0]->title
    }`,
  );

  return await sanity({
    query: postsQuery,
    params: {
      start,
      limit,
    },
  });
}

export async function getArchiveData(id: string) {
  const archiveData = defineQuery(
    `*[_type == "archivePage" && _id == $id][0]{
        title,
        "slug": slug.current,
        description {
          text[]{
            ${SIMPLE_RICH_TEXT_FRAGMENT}
          }
        },
        "total": round(count(*[_type == "post"]) / $perPage)
      }
    `,
  );

  return await sanity({
    query: archiveData,
    params: {
      id,
      perPage: ARCHIVE_PER_PAGE,
    },
  });
}
