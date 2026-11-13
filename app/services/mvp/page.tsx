import type { Metadata } from "next";
import { ServiceDetail } from "@/components/sections/service-detail";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "MVP & startup development",
  description:
    "Turn your idea into a market-ready MVP: product discovery, technical feasibility, architecture, UI/UX design, rapid AI-assisted development, testing and launch.",
  path: "/services/mvp",
});

export default function Page() {
  return <ServiceDetail slug="mvp" />;
}
