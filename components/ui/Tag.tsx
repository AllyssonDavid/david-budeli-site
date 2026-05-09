import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TagProps {
  children: ReactNode;
  className?: string;
}

export function Tag({ children, className }: TagProps) {
  return (
    <div
      className={cn(
        "tag mb-6",
        className
      )}
    >
      {children}
    </div>
  );
}
