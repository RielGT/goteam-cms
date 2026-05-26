<script setup lang="ts">
interface Rec {
  name: string; role: string; meta: string; avatar: string; ringColor: "purple" | "green" | "orange";
  quote: string;
}

const recs: Rec[] = [
  { name: "Daniel Okafor", role: "CTO at Lumen Health", meta: "Worked together · Mar 2025", avatar: "https://i.pravatar.cc/120?img=15", ringColor: "purple",
    quote: "Alex is one of those rare engineers who can ship fast <em>and</em> write code you actually want to maintain six months later. He picked up our messy codebase in a week and was pushing thoughtful PRs by the next. Hire him before someone else does." },
  { name: "Hannah Liu", role: "Product Lead at Parcel.io", meta: "Managed Alex directly · Nov 2024", avatar: "https://i.pravatar.cc/120?img=47", ringColor: "green",
    quote: "I've worked with a lot of contractors. Alex is the only one I'd hand the keys to without checking in. He shipped our entire billing rewrite solo, on schedule, and the rollout was a non-event — which is the highest compliment in engineering." },
  { name: "Marcus Reid", role: "Founder, Bramble", meta: "Client · Aug 2024", avatar: "https://i.pravatar.cc/120?img=11", ringColor: "orange",
    quote: "Alex took a vague idea, half a Figma file, and a tight budget — and turned it into a real marketplace we now run our whole business on. He cares about the product, not just the code. Will absolutely work with him again." },
  { name: "Sofia Marchetti", role: "Design Director, Northwind", meta: "Worked together · May 2024", avatar: "https://i.pravatar.cc/120?img=49", ringColor: "purple",
    quote: "As a designer, working with Alex was a dream. He actually reads the Figma files. He asked the right questions, suggested better solutions when mine didn't quite work, and the final build looked sharper than the mockup. Rare combo." },
  { name: "Tomás Vega", role: "Engineering Manager, Helio", meta: "Senior to Alex · Feb 2024", avatar: "https://i.pravatar.cc/120?img=68", ringColor: "green",
    quote: "Brought Alex in for a 3-month gig and kept him for a year. He's the kind of engineer that quietly makes the whole team better — better tests, better docs, better PR reviews. Wish I could clone him." },
  { name: "Aisha Bello", role: "Founder, Tide CRM", meta: "Client · Jan 2024", avatar: "https://i.pravatar.cc/120?img=23", ringColor: "orange",
    quote: "We hired Alex to \"help out for a sprint\" and ended up extending three times. He's honest about trade-offs, fast where it matters, and patient where it counts. Worth every dollar." },
  { name: "Ryan Park", role: "Co-founder, Quill", meta: "Client · Oct 2023", avatar: "https://i.pravatar.cc/120?img=53", ringColor: "purple",
    quote: "Alex is the developer you call when the last developer ghosted you. He audited our codebase in two days, gave us a brutally honest report, then quietly fixed the worst of it. Calm under pressure, sharp on details." },
];

const ringClass = (c: Rec["ringColor"]) =>
  ({ purple: "ring-brand-purple/20", green: "ring-brand-green/20", orange: "ring-brand-orange/20" }[c]);
</script>

<template>
  <section id="linkedin" class="border-y border-zinc-200/70 dark:border-white/5 bg-white/40 dark:bg-white/[0.02] relative overflow-hidden">
    <div class="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
    <div class="relative max-w-6xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
      <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 reveal">
        <div>
          <p class="font-mono text-xs text-brand-purple mb-3 flex items-center gap-2">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3v9zM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.78 1.78 0 0 1-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a.66.66 0 0 0 0 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66l.04 5.44z"/></svg>
            / from linkedin
          </p>
          <h2 class="font-display text-4xl sm:text-5xl font-bold max-w-2xl">Recommendations from people I've worked with.</h2>
          <p class="mt-4 text-zinc-600 dark:text-zinc-400 max-w-xl">Pulled straight from my LinkedIn — unedited, unpaid, slightly embarrassing.</p>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <button id="recPrev" aria-label="Previous recommendation" class="w-11 h-11 grid place-items-center rounded-full border border-zinc-200 dark:border-white/10 bg-paper dark:bg-ink hover:border-brand-purple hover:text-brand-purple transition disabled:opacity-40 disabled:cursor-not-allowed">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button id="recNext" aria-label="Next recommendation" class="w-11 h-11 grid place-items-center rounded-full border border-zinc-200 dark:border-white/10 bg-paper dark:bg-ink hover:border-brand-purple hover:text-brand-purple transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>

      <div class="relative">
        <div id="recTrack" class="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-6 -mx-5 px-5 sm:mx-0 sm:px-0 scroll-smooth" style="scrollbar-width: thin;">
          <article v-for="r in recs" :key="r.name" class="rec-card snap-start shrink-0 w-[88%] sm:w-[420px] p-7 rounded-2xl border border-zinc-200 dark:border-white/10 bg-paper dark:bg-ink hover:border-brand-purple transition shadow-soft flex flex-col">
            <header class="flex items-start gap-4 mb-5">
              <img :src="r.avatar" :alt="r.name" class="w-12 h-12 rounded-full ring-2" :class="ringClass(r.ringColor)">
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-1.5">
                  <h3 class="font-semibold text-sm truncate">{{ r.name }}</h3>
                  <svg class="w-3.5 h-3.5 text-brand-purple shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-label="LinkedIn"><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3v9zM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.78 1.78 0 0 1-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a.66.66 0 0 0 0 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66l.04 5.44z"/></svg>
                </div>
                <p class="text-xs text-zinc-500 truncate">{{ r.role }}</p>
                <p class="text-[11px] font-mono text-zinc-400 mt-0.5">{{ r.meta }}</p>
              </div>
            </header>
            <blockquote class="rec-quote text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300 flex-1">
              <span class="line-clamp" v-html="r.quote" />
            </blockquote>
            <button class="rec-toggle mt-4 text-xs font-mono text-brand-purple hover:underline self-start">Read more →</button>
          </article>
        </div>

        <div id="recDots" class="flex items-center justify-center gap-2 mt-6" />
      </div>

      <div class="mt-10 flex flex-wrap items-center justify-between gap-4 reveal">
        <div class="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
          <div class="flex -space-x-2">
            <img src="https://i.pravatar.cc/40?img=15" class="w-7 h-7 rounded-full border-2 border-paper dark:border-ink" alt="">
            <img src="https://i.pravatar.cc/40?img=47" class="w-7 h-7 rounded-full border-2 border-paper dark:border-ink" alt="">
            <img src="https://i.pravatar.cc/40?img=11" class="w-7 h-7 rounded-full border-2 border-paper dark:border-ink" alt="">
            <img src="https://i.pravatar.cc/40?img=49" class="w-7 h-7 rounded-full border-2 border-paper dark:border-ink" alt="">
            <div class="w-7 h-7 rounded-full border-2 border-paper dark:border-ink bg-brand-purple text-white text-[10px] font-mono grid place-items-center">+3</div>
          </div>
          <span><span class="font-semibold text-ink dark:text-white">7 recommendations</span> on LinkedIn</span>
        </div>
        <a href="#" target="_blank" rel="noopener" class="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full border border-zinc-200 dark:border-white/10 hover:border-brand-purple hover:text-brand-purple transition">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3v9zM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.78 1.78 0 0 1-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a.66.66 0 0 0 0 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66l.04 5.44z"/></svg>
          See all on LinkedIn →
        </a>
      </div>
    </div>
  </section>
</template>
