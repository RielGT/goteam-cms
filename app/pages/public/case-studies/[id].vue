<script setup lang="ts">
import { computed } from "vue";
import type {
  Brand,
  NavLink,
  Cta,
  FooterGroup,
  StatItem,
  PostCardData,
  ArticleMetaData,
  SectionHeaderContent,
  BookTalkBullet,
  FormField,
} from "~/components/web/types";

definePageMeta({ layout: false });

const route = useRoute();
const id = computed(() => String(route.params.id ?? ""));

const brand: Brand = { name: "alex", accent: ".dev", href: "/" };
const nav: NavLink[] = [
  { label: "Work", href: "/#work" },
  { label: "Words", href: "/blogs" },
  { label: "Case studies", href: "/case-studies" },
  { label: "Talk", href: "/#talk" },
];
const headerCta: Cta = { label: "Book a talk", href: "/#talk" };

interface CaseStudyDetail {
  id: string;
  title: string;
  lede: string;
  meta: ArticleMetaData;
  status: string;
  coverImage: string;
  coverImageAlt: string;
  stats: StatItem[];
  stack: string[];
  html: string;
}

const sampleHtml = `
<h2>The problem</h2>
<p>Solo accountants were losing a day a week to invoicing. Existing tools assumed agency-sized teams; we needed something a single accountant could open Monday morning and not hate by Friday.</p>

<h2>How it came together</h2>
<ol>
  <li><strong>Two-week discovery.</strong> Shadowed 5 accountants. Found 11 manual steps that could collapse into 2.</li>
  <li><strong>Vertical slice MVP.</strong> One workflow — invoice → email → reconcile. Stripe + Postmark. No settings page yet.</li>
  <li><strong>Ship, then widen.</strong> Added bulk import once 30 users were paying. Built what they asked for, not what I assumed.</li>
</ol>

<h2>The result</h2>
<blockquote>Live for 9 months. 400 paying users, 92% MoM retention, and the founder finally took a real holiday.</blockquote>

<h3>What I'd do differently</h3>
<p>Spend less time on the CSV importer in week 3 — the three presets we shipped covered 80% of customers. The custom mapper that took five days has been used by fewer than ten accounts.</p>
`;

const caseStudies: Record<string, CaseStudyDetail> = {
  atlas: {
    id: "atlas",
    title: "Atlas — invoice automation for solo accountants",
    lede: "Took a spreadsheet workflow and turned it into a focused 3-screen SaaS.",
    meta: {
      tag: "SaaS · 2026",
      tagTone: "purple",
      date: "Shipped Feb 2026",
      dateISO: "2026-02",
      author: "alex rivera",
    },
    status: "Live",
    coverImage:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Atlas dashboard preview",
    stats: [
      { value: "11min", label: "time to first invoice" },
      { value: "6w", label: "to MVP" },
      { value: "400", label: "paying users" },
    ],
    stack: ["Nuxt 3", "TypeScript", "Postgres", "Stripe", "Tailwind", "Fly.io"],
    html: sampleHtml,
  },
  "loom-order": {
    id: "loom-order",
    title: "Loom & Order — booking platform for textile artisans",
    lede: "Two-sided marketplace with escrow payments and a calendar that doesn't lie.",
    meta: {
      tag: "Marketplace · 2025",
      tagTone: "green",
      date: "Shipped Aug 2025",
      dateISO: "2025-08",
      author: "alex rivera",
    },
    status: "Live",
    coverImage:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Loom & Order marketplace screenshot",
    stats: [
      { value: "1.2k", label: "bookings Q1" },
      { value: "4", label: "countries live" },
      { value: "11w", label: "build duration" },
    ],
    stack: ["Nuxt 3", "Stripe Connect", "Postgres", "Redis", "Cloudflare", "Sentry"],
    html: sampleHtml,
  },
};

const titleize = (slug: string) =>
  slug
    .split("-")
    .map((w) => (w.length ? w[0]!.toUpperCase() + w.slice(1) : w))
    .join(" ");

const caseStudy = computed<CaseStudyDetail>(() => {
  const found = caseStudies[id.value];
  if (found) return found;
  return {
    id: id.value,
    title: titleize(id.value),
    lede: "Deep dive coming soon — the short version is below.",
    meta: {
      tag: "Case study",
      tagTone: "purple",
      date: "Recent",
      author: "alex rivera",
    },
    status: "Live",
    coverImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Project cover",
    stats: [
      { value: "—", label: "outcome" },
      { value: "—", label: "timeline" },
      { value: "—", label: "scope" },
    ],
    stack: ["Nuxt 3", "TypeScript", "Postgres", "Tailwind"],
    html: sampleHtml,
  };
});

useHead(() => ({
  title: `${caseStudy.value.title} — Alex Rivera`,
  meta: [
    {
      name: "description",
      content: caseStudy.value.lede ?? "",
    },
  ],
  script: [
    {
      innerHTML:
        "(function(){var t=localStorage.getItem('theme');var dark=t?t==='dark':false;document.documentElement.classList.toggle('dark',dark);})();",
      tagPosition: "head",
    },
  ],
}));

const toneRotation: ("purple" | "green" | "orange")[] = ["purple", "green", "orange"];

const relatedFallback: PostCardData[] = [
  {
    id: "sift",
    tag: "Internal tool",
    tagTone: "purple",
    date: "2025",
    readTime: "case study",
    title: "Sift — moderation queue for a community of 80k",
    excerpt:
      "Replaced a Notion-based moderation flow with a real queue. Keyboard-first, audited.",
    href: "/case-studies/sift",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Sift moderation queue UI",
  },
  {
    id: "permit-now",
    tag: "Public sector",
    tagTone: "green",
    date: "2024",
    readTime: "case study",
    title: "Permit.now — a government form that doesn't make you cry",
    excerpt:
      "Auto-save, plain-language hints, WCAG AA. 78% one-session completion rate.",
    href: "/case-studies/permit-now",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Permit.now form interface",
  },
  {
    id: "loom-order",
    tag: "Marketplace",
    tagTone: "orange",
    date: "2025",
    readTime: "case study",
    title: "Loom & Order — booking platform for textile artisans",
    excerpt:
      "Stripe Connect escrow, calendar-first UX, dispute queue piped to Slack.",
    href: "/case-studies/loom-order",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Loom & Order marketplace",
  },
];

const bookTalkHeader: SectionHeaderContent = {
  eyebrow: "/ let's talk",
  eyebrowTone: "purple",
  title: `Want something like <span class="text-brand-purple">this</span> shipped?`,
  description: "30-minute discovery call. No deck, no pitch.",
};

const bookTalkBullets: BookTalkBullet[] = [
  { text: "Reply within 1 business day.", tone: "green" },
  { text: "I'll tell you if I'm the wrong fit.", tone: "purple" },
];

const bookTalkFields: FormField[] = [
  { id: "name", label: "Your name", type: "text", placeholder: "Jordan Park", required: true },
  { id: "email", label: "Email", type: "email", placeholder: "you@company.com", required: true },
  {
    id: "idea",
    label: "The idea",
    hint: "— 2–3 sentences is plenty",
    type: "textarea",
    placeholder: "We're a 3-person team building X for Y…",
    required: true,
    rows: 4,
  },
];

const footerGroups: FooterGroup[] = [
  {
    eyebrow: "Site",
    links: [
      { label: "Work", href: "/#work" },
      { label: "Words", href: "/blogs" },
      { label: "Case studies", href: "/case-studies" },
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
      <article class="max-w-4xl mx-auto px-5 sm:px-8 pt-12 sm:pt-16 pb-20">
        <WebContentBackLink label="All case studies" href="/case-studies" />

        <header class="mt-6 mb-10">
          <div class="flex flex-wrap items-center gap-3">
            <WebContentArticleMeta v-bind="caseStudy.meta" />
            <WebUiBadge :label="caseStudy.status" tone="green" />
          </div>
          <h1
            class="mt-5 font-display text-5xl sm:text-6xl font-bold leading-[1.05] text-ink dark:text-white"
          >
            {{ caseStudy.title }}
          </h1>
          <p
            v-if="caseStudy.lede"
            class="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl"
          >
            {{ caseStudy.lede }}
          </p>
        </header>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
          <WebUiStat
            v-for="(s, i) in caseStudy.stats"
            :key="s.label"
            :value="s.value"
            :label="s.label"
            :tone="s.tone ?? toneRotation[i]"
            bordered
          />
        </div>

        <figure class="mb-12">
          <img
            :src="caseStudy.coverImage"
            :alt="caseStudy.coverImageAlt"
            class="w-full rounded-2xl border border-zinc-200 dark:border-white/10 aspect-video object-cover"
            loading="lazy"
          >
        </figure>

        <WebContentArticleBody :html="caseStudy.html" />

        <div class="max-w-2xl mx-auto mt-12">
          <p class="font-mono text-xs text-brand-purple mb-3">/ stack</p>
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="t in caseStudy.stack"
              :key="t"
              class="text-[11px] font-mono px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-white/10 text-zinc-600 dark:text-zinc-300"
            >{{ t }}</span>
          </div>
        </div>
      </article>

      <WebContentRelatedCards :items="relatedFallback" />

      <WebMiscBookTalk
        :header="bookTalkHeader"
        :bullets="bookTalkBullets"
        :fields="bookTalkFields"
      />
    </main>
    <WebLayoutSiteFooter
      :brand="brand"
      tagline="Freelance full stack developer. Calm, ship-on-time web products."
      :groups="footerGroups"
      legal="© 2026 Alex Rivera"
    />
  </div>
</template>
