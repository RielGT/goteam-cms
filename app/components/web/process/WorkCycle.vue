<template>
  <section id="process-cycle" class="relative overflow-hidden bg-white/40 dark:bg-white/[0.02] border-b border-zinc-200/70 dark:border-white/5">
    <div class="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
    <div class="relative max-w-6xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
      <div class="max-w-2xl mb-14 reveal">
        <p class="font-mono text-xs text-brand-green mb-3">/ how I work — the cycle</p>
        <h2 class="font-display text-4xl sm:text-5xl font-bold">It's not a line. It's a <span class="squiggle text-brand-orange">loop</span>.</h2>
        <p class="mt-4 text-zinc-600 dark:text-zinc-400 text-lg">Discovery never really ends. Each launch feeds back into the next round of discovery. Hover or tap a node to see what happens at each station.</p>
      </div>

      <div class="grid lg:grid-cols-12 gap-10 items-center">
        <div class="lg:col-span-5 reveal">
          <div id="pcWheel" class="relative aspect-square max-w-[480px] mx-auto">
            <div class="absolute inset-0 grid place-items-center pointer-events-none">
              <div class="text-center">
                <p class="font-mono text-[10px] text-zinc-400 mb-1">/ currently</p>
                <p id="pcHubLabel" class="font-display text-2xl font-bold text-ink dark:text-white">Discovery</p>
                <p id="pcHubMeta"  class="font-mono text-[11px] text-brand-purple mt-1">phase 01 · ~30 min</p>
              </div>
            </div>

            <svg viewBox="0 0 400 400" class="absolute inset-0 w-full h-full" aria-hidden="true">
              <defs>
                <linearGradient id="pcRing" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stop-color="#8B5CF6"/>
                  <stop offset="50%"  stop-color="#10B981"/>
                  <stop offset="100%" stop-color="#FB923C"/>
                </linearGradient>
              </defs>
              <circle cx="200" cy="200" r="168" fill="none" stroke="currentColor" class="text-zinc-200 dark:text-white/10" stroke-width="1.5" stroke-dasharray="3 6" vector-effect="non-scaling-stroke"/>
              <circle id="pcArc" cx="200" cy="200" r="168" fill="none" stroke="url(#pcRing)" stroke-width="3" stroke-linecap="round" stroke-dasharray="1055.6" stroke-dashoffset="1055.6" transform="rotate(-90 200 200)" vector-effect="non-scaling-stroke" style="transition: stroke-dashoffset .8s cubic-bezier(.2,.7,.2,1), stroke .4s ease;"/>
              <line id="pcSpoke" x1="200" y1="200" x2="200" y2="200" stroke="currentColor" class="text-brand-purple" stroke-width="1.5" stroke-dasharray="3 4" opacity="0.5" style="transition: all .6s ease;"/>
            </svg>

            <div id="pcNodes" class="absolute inset-0" />
          </div>

          <div class="mt-8 flex items-center justify-center gap-3">
            <button id="pcPrev" aria-label="Previous phase" class="w-9 h-9 grid place-items-center rounded-full border border-zinc-200 dark:border-white/10 hover:border-brand-purple hover:text-brand-purple transition">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button id="pcAuto" class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono border border-zinc-200 dark:border-white/10 hover:border-brand-purple hover:text-brand-purple transition">
              <svg id="pcAutoIcon" class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              <span id="pcAutoLabel">Spin the cycle</span>
            </button>
            <button id="pcNext" aria-label="Next phase" class="w-9 h-9 grid place-items-center rounded-full border border-zinc-200 dark:border-white/10 hover:border-brand-purple hover:text-brand-purple transition">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>

        <div class="lg:col-span-7 reveal">
          <div class="relative rounded-2xl border border-zinc-200 dark:border-white/10 bg-paper dark:bg-ink shadow-soft overflow-hidden min-h-[460px]">
            <div class="flex items-center gap-1 px-6 pt-5 pb-3 border-b border-zinc-200/70 dark:border-white/5 overflow-x-auto">
              <span id="pcCrumbs" class="flex items-center gap-1 text-[11px] font-mono text-zinc-400 whitespace-nowrap" />
            </div>

            <div id="pcContent" class="p-7 sm:p-9">
              <article v-for="(panel, idx) in panels" :key="panel.title" :data-pc-panel="idx" class="pc-panel" :class="idx !== 0 ? 'hidden' : ''">
                <div class="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p class="font-mono text-[11px]" :class="toneText[panel.tone]">phase {{ panel.num }} · {{ panel.subtitle }}</p>
                    <h3 class="font-display text-3xl font-bold mt-1">{{ panel.title }}</h3>
                  </div>
                  <span class="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono" :class="toneBg[panel.tone]">{{ panel.tag }}</span>
                </div>
                <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6" v-html="panel.body" />
                <div class="grid sm:grid-cols-2 gap-3">
                  <div v-for="card in panel.cards" :key="card.label" class="p-4 rounded-xl border border-zinc-200 dark:border-white/10">
                    <p class="text-[11px] font-mono text-zinc-400 mb-1">{{ card.label }}</p>
                    <p class="text-sm">{{ card.text }}</p>
                  </div>
                </div>
              </article>
            </div>

            <div class="px-6 py-3 border-t border-zinc-200/70 dark:border-white/5 flex items-center justify-between gap-4 text-[11px] font-mono text-zinc-500">
              <span class="hidden sm:inline">tip: ← / → keys to step through</span>
              <a href="#talk" class="inline-flex items-center gap-1.5 text-brand-purple hover:underline">start at phase 01 →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type Tone = "brand-purple" | "brand-green" | "brand-orange";
interface Card { label: string; text: string; }
interface Panel { num: string; subtitle: string; tone: Tone; tag: string; title: string; body: string; cards: Card[]; }

const toneText: Record<Tone, string> = {
  "brand-purple": "text-brand-purple",
  "brand-green":  "text-brand-green",
  "brand-orange": "text-brand-orange",
};
const toneBg: Record<Tone, string> = {
  "brand-purple": "bg-brand-purple/10 text-brand-purple",
  "brand-green":  "bg-brand-green/10 text-brand-green",
  "brand-orange": "bg-brand-orange/10 text-brand-orange",
};

const panels: Panel[] = [
  {
    num: "01", subtitle: "discovery", tone: "brand-purple", tag: "~30 min · free",
    title: "We figure out if this is real.",
    body: "A short call with no agenda slides. You explain the problem. I ask the awkward questions about budget, timeline, and whether you actually need code at all. If we're a fit, I'll say so. If not, I'll point you somewhere better.",
    cards: [
      { label: "you bring", text: "The problem, the people, an honest budget range." },
      { label: "you leave with", text: "A written recap + my honest read in 24h." },
    ],
  },
  {
    num: "02", subtitle: "scope", tone: "brand-purple", tag: "~3 days · fixed",
    title: "Pricing reality, not optimism.",
    body: "A one-page proposal: what's in, what's explicitly out, four named milestones, and a fixed price. No \"TBD\" line items. Change requests are welcome but priced and signed before any work starts.",
    cards: [
      { label: "deliverable", text: "SOW PDF, signed contract, 30% deposit invoice." },
      { label: "your control", text: "Go / no-go decision at every milestone." },
    ],
  },
  {
    num: "03", subtitle: "design", tone: "brand-green", tag: "~1 week",
    title: "Flows before pixels.",
    body: "If you don't have a designer, I sketch the critical user flows in Figma — login, the core action, the messy edge cases. We argue about empty states and error copy now, so the build phase is just building.",
    cards: [
      { label: "output", text: "Clickable Figma prototype + data model sketch." },
      { label: "have a designer?", text: "Even better — I do a build-feasibility pass instead." },
    ],
  },
  {
    num: "04", subtitle: "build", tone: "brand-green", tag: "~3–6 weeks",
    title: "Staging URL from day one.",
    body: "A shared Linear board, a Slack channel, two Loom updates per week, and a live staging environment by Friday of week one. You see PRs as they merge. No black boxes, no \"we're working on it\" emails.",
    cards: [
      { label: "cadence", text: "Mon plan · Thu demo · Fri staging deploy." },
      { label: "stack defaults", text: "Next.js · TypeScript · Postgres · Vercel." },
    ],
  },
  {
    num: "05", subtitle: "QA", tone: "brand-orange", tag: "~3–5 days",
    title: "Breaking it before users do.",
    body: "A hardening sprint: end-to-end tests on critical flows, accessibility audit, perf budget, real-data load test. Then we triage every bug into \"ship-blocker\" or \"next sprint\" — together, in writing.",
    cards: [
      { label: "checklist", text: "Lighthouse ≥ 90 · WCAG AA · errors wired." },
      { label: "rollback", text: "Documented, tested, one command away." },
    ],
  },
  {
    num: "06", subtitle: "deploy + learn", tone: "brand-orange", tag: "launch + 30 days",
    title: "Calm launch. Then we listen.",
    body: "A boring launch is a good launch. Production deploy with feature flags, monitoring live, and a runbook for the first 72 hours. Then real-user feedback feeds straight back into <em>discovery</em> — and the loop starts again.",
    cards: [
      { label: "handover", text: "Repo, env vars, runbook, architecture doc." },
      { label: "free for 30 days", text: "Any bug I introduced → I fix on my time." },
    ],
  },
];
</script>
