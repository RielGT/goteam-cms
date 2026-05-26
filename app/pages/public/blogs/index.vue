<script setup lang="ts">
import { computed, ref } from "vue";
import type {
  Brand,
  NavLink,
  Cta,
  BadgeContent,
  FooterGroup,
  PostCardData,
  TagFilterOption,
} from "~/components/web/types";

definePageMeta({ layout: false });

useHead({
  title: "Writing — Alex Rivera",
  meta: [
    {
      name: "description",
      content:
        "Short essays on shipping software solo, design trade-offs, and the boring tools I keep coming back to.",
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

const allPosts: PostCardData[] = [
  {
    id: "mvp-6w",
    tag: "Process",
    tagTone: "purple",
    date: "May 12, 2026",
    dateISO: "2026-05-12",
    readTime: "6 min read",
    title: "The 6-week MVP is a feature, not a bug",
    excerpt:
      "Why I default to short, fixed-scope sprints and what I leave out on purpose. Spoiler: it's the settings page.",
    href: "/blogs/mvp-6w",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Notebook with a sprint plan sketched out",
    featured: true,
  },
  {
    id: "jsonb",
    tag: "Postgres",
    tagTone: "green",
    date: "Apr 28, 2026",
    dateISO: "2026-04-28",
    readTime: "9 min read",
    title: "JSONB is fine, until it isn't",
    excerpt:
      "Three projects where JSONB earned its keep — and one where it became the source of every Sunday-night page.",
    href: "/blogs/jsonb",
    image:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Server room with blue lights",
  },
  {
    id: "nitro-tasks",
    tag: "Nuxt",
    tagTone: "purple",
    date: "Apr 9, 2026",
    dateISO: "2026-04-09",
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
    dateISO: "2026-03-22",
    readTime: "8 min read",
    title: "Pricing a fixed-scope project without losing your shirt",
    excerpt:
      "My five-step pricing worksheet, the contract clause that saves the day, and the project that taught me both.",
    href: "/blogs/pricing",
  },
  {
    id: "coverage",
    tag: "Testing",
    tagTone: "green",
    date: "Mar 3, 2026",
    dateISO: "2026-03-03",
    readTime: "7 min read",
    title: "Coverage isn't the goal. Confidence is.",
    excerpt:
      "Where I spend my testing budget on a solo project, and the three places I refuse to skip — even on a one-week sprint.",
    href: "/blogs/coverage",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Notebook with checkboxes",
  },
  {
    id: "a11y-wins",
    tag: "Accessibility",
    tagTone: "purple",
    date: "Feb 14, 2026",
    dateISO: "2026-02-14",
    readTime: "4 min read",
    title: "The cheapest a11y wins on a Nuxt site",
    excerpt:
      "Five things I do on every project that take an hour total and clear most automated audits. None of them are heroic.",
    href: "/blogs/a11y-wins",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Hands typing on a keyboard",
  },
  {
    id: "stripe-connect",
    tag: "Postgres",
    tagTone: "green",
    date: "Feb 1, 2026",
    dateISO: "2026-02-01",
    readTime: "10 min read",
    title: "Stripe Connect onboarding is mostly waiting",
    excerpt:
      "What I plan around the 7–14 day verification window so the build doesn't stall in week 5.",
    href: "/blogs/stripe-connect",
  },
  {
    id: "linear-flow",
    tag: "Process",
    tagTone: "purple",
    date: "Jan 18, 2026",
    dateISO: "2026-01-18",
    readTime: "5 min read",
    title: "How I run a Linear board for a solo build",
    excerpt:
      "Three statuses, two labels, one rule. Anything more and the board becomes the work.",
    href: "/blogs/linear-flow",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Sticky notes on a wall",
  },
  {
    id: "boring-stack",
    tag: "Nuxt",
    tagTone: "purple",
    date: "Jan 4, 2026",
    dateISO: "2026-01-04",
    readTime: "6 min read",
    title: "Why my default stack hasn't changed in two years",
    excerpt:
      "Nuxt + Postgres + Tailwind + Fly.io. The pieces I'd have to be paid to swap out — and the ones I'm always tempted by.",
    href: "/blogs/boring-stack",
  },
];

const tags: TagFilterOption[] = [
  { id: "all", label: "All" },
  { id: "Process", label: "Process" },
  { id: "Postgres", label: "Postgres" },
  { id: "Nuxt", label: "Nuxt" },
  { id: "Freelance", label: "Freelance" },
  { id: "Testing", label: "Testing" },
  { id: "Accessibility", label: "Accessibility" },
];

const activeTag = ref<string>("all");

const filtered = computed(() =>
  activeTag.value === "all" ? allPosts : allPosts.filter((p) => p.tag === activeTag.value),
);

const featured = computed(() => filtered.value.find((p) => p.featured && p.image));
const rest = computed(() =>
  filtered.value.filter((p) => !(featured.value && p.id === featured.value.id)),
);

// Strip `id` (and allow overrides) before spreading onto PostCard,
// since PostCard doesn't declare `id` as a prop and has a multi-root
// template — fallthrough attrs there cause SSR/client hydration mismatches.
const cardProps = (post: PostCardData, overrides: Partial<PostCardData> = {}) => {
  const { id: _id, ...rest } = post;
  return { ...rest, ...overrides };
};

const heroBadge: BadgeContent = {
  label: `${allPosts.length} posts`,
  tone: "purple",
  dot: false,
};

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
      <WebContentContentHero
        eyebrow="/ writing"
        eyebrow-tone="purple"
        title="Notes from <span class=&quot;text-brand-purple&quot;>the workbench.</span>"
        description="Short essays on shipping software solo, design trade-offs, and the boring tools I keep coming back to."
        :badge="heroBadge"
      />

      <section class="max-w-6xl mx-auto px-5 sm:px-8 pb-24 sm:pb-32">
        <div class="mb-10">
          <WebContentTagFilter v-model="activeTag" :tags="tags" aria-label="Filter posts by topic" />
        </div>

        <WebContentPostCard v-if="featured" v-bind="cardProps(featured)" class="mb-8 lg:mb-12" />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <WebContentPostCard
            v-for="post in rest"
            :key="post.id"
            v-bind="cardProps(post, { featured: false })"
          />
        </div>

        <p
          v-if="filtered.length === 0"
          class="text-center text-zinc-500 dark:text-zinc-500 font-mono text-sm py-16"
        >
          / nothing here yet — try a different tag.
        </p>

        <WebContentPagination :current-page="1" :total-pages="1" base-href="/blogs?page=" />
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
