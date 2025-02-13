import {
  defineLocations,
  DocumentLocationResolvers,
} from "sanity/presentation";

export const locations: DocumentLocationResolvers = {
  frontPage: defineLocations({
    select: {},
    resolve: () => {
      return {
        message: "Forhåndsvisning av forside",
        locations: [
          {
            title: "Forside",
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
        message: "Forhåndsvisning av artikkel",
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
        message: "Forhåndsvisning av side",
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
        message: "Forhåndsvisning av globale innstillinger",
        locations: [
          {
            title: "Forside",
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
        message: "Forhåndsvisning av blogg",
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
