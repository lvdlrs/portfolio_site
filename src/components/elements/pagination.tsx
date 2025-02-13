"use client";

import { generatePagination } from "@/lib/utils";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronDoubleLeftIcon } from "../icons/chevron-double-left";
import { ChevronDoubleRightIcon } from "../icons/chevron-double-right";
import { EllipsisIcon } from "../icons/ellipsis";
import { PAGE_KEY } from "@/lib/constants";

function createPaginatedUrl(pageNumber: number, pathname: string) {
  return `${pathname}?${PAGE_KEY}=${pageNumber}`;
}

export function Pagination({
  maxLinks = 3,
  ...props
}: {
  total: number;
  maxLinks?: number;
}) {
  const search = useSearchParams();
  const pathname = usePathname();

  const currentPage = Number(search.get(PAGE_KEY)) || 1;

  if (props.total <= 1) {
    return null;
  }

  const pagination = generatePagination({
    currentPage,
    total: props.total,
    maxLinks,
  });

  const showNextEllipsis =
    maxLinks < props.total && currentPage < props.total - maxLinks - 1;
  const showPrevEllipsis = maxLinks > 1 && currentPage > maxLinks + 2;

  return (
    <div className="flex items-center justify-center gap-4">
      <Link
        href={createPaginatedUrl(1, pathname)}
        className="text-foreground hidden size-10 place-items-center rounded-lg text-sm/none font-bold sm:grid"
      >
        <ChevronDoubleLeftIcon />
      </Link>
      {showPrevEllipsis && (
        <div className="text-foreground hidden size-10 place-items-center sm:grid">
          <EllipsisIcon />
        </div>
      )}
      <div className="flex items-center gap-4">
        {pagination.prevLinks.map((page) => (
          <Link
            key={page}
            href={createPaginatedUrl(page, pathname)}
            className="text-foreground hidden size-10 place-items-center rounded-lg text-sm/none font-bold sm:grid [&:nth-last-of-type(-n+2)]:grid"
          >
            {page}
          </Link>
        ))}
      </div>

      <div className="bg-background text-foreground grid size-10 place-items-center rounded-lg text-sm/none font-bold">
        {currentPage}
      </div>
      <div className="flex items-center gap-4">
        {pagination.nextLinks.map((page) => (
          <Link
            key={page}
            href={createPaginatedUrl(page, pathname)}
            className="text-foreground hidden size-10 place-items-center rounded-lg text-sm/none font-bold sm:grid [&:nth-of-type(-n+2)]:grid"
          >
            {page}
          </Link>
        ))}
      </div>
      {showNextEllipsis && (
        <div className="text-foreground hidden size-10 place-items-center sm:grid">
          <EllipsisIcon />
        </div>
      )}
      <Link
        href={createPaginatedUrl(props.total, pathname)}
        className="text-foreground hidden size-10 place-items-center rounded-lg text-sm/none font-bold sm:grid"
      >
        <ChevronDoubleRightIcon />
      </Link>
    </div>
  );
}
