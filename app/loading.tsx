import Image from "next/image";

export default function Loading() {
  return (
    <div className="grid min-h-screen place-items-center bg-[#030303] text-white">
      <div className="flex flex-col items-center gap-5">
        <div className="grid h-20 w-20 place-items-center overflow-hidden border border-white/[0.12] bg-black">
          <Image
            src="/brand/db-monogram.png"
            alt="Monograma DB"
            width={213}
            height={118}
            className="w-16"
            priority
          />
        </div>
        <p className="font-mono-custom text-[0.62rem] uppercase text-white/46">
          Loading product system
        </p>
      </div>
    </div>
  );
}
