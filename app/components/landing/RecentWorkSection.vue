<script setup lang="ts">
interface Project {
  number: string;
  category: string;
  categoryColor: "green" | "orange" | "purple";
  title: string;
  description: string;
  bullets: string[];
  cta: string;
  meta?: string;
  image: string;
  alt: string;
  reverse?: boolean;
}

const projects: Project[] = [
  {
    number: "01", category: "SaaS Dashboard", categoryColor: "green",
    title: "Finch Analytics",
    description: "A real-time analytics platform for e-commerce founders who were drowning in spreadsheets. Replaced 4 different tools with one clean dashboard.",
    bullets: [
      "Built the whole stack — Next.js, tRPC, Postgres, ClickHouse for events.",
      "Designed the dashboard from scratch with the founder.",
      "Shipped MVP in 7 weeks, paying customers in week 9.",
    ],
    cta: "Visit live site", meta: "+ 38% MRR in 90 days",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    alt: "Finch analytics dashboard", reverse: true,
  },
  {
    number: "02", category: "Mobile + Web", categoryColor: "orange",
    title: "Stack — habit tracker for devs",
    description: "A solo founder's bootstrapped indie app. Tracks coding habits, ships beautiful streaks, and integrates with GitHub.",
    bullets: [
      "React Native app + Next.js marketing site + API.",
      "Stripe subscriptions, magic-link auth, no passwords.",
      "4-month engagement, then handed off cleanly.",
    ],
    cta: "See case study", meta: "2.1k paying users",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1400&q=80",
    alt: "Stack mobile app screens",
  },
  {
    number: "03", category: "Internal Tool", categoryColor: "purple",
    title: "Northwind Ops",
    description: "An ops team was running their whole logistics business on a 4MB Google Sheet. I replaced it with a custom internal app in 5 weeks.",
    bullets: [
      "Remix + Postgres + role-based access for 12 staff.",
      "Migrated 80k rows without losing a single record.",
      "Cut their daily admin from ~3 hrs to 20 min.",
    ],
    cta: "Read the write-up",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
    alt: "Northwind internal tool", reverse: true,
  },
  {
    number: "04", category: "Marketplace", categoryColor: "green",
    title: "Bramble",
    description: "A two-sided marketplace for independent ceramicists. From zero to first sale in 6 weeks, including payments and shipping.",
    bullets: [
      "Next.js storefront, Stripe Connect, Shippo integration.",
      "Designed the seller dashboard with the founder over Loom.",
      "$14k in GMV month one, zero downtime since launch.",
    ],
    cta: "Visit live site",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1400&q=80",
    alt: "Bramble marketplace site",
  },
];

const categoryClass = (c: Project["categoryColor"]) =>
  ({ green: "text-brand-green", orange: "text-brand-orange", purple: "text-brand-purple" }[c]);
</script>

<template>
  <section id="work" class="max-w-6xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
    <div class="flex items-end justify-between mb-14 reveal">
      <div>
        <p class="font-mono text-xs text-brand-purple mb-3">/ recent work</p>
        <h2 class="font-display text-4xl sm:text-5xl font-bold">Stuff I've shipped lately.</h2>
      </div>
      <a href="#talk" class="hidden sm:inline-flex text-sm font-medium hover:text-brand-purple transition">Yours could be next →</a>
    </div>

    <div class="space-y-24">
      <article v-for="p in projects" :key="p.number" class="project-card grid lg:grid-cols-12 gap-8 lg:gap-14 items-center reveal">
        <div class="lg:col-span-7" :class="p.reverse ? 'order-2 lg:order-1' : ''">
          <div class="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-soft">
            <img :src="p.image" :alt="p.alt" class="w-full aspect-[16/10] object-cover" loading="lazy">
          </div>
        </div>
        <div class="lg:col-span-5" :class="p.reverse ? 'order-1 lg:order-2' : ''">
          <p class="font-mono text-xs mb-2" :class="categoryClass(p.categoryColor)">{{ p.number }} — {{ p.category }}</p>
          <h3 class="font-display text-3xl font-bold mb-3">{{ p.title }}</h3>
          <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5">{{ p.description }}</p>
          <ul class="text-sm space-y-2 mb-6">
            <li v-for="b in p.bullets" :key="b" class="flex gap-3"><span class="text-brand-purple font-mono">→</span> {{ b }}</li>
          </ul>
          <div class="flex items-center gap-4">
            <a href="#" class="inline-flex items-center gap-2 text-sm font-medium border-b border-current hover:text-brand-purple hover:border-brand-purple transition">
              {{ p.cta }}
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M7 17L17 7M7 7h10v10"/></svg>
            </a>
            <span v-if="p.meta" class="text-xs font-mono text-zinc-500">{{ p.meta }}</span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
