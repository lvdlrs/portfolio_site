"use server";

import { getDrugComments } from "@/data/drug";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function exitPreview(pathname: string) {
  (await draftMode()).disable();

  redirect(pathname);
}

export async function generateReport(
  data: Array<{
    name: string;
    combination: string[];
    result: string | null;
  }>,
) {
  if (data.length === 0 || data.some((item) => item.result === null)) {
    return null;
  }

  const { data: drugs } = await getDrugComments(
    data.map((item) => ({
      gene: item.name,
      result: item.result ?? "",
    })),
  );

  console.log(drugs);

  return drugs;
}
