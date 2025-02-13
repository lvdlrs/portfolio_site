import { draftMode } from "next/headers";
import { sanityFetch } from "./live";

export async function sanity<QueryString extends string>({
  query,
  params,
  tag,
}: {
  query: QueryString;
  params?: Record<string, unknown>;
  tag?: string;
}) {
  const isDraftMode = (await draftMode()).isEnabled;

  const enableDrafts = isDraftMode || process.env.NODE_ENV === "development";

  const data = await sanityFetch<QueryString>({
    query,
    params,
    perspective: enableDrafts ? "previewDrafts" : "published",
    stega: isDraftMode,
    tag,
  });

  return data;
}
