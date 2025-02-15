import {
  defineLocations,
  DocumentLocationResolvers,
} from "sanity/presentation";

export const locations: DocumentLocationResolvers = {
  frontPage: defineLocations({
    select: {},
    resolve: () => {
      return {
        message: "Homepage preview",
        locations: [
          {
            title: "Homepage",
            href: "/",
          },
        ],
      };
    },
  }),
  post: defineLocations({
    select: {
      title: "title",
      slug: "slug.current",
    },
    resolve: (doc) => {
      if (!doc?.slug) {
        return undefined;
      }

      return {
        message: "Article preview",
        locations: [
          {
            title: doc.title,
            href: `/posts/${doc.slug}`,
          },
        ],
      };
    },
  }),
  page: defineLocations({
    select: {
      title: "title",
      slug: "slug.current",
    },
    resolve: (doc) => {
      if (!doc?.slug) {
        return undefined;
      }

      return {
        message: "Page preview",
        locations: [
          {
            title: doc.title,
            href: `/${doc.slug}`,
          },
        ],
      };
    },
  }),
  siteSettings: defineLocations({
    select: {},
    resolve: () => {
      return {
        message: "Global settings preview",
        locations: [
          {
            title: "Homepage",
            href: "/",
          },
        ],
      };
    },
  }),
  archivePage: defineLocations({
    select: {
      title: "title",
    },
    resolve: (doc) => {
      return {
        message: "Blog preview",
        locations: [
          {
            title: doc?.title,
            href: `/blog`,
          },
        ],
      };
    },
  }),
};
