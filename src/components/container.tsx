import { cn } from "@/lib/utils";

export function Container({
  children,
  variant = "default",
  isHero = false,
}: {
  children: React.ReactNode;
  variant?: "default" | "alternative";
  isHero?: boolean;
}) {
  return (
    <div
      className={cn("px-3", {
        "bg-background": variant === "alternative",
        "-mt-header pt-header": isHero,
      })}
    >
      {children}
    </div>
  );
}
