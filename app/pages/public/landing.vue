<script setup lang="ts">
import type {
  Brand,
  NavLink,
  Cta,
  HeroImage,
  HeroCodeSnippet,
  BadgeContent,
  FooterGroup,
  Tech,
  TechCategoryFilter,
  TechPill,
  ProsePart,
  SectionHeaderContent,
  Project,
  CaseStudySlide,
  Post,
  StatItem,
  ApproachStep,
  LifecycleStep,
  LifecyclePanel,
  LifecycleArtifact,
  WorkCyclePanel,
  Testimonial,
  WideTestimonial,
  Rec,
  RecsSummary,
  LinkedInCard,
  FormField,
  BookTalkBullet,
  Faq,
  ChatBot as ChatBotContent,
  ChatReply,
} from "~/components/web/types";

definePageMeta({ layout: false });

const defaultTheme: "light" | "dark" = "light";

useHead({
  htmlAttrs: {
    "data-default-theme": defaultTheme,
  },
  title: "Alex Rivera — Freelance Full Stack Developer",
  meta: [
    {
      name: "description",
      content:
        "I build web apps that actually ship on time. Freelance full stack developer helping founders turn ideas into shipped products.",
    },
  ],
  script: [
    {
      // Runs before paint to apply saved theme and avoid flash.
      // Falls back to the page-level default (data-default-theme) when no
      // user preference is stored — overrides the OS-level prefers-color-scheme.
      innerHTML: `(function(){var t=localStorage.getItem('theme');var d=document.documentElement.getAttribute('data-default-theme')||'light';var dark=t?t==='dark':d==='dark';document.documentElement.classList.toggle('dark',dark);})();`,
      tagPosition: "head",
    },
  ],
});

// ──────────────────────────────────────────────────────────────────────────────
// Batch 1 — Shell + hero (SiteHeader, MainHero, SiteFooter, ScrollToTop)
// ──────────────────────────────────────────────────────────────────────────────

const brand: Brand = {
  name: "alex",
  accent: ".dev",
  href: "#top",
};

const nav: NavLink[] = [
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Words", href: "#words" },
  { label: "Talk", href: "#talk" },
];

const headerCta: Cta = {
  label: "Book a talk",
  href: "#talk",
};

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
  { label: "See recent work", href: "#work", variant: "primary" },
  { label: "Read my approach", href: "#process", variant: "ghost" },
  { label: "alex@rivera.dev", href: "mailto:alex@rivera.dev", variant: "link" },
];

const hero = {
  availability: heroAvailability,
  headline: `Web apps that <span class="text-brand-purple">actually ship</span> <span class="italic font-light text-zinc-500">on time.</span>`,
  subheadline:
    "I'm Alex — a freelance full stack developer helping founders and small teams turn ideas into shipped products. No agency overhead. No vague timelines.",
  ctas: heroCtas,
  image: heroImage,
  imageClass: "w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal",
  codeSnippet: heroCodeSnippet,
  floatingBadge: "Shipping since 2014",
};

// ──────────────────────────────────────────────────────────────────────────────
// Batch 2 — Tech overview + grid + opening hook
// ──────────────────────────────────────────────────────────────────────────────

// Minimal monochrome SVG icons (currentColor) — kept short to stay readable.
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

const stackHeader: SectionHeaderContent = {
  eyebrow: "/ the stack",
  title: `Boring tech, <span class="text-brand-purple">sharp edges.</span>`,
};

const techCategories: TechCategoryFilter[] = [
  { id: "all", label: "All", tone: "neutral" },
  { id: "language", label: "Languages", tone: "purple" },
  { id: "framework", label: "Frameworks", tone: "purple" },
  { id: "backend", label: "Backend", tone: "green" },
  { id: "data", label: "Data", tone: "orange" },
  { id: "styling", label: "Styling", tone: "purple" },
  { id: "infra", label: "Infra", tone: "green" },
  { id: "tools", label: "Tools", tone: "orange" },
];

const techs: Tech[] = [
  { name: "TypeScript", svg: svgTs, category: "language", blurb: "Types as a design tool, not a tax.", years: 8 },
  { name: "Python", svg: svgPython, category: "language", blurb: "For scripts, data jobs, and the occasional ML helper.", years: 10 },
  { name: "Vue", svg: svgVue, category: "framework", blurb: "Composition API + SFCs. My default for product UI.", years: 6 },
  { name: "Nuxt", svg: svgNuxt, category: "framework", blurb: "SSR, routing, modules — batteries included.", years: 5 },
  { name: "React", svg: svgReact, category: "framework", blurb: "When the client already has it. No religion.", years: 9 },
  { name: "Node.js", svg: svgNode, category: "backend", blurb: "APIs, workers, glue. Fastify or Nitro most days.", years: 10 },
  { name: "Postgres", svg: svgPg, category: "data", blurb: "Relational by default. JSONB when it earns its keep.", years: 9 },
  { name: "Redis", svg: svgRedis, category: "data", blurb: "Cache, queues, rate limits. Boring on purpose.", years: 7 },
  { name: "Tailwind", svg: svgTw, category: "styling", blurb: "Design tokens that ship. Pairs with a real design system.", years: 5 },
  { name: "Docker", svg: svgDocker, category: "infra", blurb: "Repeatable local + prod. One Dockerfile to rule them.", years: 8 },
  { name: "Git", svg: svgGit, category: "tools", blurb: "Atomic commits, readable history, no force-push to main.", years: 12 },
  { name: "Vitest", svg: svgVitest, category: "tools", blurb: "Fast unit + component tests. Coverage where it matters.", years: 3 },
];

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
// Batch 3 — Work showcase (projects, case studies, posts)
// ──────────────────────────────────────────────────────────────────────────────

// Recent projects
const projectsHeader: SectionHeaderContent = {
  eyebrow: "/ recent work",
  eyebrowTone: "purple",
  title: `Shipped, not <span class="text-brand-purple">shelved.</span>`,
  description:
    "Four projects from the last 18 months. Each one launched, kept running, and is still in active use.",
};

const projectsSecondaryLink: NavLink = {
  label: "All case studies",
  href: "#caseStudies",
};

const projects: Project[] = [
  {
    number: "01",
    category: "SaaS · onboarding",
    categoryTone: "purple",
    title: "Atlas — invoice automation for solo accountants",
    description:
      "Took a spreadsheet workflow and turned it into a focused 3-screen SaaS. Stripe billing, magic-link auth, and a CSV import that handles the messy stuff.",
    bullets: [
      "Cut customer time-to-first-invoice from 3 days to 11 minutes.",
      "Background workers retry failed e-mail receipts with idempotency keys.",
      "Shipped MVP in 6 weeks, scaled to 400 paying users in 9 months.",
    ],
    cta: "Read the case study",
    meta: "Solo · 6 weeks",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    alt: "Atlas dashboard preview",
  },
  {
    number: "02",
    category: "Marketplace · payments",
    categoryTone: "green",
    title: "Loom & Order — booking platform for textile artisans",
    description:
      "Two-sided marketplace with escrow payments via Stripe Connect, calendar availability, and a review system that filters out the noise.",
    bullets: [
      "Nuxt + Postgres + Stripe Connect. SSR for SEO on artisan profiles.",
      "Disputed-payment flow with manual review queue (and Slack alerts).",
      "Live in 4 countries; 1.2k bookings in the first quarter.",
    ],
    cta: "See it live",
    meta: "Pair · 11 weeks",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=80",
    alt: "Loom & Order marketplace screenshot",
    reverse: true,
  },
  {
    number: "03",
    category: "Internal tools · ops",
    categoryTone: "orange",
    title: "Sift — moderation queue for a community of 80k",
    description:
      "Replaced a Notion-based moderation flow with a real queue. Keyboard-first, audited, with a fairness scoring layer that flags hot streaks.",
    bullets: [
      "Reduced average ticket resolution time from 14h to 38min.",
      "Per-moderator audit log; rolling 30-day fairness report for the lead.",
      "Bring-your-own SSO (Google + GitHub) — no new password to remember.",
    ],
    cta: "Read the writeup",
    meta: "Solo · 4 weeks",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    alt: "Sift moderation queue UI",
  },
  {
    number: "04",
    category: "Public sector · forms",
    categoryTone: "purple",
    title: "Permit.now — a government form that doesn't make you cry",
    description:
      "Worked with a small council to rebuild their building-permit application. Auto-save, plain-language hints, and accessibility audited to WCAG AA.",
    bullets: [
      "78% of applicants completed in one session (was 31%).",
      "All 47 fields validated server-side with structured error messages.",
      "Open-sourced the form-engine — adopted by 3 other councils.",
    ],
    cta: "See the open-source repo",
    meta: "Team of 3 · 14 weeks",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
    alt: "Permit.now form interface",
    reverse: true,
  },
];

// Case studies
const caseStudiesHeader: SectionHeaderContent = {
  eyebrow: "/ deep dives",
  eyebrowTone: "green",
  title: `How the <span class="text-brand-green">sausage</span> gets made.`,
};

const caseStudiesDescription =
  "Pick one. You'll get the actual problem, the trade-offs I weighed, what I shipped first, and what I'd do differently next time.";

const csStatsAtlas: StatItem[] = [
  { value: "11min", label: "time to first invoice", tone: "purple" },
  { value: "6w", label: "to MVP", tone: "green" },
  { value: "400", label: "paying users", tone: "orange" },
];

const csStatsLoom: StatItem[] = [
  { value: "1.2k", label: "bookings Q1", tone: "purple" },
  { value: "4", label: "countries live", tone: "green" },
  { value: "11w", label: "build duration", tone: "orange" },
];

const csStatsSift: StatItem[] = [
  { value: "38min", label: "avg resolution", tone: "purple" },
  { value: "22×", label: "faster than before", tone: "green" },
  { value: "0", label: "lost audit trails", tone: "orange" },
];

const csStatsPermit: StatItem[] = [
  { value: "78%", label: "one-session completion", tone: "purple" },
  { value: "WCAG AA", label: "accessibility audit", tone: "green" },
  { value: "3", label: "councils adopted", tone: "orange" },
];

const caseStudies: CaseStudySlide[] = [
  {
    title: "Atlas — invoice automation",
    tag: "SaaS · 2026",
    status: "Live",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    alt: "Atlas dashboard",
    stats: csStatsAtlas,
    stack: ["Nuxt 3", "TypeScript", "Postgres", "Stripe", "Tailwind", "Fly.io"],
    problemTitle: "Solo accountants were losing a day a week to invoicing.",
    problemBody:
      "Their existing tools assumed an agency-sized team. We needed something a single accountant could open on Monday morning and not hate by Friday.",
    steps: [
      { num: "01", title: "Two-week discovery", body: "Shadowed 5 accountants. Found 11 manual steps that could collapse into 2." },
      { num: "02", title: "Vertical slice MVP", body: "One workflow — invoice → email → reconcile. Stripe + Postmark. No settings page yet." },
      { num: "03", title: "Ship, then widen", body: "Added bulk import once 30 users were paying. Built what they asked for, not what I assumed." },
    ],
    result:
      "Live for 9 months. 400 paying users, 92% MoM retention, and the founder finally took a real holiday.",
    primaryCta: "Read the long version",
  },
  {
    title: "Loom & Order — artisan marketplace",
    tag: "Marketplace · 2025",
    status: "Live",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=80",
    alt: "Loom & Order screenshot",
    stats: csStatsLoom,
    stack: ["Nuxt 3", "Stripe Connect", "Postgres", "Redis", "Cloudflare", "Sentry"],
    problemTitle: "Artisans wanted bookings; buyers wanted trust.",
    problemBody:
      "Existing marketplaces took 20%+ and hid the artisan behind a brand. We needed escrow without the friction of a heavy platform.",
    steps: [
      { num: "01", title: "Trust pillars first", body: "Verified profiles, escrowed payments, reviews tied to confirmed bookings. No fake-listing problem on day one." },
      { num: "02", title: "Calendar-first UX", body: "Availability was the killer feature. Built a custom calendar component over react-big-calendar's gaps." },
      { num: "03", title: "Disputes you can stomach", body: "Slack-piped dispute queue. Average resolution in under 24h with full audit log." },
    ],
    result:
      "1,200+ bookings in the first quarter, ~$160k GMV, and an 8% take rate the artisans actually agreed to.",
    primaryCta: "Read the deep dive",
  },
  {
    title: "Sift — moderation queue",
    tag: "Internal tool · 2025",
    status: "Live",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    alt: "Sift moderation UI",
    stats: csStatsSift,
    stack: ["Vue 3", "Fastify", "Postgres", "Redis", "Auth.js", "Playwright"],
    problemTitle: "A community of 80k couldn't be moderated from a Notion table.",
    problemBody:
      "Tickets piled up overnight. The lead moderator was burning out reviewing the same edge cases ten times in different threads.",
    steps: [
      { num: "01", title: "Find the steady state", body: "Logged 2 weeks of actual mod work. 70% of tickets were 3 archetypes — built shortcuts for those first." },
      { num: "02", title: "Keyboard-first UI", body: "Every action is one keystroke. J/K to scroll, A to approve, R to reject with template, S to escalate." },
      { num: "03", title: "Fairness layer", body: "Tracked moderator decisions over time. Flags hot streaks (good or bad) for review by the lead, not for punishment." },
    ],
    result:
      "Resolution time went from 14 hours to 38 minutes. The lead moderator is still in the role 11 months later.",
    primaryCta: "See the moderation patterns",
  },
  {
    title: "Permit.now — government forms",
    tag: "Public sector · 2024",
    status: "Live",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
    alt: "Permit.now form",
    stats: csStatsPermit,
    stack: ["Nuxt 3", "TypeScript", "Postgres", "Pino", "axe-core", "Docker"],
    problemTitle: "47 fields, 6 PDFs, 31% completion rate.",
    problemBody:
      "The council's existing form failed accessibility audits and made residents print, sign, and re-upload pages. Mobile completion was essentially zero.",
    steps: [
      { num: "01", title: "Plain-language pass", body: "Reading level dropped from 14th grade to 8th. Hover-hints written by an actual building inspector." },
      { num: "02", title: "Auto-save on every blur", body: "No more lost progress. Server-side draft store keyed by anonymous session + email recovery." },
      { num: "03", title: "Open-source the engine", body: "Other councils kept asking. Extracted the form-engine into a reusable module under an MIT licence." },
    ],
    result:
      "78% one-session completion. WCAG AA verified. Three other councils have adopted the open-source engine.",
    primaryCta: "See the open-source engine",
  },
];

// Featured posts
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
// Batch 4 — Process (work approach, project lifecycle, work cycle)
// ──────────────────────────────────────────────────────────────────────────────

// Work approach (3 cards)
const approachHeader: SectionHeaderContent = {
  eyebrow: "/ how I work",
  eyebrowTone: "purple",
  title: `Three rules. No <span class="text-brand-purple">surprises.</span>`,
  description:
    "I'd rather under-promise and over-deliver. These three principles are how I keep that promise on every engagement.",
};

const approachSteps: ApproachStep[] = [
  {
    num: "01",
    tone: "purple",
    title: "Fixed scope. Fixed price.",
    body: "We agree on what ships before a single line of code. If scope changes, we re-quote — never silently. You always know what the next invoice looks like.",
  },
  {
    num: "02",
    tone: "green",
    title: "Weekly demos, not status reports.",
    body: "Every Friday you see a working build, not a slide deck. Bugs come out early, opinions land before they get expensive, and momentum stays visible.",
  },
  {
    num: "03",
    tone: "orange",
    title: "You own everything.",
    body: "Code, infrastructure, accounts, documentation — all yours from day one. I work in your repo, on your cloud, with a clean handoff plan from week one.",
  },
];

// Project lifecycle (6 phases)
const lifecycleHeader: SectionHeaderContent = {
  eyebrow: "/ the lifecycle",
  eyebrowTone: "green",
  title: `Six phases, <span class="text-brand-green">none of them</span> are "let's circle back."`,
  description:
    "From the first call to the post-launch tune-up. Click any phase to see what actually happens that week.",
};

const lifecycleSteps: LifecycleStep[] = [
  { num: "01", label: "Discover" },
  { num: "02", label: "Shape" },
  { num: "03", label: "Build" },
  { num: "04", label: "Polish" },
  { num: "05", label: "Ship" },
  { num: "06", label: "Tune" },
];

const lifecyclePanels: LifecyclePanel[] = [
  {
    num: "01",
    tone: "purple",
    duration: "Week 0 · 3–5 days",
    title: "Discover what's actually being built.",
    body: "I spend the first few days asking dumb questions. The goal is to surface the assumptions hiding in your brief — before they become 'wait, we thought you meant…' in week 5.",
    bullets: [
      { label: "Founder interview.", text: "Two 60-minute calls. Recorded, transcribed, and turned into a one-pager I send back for sign-off." },
      { label: "User research lite.", text: "3–5 conversations with real users (yours, or 5 I find on usertesting.com if you don't have any yet)." },
      { label: "Risk register.", text: "A ranked list of the three things most likely to derail the project — and how we'd notice early." },
    ],
  },
  {
    num: "02",
    tone: "green",
    duration: "Week 1 · 4–6 days",
    title: "Shape the smallest version that's still worth shipping.",
    body: "I sketch the product as a 10-screen Figma flow with annotated trade-offs. Nothing pixel-perfect — the goal is to argue on paper before arguing in code.",
    bullets: [
      { label: "Vertical slice.", text: "One end-to-end happy path picked. Settings, edge cases, and admin tooling deferred on purpose." },
      { label: "Tech spike.", text: "Half a day on any unknown — usually a payment provider quirk or a third-party API limit." },
      { label: "Scope letter.", text: "A signed one-page letter that lists what's in v1, what's not, and what the price is to add it later." },
    ],
  },
  {
    num: "03",
    tone: "orange",
    duration: "Weeks 2–5 · ~4 weeks",
    title: "Build the slice. Show it on Friday.",
    body: "Code goes into your repo from day one. Every Friday I push a deployed preview link and a 5-minute Loom walking through what's new and what's left.",
    bullets: [
      { label: "Daily commits.", text: "Atomic, conventional commits. The history reads like a changelog because it is one." },
      { label: "Friday demo.", text: "Working build, Loom recording, and the 3 questions I need your answer on by Monday." },
      { label: "Live backlog.", text: "Linear board you can see, with every ticket priced in days. No 'sometime later' status." },
    ],
  },
  {
    num: "04",
    tone: "purple",
    duration: "Week 5 · 4–5 days",
    title: "Polish the rough edges that survived the build.",
    body: "Loading states, empty states, error states, the long tail of small UX papercuts. This week is what separates 'looks like a demo' from 'feels like a product.'",
    bullets: [
      { label: "Empty + error pass.", text: "Every screen gets a proper empty state and a friendly error fallback. No raw stack traces in production." },
      { label: "Performance budget.", text: "LCP under 2s on a throttled connection. JS bundle under 200KB compressed, or I tell you why we made an exception." },
      { label: "Accessibility audit.", text: "axe-core in CI plus a manual keyboard-only sweep. Logged as a report, not a vague 'looks fine.'" },
    ],
  },
  {
    num: "05",
    tone: "green",
    duration: "Week 6 · 2–3 days",
    title: "Ship behind a flag, then turn the lights on.",
    body: "Production deploy, observability wired, runbook written. We don't 'launch' — we cut over with the rollback rehearsed and a real human watching the dashboards.",
    bullets: [
      { label: "Deploy + rollback drill.", text: "We deploy to prod, then practice rolling back. If the drill fails, we don't launch that day." },
      { label: "Observability.", text: "Sentry for errors, Logflare or BetterStack for logs, Vercel/Fly metrics dashboards bookmarked." },
      { label: "Launch checklist.", text: "DNS, SSL, SEO, Open Graph, analytics, status page. 23 items, signed off line by line." },
    ],
  },
  {
    num: "06",
    tone: "orange",
    duration: "Weeks 7+ · ongoing",
    title: "Tune what reality teaches us.",
    body: "Two weeks of post-launch support is included by default. Real users do things you didn't think of, and that's where the second-best ideas come from.",
    bullets: [
      { label: "Daily triage.", text: "I check Sentry and your support inbox every morning. Hotfixes go out same-day, behind a flag if risky." },
      { label: "Week-two retro.", text: "60-minute call. What we learned, what we'd cut, what's worth a second phase." },
      { label: "Clean handoff.", text: "Architecture overview, runbook, on-call cheatsheet. Your next engineer should onboard in one afternoon." },
    ],
  },
];

const lifecycleArtifacts: LifecycleArtifact[] = [
  {
    filename: "01-discover/risk-register.md",
    html: `<span class="text-zinc-500"># Risk register — Atlas v1</span>

<span class="text-brand-purple">## High</span>
- <span class="text-zinc-300">Stripe Connect onboarding can take 7–14 days</span>
  <span class="text-zinc-500">mitigation: start in week 1, not week 5</span>
- <span class="text-zinc-300">CSV import — every accountant has a different format</span>
  <span class="text-zinc-500">mitigation: ship 3 presets, then add a custom mapper</span>

<span class="text-brand-green">## Medium</span>
- <span class="text-zinc-300">Email deliverability for invoice receipts</span>
  <span class="text-zinc-500">mitigation: Postmark + DMARC from day one</span>`,
  },
  {
    filename: "02-shape/scope-letter.md",
    html: `<span class="text-zinc-500"># Scope letter — signed 2026-03-11</span>

<span class="text-brand-green">## In scope (v1)</span>
- <span class="text-zinc-300">Create + send invoices</span>
- <span class="text-zinc-300">Stripe payment links</span>
- <span class="text-zinc-300">CSV import (3 presets)</span>
- <span class="text-zinc-300">Email receipts via Postmark</span>

<span class="text-brand-orange">## Deferred to v2 (priced)</span>
- <span class="text-zinc-500">Recurring invoices — $4,200</span>
- <span class="text-zinc-500">Team seats — $6,800</span>
- <span class="text-zinc-500">Quickbooks export — $2,400</span>`,
  },
  {
    filename: "03-build/friday-demo-3.md",
    html: `<span class="text-zinc-500"># Friday demo — week 3</span>

<span class="text-brand-purple">## Shipped this week</span>
- <span class="text-zinc-300">Stripe payment links live on staging</span>
- <span class="text-zinc-300">Invoice list + filters</span>
- <span class="text-zinc-300">CSV preset for Xero</span>

<span class="text-brand-orange">## Need your call on Monday</span>
1. <span class="text-zinc-300">Send-from email — alex@? or noreply@?</span>
2. <span class="text-zinc-300">Late-fee copy: friendly or formal?</span>
3. <span class="text-zinc-300">Logo on the PDF — top-left or centered?</span>

<span class="text-brand-green">## Preview</span>
<span class="text-zinc-500">https://atlas-pr-47.preview.app</span>`,
  },
  {
    filename: "04-polish/a11y-report.md",
    html: `<span class="text-zinc-500"># Accessibility report — week 5</span>

<span class="text-brand-purple">## axe-core (CI)</span>
- <span class="text-brand-green">0 critical</span>
- <span class="text-brand-green">0 serious</span>
- <span class="text-zinc-300">3 moderate (color contrast on muted text)</span>

<span class="text-brand-purple">## Manual keyboard sweep</span>
- <span class="text-zinc-300">All forms reachable + submittable</span>
- <span class="text-zinc-300">Modal focus trap verified</span>
- <span class="text-brand-orange">Fixed: invoice-list row not focusable</span>

<span class="text-brand-purple">## LCP / JS budget</span>
- <span class="text-zinc-300">LCP: 1.4s (target 2.0s) ✓</span>
- <span class="text-zinc-300">JS gz: 162KB (target 200KB) ✓</span>`,
  },
  {
    filename: "05-ship/launch-checklist.md",
    html: `<span class="text-zinc-500"># Launch checklist — 2026-04-22</span>

<span class="text-brand-green">## Pre-flight ✓</span>
- <span class="text-zinc-300">DNS → Fly.io, TTL 60</span>
- <span class="text-zinc-300">SSL via Let's Encrypt</span>
- <span class="text-zinc-300">Sentry + BetterStack alerts</span>
- <span class="text-zinc-300">Stripe webhooks live + signed</span>

<span class="text-brand-purple">## Rollback drill ✓</span>
- <span class="text-zinc-300">Deployed to prod, then rolled back</span>
- <span class="text-zinc-300">Recovery time: 38s</span>

<span class="text-brand-orange">## Status</span>
<span class="text-brand-green">→ go for launch at 10:00 local</span>`,
  },
  {
    filename: "06-tune/week-two-retro.md",
    html: `<span class="text-zinc-500"># Week-two retro — 2026-05-06</span>

<span class="text-brand-purple">## What worked</span>
- <span class="text-zinc-300">Friday demos kept scope honest</span>
- <span class="text-zinc-300">CSV presets covered 80% of imports</span>

<span class="text-brand-orange">## What I'd cut</span>
- <span class="text-zinc-300">The "tags" feature — used by 4 of 400 users</span>

<span class="text-brand-green">## Phase 2 candidates</span>
- <span class="text-zinc-300">Recurring invoices (top 1 request)</span>
- <span class="text-zinc-300">Quickbooks export (top 3 request)</span>
- <span class="text-zinc-500">Team seats — waitlist building</span>`,
  },
];

const lifecycleStats: StatItem[] = [
  { value: "6w", label: "typical timeline", tone: "purple" },
  { value: "1×/wk", label: "demo cadence", tone: "green" },
  { value: "100%", label: "code you own", tone: "orange" },
];

const lifecycleFooter = {
  title: "Want this lifecycle on your next project?",
  subtitle: "Six-week slots open Q3 2026. Two left.",
  cta: { label: "Book a discovery call", href: "#talk" } as Cta,
};

// Work cycle (6 panels, wheel)
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
// Batch 5 — Social proof + contact (testimonials, peer recs, LinkedIn CTA,
// book-a-talk, FAQ)
// ──────────────────────────────────────────────────────────────────────────────

// Client testimonials
const testimonialsHeader: SectionHeaderContent = {
  eyebrow: "/ kind words",
  eyebrowTone: "purple",
  title: `Founders who'd <span class="text-brand-purple">work with me</span> again.`,
  description:
    "Quotes pulled from emails, Slack, and the occasional post-launch beer.",
};

const featuredTestimonial: Testimonial = {
  quote:
    "Alex shipped in six weeks what a previous agency couldn't finish in six months. Same scope, half the price, and the code is the cleanest I've inherited in ten years of running startups.",
  name: "Jordan Park",
  role: "Founder, Atlas",
  avatar:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80",
};

const secondaryTestimonials: Testimonial[] = [
  {
    quote:
      "The Friday demos changed how I think about contracting. No surprises, ever — I always knew what was coming Monday.",
    name: "Mei Tanaka",
    role: "CEO, Loom & Order",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80",
  },
];

const wideTestimonial: WideTestimonial = {
  quote:
    "Honest, technically sharp, and pleasant to argue with. We disagreed on the auth approach in week 2 — Alex won, and a year later he was right. That's worth a lot.",
  author: {
    name: "Sam Okonkwo",
    role: "CTO, Sift Community",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&facepad=2&w=160&h=160&q=80",
  },
  chat: {
    handle: "@sam",
    time: "2:14 PM",
    message:
      "btw — that audit-log thing you pushed back on? exactly the feature the board asked for last week. saved us a frantic sprint.",
  },
};

// LinkedIn peer recommendations
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

// LinkedIn profile CTA card
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

// Book-a-talk form
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

// FAQ
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
// Batch 6 — ChatBot
// ──────────────────────────────────────────────────────────────────────────────

const chatBot: ChatBotContent = {
  name: "Ask Alex (bot)",
  tagline: "auto-replies · real one's offline 🌙",
  greeting:
    "Hi! I'm the bot version of Alex. Ask about pricing, timelines, the stack, or how to start. The real Alex replies within 1 business day.",
};

const chatQuickReplies: string[] = [
  "What does a project cost?",
  "How long does it take?",
  "What stack do you use?",
  "How do we start?",
];

const chatReplies: ChatReply[] = [
  {
    match: ["price", "cost", "pricing", "budget", "rate", "quote"],
    text: "Fixed-scope, fixed-price. Most projects land between $18k and $48k all-in, quoted in days after the discovery call. Anything that changes scope mid-build is re-quoted in writing first.",
  },
  {
    match: ["time", "long", "timeline", "duration", "weeks", "deadline", "when"],
    text: "Typical engagement is 6 weeks of build inside a 6-phase lifecycle (discover → shape → build → polish → ship → tune). Larger projects run as 2–3 back-to-back cycles.",
  },
  {
    match: ["stack", "tech", "tools", "framework", "language"],
    text: "Default: Nuxt 3 + TypeScript + Postgres + Tailwind, deployed on Fly.io. I'm also fluent in React/Next, Node/Fastify, Python for scripts, and happy to inherit whatever you already have.",
  },
  {
    match: ["start", "begin", "kick off", "first step", "next step", "how do we"],
    text: "Easy — fill in the short form in the 'Let's talk' section above, or email alex@rivera.dev. I'll reply within 1 business day to set up a 30-minute discovery call. No deck required.",
  },
  {
    match: ["agency", "agencies", "subcontract", "freelance vs"],
    text: "I work with both founders and agencies. With agencies I lead a single project end-to-end; I won't be a long-term subcontractor or take work I can't sign with my name on.",
  },
  {
    match: ["nda", "confidential", "secret"],
    text: "Happy to sign a mutual NDA before the second call. I'd rather not paperwork-block the first one — that's just to make sure we're a fit. If your lawyer needs it sooner, send the template and I'll sign same-day.",
  },
  {
    match: ["inherit", "existing", "takeover", "rescue", "legacy"],
    text: "Yes — I've inherited Vue, Nuxt, React, Next, and Node codebases. I start with a 2-day code review (flat $1,800) and you keep the report whether we work together or not.",
  },
  {
    match: ["available", "availability", "booking", "free", "open", "slots"],
    text: "Booking Q3 2026. Two slots left as of this week. The 'Book a talk' section will tell you the truth if that's gone stale.",
  },
  {
    match: ["where", "location", "remote", "based", "timezone", "country"],
    text: "Based in Lisbon (UTC+0/+1), but the work is fully remote. I overlap comfortably with Europe and US East, and async with US West and APAC.",
  },
  {
    match: ["hi", "hello", "hey", "yo", "sup", "hola"],
    text: "Hello! Ask me about pricing, timelines, the stack, or how to start. Or scroll up — most answers are also in the FAQ section.",
  },
];

const chatFallback =
  "Good question — I'll route that to the real Alex. Drop your email in the 'Let's talk' section above and you'll hear back within 1 business day.";

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
      { label: "Work", href: "#work" },
      { label: "Process", href: "#process" },
      { label: "Words", href: "#words" },
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
    <WebTechStackGrid
      :header="stackHeader"
      :techs="techs"
      :categories="techCategories"
      footnote="/ also comfortable in: Go, Rust (learning), GraphQL, tRPC, Prisma, Drizzle, Playwright, Cypress, Stripe, Sentry, GitHub Actions, Fly.io, Vercel, AWS (ECS/RDS/S3)."
    />
    <WebMiscOpeningHook :parts="openingHookParts" />
    <WebWorkRecentProjects
      :header="projectsHeader"
      :projects="projects"
      :secondary-link="projectsSecondaryLink"
      section-id="work"
    />
    <WebWorkCaseStudies
      :header="caseStudiesHeader"
      :description="caseStudiesDescription"
      :slides="caseStudies"
      section-id="caseStudies"
    />
    <WebWorkFeaturedPosts
      :header="postsHeader"
      :posts="posts"
      :see-all="postsSeeAll"
      section-id="posts"
    />
    <WebProcessWorkApproach
      :header="approachHeader"
      :steps="approachSteps"
      section-id="process"
    />
    <WebProcessProjectLifecycle
      :header="lifecycleHeader"
      :steps="lifecycleSteps"
      :panels="lifecyclePanels"
      :artifacts="lifecycleArtifacts"
      :stats="lifecycleStats"
      :footer="lifecycleFooter"
    />
    <WebProcessWorkCycle
      :header="cycleHeader"
      :panels="cyclePanels"
      :cta="cycleCta"
      :hint="cycleHint"
    />
    <WebSocialClientTestimonials
      :header="testimonialsHeader"
      :featured="featuredTestimonial"
      :secondary="secondaryTestimonials"
      :wide="wideTestimonial"
      section-id="words"
    />
    <WebLinkedinPeerRecs
      :header="recsHeader"
      :recs="recs"
      :summary="recsSummary"
      section-id="linkedin"
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
    <WebMiscChatBot
      :bot="chatBot"
      :quick-replies="chatQuickReplies"
      :replies="chatReplies"
      :fallback="chatFallback"
    />
  </div>
</template>
