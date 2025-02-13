import { Container } from "@/components/container";
import { Suspense } from "react";

import { Breadcrumbs } from "@/components/elements/breadcrumbs";
import { ProseContent } from "@/components/prose-content";
import { PortableText } from "@/components/portable-text";
import { getArchiveData } from "@/data/post";
import { Pagination } from "@/components/elements/pagination";
import { notFound } from "next/navigation";

export default async function ArchiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await getArchiveData("blog");

  if (!data) {
    notFound();
  }

  return (
    <Container isHero>
      <div className="mx-auto max-w py-12 md:py-24">
        <div className="mb-6">
          <Breadcrumbs />
        </div>
        <ProseContent>
          <h1>{data.title}</h1>
          {data.description?.text && (
            <PortableText value={data.description.text} />
          )}
        </ProseContent>
        {children}
        <div className="mt-16">
          <Suspense>
            <Pagination total={data.total ?? 0} />
          </Suspense>
        </div>
      </div>
    </Container>
  );
}
