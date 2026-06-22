// components/services/ServiceImage.tsx
import Image from "next/image";

// TODO: replace with self-hosted asset under public/images/sections/
const SRC =
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80";

export function ServiceImage() {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
      <Image
        src={SRC}
        alt="Accountant reviewing financial paperwork with a calculator on a wooden desk"
        fill
        sizes="(min-width: 1024px) 45vw, 100vw"
        className="object-cover"
        priority={false}
      />
    </div>
  );
}
