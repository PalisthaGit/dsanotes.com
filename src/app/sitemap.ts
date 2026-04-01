import type { MetadataRoute } from "next";
import { ALGORITHM_SLUGS } from "@/lib/sorting-seo";

const BASE_URL = "https://dsanotes.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const algorithmPages: MetadataRoute.Sitemap = ALGORITHM_SLUGS.map((slug) => ({
    url: `${BASE_URL}/visualizer/sorting/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/visualizer`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/visualizer/sorting`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...algorithmPages,
  ];
}
