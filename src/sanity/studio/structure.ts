import { DatabaseIcon, EarthGlobeIcon } from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Innhold")
    .items([
      S.listItem()
        .id("frontPage")
        .schemaType("frontPage")
        .title("Forside")
        .child(
          S.editor()
            .id("frontPage")
            .schemaType("frontPage")
            .documentId("frontPage")
            .title("Forside"),
        ),
      S.documentTypeListItem("page").title("Sider"),
      S.listItem()
        .title("Ressurser")
        .icon(DatabaseIcon)
        .child(
          S.list()
            .title("Ressurser")
            .items([
              S.documentTypeListItem("post").title("Artikler"),
              S.divider(),
              S.documentTypeListItem("tag").title("Emner"),
              S.listItem()
                .id("blog")
                .schemaType("archivePage")
                .title("Blogginnstillinger")
                .child(
                  S.editor()
                    .id("blog")
                    .schemaType("archivePage")
                    .documentId("blog")
                    .title("Blogginnstillinger"),
                ),
            ]),
        ),
      S.divider(),
      S.documentTypeListItem("gene").title("Gen"),
      S.documentTypeListItem("allele").title("Alleler"),
      S.documentTypeListItem("result").title("Resultater"),
      S.divider(),
      S.documentTypeListItem("drug").title("Legemiddel"),
      S.documentTypeListItem("drugCategory").title("Legemiddelkategori"),
      S.documentTypeListItem("therapy").title("Behandling"),
      S.divider(),
      S.listItem()
        .title("Globalt innhold")
        .icon(EarthGlobeIcon)
        .child(
          S.list()
            .title("Globalt innhold")
            .items([
              S.listItem()
                .id("siteSettings")
                .schemaType("siteSettings")
                .title("Sideinnstillinger")
                .child(
                  S.editor()
                    .id("siteSettings")
                    .schemaType("siteSettings")
                    .documentId("siteSettings")
                    .title("Sideinnstillinger"),
                ),
              S.documentTypeListItem("globalBlock").title("Globale blokker"),
            ]),
        ),
    ]);
