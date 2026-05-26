<script setup lang="ts">
import type {
  BentoTile,
  ComparisonColumn,
  Cta,
  FeatureTab,
  LogoItem,
  SectionHeaderContent,
  StatItem,
} from "~/components/web/types";

definePageMeta({ layout: false });

useHead({
  htmlAttrs: { "data-default-theme": "light" },
  title: "Section content variants — preview",
  meta: [
    {
      name: "robots",
      content: "noindex,nofollow",
    },
  ],
  script: [
    {
      innerHTML: `(function(){var t=localStorage.getItem('theme');var d=document.documentElement.getAttribute('data-default-theme')||'light';var dark=t?t==='dark':d==='dark';document.documentElement.classList.toggle('dark',dark);})();`,
      tagPosition: "head",
    },
  ],
});

// ──────────────────────────────────────────────────────────────────────────────
// Preview page for new section content variants.
// Each block uses placeholder content reflecting the alex.dev voice.
// ──────────────────────────────────────────────────────────────────────────────

// Tiny inline SVGs (currentColor) used for FeatureTabs icons.
const iconShip = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="m12 3 4 4-9 9-4-4 9-9z"/><path d="m14 7 3 3"/><path d="M3 22h18"/><path d="M5 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2"/></svg>`;
const iconCode = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;
const iconShield = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`;

// ── Template A — FeatureTabs ─────────────────────────────────────────────────

const featureTabsHeader: SectionHeaderContent = {
  eyebrow: "/ how I work",
  eyebrowTone: "purple",
  title: `Three things I won't <span class="text-brand-purple">compromise on.</span>`,
  description:
    "Pick the one you care most about. Every engagement holds all three — these are the rules, not the marketing.",
};

const featureTabs: FeatureTab[] = [
  {
    icon: iconShip,
    title: "Ship in weeks, not quarters.",
    body: "Small slices, deployed behind feature flags. You see progress every Friday — not at the end of the engagement.",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Calendar with weekly ship dates marked in green",
  },
  {
    icon: iconCode,
    title: "Code you can hand to the next person.",
    body: "Typed end-to-end, lint clean, with a README that doesn't lie. If I get hit by a bus, your team keeps going.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Editor showing well-organized TypeScript source code",
  },
  {
    icon: iconShield,
    title: "Honest answers, even when they sting.",
    body: "If your idea won't work, I'll tell you on day one. Saving you three months is worth more than a month of my retainer.",
    image:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Two people in a focused planning conversation at a table",
  },
];

const featureTabsCtas: Cta[] = [
  { label: "See the full process", href: "#process", variant: "primary" },
  { label: "Book a discovery call", href: "#talk", variant: "ghost" },
];

// ── Template B — BentoFeatures ───────────────────────────────────────────────

const iconStack = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="m12 2 9 5-9 5-9-5 9-5z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/></svg>`;
const iconTypes = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>`;
const iconCi = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>`;
const iconChat = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`;
const iconHandoff = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>`;

const bentoHeader: SectionHeaderContent = {
  eyebrow: "/ what comes in the box",
  eyebrowTone: "green",
  title: `Everything you'd hire <span class="text-brand-green">three people</span> for.`,
  description:
    "One engagement, end-to-end. No handoffs between a contractor and a freelancer and an agency PM.",
};

const bentoTiles: BentoTile[] = [
  {
    icon: iconStack,
    title: "Full-stack delivery",
    body: "Frontend, backend, database, and the bit of DevOps it takes to keep them all talking on a Sunday night.",
    tone: "purple",
  },
  {
    icon: iconTypes,
    title: "Type-safe end-to-end",
    body: "TypeScript from the form input to the database column. The compiler catches it before the test does, and the test catches it before staging does.",
    tone: "green",
  },
  {
    icon: iconCi,
    title: "CI/CD that just works",
    body: "GitHub Actions wired on day one. Preview deploys per PR. Production deploys behind a tested rollback drill.",
    tone: "orange",
  },
  {
    icon: iconChat,
    title: "Honest weekly updates",
    body: "Friday Loom, three concrete questions for you, a live Linear board. No 'circle back later' status updates.",
    tone: "purple",
  },
  {
    icon: iconHandoff,
    title: "Own the handover docs",
    body: "README that's accurate, runbook that's been tested, on-call cheatsheet that fits on one page. Your next engineer onboards in an afternoon.",
    tone: "green",
  },
];

// ── Template C — ComparisonSplit ─────────────────────────────────────────────

const comparisonHeader: SectionHeaderContent = {
  eyebrow: "/ the difference",
  eyebrowTone: "orange",
  title: `Same six weeks. Very <span class="text-brand-orange">different</span> outcome.`,
};

const comparisonLeft: ComparisonColumn = {
  label: "without a senior dev",
  items: [
    "prototype lives in a tab nobody's allowed to close",
    "'we'll add tests later' — narrator: they did not",
    "staging breaks every Monday morning",
    "the contractor goes quiet in week 3",
    "ship date keeps quietly moving by a week",
  ],
};

const comparisonRight: ComparisonColumn = {
  label: "with me on the team",
  items: [
    "deployed to prod behind a flag by week 2",
    "typed and tested as we go — not 'later'",
    "CI catches it before staging does",
    "weekly demo on Friday, no surprises on Monday",
    "ship date set on day one, hit on day one",
  ],
};

// ── Template D — LogosWall ───────────────────────────────────────────────────

// Stylised monochrome wordmarks (currentColor). Stand-ins for real client
// logos — replace these with the actual brands once they're cleared.
const wm = (label: string, w = 90) =>
  `<svg viewBox="0 0 ${w} 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><text x="0" y="20" font-family="Space Grotesk, system-ui, sans-serif" font-size="20" font-weight="700" letter-spacing="-0.02em">${label}</text></svg>`;

const logos: LogoItem[] = [
  { name: "Atlas", svg: wm("atlas") },
  { name: "Loom & Order", svg: wm("loom") },
  { name: "Sift", svg: wm("sift") },
  { name: "Permit", svg: wm("permit") },
  { name: "Finch", svg: wm("finch") },
  { name: "Northwind", svg: wm("northwind", 120) },
];

// ── Template E — MetricStrip ─────────────────────────────────────────────────

const metricItems: StatItem[] = [
  { value: "47", label: "projects shipped" },
  { value: "0", label: "missed deadlines" },
  { value: "12", label: "founders still talking to me" },
  { value: "8 yrs", label: "full-stack TypeScript" },
];
</script>

<template>
  <main id="top" class="min-h-screen">
    <!-- Preview chrome -->
    <header
      class="border-b border-zinc-200 dark:border-white/10 bg-paper/70 dark:bg-ink/70 backdrop-blur sticky top-0 z-50"
    >
      <div
        class="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between"
      >
        <p class="font-mono text-xs text-zinc-500">
          / content variants — section templates preview
        </p>
        <p class="font-mono text-xs text-zinc-500">
          <a href="/" class="hover:text-brand-purple transition">← landing</a>
        </p>
      </div>
    </header>

    <!-- Template A — FeatureTabs -->
    <WebProcessFeatureTabs
      :header="featureTabsHeader"
      :tabs="featureTabs"
      :ctas="featureTabsCtas"
      active-tone="purple"
      image-aspect="4/5"
      image-order="left"
      section-id="feature-tabs"
    />

    <!-- Template B — BentoFeatures -->
    <WebMiscBentoFeatures
      :header="bentoHeader"
      :tiles="bentoTiles"
      pattern="2-3"
      section-id="bento"
    />

    <!-- Template C — ComparisonSplit -->
    <WebProcessComparisonSplit
      :header="comparisonHeader"
      :left="comparisonLeft"
      :right="comparisonRight"
      section-id="comparison"
    />

    <!-- Template E — MetricStrip (placed before LogosWall so the page reads
         hero-style → metrics → social proof → narrative) -->
    <WebSocialMetricStrip
      :items="metricItems"
      eyebrow="/ the receipts"
      :live-pulse-on-first="true"
      section-id="metric-strip"
    />

    <!-- Template D — LogosWall -->
    <WebSocialLogosWall
      :logos="logos"
      eyebrow="/ teams I've shipped with"
      caption="trusted by founders shipping in 2024–2026"
      section-id="logos-wall"
    />

    <footer
      class="border-t border-zinc-200 dark:border-white/10 py-10 text-center"
    >
      <p class="font-mono text-xs text-zinc-500">
        / end of preview
      </p>
    </footer>
  </main>
</template>
