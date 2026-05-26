<script setup lang="ts">
interface Step { num: string; title: string; body: string; }
interface Stat { value: string; label: string; color: "purple" | "green" | "orange"; }
interface Slide {
  title: string; tag: string; status: string; image: string; alt: string;
  stats: Stat[]; stack: string[];
  problemTitle: string; problemBody: string;
  steps: Step[];
  result: string;
  primaryCta: string;
}

const slides: Slide[] = [
  {
    title: "Finch Analytics", tag: "SaaS", status: "Shipped · 2025",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    alt: "Finch dashboard",
    stats: [
      { value: "7 wks", label: "MVP to launch", color: "purple" },
      { value: "+38%", label: "MRR in 90 days", color: "green" },
      { value: "4→1", label: "tools replaced", color: "orange" },
    ],
    stack: ["Next.js", "tRPC", "Postgres", "ClickHouse", "Tailwind"],
    problemTitle: "Drowning in 4 dashboards.",
    problemBody: "Maya and her team stitched Shopify, GA4, Klaviyo, and a Google Sheet together every Monday. Two hours of copy-paste before any decisions got made.",
    steps: [
      { num: "01", title: "Scope the smallest thing that works", body: "Cut the wishlist in half. Picked the 3 metrics that drive real decisions." },
      { num: "02", title: "Pipe the data once, correctly", body: "Ingestion into ClickHouse, backfilled 2 years. Worth it for clean events." },
      { num: "03", title: "Designed live, with Maya", body: "Daily Loom + staging URL. Threw out the first design — felt too \"SaaS-y.\"" },
      { num: "04", title: "Launch + first paying customer", body: "Soft launch to 12 stores. Two converted in 48 hours." },
    ],
    result: "$14k MRR with 9% monthly growth, zero infrastructure incidents in 6 months.",
    primaryCta: "Visit live site",
  },
  {
    title: "Stack", tag: "Mobile + Web", status: "Live · 2024",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1400&q=80",
    alt: "Stack app",
    stats: [
      { value: "4 mo", label: "full build", color: "purple" },
      { value: "2.1k", label: "paying users", color: "green" },
      { value: "4.8★", label: "App Store", color: "orange" },
    ],
    stack: ["React Native", "Expo", "Next.js", "Stripe", "GitHub API"],
    problemTitle: "A solo founder, zero engineering hires.",
    problemBody: "Jordan had a clear vision for a habit tracker built for devs, a small budget, and no time to learn React Native himself.",
    steps: [
      { num: "01", title: "Marketing site + waitlist first", body: "800 emails in 3 weeks — validated demand before writing a screen." },
      { num: "02", title: "Core habit-tracking loop", body: "React Native + Expo. TestFlight builds every Friday, Jordan dogfooded daily." },
      { num: "03", title: "GitHub integration + streaks", body: "The killer feature — pulls commits, draws beautiful streak art." },
      { num: "04", title: "Stripe + App Store + handoff", body: "Full walkthrough + a Notion runbook so Jordan could take over." },
    ],
    result: "$9k MRR in its first 6 months. Jordan maintains it solo now.",
    primaryCta: "Read full case study",
  },
  {
    title: "Northwind Ops", tag: "Internal Tool", status: "In use · 2024",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
    alt: "Northwind ops",
    stats: [
      { value: "5 wks", label: "total build", color: "purple" },
      { value: "−89%", label: "daily admin", color: "green" },
      { value: "80k", label: "rows migrated", color: "orange" },
    ],
    stack: ["Remix", "Postgres", "Prisma", "Fly.io"],
    problemTitle: "A 4MB sheet running a logistics company.",
    problemBody: "12 staff, 80k rows, version conflicts daily. One bad edit could lose a week of orders. They needed real software, fast.",
    steps: [
      { num: "01", title: "Shadow the team for a week", body: "Found 6 workflows nobody had written down — the real product spec." },
      { num: "02", title: "Schema + migration plan", body: "Postgres schema matching their mental model. Idempotent nightly imports." },
      { num: "03", title: "Build with operators in the loop", body: "UI looks almost like their sheet on purpose — zero retraining." },
      { num: "04", title: "Cutover weekend", body: "Zero records lost. One bug filed in the first week, fixed in 20 minutes." },
    ],
    result: "Admin time from ~3 hrs to 20 min. Paid for the project in 4 months.",
    primaryCta: "Read the write-up",
  },
  {
    title: "Bramble", tag: "Marketplace", status: "Growing · 2024",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1400&q=80",
    alt: "Bramble marketplace",
    stats: [
      { value: "6 wks", label: "zero to first sale", color: "purple" },
      { value: "$14k", label: "GMV, month 1", color: "green" },
      { value: "100%", label: "uptime", color: "orange" },
    ],
    stack: ["Next.js", "Stripe Connect", "Shippo", "Postgres", "Sanity"],
    problemTitle: "Indie ceramicists, no platform that fit.",
    problemBody: "Etsy felt impersonal, Shopify required every seller to run their own store. They wanted curated, beautiful, low-effort.",
    steps: [
      { num: "01", title: "Storefront + content model", body: "Sanity for products, Next.js storefront. Gallery feel, not a grid." },
      { num: "02", title: "Stripe Connect + payouts", body: "Maker onboarding, split payments. $1 test transactions for a full week." },
      { num: "03", title: "Shipping that doesn't suck", body: "Shippo integration. One click, get a tracking number." },
      { num: "04", title: "Seller dashboard + soft launch", body: "Designed live with the founder over Loom. First sale within 36 hours." },
    ],
    result: "$14k GMV in month one. 30+ makers by month three. Zero downtime in 8 months.",
    primaryCta: "Visit live site",
  },
];

const statColor = (c: Stat["color"]) =>
  ({ purple: "text-brand-purple", green: "text-brand-green", orange: "text-brand-orange" }[c]);
</script>

<template>
  <section id="case-studies" class="max-w-6xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
    <div class="grid lg:grid-cols-12 gap-8 mb-10 items-end reveal">
      <div class="lg:col-span-8">
        <p class="font-mono text-xs text-brand-green mb-3">/ go deeper</p>
        <h2 class="font-display text-4xl sm:text-5xl font-bold leading-tight">Pick a project. See how it actually got built.</h2>
      </div>
      <p class="lg:col-span-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">No fluff — the real problem, the choices I made, what broke, and what it shipped as.</p>
    </div>

    <div class="flex items-center justify-between mb-6 reveal">
      <div class="flex items-center gap-3 text-sm text-zinc-500">
        <span id="csCurrent" class="font-mono text-2xl font-bold text-ink dark:text-white">01</span>
        <span class="font-mono">/ <span id="csTotal">04</span></span>
        <span class="hidden sm:block ml-3 text-xs font-mono text-zinc-400">— <span id="csTitle">Finch Analytics</span></span>
      </div>
      <div class="flex items-center gap-2">
        <button id="csPrev" aria-label="Previous case study" class="w-11 h-11 grid place-items-center rounded-full border border-zinc-200 dark:border-white/10 bg-paper dark:bg-ink hover:border-brand-purple hover:text-brand-purple transition disabled:opacity-40 disabled:cursor-not-allowed">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button id="csNext" aria-label="Next case study" class="w-11 h-11 grid place-items-center rounded-full border border-zinc-200 dark:border-white/10 bg-paper dark:bg-ink hover:border-brand-purple hover:text-brand-purple transition disabled:opacity-40 disabled:cursor-not-allowed">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </div>

    <div class="h-1 rounded-full bg-zinc-200/70 dark:bg-white/5 overflow-hidden mb-10 reveal">
      <div id="csProgress" class="h-full bg-gradient-to-r from-brand-purple to-brand-green transition-all duration-500" style="width:25%" />
    </div>

    <div class="cs-carousel relative -mx-5 sm:mx-0 overflow-hidden">
      <div id="csTrack" class="flex transition-transform duration-500 ease-out" style="will-change: transform;">
        <article v-for="s in slides" :key="s.title" class="cs-slide shrink-0 w-full px-5 sm:px-0" :data-title="s.title">
          <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start rounded-2xl border border-zinc-200 dark:border-white/10 bg-paper dark:bg-ink p-6 sm:p-10 shadow-soft">
            <div class="lg:col-span-7 space-y-5">
              <div class="relative rounded-xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900">
                <img :src="s.image" :alt="s.alt" class="w-full aspect-[16/10] object-cover">
                <div class="absolute top-4 left-4 flex items-center gap-2">
                  <span class="text-[10px] font-mono px-2.5 py-1 rounded-full bg-paper/95 dark:bg-ink/95 backdrop-blur border border-zinc-200 dark:border-white/10">{{ s.tag }}</span>
                  <span class="text-[10px] font-mono px-2.5 py-1 rounded-full bg-brand-green/15 text-brand-green border border-brand-green/30">{{ s.status }}</span>
                </div>
              </div>
              <div class="grid grid-cols-3 gap-3">
                <div v-for="st in s.stats" :key="st.label" class="p-4 rounded-xl border border-zinc-200 dark:border-white/10">
                  <div class="font-display text-3xl font-bold" :class="statColor(st.color)"><span class="cs-metric-num">{{ st.value }}</span></div>
                  <div class="text-[11px] font-mono text-zinc-500 mt-1">{{ st.label }}</div>
                </div>
              </div>
              <div class="flex flex-wrap gap-1.5">
                <span v-for="t in s.stack" :key="t" class="text-[11px] font-mono px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400">{{ t }}</span>
              </div>
            </div>

            <div class="lg:col-span-5 space-y-7">
              <div>
                <p class="font-mono text-xs text-brand-orange mb-2">→ the problem</p>
                <h3 class="font-display text-2xl font-bold mb-3">{{ s.problemTitle }}</h3>
                <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed text-[15px]">{{ s.problemBody }}</p>
              </div>
              <div>
                <p class="font-mono text-xs text-brand-purple mb-4">→ how it came together</p>
                <div class="space-y-6">
                  <div v-for="step in s.steps" :key="step.num" class="cs-step flex gap-4">
                    <span class="cs-step-dot">{{ step.num }}</span>
                    <div>
                      <h4 class="font-semibold text-sm mb-1">{{ step.title }}</h4>
                      <p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{{ step.body }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="p-5 rounded-xl bg-brand-purple/5 dark:bg-brand-purple/10 border border-brand-purple/20">
                <p class="font-mono text-xs text-brand-purple mb-2">→ the result</p>
                <p class="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{{ s.result }}</p>
              </div>
              <div class="flex items-center gap-4">
                <a href="#" class="inline-flex items-center gap-2 text-sm font-medium border-b border-current hover:text-brand-purple hover:border-brand-purple transition">
                  {{ s.primaryCta }}
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M7 17L17 7M7 7h10v10"/></svg>
                </a>
                <a href="#talk" class="text-sm font-medium text-brand-purple hover:underline">Build something like this →</a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>

    <div id="csDots" class="flex items-center justify-center gap-2 mt-8" />
  </section>
</template>
