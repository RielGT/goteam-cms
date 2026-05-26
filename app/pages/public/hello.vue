<script setup lang="ts">
import type {
  BadgeContent,
  BookTalkBullet,
  Brand,
  Cta,
  Faq,
  FooterGroup,
  FormField,
  HeroCodeSnippet,
  HeroImage,
  LinkedInCard,
  NavLink,
  Post,
  ProsePart,
  Rec,
  RecsSummary,
  SectionHeaderContent,
  StatItem,
  TechPill,
  WorkCyclePanel,
} from "~/components/web/types";

definePageMeta({ layout: false });

const defaultTheme: "light" | "dark" = "light";

useHead({
  htmlAttrs: { "data-default-theme": defaultTheme },
  title: "Hello — Alex Rivera",
  meta: [
    {
      name: "description",
      content:
        "A short hello — what I do, how I work, and how to get in touch.",
    },
  ],
  script: [
    {
      // Apply saved theme before paint to avoid flash.
      innerHTML: `(function(){var t=localStorage.getItem('theme');var d=document.documentElement.getAttribute('data-default-theme')||'light';var dark=t?t==='dark':d==='dark';document.documentElement.classList.toggle('dark',dark);})();`,
      tagPosition: "head",
    },
  ],
});

// ──────────────────────────────────────────────────────────────────────────────
// Header + footer brand / nav
// ──────────────────────────────────────────────────────────────────────────────

const brand: Brand = {
  name: "alex",
  accent: ".dev",
  href: "#top",
};

const nav: NavLink[] = [
  { label: "Posts", href: "#posts" },
  { label: "Cycle", href: "#cycle" },
  { label: "Recs", href: "#recs" },
  { label: "Talk", href: "#talk" },
];

const headerCta: Cta = {
  label: "Book a talk",
  href: "#talk",
};

// ──────────────────────────────────────────────────────────────────────────────
// Hero
// ──────────────────────────────────────────────────────────────────────────────

const heroAvailability: BadgeContent = {
  label: "Available for new projects · Q3 2026",
  tone: "green",
  dot: true,
};

const heroImage: HeroImage = {
  src: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=80",
  alt: "Alex Rivera, freelance full stack developer",
  caption: "alex.rivera",
};

const heroCodeSnippet: HeroCodeSnippet = {
  filename: "ship.ts",
  html: `<span class="text-brand-purple">const</span> ship = <span class="text-brand-green">async</span> () =&gt; {
  <span class="text-zinc-500">// turn ideas</span>
  <span class="text-zinc-500">// into products</span>
  <span class="text-brand-orange">return</span> 🚀;
};`,
};

const heroCtas: Cta[] = [
  { label: "Read the latest posts", href: "#posts", variant: "primary" },
  { label: "See how I work", href: "#cycle", variant: "ghost" },
  { label: "alex@rivera.dev", href: "mailto:alex@rivera.dev", variant: "link" },
];

const hero = {
  availability: heroAvailability,
  headline: `Hi, I'm Alex — I build <span class="text-brand-purple">web apps</span> <span class="italic font-light text-zinc-500">that ship.</span>`,
  subheadline:
    "Freelance full stack developer working with founders and small teams. Fixed scope, fixed price, weekly demos — no agency overhead.",
  ctas: heroCtas,
  image: heroImage,
  imageClass: "w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal",
  codeSnippet: heroCodeSnippet,
  floatingBadge: "Shipping since 2014",
};

// ──────────────────────────────────────────────────────────────────────────────
// Tech marquee
// ──────────────────────────────────────────────────────────────────────────────

// Minimal monochrome SVG icons (currentColor) — short to stay readable.
const svgTs = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v18H3V3zm10.2 14.5v1.6c.3.2.7.3 1.1.4.5.1 1 .2 1.6.2.6 0 1.1-.1 1.6-.2.5-.1.9-.3 1.2-.6.3-.3.6-.6.8-1 .2-.4.3-.9.3-1.4 0-.4-.1-.7-.2-1-.1-.3-.3-.6-.6-.8-.2-.2-.5-.4-.9-.6-.3-.2-.7-.4-1.2-.5l-.9-.3c-.2-.1-.4-.2-.5-.3-.1-.1-.2-.2-.3-.3-.1-.1-.1-.2-.1-.4 0-.1 0-.3.1-.4.1-.1.2-.2.3-.3.1-.1.3-.1.5-.2.2 0 .4-.1.6-.1.2 0 .4 0 .6.1.2 0 .4.1.6.2.2.1.4.2.5.3.2.1.3.2.4.4V10c-.3-.1-.6-.2-1-.3-.4-.1-.8-.1-1.3-.1-.6 0-1.1.1-1.5.2-.5.1-.9.3-1.2.6-.3.3-.6.6-.8 1-.2.4-.3.8-.3 1.3 0 .7.2 1.3.6 1.8.4.5 1 .9 1.9 1.2.4.1.7.3 1 .4.3.1.6.3.8.4.2.1.3.3.4.4.1.2.1.3.1.5 0 .2 0 .3-.1.4-.1.1-.2.3-.3.4-.1.1-.3.2-.6.2-.2.1-.5.1-.8.1-.5 0-1.1-.1-1.6-.3-.5-.2-1-.5-1.4-.9zm-3.2-7.3v8.6h-2v-8.6H5v-1.7h8v1.7h-3z"/></svg>`;
const svgVue = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 3h4l6 10L18 3h4L12 21 2 3zm6.8 0H12l-2 3.4L8 3h.8z"/></svg>`;
const svgReact = `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="2"/><g fill="none" stroke="currentColor" stroke-width="1.4"><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/></g></svg>`;
const svgNuxt = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.4 4l8.6 15h-6.2l-1.2-2.1h-6.2L13.4 4zM2 19l5.6-9.7 2.4 4.2L7.3 19H2z"/></svg>`;
const svgNode = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 3 7v10l9 5 9-5V7l-9-5zm0 4.6c2.5 0 4 1 4 2.4 0 .4-.3.6-.7.6-.4 0-.6-.2-.7-.5-.2-.7-1.1-1.1-2.6-1.1-1.7 0-2.4.4-2.4 1.1 0 .5.3.8 1.4 1l1.6.2c2.4.3 3.4 1.1 3.4 2.5 0 1.7-1.5 2.7-4.2 2.7-2.8 0-4.3-.9-4.5-2.5 0-.4.3-.7.7-.7.4 0 .6.2.7.5.2.9 1.1 1.3 3 1.3 1.9 0 2.8-.4 2.8-1.2 0-.5-.3-.8-1.5-.9l-1.7-.2c-2.3-.3-3.3-1.1-3.3-2.4 0-1.6 1.5-2.6 4-2.6z"/></svg>`;
const svgPg = `<svg viewBox="0 0 24 24" fill="currentColor"><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></svg>`;
const svgTw = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 5c-3 0-4.5 1.5-5 4 1-1.5 2.2-2 3.7-1.5 1 .4 1.5 1 2.3 1.7C14 10 15.5 11 18 11c3 0 4.5-1.5 5-4-1 1.5-2.2 2-3.7 1.5-1-.4-1.5-1-2.3-1.7C16 5.5 14.5 5 12 5zM7 13c-3 0-4.5 1.5-5 4 1-1.5 2.2-2 3.7-1.5 1 .4 1.5 1 2.3 1.7C9 18 10.5 19 13 19c3 0 4.5-1.5 5-4-1 1.5-2.2 2-3.7 1.5-1-.4-1.5-1-2.3-1.7C11 13.5 9.5 13 7 13z"/></svg>`;
const svgDocker = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 11h3v3H2v-3zm4 0h3v3H6v-3zm4 0h3v3h-3v-3zm4 0h3v3h-3v-3zm-8-4h3v3H6V7zm4 0h3v3h-3V7zm4 0h3v3h-3V7zm-4-4h3v3h-3V3zm10 8c-.6 0-1.4.1-2 .3-.1-1-.7-1.8-1.6-2.4l-.5-.3-.3.5c-.5.8-.7 1.8-.5 2.7.1.4.3.8.6 1.2-.7.4-1.9.4-2.2.4H1.6l-.1.6c-.2 1.2 0 2.7.7 3.8C3.1 19.5 4.7 20 6.7 20c4.4 0 7.6-2 9.2-5.6 1.2 0 2.7-.5 3.4-1.2l.4-.5-.5-.3c-.4-.2-.9-.4-1.4-.5z"/></svg>`;
const svgGit = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.4 11.2 12.8 1.6c-.5-.6-1.5-.6-2 0L8.7 3.7l2.6 2.6c.6-.2 1.2-.1 1.7.4.5.5.7 1.2.4 1.8l2.5 2.5c.6-.2 1.3-.1 1.8.4.7.7.7 1.9 0 2.6-.7.7-1.9.7-2.6 0-.5-.5-.7-1.2-.4-1.9L11.9 9.7v6.3c.2.1.4.2.5.3.7.7.7 1.9 0 2.6-.7.7-1.9.7-2.6 0-.7-.7-.7-1.9 0-2.6.2-.2.4-.3.6-.4V9.5c-.2-.1-.4-.2-.6-.4-.5-.5-.6-1.3-.4-1.9l-2.6-2.6L1.6 11C1 11.6 1 12.6 1.6 13.2l9.6 9.6c.6.6 1.5.6 2 0l9.2-9.2c.6-.5.6-1.5 0-2.4z"/></svg>`;
const svgPython = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8 2 8 4 8 4v3h4v1H4s-2 .3-2 4 2 4 2 4h2v-2.5C6 11 8 11 8 11h6s4 0 4-4V4s0-2-4-2h-2zm-2 2c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm8 7v2.5c0 2.5-2 2.5-2 2.5h-6s-4 0-4 4v3s0 2 4 2h2c4 0 4-2 4-2v-3h-4v-1h8s2-.3 2-4-2-4-2-4h-2zm-4 9c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z"/></svg>`;
const svgRedis = `<svg viewBox="0 0 24 24" fill="currentColor"><ellipse cx="12" cy="5" rx="10" ry="3"/><path d="M2 9c0 1.7 4.5 3 10 3s10-1.3 10-3M2 13c0 1.7 4.5 3 10 3s10-1.3 10-3M2 17c0 1.7 4.5 3 10 3s10-1.3 10-3"/></svg>`;
const svgVitest = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 2 7l10 5 10-5-10-5zm-7.5 7L12 13l7.5-4M2 11l10 5 10-5M2 15l10 5 10-5"/></svg>`;

const techPills: TechPill[] = [
  { name: "TypeScript", svg: svgTs },
  { name: "Vue", svg: svgVue },
  { name: "Nuxt", svg: svgNuxt },
  { name: "React", svg: svgReact },
  { name: "Node.js", svg: svgNode },
  { name: "Postgres", svg: svgPg },
  { name: "Tailwind", svg: svgTw },
  { name: "Docker", svg: svgDocker },
  { name: "Git", svg: svgGit },
  { name: "Python", svg: svgPython },
  { name: "Redis", svg: svgRedis },
  { name: "Vitest", svg: svgVitest },
];

// ──────────────────────────────────────────────────────────────────────────────
// Opening hook
// ──────────────────────────────────────────────────────────────────────────────

const openingHookParts: ProsePart[] = [
  { text: "Most freelance sites talk about" },
  { text: "synergy", emphasis: "muted" },
  { text: "and" },
  { text: "passion", emphasis: "muted" },
  { text: "." },
  { text: "I'd rather show you what I" },
  { text: "actually ship", emphasis: "highlight" },
  { text: "— small teams, real deadlines, software that holds up after launch." },
  { text: "If that sounds boring, good. Boring is" },
  { text: "predictable", emphasis: "accent" },
  { text: ", and predictable is how things get done." },
];

// ──────────────────────────────────────────────────────────────────────────────
// Featured posts
// ──────────────────────────────────────────────────────────────────────────────

const postsHeader: SectionHeaderContent = {
  eyebrow: "/ writing",
  eyebrowTone: "orange",
  title: `Notes from <span class="text-brand-orange">the workbench.</span>`,
  description: "Short essays on shipping software solo, design trade-offs, and the boring tools I keep coming back to.",
};

const postsSeeAll: NavLink = {
  label: "All posts",
  href: "/blog",
};

const posts: Post[] = [
  {
    tag: "Process",
    date: "May 12, 2026",
    readTime: "6 min read",
    title: "The 6-week MVP is a feature, not a bug",
    excerpt:
      "Why I default to short, fixed-scope sprints and what I leave out on purpose. Spoiler: it's the settings page.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80",
  },
  {
    tag: "Postgres",
    date: "Apr 28, 2026",
    readTime: "9 min read",
    title: "JSONB is fine, until it isn't",
    excerpt:
      "A walk through three projects where JSONB earned its keep — and one where it became the source of every Sunday-night page.",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=900&q=80",
  },
  {
    tag: "Nuxt",
    date: "Apr 9, 2026",
    readTime: "5 min read",
    title: "Server routes vs. Nitro tasks — when to reach for which",
    excerpt:
      "Quick decision tree I use on every Nuxt project. Includes the part where I admit I got it wrong twice.",
    image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&w=900&q=80",
  },
  {
    tag: "Freelance",
    date: "Mar 22, 2026",
    readTime: "8 min read",
    title: "Pricing a fixed-scope project without losing your shirt",
    excerpt:
      "My five-step pricing worksheet, the contract clause that saves the day, and the project that taught me both.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80",
  },
  {
    tag: "Testing",
    date: "Mar 3, 2026",
    readTime: "7 min read",
    title: "Coverage isn't the goal. Confidence is.",
    excerpt:
      "Where I spend my testing budget on a solo project, and the three places I refuse to skip — even on a one-week sprint.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80",
  },
  {
    tag: "Accessibility",
    date: "Feb 14, 2026",
    readTime: "4 min read",
    title: "The cheapest a11y wins on a Nuxt site",
    excerpt:
      "Five things I do on every project that take an hour total and clear most automated audits. None of them are heroic.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80",
  },
];

// ──────────────────────────────────────────────────────────────────────────────
// Work cycle (6 panels, wheel)
// ──────────────────────────────────────────────────────────────────────────────

const cycleHeader: SectionHeaderContent = {
  eyebrow: "/ the cycle",
  eyebrowTone: "orange",
  title: `One <span class="text-brand-orange">spin</span> of the wheel.`,
  description:
    "The same six phases, viewed as a loop. Each engagement is one rotation — sometimes followed by another.",
};

const cyclePanels: WorkCyclePanel[] = [
  {
    num: "01",
    subtitle: "Discover",
    tone: "purple",
    tag: "Week 0",
    title: "Ask the questions before they cost money.",
    body: `Two founder calls, three user conversations, one written risk register. The goal isn't to look smart — it's to <em class="text-brand-purple not-italic font-semibold">surface assumptions</em> while they're still cheap to change.`,
    cards: [
      { label: "deliverable", text: "One-page brief + risk register." },
      { label: "time", text: "3–5 days, mostly listening." },
      { label: "your job", text: "Block 2 hours for the deep-dive call." },
      { label: "my job", text: "Synthesize and push back where it counts." },
    ],
  },
  {
    num: "02",
    subtitle: "Shape",
    tone: "green",
    tag: "Week 1",
    title: "Argue on paper, not in production.",
    body: `Ten Figma screens with annotated trade-offs. A signed scope letter. One half-day tech spike on the riskiest unknown. By Friday we both know what's <em class="text-brand-green not-italic font-semibold">in v1</em> and what isn't.`,
    cards: [
      { label: "deliverable", text: "Figma flow + signed scope letter." },
      { label: "time", text: "4–6 days." },
      { label: "your job", text: "Sign or push back on the scope letter." },
      { label: "my job", text: "Cost out the deferred features." },
    ],
  },
  {
    num: "03",
    subtitle: "Build",
    tone: "orange",
    tag: "Weeks 2–5",
    title: "Code in your repo. Demo on Fridays.",
    body: `Atomic commits in conventional format. A live Linear backlog. Every Friday: a deployed preview link, a 5-minute Loom, and the <em class="text-brand-orange not-italic font-semibold">three questions</em> I need an answer to by Monday.`,
    cards: [
      { label: "deliverable", text: "Weekly preview + Loom walkthrough." },
      { label: "time", text: "~4 weeks, ~80% of the timeline." },
      { label: "your job", text: "Watch the Loom. Answer 3 questions." },
      { label: "my job", text: "Ship a working slice every week." },
    ],
  },
  {
    num: "04",
    subtitle: "Polish",
    tone: "purple",
    tag: "Week 5",
    title: "Loading, empty, error, edge.",
    body: `The week that turns a demo into a product. Every screen gets a real empty state. axe-core runs in CI. Performance budget verified on a throttled connection. <em class="text-brand-purple not-italic font-semibold">No raw stack traces</em> in production.`,
    cards: [
      { label: "deliverable", text: "A11y + perf report." },
      { label: "time", text: "4–5 days." },
      { label: "your job", text: "QA your top 5 user flows." },
      { label: "my job", text: "Fix everything you find by Friday." },
    ],
  },
  {
    num: "05",
    subtitle: "Ship",
    tone: "green",
    tag: "Week 6",
    title: "Cut over, with the rollback rehearsed.",
    body: `We deploy to prod, then practice the rollback. If the drill fails, we don't launch that day. 23-item launch checklist. Sentry and BetterStack wired before the <em class="text-brand-green not-italic font-semibold">first real user</em> shows up.`,
    cards: [
      { label: "deliverable", text: "Live product + runbook." },
      { label: "time", text: "2–3 days." },
      { label: "your job", text: "Be on the launch call." },
      { label: "my job", text: "Watch the dashboards for 4 hours." },
    ],
  },
  {
    num: "06",
    subtitle: "Tune",
    tone: "orange",
    tag: "Weeks 7+",
    title: "Two weeks of post-launch on the house.",
    body: `Real users do things you didn't think of. I check Sentry every morning, hotfix what's urgent, and we do a <em class="text-brand-orange not-italic font-semibold">week-two retro</em> on what to keep, cut, or build next.`,
    cards: [
      { label: "deliverable", text: "Retro doc + phase-2 quote." },
      { label: "time", text: "2 weeks included, more priced separately." },
      { label: "your job", text: "Forward bug reports." },
      { label: "my job", text: "Triage daily, retro by week two." },
    ],
  },
];

const cycleCta: NavLink = {
  label: "Start the cycle",
  href: "#talk",
};

const cycleHint = "click a node to jump phases — or spin the wheel";

// ──────────────────────────────────────────────────────────────────────────────
// LinkedIn peer recommendations
// ──────────────────────────────────────────────────────────────────────────────

const recsHeader: SectionHeaderContent = {
  eyebrow: "/ peer recs",
  eyebrowTone: "green",
  title: `What people who've <span class="text-brand-green">shipped with me</span> say.`,
  description:
    "Pulled from LinkedIn recommendations — the long-form kind, not the one-line endorsements.",
};

const recAvatar1 =
  "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80";
const recAvatar2 =
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80";
const recAvatar3 =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80";
const recAvatar4 =
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80";
const recAvatar5 =
  "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80";
const recAvatar6 =
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80";
const recAvatar7 =
  "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80";

const recs: Rec[] = [
  {
    name: "Priya Shah",
    role: "Head of Product, Atlas",
    meta: "worked together · 2025–2026",
    avatar: recAvatar1,
    ringTone: "purple",
    quote: `Alex is the rare engineer who'll <em class="not-italic text-brand-purple font-semibold">push back on a feature</em> the week before launch — and be right about it. Saved us three months of post-launch debt.`,
  },
  {
    name: "David Ng",
    role: "Engineering Lead, Loom & Order",
    meta: "worked together · 2025",
    avatar: recAvatar2,
    ringTone: "green",
    quote: `I inherited Alex's codebase six months after he left. The README was actually accurate. <em class="not-italic text-brand-green font-semibold">First time in my career.</em>`,
  },
  {
    name: "Aisha Mohammed",
    role: "Founder, Permit.now",
    meta: "worked together · 2024",
    avatar: recAvatar3,
    ringTone: "orange",
    quote: `We hired Alex to ship one form. He shipped a form-engine the council <em class="not-italic text-brand-orange font-semibold">open-sourced for the whole country.</em> Same budget.`,
  },
  {
    name: "Ben Carter",
    role: "Designer, Sift Community",
    meta: "worked together · 2025",
    avatar: recAvatar4,
    ringTone: "purple",
    quote: `Most developers treat design specs as suggestions. Alex treats them as the contract. The implementation looked <em class="not-italic text-brand-purple font-semibold">better than my Figma file.</em>`,
  },
  {
    name: "Lina Chen",
    role: "CTO, Stripe Atlas portfolio",
    meta: "advised me · 2024",
    avatar: recAvatar5,
    ringTone: "green",
    quote: `Alex did a 2-hour architecture review on our payments service and found three bugs the team had been chasing for weeks. He <em class="not-italic text-brand-green font-semibold">wouldn't take the consulting fee</em> — said it was too easy.`,
  },
  {
    name: "Marcus Lee",
    role: "Founder, indie-SaaS",
    meta: "client · 2023",
    avatar: recAvatar6,
    ringTone: "orange",
    quote: `Hired Alex to unblock a stuck launch. He shipped in 3 weeks what we'd budgeted 10 for. Still <em class="not-italic text-brand-orange font-semibold">the best money I've spent</em> on this business.`,
  },
  {
    name: "Sofia Ruiz",
    role: "Product Lead, ex-Stripe",
    meta: "collaborated · 2024",
    avatar: recAvatar7,
    ringTone: "purple",
    quote: `Sharp technical mind, calm under pressure, and writes the clearest pull-request descriptions I've ever read. I'd <em class="not-italic text-brand-purple font-semibold">put him on any team</em> tomorrow.`,
  },
];

const recsSummary: RecsSummary = {
  count: 23,
  label: "recommendations on LinkedIn",
  avatars: [recAvatar1, recAvatar2, recAvatar3, recAvatar4, recAvatar5, recAvatar6, recAvatar7],
  cta: {
    label: "See them all",
    href: "https://linkedin.com/in/alex-rivera-dev",
    external: true,
  },
};

// ──────────────────────────────────────────────────────────────────────────────
// LinkedIn profile CTA card
// ──────────────────────────────────────────────────────────────────────────────

const linkedInCta = {
  eyebrow: { label: "On LinkedIn", tone: "purple" as const } satisfies BadgeContent,
  headline: `Let's connect <span class="text-brand-purple">over there too.</span>`,
  body: "Most of my long-form notes go to the blog, but if you want quick takes on shipping, freelance pricing, or boring infrastructure — that's where I post.",
  primaryCta: {
    label: "Connect on LinkedIn",
    href: "https://linkedin.com/in/alex-rivera-dev",
    external: true,
  } as Cta,
  secondaryLink: { label: "Read.cv profile", href: "https://read.cv/alex.rivera" } satisfies NavLink,
  stats: [
    { value: "4.8k", label: "followers", tone: "purple" },
    { value: "23", label: "recommendations", tone: "orange" },
    { value: "open", label: "to chats", tone: "green" },
  ] satisfies StatItem[],
  card: {
    name: "Alex Rivera",
    headline: "Freelance Full Stack Developer",
    subline: "Lisbon · Open to remote",
    avatar:
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=facearea&facepad=2&w=200&h=200&q=80",
  } satisfies LinkedInCard,
  cardCallout: "open to chats",
};

// ──────────────────────────────────────────────────────────────────────────────
// Book-a-talk form
// ──────────────────────────────────────────────────────────────────────────────

const bookTalkHeader: SectionHeaderContent = {
  eyebrow: "/ let's talk",
  eyebrowTone: "purple",
  title: `Tell me about your <span class="text-brand-purple">half-built idea.</span>`,
  description:
    "30-minute discovery call. No deck, no pitch — just a real conversation about what you're trying to ship.",
};

const bookTalkBullets: BookTalkBullet[] = [
  { text: "Reply within 1 business day.", tone: "green" },
  { text: "I'll tell you if I'm the wrong fit. Honestly.", tone: "purple" },
  { text: "No NDA needed for the first call.", tone: "orange" },
];

const bookTalkFields: FormField[] = [
  {
    id: "name",
    label: "Your name",
    type: "text",
    placeholder: "Jordan Park",
    required: true,
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "you@company.com",
    required: true,
  },
  {
    id: "idea",
    label: "The idea",
    hint: "— 2–3 sentences is plenty",
    type: "textarea",
    placeholder: "We're a 3-person team building X for Y. We need help with Z by date W.",
    required: true,
    rows: 5,
  },
];

const bookTalkFallback = {
  prefix: "Prefer email?",
  link: { label: "alex@rivera.dev", href: "mailto:alex@rivera.dev" } satisfies NavLink,
};

// ──────────────────────────────────────────────────────────────────────────────
// FAQ
// ──────────────────────────────────────────────────────────────────────────────

const faqHeader: SectionHeaderContent = {
  eyebrow: "/ common questions",
  eyebrowTone: "orange",
  title: `Probably <span class="text-brand-orange">what you're</span> wondering.`,
};

const faqs: Faq[] = [
  {
    q: "How are you priced?",
    a: "Fixed-scope, fixed-price. I quote in days after the discovery call — usually 4–8 weeks of work, between $18k and $48k all-in. Anything that changes scope mid-build is re-quoted in writing before we start it.",
  },
  {
    q: "Do you work with agencies or only direct?",
    a: "Both. With agencies I plug in as the lead developer on a single project; I won't be a long-term subcontractor or take work I can't sign with my own name on it.",
  },
  {
    q: "What if my project takes longer than 6 weeks?",
    a: "Most do — that's why the lifecycle is 6 phases, not 6 weeks total. Build is typically 4 weeks; the surrounding discovery, polish, ship, and tune phases add another 3–4. Larger engagements get broken into two or three back-to-back cycles.",
  },
  {
    q: "Will you sign an NDA?",
    a: "Yes, before the second call. The first call is just to make sure we're a fit, so I'd rather not paperwork-block that. If your lawyer requires one earlier, I'll sign a short mutual NDA — happy to send a template.",
  },
  {
    q: "Can you take over an existing codebase?",
    a: "Often, yes — I've inherited Vue, Nuxt, React, Next, and Node codebases. I start with a 2-day code review: what's healthy, what's risky, and what the minimum-cost path forward looks like. That review is a flat $1,800 and you keep the report whether we work together or not.",
  },
];

// ──────────────────────────────────────────────────────────────────────────────
// Footer
// ──────────────────────────────────────────────────────────────────────────────

const footerTagline =
  "Freelance full stack developer. Building calm, ship-on-time web products with founders and small teams since 2014.";

const footerAvailability: BadgeContent = {
  label: "Booking Q3 2026",
  tone: "green",
  dot: true,
};

const footerGroups: FooterGroup[] = [
  {
    eyebrow: "Site",
    links: [
      { label: "Posts", href: "#posts" },
      { label: "Cycle", href: "#cycle" },
      { label: "Recs", href: "#recs" },
      { label: "Talk", href: "#talk" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    eyebrow: "Elsewhere",
    links: [
      { label: "LinkedIn", href: "https://linkedin.com/in/alex-rivera-dev", external: true },
      { label: "GitHub", href: "https://github.com/alex-rivera", external: true },
      { label: "Read.cv", href: "https://read.cv/alex.rivera", external: true },
      { label: "Email", href: "mailto:alex@rivera.dev" },
    ],
  },
];

const footerLegal = "© 2026 Alex Rivera · Built with Nuxt, Tailwind, and care.";

const footerBackToTop: NavLink = {
  label: "Back to top",
  href: "#top",
};
</script>

<template>
  <div id="top">
    <WebLayoutSiteHeader :brand="brand" :nav="nav" :cta="headerCta" />
    <WebHeroMainHero v-bind="hero" />
    <WebTechStackOverview :pills="techPills" />
    <WebMiscOpeningHook :parts="openingHookParts" />
    <WebWorkFeaturedPosts
      :header="postsHeader"
      :posts="posts"
      :see-all="postsSeeAll"
      section-id="posts"
    />
    <WebProcessWorkCycle
      :header="cycleHeader"
      :panels="cyclePanels"
      :cta="cycleCta"
      :hint="cycleHint"
      section-id="cycle"
    />
    <WebLinkedinPeerRecs
      :header="recsHeader"
      :recs="recs"
      :summary="recsSummary"
      section-id="recs"
    />
    <WebLinkedinProfileCta v-bind="linkedInCta" />
    <WebMiscBookTalk
      :header="bookTalkHeader"
      :bullets="bookTalkBullets"
      :fields="bookTalkFields"
      :fallback="bookTalkFallback"
      section-id="talk"
    />
    <WebMiscCommonQuestions
      :header="faqHeader"
      :faqs="faqs"
      section-id="faq"
    />
    <WebLayoutSiteFooter
      :brand="brand"
      :tagline="footerTagline"
      :availability="footerAvailability"
      :groups="footerGroups"
      :legal="footerLegal"
      :back-to-top="footerBackToTop"
    />
    <WebMiscScrollToTop />
  </div>
</template>
