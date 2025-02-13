import { visionTool } from "@sanity/vision";
import { defineConfig, isDev } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "../env";
import { schema } from "../schemaTypes";
import { structure } from "../studio/structure";
import { defineDocuments, presentationTool } from "sanity/presentation";
import { nbNOLocale } from "@sanity/locale-nb-no";
import { locations } from "../studio/locations";
import { IconManager } from "sanity-plugin-icon-manager";
import { SINGLETON_TYPES } from "./constants";
import { HomeIcon } from "@sanity/icons";

export const config = defineConfig({
  basePath: "/dashboard",
  projectId,
  dataset,
  schema,
  icon: HomeIcon,
  plugins: [
    structureTool({
      title: "Innhold",
      structure,
    }),
    presentationTool({
      title: "Forhåndsvisning",
      previewUrl: {
        previewMode: {
          enable: "/api/preview/enable",
        },
      },
      resolve: {
        locations,
        mainDocuments: defineDocuments([
          {
            route: "/:slug",
            filter: "_type == 'page' && slug.current == $slug",
          },
          {
            route: "/posts/:slug",
            filter: "_type == 'post' && slug.current == $slug",
          },
          {
            route: "/",
            filter: "_type == 'frontPage'",
          },
        ]),
      },
    }),
    isDev
      ? visionTool({ defaultApiVersion: apiVersion })
      : { name: "vision-disabled" },
    nbNOLocale(),
    IconManager({
      availableCollections: ["material-symbols"],
      defaults: {
        inlineSvg: true,
        size: { width: 30, height: 30 },
      },
    }),
  ],
  scheduledPublishing: {
    enabled: false,
  },
  tasks: {
    enabled: false,
  },
  document: {
    comments: {
      enabled: false,
    },
    newDocumentOptions: (prev, { creationContext }) => {
      const { type } = creationContext;
      if (type === "global") {
        return prev.filter(
          (template) => !SINGLETON_TYPES.includes(template.templateId),
        );
      }
      return prev;
    },
    actions: (prev, context) => {
      const isSingleton = SINGLETON_TYPES.includes(context.schemaType);

      if (isSingleton) {
        return prev.filter(
          (originalAction) =>
            !["delete", "duplicate", "unpublish"].includes(
              originalAction.action as string,
            ),
        );
      }

      return prev;
    },
  },
});
