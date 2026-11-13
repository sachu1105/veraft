import type { Metadata } from "next";
import { ServiceDetail } from "@/components/sections/service-detail";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "UI/UX & product design",
  description:
    "Product research, user journeys, wireframes, design systems and responsive, accessible interfaces — designed around your users before and during the build.",
  path: "/services/product-design",
});

export default function Page() {
  return <ServiceDetail slug="product-design" />;
}
