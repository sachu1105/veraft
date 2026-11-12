import type { Metadata } from "next";
import { ServiceDetail } from "@/components/sections/service-detail";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Deployment, hosting & maintenance",
  description:
    "Cloud setup, CI/CD, domains, SSL, monitoring, backups and ongoing care for your app — in accounts you own, with no lock-in.",
  path: "/services/deployment",
});

export default function Page() {
  return <ServiceDetail slug="deployment" />;
}
