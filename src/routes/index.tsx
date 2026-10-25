import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "SnapCut AI — Remove Image Backgrounds in One Click",
      },
      {
        name: "description",
        content:
          "SnapCut AI removes image backgrounds in seconds with AI and gives you clean, transparent PNGs ready to use. Upload an image, preview the result, download instantly.",
      },
      { property: "og:title", content: "SnapCut AI — Remove Image Backgrounds in One Click" },
      {
        property: "og:description",
        content:
          "Upload an image, AI removes the background in seconds, download a transparent PNG. Free daily removals, no editing skills needed.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <Landing />;
}
