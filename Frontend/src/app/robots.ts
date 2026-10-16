import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/profile", "/analysis", "/signin", "/signup"],
      },
    ],
    sitemap: "https://pongaicoach.live/sitemap.xml",
  };
}