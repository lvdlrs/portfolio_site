import { LinkButton } from "@/components/shared/link-button";

export default function NotFound() {
  return (
    <div className="mx-auto grid h-full max-w place-items-center">
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-foreground">
          404 - Fant ikke siden
        </h1>
        <div className="mx-auto mt-8 w-fit">
          <LinkButton href="/">Til forsiden</LinkButton>
        </div>
      </div>
    </div>
  );
}
