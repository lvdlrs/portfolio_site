import { PostQueryResult } from "@/sanity/types";
import { type ClassValue, clsx } from "clsx";
import { stegaClean } from "next-sanity";
import { twMerge } from "tailwind-merge";

type SanityImage = NonNullable<NonNullable<PostQueryResult>["featuredImage"]>;

export function cleanStega<T extends string>(stega: T) {
  return stegaClean(stega);
}

export function generateImageAspect(image: SanityImage) {
  const width = image.metadata?.width || 1;
  const height = image.metadata?.height || 1;

  const isCropped = Boolean(
    image.crop?.bottom ||
      image.crop?.top ||
      image.crop?.left ||
      image.crop?.right,
  );

  if (!isCropped) {
    return width / height;
  }

  const croppedLeft = width * (image.crop?.left || 0);
  const croppedRight = width * (image.crop?.right || 0);

  const croppedTop = height * (image.crop?.top || 0);
  const croppedBottom = height * (image.crop?.bottom || 0);

  const croppedWidth = width - croppedLeft - croppedRight;
  const croppedHeight = height - croppedTop - croppedBottom;

  return croppedWidth / croppedHeight;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateLink(slug: string, type?: string) {
  switch (type) {
    case "page":
      return `/${slug}`;
    case "post":
      return `/artikler/${slug}`;
    default:
      return `/${slug}`;
  }
}

export function unslugify(slug: string) {
  return slug.replace(/\-/g, " ").replace(/^(\w)(\S*)/, (match) => {
    const [first, ...rest] = match.split("");

    return `${first.toUpperCase()}${rest.join("").toLowerCase()}`;
  });
}

export function generatePagination({
  currentPage,
  total,
  maxLinks = 5,
}: {
  currentPage: number;
  total: number;
  maxLinks?: number;
}) {
  const startPage = Math.max(2, currentPage - maxLinks);
  const endPage = Math.min(total, currentPage + maxLinks);

  const nextLinks = Array.from(
    { length: endPage - currentPage },
    (_, i) => currentPage + i + 1,
  );

  const prevLinks = Array.from(
    { length: currentPage - startPage },
    (_, i) => currentPage - i - 1,
  ).reverse();

  return {
    currentPage,
    total,
    prevLinks,
    nextLinks,
    start: 1,
    end: total,
  };
}
