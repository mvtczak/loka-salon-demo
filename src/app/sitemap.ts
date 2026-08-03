import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const SITE_URL = "https://loka-salon-demo.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const services = await prisma.service.findMany({ select: { slug: true, category: true } });
  const categories = Array.from(new Set(services.map((s) => s.category)));

  return [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/uslugi`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/zespol`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/rezerwacja`, changeFrequency: "weekly", priority: 0.9 },
    ...categories.map((c) => ({
      url: `${SITE_URL}/uslugi?category=${encodeURIComponent(c)}`,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  ];
}
