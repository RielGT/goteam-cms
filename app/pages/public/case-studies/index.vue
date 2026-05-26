<script setup lang="ts">
import { computed, ref } from "vue";
import type {
  Brand,
  NavLink,
  Cta,
  FooterGroup,
  CaseStudyCardData,
  TagFilterOption,
} from "~/components/web/types";

definePageMeta({ layout: false });

useHead({
  title: "Case studies — Alex Rivera",
  meta: [
    {
      name: "description",
      content:
        "Deep dives on shipped projects — the real problem, trade-offs, and what I'd do differently next time.",
    },
  ],
  script: [
    {
      innerHTML:
        "(function(){var t=localStorage.getItem('theme');var dark=t?t==='dark':false;document.documentElement.classList.toggle('dark',dark);})();",
      tagPosition: "head",
    },
  ],
});

const brand: Brand = { name: "alex", accent: ".dev", href: "/" };
const nav: NavLink[] = [
  { label: "Work", href: "/#work" },
  { label: "Words", href: "/blogs" },
  { label: "Case studies", href: "/case-studies" },
  { label: "Talk", href: "/#talk" },
];
const headerCta: Cta = { label: "Book a talk", href: "/#talk" };

const allCaseStudies: (CaseStudyCardData & { industry: string })[] = [
  {
    id: "atlas",
    industry: "saas",
    title: "Atlas — invoice automation for solo accountants",
    tag: "SaaS · 2026",
    status: "Live",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Atlas dashboard preview",
    stats: [
      { value: "11min", label: "time to first invoice" },
      { value: "6w", label: "to MVP" },
      { value: "400", label: "paying users" },
    ],
    stack: ["Nuxt 3", "TypeScript", "Postgres", "Stripe", "Tailwind", "Fly.io"],
    excerpt:
      "Took a spreadsheet workflow and turned it into a focused 3-screen SaaS. Stripe billing, magic-link auth, and a CSV import that handles the messy stuff.",
    href: "/case-studies/atlas",
    featured: true,
  },
  {
    id: "loom-order",
    industry: "marketplace",
    title: "Loom & Order — booking platform for textile artisans",
    tag: "Marketplace · 2025",
    status: "Live",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Loom & Order marketplace screenshot",
    stats: [
      { value: "1.2k", label: "bookings Q1" },
      { value: "4", label: "countries live" },
      { value: "11w", label: "build duration" },
    ],
    stack: ["Nuxt 3", "Stripe Connect", "Postgres", "Redis", "Cloudflare", "Sentry"],
    excerpt:
      "Two-sided marketplace with escrow payments, calendar availability, and a review system that filters out the noise.",
    href: "/case-studies/loom-order",
  },
  {
    id: "sift",
    industry: "internal-tool",
    title: "Sift — moderation queue for a community of 80k",
    tag: "Internal tool · 2025",
    status: "Live",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Sift moderation queue UI",
    stats: [
      { value: "38min", label: "avg resolution" },
      { value: "22×", label: "faster than before" },
      { value: "0", label: "lost audit trails" },
    ],
    stack: ["Vue 3", "Fastify", "Postgres", "Redis", "Auth.js", "Playwright"],
    excerpt:
      "Replaced a Notion-based moderation flow with a real queue. Keyboard-first, audited, with a fairness scoring layer that flags hot streaks.",
    href: "/case-studies/sift",
  },
  {
    id: "permit-now",
    industry: "public-sector",
    title: "Permit.now — a government form that doesn't make you cry",
    tag: "Public sector · 2024",
    status: "Live",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Permit.now form interface",
    stats: [
      { value: "78%", label: "one-session completion" },
      { value: "WCAG AA", label: "accessibility audit" },
      { value: "3", label: "councils adopted" },
    ],
    stack: ["Nuxt 3", "TypeScript", "Postgres", "Pino", "axe-core", "Docker"],
    excerpt:
      "Rebuilt a council's building-permit application with auto-save, plain-language hints, and a WCAG AA audit trail.",
    href: "/case-studies/permit-now",
  },
];

const tags: TagFilterOption[] = [
  { id: "all", label: "All" },
  { id: "saas", label: "SaaS" },
  { id: "marketplace", label: "Marketplace" },
  { id: "internal-tool", label: "Internal tool" },
  { id: "public-sector", label: "Public sector" },
];

const activeTag = ref<string>("all");

const filtered = computed(() =>
  activeTag.value === "all"
    ? allCaseStudies
    : allCaseStudies.filter((c) => c.industry === activeTag.value),
);

const featured = computed(() => filtered.value.find((c) => c.featured));
const rest = computed(() =>
  filtered.value.filter((c) => !(featured.value && c.id === featured.value.id)),
);

// Strip `id` and `industry` (the local filter key) before spreading onto
// CaseStudyCard — they're not declared props and `id` would otherwise leak
// onto the rendered DOM via attribute fallthrough.
const cardProps = (
  cs: CaseStudyCardData & { industry: string },
  overrides: Partial<CaseStudyCardData> = {},
) => {
  const { id: _id, industry: _industry, ...rest } = cs;
  return { ...rest, ...overrides };
};

const footerGroups: FooterGroup[] = [
  {
    eyebrow: "Site",
    links: [
      { label: "Work", href: "/#work" },
      { label: "Case studies", href: "/case-studies" },
      { label: "Words", href: "/blogs" },
      { label: "Featured", href: "/featured-posts" },
      { label: "Talk", href: "/#talk" },
    ],
  },
  {
    eyebrow: "Elsewhere",
    links: [
      { label: "LinkedIn", href: "https://linkedin.com/in/alex-rivera-dev", external: true },
      { label: "GitHub", href: "https://github.com/alex-rivera", external: true },
      { label: "Email", href: "mailto:alex@rivera.dev" },
    ],
  },
];
</script>

<template>
  <div>
    <WebLayoutSiteHeader :brand="brand" :nav="nav" :cta="headerCta" />
    <main id="content">
      <WebContentContentHero
        eyebrow="/ deep dives"
        eyebrow-tone="green"
        title="How the <span class=&quot;text-brand-green&quot;>sausage</span> gets made."
        description="Pick one. You'll get the actual problem, the trade-offs I weighed, what I shipped first, and what I'd do differently next time."
      />

      <section class="max-w-6xl mx-auto px-5 sm:px-8 pb-24 sm:pb-32">
        <div class="mb-10">
          <WebContentTagFilter v-model="activeTag" :tags="tags" aria-label="Filter case studies by industry" />
        </div>

        <WebContentCaseStudyCard
          v-if="featured"
          v-bind="cardProps(featured)"
          class="mb-8 lg:mb-12"
        />

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <WebContentCaseStudyCard
            v-for="cs in rest"
            :key="cs.id"
            v-bind="cardProps(cs, { featured: false })"
          />
        </div>

        <p
          v-if="filtered.length === 0"
          class="text-center text-zinc-500 dark:text-zinc-500 font-mono text-sm py-16"
        >
          / nothing in that industry yet — try another.
        </p>
      </section>
    </main>
    <WebLayoutSiteFooter
      :brand="brand"
      tagline="Freelance full stack developer. Calm, ship-on-time web products."
      :groups="footerGroups"
      legal="© 2026 Alex Rivera"
    />
  </div>
</template>
