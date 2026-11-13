import type { Metadata } from "next";
import { ServiceDetail } from "@/components/sections/service-detail";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Security & performance engineering",
  description:
    "Authentication and access control, secure APIs, input validation, database and application performance, automated testing and security reviews.",
  path: "/services/security",
});

export default function Page() {
  return <ServiceDetail slug="security" />;
}
