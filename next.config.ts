import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF (≈20% smaller than WebP) where supported, falling back to
    // WebP, then the source format. Big win for the painterly PNG gradients
    // (bg-green/yellow/blue) used as section backdrops.
    formats: ["image/avif", "image/webp"],
    // Next 16 requires an explicit quality allowlist; 75 is the default the
    // <Image> components already rely on.
    qualities: [75],
  },
};

export default nextConfig;
