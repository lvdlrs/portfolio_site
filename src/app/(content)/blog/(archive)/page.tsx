import { ResourceCard } from "@/components/elements/resource-card";
import { getPosts } from "@/data/post";
import { PAGE_KEY } from "@/lib/constants";
import { urlFor } from "@/sanity/lib/image";
import { notFound } from "next/navigation";

export default async function PostListing({
  searchParams,
}: {
  searchParams?: Promise<{ [PAGE_KEY]: string }>;
}) {
  const search = await searchParams;

  const { data } = await getPosts({
    page: search?.[PAGE_KEY],
  });

  if (!data) {
    notFound();
  }

  const foundPosts = data.length > 0;

  return (
    <div>
      {!foundPosts && (
        <div className="mt-8">
          <p className="text-base text-foreground">
            Det er ingen artikler å vise.
          </p>
        </div>
      )}
      {foundPosts && (
        <div className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-16 md:grid-cols-3">
          {data?.map((post) => (
            <ResourceCard
              key={post._id}
              href={`/blog/${post.slug.current}`}
              createdAt={post._createdAt}
              tag={post.tag ?? ""}
              title={post.title}
              excerpt={post.excerpt}
              featuredImage={
                post.featuredImage?.asset?._ref
                  ? {
                      url: urlFor(post.featuredImage)
                        .width(800)
                        .height(450)
                        .url(),
                      alt: post.featuredImage.alt ?? "",
                    }
                  : undefined
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
