export const IMAGE_FRAGMENT = `
asset,
"metadata": asset->metadata.dimensions,
hotspot,
crop,
alt,
caption
`;

export const ICON_FRAGMENT = `
metadata {
  inlineSvg,
  size,
  color
}
`;

export const VIDEO_FRAGMENT = `
title,
thumbnail {
  ${IMAGE_FRAGMENT}
},
videoUrl
`;

export const LINK_FRAGMENT = `
label,
"href": select(
  linkType == "internal" => coalesce(
    select(
      internalLink->_type == "archivePage" => internalLink->_id, 
      internalLink->_type != "archivePage" => internalLink->slug.current,
      "#"
    ), 
    "#"
  ),
  linkType == "external" => coalesce(
    externalLink.url, "#"
  )
)
`;

export const SEO_FRAGMENT = `
"title": coalesce(seo.title, title),
"description": seo.description,
"featuredImage": coalesce(seo.featuredImage, mainImage),
"index": seo.index,
"follow": seo.follow,
"canonical": seo.canonical,
`;

export const SIMPLE_RICH_TEXT_FRAGMENT = `
...,
markDefs[]{
  ...,
  _type == "internalLink" => {
    "slug": @.reference->slug.current
  },
  _type == "externalLink" => {
    url
  }
},
`;

export const ACCORDION_FRAGMENT = `
title,
items[]{
  _key,
  title,
  content{
    text[]{
      ${SIMPLE_RICH_TEXT_FRAGMENT}
    }
  }
}
`;

export const DEFAULT_RICH_TEXT_FRAGMENT = `
...,
markDefs[]{
  ...,
  _type == "internalLink" => {
    "slug": @.reference->slug.current
  },
  _type == "externalLink" => {
    url
  }
},
_type == "image" => {
  ${IMAGE_FRAGMENT}
},
_type == "video" => {
  ${VIDEO_FRAGMENT}
},
_type == "accordion" => {
  ${ACCORDION_FRAGMENT}
}
`;

export const PAGE_BUILDER_BLOCKS = `
_type == "textMedia" => {
  title,
  mediaPlacement,
  layout,
  variant,
  "media": select(
    mediaType == "image" => image {
      "_type": "image",
      ${IMAGE_FRAGMENT}
    },
    mediaType == "video" => video {
      "_type": "video",
      ${VIDEO_FRAGMENT}
    }
  ),
  content{
    text[]{
      ${SIMPLE_RICH_TEXT_FRAGMENT}
    }
  },
  links[]{
    _key,
    ${LINK_FRAGMENT}
  }
},
_type == "textContent" => {
  title,
  alignment,
  variant,
  layout,
  content{
    text[]{
      ${SIMPLE_RICH_TEXT_FRAGMENT}
    }
  },
  links[]{
    _key,
    ${LINK_FRAGMENT}
  }
},
_type == "accordionSection" => {
  title,
  layout,
  content {
    text[]{
      ${SIMPLE_RICH_TEXT_FRAGMENT}
    }
  },
  links[]{
    _key,
    ${LINK_FRAGMENT}
  },
  items[]{
    _key,
    title,
    content {
      text[]{
        ${SIMPLE_RICH_TEXT_FRAGMENT}
      }
    }
  }
},
_type == "cardSection" => {
  title,
  variant,
  content {
    text[]{
      ${SIMPLE_RICH_TEXT_FRAGMENT}
    }
  },
  links[]{
    _key,
    ${LINK_FRAGMENT}
  },
  cards[]{
    _key,
    icon {
      ${ICON_FRAGMENT}
    },
    title,
    content {
      text[]{
        ${SIMPLE_RICH_TEXT_FRAGMENT}
      }
    }
  }
},
_type == "fullWidthImage" => {
  title,
  content{
    text[]{
      ${SIMPLE_RICH_TEXT_FRAGMENT}
    }
  },
  links[]{
    _key,
    ${LINK_FRAGMENT}
  },
  image {
    ${IMAGE_FRAGMENT}
  }
},
_type == "fullWidthVideo" => {
  title,
  content{
    text[]{
      ${SIMPLE_RICH_TEXT_FRAGMENT}
    }
  },
  links[]{
    _key,
    ${LINK_FRAGMENT}
  },
  video {
    ${VIDEO_FRAGMENT}
  }
}
`;

export const PAGE_BUILDER_FRAGMENT = `
_key,
_type,
${PAGE_BUILDER_BLOCKS},
_type == "globalContent" => {
  "globalBlock": @.globalBlock->blocks[0]{
    _key,
    _type,
    ${PAGE_BUILDER_BLOCKS}
  }
}
`;
