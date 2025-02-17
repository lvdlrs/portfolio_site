import { defineArrayMember, defineField, defineType } from "sanity";
import { accordionSection } from "./accordionSection";
import { fullWidthImage } from "./fullWidthImage";
import { fullWidthVideo } from "./fullWidthVideo";
import { textContent } from "./textContent";
import { textMedia } from "./textMedia";
import { cardSection } from "./cardSection";
import { EarthAmericasIcon } from "@sanity/icons";
import { profileInfo } from "./profileInfo";
import { experienceInfo } from "./experienceInfo";

export const blocks = [
  textMedia,
  textContent,
  fullWidthVideo,
  fullWidthImage,
  accordionSection,
  cardSection,
  profileInfo,
  experienceInfo
];

export const pageBuilder = defineType({
  name: "pageBuilder",
  title: "Page Builder",
  type: "object",
  fields: [
    defineField({
      name: "blocks",
      title: "Blocks",
      type: "array",
      of: [
        ...blocks.map((block) => {
          return defineArrayMember({
            type: block.name,
          });
        }),
        defineArrayMember({
          name: "globalContent",
          type: "object",
          title: "Global Contents",
          icon: EarthAmericasIcon,
          fields: [
            defineField({
              name: "globalBlock",
              title: "Contents",
              type: "reference",
              to: [{ type: "globalBlock" }],
              options: {
                disableNew: true,
              },
            }),
          ],
          preview: {
            select: {
              title: "globalBlock.title",
            },
            prepare({ title }) {
              return {
                title: title || "Global Block",
                subtitle: title ? "Global Block" : undefined,
              };
            },
          },
        }),
      ],
      options: {
        insertMenu: {
          views: [{ name: "grid" }],
        },
      },
    }),
  ],
});
