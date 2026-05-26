<script setup lang="ts">
import { computed } from "vue";
import type {
  Brand,
  NavLink,
  Cta,
  FooterGroup,
  ArticleContent,
  PostCardData,
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

const sampleHtml = `
<p>I default to six-week builds. Not because six weeks is magic — it isn't — but because anything longer turns into a slow-motion negotiation, and anything shorter usually skips the parts that matter after launch.</p>
<h2>What gets cut on purpose</h2>
<p>Almost everything. The settings page. The admin panel. The third payment provider. <code>useEffect</code>-driven analytics. Anything that doesn't directly serve the one workflow we agreed shipped in v1.</p>
<blockquote>If a feature isn't in the scope letter, it isn't in v1. It's a re-quote.</blockquote>
<h3>Three things I always keep</h3>
<ul>
  <li>Real error handling on the happy path's two riskiest steps.</li>
  <li>One end-to-end test that walks the demo.</li>
  <li>A rollback drill before launch day.</li>
</ul>
<h2>What this looks like in practice</h2>
<p>Every Friday: a deployed preview, a 5-minute Loom, and three questions I need answered by Monday. By week 4 we both know what's shippable. By week 6 it's live.</p>
<pre><code>// scope-letter.md
## v1 (in scope)
- create + send invoices
- Stripe payment links
- CSV import (3 presets)

## v2 (priced)
- recurring invoices — $4,200
- team seats — $6,800</code></pre>
<p>Boring? Maybe. <strong>Predictable</strong>. That's the point.</p>
`;

const articles: Record<string, ArticleContent> = {
  "mvp-6w": {
    id: "mvp-6w",
    slug: "mvp-6w",
    title: "The 6-week MVP is a feature, not a bug",
    lede: "Why I default to short, fixed-scope sprints — and what I leave out on purpose.",
    meta: {
      tag: "Process",
      tagTone: "purple",
      date: "May 12, 2026",
      dateISO: "2026-05-12",
      readTime: "6 min read",
      author: "alex rivera",
    },
    coverImage:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Notebook with a sprint plan sketched out",
    coverCaption: "the actual whiteboard from week 0 of atlas",
    html: sampleHtml,
    related: [],
  },
  jsonb: {
    id: "jsonb",
    slug: "jsonb",
    title: "JSONB is fine, until it isn't",
    lede: "A walk through three projects where JSONB earned its keep — and one where it didn't.",
    meta: {
      tag: "Postgres",
      tagTone: "green",
      date: "Apr 28, 2026",
      dateISO: "2026-04-28",
      readTime: "9 min read",
      author: "alex rivera",
    },
    coverImage:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Server room with blue lights",
    html: sampleHtml,
    related: [],
  },
};

const relatedFallback: PostCardData[] = [
  {
    id: "nitro-tasks",
    tag: "Nuxt",
    tagTone: "purple",
    date: "Apr 9, 2026",
    readTime: "5 min read",
    title: "Server routes vs. Nitro tasks — when to reach for which",
    excerpt:
      "Quick decision tree I use on every Nuxt project. Includes the part where I admit I got it wrong twice.",
    href: "/blogs/nitro-tasks",
    image:
      "https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Code on a laptop screen",
  },
  {
    id: "pricing",
    tag: "Freelance",
    tagTone: "orange",
    date: "Mar 22, 2026",
    readTime: "8 min read",
    title: "Pricing a fixed-scope project without losing your shirt",
    excerpt:
      "My five-step pricing worksheet, the contract clause that saves the day, and the project that taught me both.",
    href: "/blogs/pricing",
  },
  {
    id: "a11y-wins",
    tag: "Accessibility",
    tagTone: "green",
    date: "Feb 14, 2026",
    readTime: "4 min read",
    title: "The cheapest a11y wins on a Nuxt site",
    excerpt:
      "Five things I do on every project that take an hour total and clear most automated audits.",
    href: "/blogs/a11y-wins",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Hands typing on a keyboard",
  },
];

const titleize = (slug: string) =>
  slug
    .split("-")
    .map((w) => (w.length ? w[0]!.toUpperCase() + w.slice(1) : w))
    .join(" ");

const article = computed<ArticleContent>(() => {
  const found = articles[id.value];
  if (found) return found;
  return {
    id: id.value,
    slug: id.value,
    title: titleize(id.value),
    lede: "A short essay from the workbench — full text coming soon.",
    meta: {
      tag: "Writing",
      tagTone: "purple",
      date: "Recent",
      author: "alex rivera",
    },
    html: sampleHtml,
    related: [],
  };
});
const related = computed<PostCardData[]>(() =>
  article.value?.related?.length ? article.value.related : relatedFallback,
);

useHead(() => ({
  title: `${article.value.title} — Alex Rivera`,
  meta: [
    {
      name: "description",
      content: article.value.lede ?? "",
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
        <WebContentBackLink label="All posts" href="/blogs" />

        <header class="mt-8 mb-12 sm:mb-16">
          <WebContentArticleMeta v-bind="article.meta" />
          <h1
            class="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-ink dark:text-white"
          >
            {{ article.title }}
          </h1>
          <p
            v-if="article.lede"
            class="mt-6 sm:mt-8 text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl"
          >
            {{ article.lede }}
          </p>
        </header>

        <figure v-if="article.coverImage" class="mb-12">
          <img
            :src="article.coverImage"
            :alt="article.coverImageAlt ?? ''"
            class="w-full rounded-2xl border border-zinc-200 dark:border-white/10 aspect-video object-cover"
            loading="lazy"
          >
          <figcaption
            v-if="article.coverCaption"
            class="mt-3 text-xs font-mono text-zinc-500 dark:text-zinc-400"
          >{{ article.coverCaption }}</figcaption>
        </figure>

        <WebContentArticleBody :html="article.html" />
      </article>

      <WebContentRelatedCards :items="related" />
    </main>
    <WebLayoutSiteFooter
      :brand="brand"
      tagline="Freelance full stack developer. Calm, ship-on-time web products."
      :groups="footerGroups"
      legal="© 2026 Alex Rivera"
    />
  </div>
</template>
