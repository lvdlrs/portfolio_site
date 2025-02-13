import { Breadcrumbs } from "@/components/elements/breadcrumbs";
import { Pill } from "@/components/elements/pill";
import { PortableText } from "@/components/portable-text";
import { ProseContent } from "@/components/prose-content";
import { getContentMeta } from "@/data/general";
import { getPost } from "@/data/post";
import { urlFor } from "@/sanity/lib/image";
import { format } from "date-fns";
import { nb } from "date-fns/locale";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string[] }>;
}): Promise<Metadata> {
  const { page } = await params;

  const { data } = await getContentMeta(page.join("/"), "post");

  if (!data) {
    return {};
  }

  return {
    title: data.title,
    description: data.description,
    robots: {
      follow: data.follow === "follow",
      index: data.index === "index",
    },
    alternates: {
      canonical: data.canonical,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ page: string[] }>;
}) {
  const { page } = await params;

  const { data } = await getPost(page.join("/"));

  if (!data) {
    notFound();
  }

  return (
    <div className="my-12 px-4 md:my-24">
      <div className="mx-auto max-w-prose space-y-8">
        <div>
          <div className="mb-6">
            <Breadcrumbs />
          </div>

          <ProseContent centered>
            <h1>{data?.title}</h1>
          </ProseContent>
          <div className="mt-4 flex items-center gap-4 text-sm/[1.5] font-semibold text-foreground">
            {data.tag && <Pill label={data.tag} />}
            <p>
              {format(data._createdAt, "d. MMMM yyyy", {
                locale: nb,
              })}
            </p>
          </div>
        </div>

        {data.featuredImage?.asset?._ref && (
          <figure>
            <Image
              src={urlFor(data.featuredImage).maxWidth(1024).url() ?? ""}
              width={1024}
              height={1024 / (data.featuredImage.metadata?.aspectRatio ?? 1)}
              alt={data.featuredImage.alt ?? ""}
              className="rounded"
            />
          </figure>
        )}

        <ProseContent centered>
          <PortableText value={data?.content?.text ?? []} />
        </ProseContent>
      </div>
    </div>
  );
}
