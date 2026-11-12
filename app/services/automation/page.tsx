import type { Metadata } from "next";
import { ServiceDetail } from "@/components/sections/service-detail";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Integrations & workflow automation",
  description:
    "Connect payments, email, CRMs, ERPs and third-party APIs, and automate repetitive workflows — reliable, idempotent and monitored.",
  path: "/services/automation",
});

export default function Page() {
  return <ServiceDetail slug="automation" />;
}
