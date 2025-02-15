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
      className={cn("container",{
        "bg-background": variant === "alternative",
        "relative": isHero,
      })}
    >
      {children}
    </div>
  );
}
