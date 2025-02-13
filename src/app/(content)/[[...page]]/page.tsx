import { Container } from "@/components/container";
import { Breadcrumbs } from "@/components/elements/breadcrumbs";
import { Toc } from "@/components/elements/toc";
import { PageBuilder } from "@/components/page-builder";
import { PortableText } from "@/components/portable-text";
import { ProseContent } from "@/components/prose-content";
import { getContentMeta, getHomePageMeta } from "@/data/general";
import { getHomePage, getPage } from "@/data/page";
import { urlFor } from "@/sanity/lib/image";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page?: string[] }>;
}): Promise<Metadata> {
  const { page } = await params;

  const { data } = page
    ? await getContentMeta(page.join("/"), "page")
    : await getHomePageMeta();

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

export default async function Page({
  params,
}: {
  params: Promise<{
    page?: string[];
  }>;
}) {
  const { page } = await params;

  const { data } = page ? await getPage(page.join("/")) : await getHomePage();

  if (!data) {
    notFound();
  }

  const content = data?.content;
  const isRichTextContent = content?._type === "defaultRichText";

  if (isRichTextContent) {
    return (
      <Container>
        <div className="mx-auto max-w">
          <div className="mt-2.5">
            <Breadcrumbs />
          </div>
          <div className="mt-[39px] items-start justify-between gap-10 md:flex">
            {(content.tableOfContents?.length ?? 0) > 0 ? (
              <aside className="border-grey sticky top-[calc(var(--header)+39px)] mt-[35px] hidden w-full max-w-[276px] rounded-xl border bg-white p-2.5 md:block">
                <Toc
                  title="Oversikt"
                  headings={
                    content.tableOfContents?.map((item) => item.text) ?? []
                  }
                />
              </aside>
            ) : (
              <aside></aside>
            )}
            <div className="w-full md:max-w-[923px]">
              {data.title && (
                <h1 className="text-blue-dark-muted text-4xl font-medium leading-[1.35] -tracking-[0.2px]">
                  {data.title}
                </h1>
              )}
              {content.image?.asset?._ref && (
                <div className="mt-10">
                  <Image
                    src={
                      urlFor(content.image)
                        .quality(100)
                        .width(923)
                        .height(500)
                        .url() ?? ""
                    }
                    alt={content.image?.alt ?? ""}
                    width={923}
                    height={500}
                    className="rounded-lg"
                    priority
                    loading="eager"
                  />
                </div>
              )}
              <div className="mt-6 max-w-body pb-12">
                <ProseContent centered>
                  <PortableText value={content.text ?? []} />
                </ProseContent>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <PageBuilder
      documentId={data._id}
      documentType={data._type}
      content={content?.blocks ?? []}
    />
  );
}
