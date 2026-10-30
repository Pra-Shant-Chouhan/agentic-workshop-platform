import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MapAnnotations } from "./_components/MapAnnotation";

export default function Home() {
  return (
    <div>
      <section className="topo-bg px-6 pt-10 pb-24 md:px-10 md:pt-16">
        <MapAnnotations />
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <SectionLabel>Early access</SectionLabel>

          <h1 className="mt-2 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
            An <span className="text-primary">outpost</span> for whatever
            you&apos;re building
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Chat with an AI agent that draws on your canvas and writes your
            docs, while your whole team works alongside it in real time.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="gap-2 text-base">
              <Link href="/sign-up">
                Start building free <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base">
              <Link href="#how-it-works">See how it works</Link>
            </Button>
          </div>
        </div>

        {/* Product walkthrough. Muted + playsInline are required for autoplay on mobile; WebM is
            smaller, with MP4 as the fallback for browsers without VP9. */}
        <div className="survey-frame scroll-tilt mx-auto mt-16 max-w-5xl">
          {/* A slightly narrower frame than the 16:9 video, so object-cover trims the sides. */}
          <div className="aspect-16/9.25 overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl shadow-black/40">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/videos/hero-poster.jpg"
              aria-label="Outpost walkthrough: the agent draws an architecture diagram and writes the spec"
              className="size-full object-cover"
            >
              <source src="/videos/hero.webm" type="video/webm" />
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>
    </div>
  );
}

// Map-legend style eyebrow above a heading, matching the corner annotations.
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-primary/80">
      <span className="size-1.5 rotate-45 border border-primary/70" />
      {children}
    </p>
  );
}