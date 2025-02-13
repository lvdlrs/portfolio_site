import { DocumentVideoIcon } from "@sanity/icons";
import getVideoId from "get-video-id";
import { defineField, defineType } from "sanity";

export const video = defineType({
  name: "video",
  title: "Video",
  type: "object",
  icon: DocumentVideoIcon,
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
    }),
    defineField({
      name: "thumbnail",
      title: "Forhåndsvisningsbilde",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value || value === "") {
            return true;
          }

          const { service, id } = getVideoId(value);

          if (!id || service !== "youtube") {
            return "URL må være en gyldig YouTube URL";
          }

          return true;
        }),
    }),
  ],
  preview: {
    select: {
      media: "thumbnail",
    },
    prepare({ media }) {
      return {
        title: `YouTube video`,
        media,
      };
    },
  },
});
