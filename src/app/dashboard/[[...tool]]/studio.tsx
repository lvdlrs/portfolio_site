"use client";

import { config } from "@/sanity/lib/config";
import { NextStudio } from "next-sanity/studio";

export function Studio() {
  return <NextStudio scheme="light" config={config} />;
}
