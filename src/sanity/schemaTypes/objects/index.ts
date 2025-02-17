import { accordion } from "./accordion";
import { defaultRichText } from "./defaultRichText";
import { experienceList } from "./experienceLists";
import { externalLink } from "./externalLink";
import { headerlink } from "./headerLinks";
import { internalLink } from "./internalLink";
import { link } from "./link";
import { linkwithicon } from "./linkswithicon";
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
  linkwithicon,
  headerlink,
  seo,
  experienceList,
  ...blocks,
  pageBuilder,
];
