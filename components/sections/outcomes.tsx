import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

const outcomes = [
  {
    title: "Automate customer support",
    body: "Resolve the routine questions automatically, and hand the rest to your team with the full context already attached.",
  },
  {
    title: "Reduce repetitive work",
    body: "Move data between systems, generate the documents, and run the follow-ups — without anyone copying and pasting.",
  },
  {
    title: "Assistants trained on your business",
    body: "Answers grounded in your own documents, policies, and data. Not the open internet, and never made up.",
  },
  {
    title: "Modernize operations",
    body: "Replace the spreadsheets and aging tools with software your team actually wants to open every morning.",
  },
];

export function Outcomes() {
  return (
    <Section tone="mist">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>Outcomes</Eyebrow>
          <h2 className="mt-5 text-display-md text-ink">
            Built to move real numbers, not demos.
          </h2>
        </div>

        <div className="mt-12 grid border-l border-t border-line sm:grid-cols-2">
          {outcomes.map((o, i) => (
            <Reveal
              key={o.title}
              delay={i * 0.06}
              className="border-b border-r border-line bg-paper p-7 sm:p-9"
            >
              <span className="font-mono text-label text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-heading text-ink">{o.title}</h3>
              <p className="mt-2.5 text-body-sm text-muted">{o.body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
