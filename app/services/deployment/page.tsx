import type { Metadata } from "next";
import { ServiceDetail } from "@/components/sections/service-detail";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Deployment, infrastructure & maintenance",
  description:
    "Cloud deployment, CI/CD pipelines, infrastructure configuration, SSL, monitoring, backups and ongoing maintenance — in accounts you own, with no lock-in.",
  path: "/services/deployment",
});

export default function Page() {
  return <ServiceDetail slug="deployment" />;
}
