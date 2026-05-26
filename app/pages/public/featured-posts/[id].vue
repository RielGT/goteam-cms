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
<p>This is one of the handful I send people when they ask <em>where do I start?</em> It distils a year of Friday-demo cycles into one essay — opinionated, lowercase, and a little impatient.</p>
<h2>Why this one made the cut</h2>
<p>Because the lesson outlasted the project. Six months after launch, the rule still applies — and that's the bar.</p>
<ul>
  <li>It reads in under ten minutes.</li>
  <li>It contains exactly one diagram.</li>
  <li>It would still be true in two years.</li>
</ul>
<h3>The shortest version</h3>
<p>Pick the smallest thing that's worth shipping. Ship it. Then talk about scope two.</p>
<pre><code>// scope.md
v1 = the thing one customer would pay for
v2 = everything else</code></pre>
<p>If that feels reductive, good. Reductive is how things get done.</p>
`;

const articles: Record<string, ArticleContent> = {
  "mvp-6w": {
    id: "mvp-6w",
    slug: "mvp-6w",
    title: "The 6-week MVP is a feature, not a bug",
    lede: "The essay I send anyone who asks me where to start.",
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
    html: sampleHtml,
    related: [],
  },
  jsonb: {
    id: "jsonb",
    slug: "jsonb",
    title: "JSONB is fine, until it isn't",
    lede: "The post most often forwarded to people deciding their schema.",
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
    id: "pricing",
    tag: "Freelance",
    tagTone: "orange",
    date: "Mar 22, 2026",
    readTime: "8 min read",
    title: "Pricing a fixed-scope project without losing your shirt",
    excerpt:
      "My five-step pricing worksheet, the contract clause that saves the day, and the project that taught me both.",
    href: "/featured-posts/pricing",
  },
  {
    id: "nitro-tasks",
    tag: "Nuxt",
    tagTone: "purple",
    date: "Apr 9, 2026",
    readTime: "5 min read",
    title: "Server routes vs. Nitro tasks — when to reach for which",
    excerpt:
      "Quick decision tree I use on every Nuxt project.",
    href: "/featured-posts/nitro-tasks",
    image:
      "https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Code on a laptop screen",
  },
  {
    id: "coverage",
    tag: "Testing",
    tagTone: "green",
    date: "Mar 3, 2026",
    readTime: "7 min read",
    title: "Coverage isn't the goal. Confidence is.",
    excerpt:
      "Where I spend my testing budget on a solo project, and the three places I refuse to skip.",
    href: "/featured-posts/coverage",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Notebook with checkboxes",
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
    lede: "One of the handful I send people when they ask where to start.",
    meta: {
      tag: "Featured",
      tagTone: "orange",
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
        <WebContentBackLink label="Featured" href="/featured-posts" />

        <header class="mt-8 mb-12 sm:mb-16">
          <WebContentArticleMeta v-bind="article.meta" />
          <h1
            class="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-ink dark:text-white"
          >
            {{ article.title }}
          </h1>
          <p
            v-if="article.lede"
            class="mt-6 sm:mt-8 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl"
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
