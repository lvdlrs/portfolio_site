"use server";

import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function exitPreview(pathname: string) {
  (await draftMode()).disable();

  redirect(pathname);
}