import { DatabaseIcon, EarthGlobeIcon } from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contents")
    .items([
      S.listItem()
        .id("frontPage")
        .schemaType("frontPage")
        .title("Homepage")
        .child(
          S.editor()
            .id("frontPage")
            .schemaType("frontPage")
            .documentId("frontPage")
            .title("Homepage"),
        ),
      S.documentTypeListItem("page").title("Page"),
      S.listItem()
        .title("Resources")
        .icon(DatabaseIcon)
        .child(
          S.list()
            .title("Resources")
            .items([
              S.documentTypeListItem("post").title("Articles"),
              S.divider(),
              S.documentTypeListItem("tag").title("Tags"),
              S.listItem()
                .id("blog")
                .schemaType("archivePage")
                .title("Articles")
                .child(
                  S.editor()
                    .id("blog")
                    .schemaType("archivePage")
                    .documentId("blog")
                    .title("Archive"),
                ),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("Global Settings")
        .icon(EarthGlobeIcon)
        .child(
          S.list()
            .title("Global Settings")
            .items([
              S.listItem()
                .id("siteSettings")
                .schemaType("siteSettings")
                .title("Site Settings")
                .child(
                  S.editor()
                    .id("siteSettings")
                    .schemaType("siteSettings")
                    .documentId("siteSettings")
                    .title("Site Settings"),
                ),
              S.documentTypeListItem("globalBlock").title("Global Blocks"),
            ]),
        ),
    ]);
