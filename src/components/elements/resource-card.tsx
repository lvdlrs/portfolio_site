import Image from "next/image";
import Link from "next/link";
import { NoImagePlaceholder } from "../misc/placeholder";
import { format } from "date-fns";
import { nb } from "date-fns/locale";
import { Pill } from "./pill";

export function ResourceCard(props: {
  href: string;
  createdAt: string;
  tag?: string;
  title: string;
  excerpt?: string;
  featuredImage?: {
    url: string;
    alt: string;
  };
}) {
  return (
    <Link className="block" href={props.href}>
      <div className="aspect-video overflow-hidden rounded">
        {props.featuredImage ? (
          <Image
            src={props.featuredImage.url}
            alt={props.featuredImage.alt}
            width={800}
            height={450}
          />
        ) : (
          <NoImagePlaceholder />
        )}
      </div>
      <div className="mt-4">
        <div className="text-foreground mb-4 flex items-center gap-4 text-sm/[1.5] font-semibold">
          {props.tag && <Pill label={props.tag} />}
          <p>
            {format(props.createdAt, "d. MMMM yyyy", {
              locale: nb,
            })}
          </p>
        </div>
        {props.title && (
          <h2 className="text-foreground line-clamp-2 text-2xl font-semibold">
            {props.title}
          </h2>
        )}
        {props.excerpt && (
          <p className="text-foreground mt-2 line-clamp-2 text-base font-semibold">
            {props.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
