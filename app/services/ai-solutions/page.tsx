import type { Metadata } from "next";
import { ServiceDetail } from "@/components/sections/service-detail";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "AI-powered product development",
  description:
    "AI assistants and agents, document intelligence, AI-powered search, recommendation systems, LLM integrations and workflow automation — grounded in your own data.",
  path: "/services/ai-solutions",
});

export default function Page() {
  return <ServiceDetail slug="ai-solutions" />;
}
