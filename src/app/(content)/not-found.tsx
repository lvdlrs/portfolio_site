import { LinkButton } from "@/components/shared/link-button";
import { Magnetic } from "@/components/ui/magnetic";

export default function NotFound() {
  const springOptions = { bounce: 0.1 };
  return (
    <div className="mx-auto grid h-full max-w place-items-center">
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-foreground">
          Looking for Something?
        </h1>
        <div className="mx-auto mt-8 w-fit">
        <Magnetic
          intensity={0.2}
          springOptions={springOptions}
          actionArea='global'
          range={200}
        >
              <LinkButton href="/">Back to Homepage</LinkButton>
              
        </Magnetic>
        </div>
      </div>
    </div>
  );
}
