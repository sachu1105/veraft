import type { Metadata } from "next";
import { ServiceDetail } from "@/components/sections/service-detail";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "AI features, chatbots & agents",
  description:
    "Support agents, internal copilots, RAG knowledge search and document extraction — grounded in your data, using Claude, ChatGPT, DeepSeek, Gemini or self-hosted models.",
  path: "/services/ai-solutions",
});

export default function Page() {
  return <ServiceDetail slug="ai-solutions" />;
}
