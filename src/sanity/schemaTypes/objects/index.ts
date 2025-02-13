import { accordion } from "./accordion";
import { defaultRichText } from "./defaultRichText";
import { externalLink } from "./externalLink";
import { internalLink } from "./internalLink";
import { link } from "./link";
import { blocks, pageBuilder } from "./pageBuilder";
import { seo } from "./seo";
import { simpleRichText } from "./simpleRichText";
import { video } from "./video";

export const objects = [
  internalLink,
  externalLink,
  video,
  accordion,
  simpleRichText,
  defaultRichText,
  link,
  seo,
  ...blocks,
  pageBuilder,
];
