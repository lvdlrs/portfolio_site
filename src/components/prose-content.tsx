import { cn } from "@/lib/utils";

export function ProseContent({
  children,
  centered = false,
  size = "default",
}: {
  children: React.ReactNode;
  centered?: boolean;
  size?: "default" | "small";
}) {
  return (
    <div
      className={cn("prose max-sm:prose-sm", {
        "mx-auto": centered,
        "prose-sm": size === "small",
      })}
    >
      {children}
    </div>
  );
}
