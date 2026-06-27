"use client";

import Image from "next/image";
import { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type BrandImageProps = {
  className?: string;
  priority?: boolean;
};

export function DBMonogram({ className, priority }: BrandImageProps) {
  return (
    <Image
      src="/brand/db-monogram.png"
      alt="Monograma DB"
      width={213}
      height={118}
      priority={priority}
      className={cn("h-auto w-full select-none object-contain", className)}
      draggable={false}
    />
  );
}

export function DBWordmark({ className, priority }: BrandImageProps) {
  return (
    <Image
      src="/brand/db-wordmark-horizontal.png"
      alt="David Budeli - Software Engineer"
      width={296}
      height={71}
      priority={priority}
      className={cn("h-auto w-full select-none object-contain", className)}
      draggable={false}
    />
  );
}

export function DBIconTile({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      className={cn(
        "grid place-items-center overflow-hidden border border-white/[0.1] bg-black shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
        className
      )}
      style={style}
      aria-hidden="true"
    >
      <DBMonogram className="w-[82%]" />
    </span>
  );
}
