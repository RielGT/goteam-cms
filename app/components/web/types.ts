// Shared content types used by props-driven web components.

export type CtaVariant = "primary" | "ghost" | "link";

export interface Cta {
  label: string;
  href: string;
  variant?: CtaVariant;
  external?: boolean;
}

export type Tone = "purple" | "green" | "orange";
export type ToneOrNeutral = Tone | "neutral";

// Generic header used by most sections (eyebrow + heading + optional description).
export interface SectionHeaderContent {
  eyebrow: string;
  eyebrowTone?: Tone;
  title: string; // may contain inline HTML for highlight spans
  description?: string;
}

// Brand mark used by SiteHeader / SiteFooter.
export interface Brand {
  name: string;
  accent: string;
  href: string;
}

// Pill / badge content.
export interface BadgeContent {
  label: string;
  tone?: Tone;
  dot?: boolean;
}

// Stat tile.
export interface StatItem {
  value: string;
  label: string;
  tone?: Tone;
}

// Nav links (header + footer groups).
export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterGroup {
  eyebrow: string;
  links: NavLink[];
}

// Hero.
export interface HeroImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface HeroCodeSnippet {
  filename: string;
  html: string; // pre-rendered, may contain spans for syntax highlight
}

// Tech stack.
export type TechCategory =
  | "language"
  | "framework"
  | "backend"
  | "data"
  | "styling"
  | "infra"
  | "tools";

export interface Tech {
  name: string;
  svg: string;
  category: TechCategory;
  blurb: string;
  years?: number;
}

export interface TechCategoryFilter {
  id: TechCategory | "all";
  label: string;
  tone: ToneOrNeutral;
}

export interface TechPill {
  name: string;
  svg: string;
}

// OpeningHook prose.
export type ProseEmphasis = "muted" | "highlight" | "accent";
export interface ProsePart {
  text: string;
  emphasis?: ProseEmphasis;
}

// Recent projects.
export interface Project {
  number: string;
  category: string;
  categoryTone: Tone;
  title: string;
  description: string;
  bullets: string[];
  cta: string;
  meta?: string;
  image: string;
  alt: string;
  reverse?: boolean;
}

// Case studies.
export interface CaseStudyStep {
  num: string;
  title: string;
  body: string;
}

export interface CaseStudySlide {
  title: string;
  tag: string;
  status: string;
  image: string;
  alt: string;
  stats: StatItem[];
  stack: string[];
  problemTitle: string;
  problemBody: string;
  steps: CaseStudyStep[];
  result: string;
  primaryCta: string;
}

// Featured posts.
export interface Post {
  tag: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  image: string;
}

// Process — work approach (3 cards).
export interface ApproachStep {
  num: string;
  title: string;
  body: string;
  tone: Tone;
}

// Process — lifecycle.
export interface LifecycleBullet {
  label: string;
  text: string;
}

export interface LifecyclePanel {
  num: string;
  tone: Tone;
  duration: string;
  title: string;
  body: string;
  bullets: LifecycleBullet[];
}

export interface LifecycleStep {
  num: string;
  label: string;
}

export interface LifecycleArtifact {
  filename: string;
  html: string;
}

// Process — work cycle.
export interface WorkCycleCard {
  label: string;
  text: string;
}

export interface WorkCyclePanel {
  num: string;
  subtitle: string;
  tone: Tone;
  tag: string;
  title: string;
  body: string;
  cards: WorkCycleCard[];
}

// Testimonials.
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

export interface TestimonialChat {
  handle: string;
  time: string;
  message: string;
}

export interface WideTestimonial {
  quote: string;
  author: { name: string; role: string; avatar: string };
  chat?: TestimonialChat;
}

// LinkedIn peer recs.
export interface Rec {
  name: string;
  role: string;
  meta: string;
  avatar: string;
  ringTone: Tone;
  quote: string; // may contain inline HTML
}

export interface RecsSummary {
  count: number;
  label: string;
  avatars: string[];
  cta: Cta;
}

// LinkedIn profile CTA.
export interface LinkedInCard {
  name: string;
  headline: string;
  subline: string;
  avatar: string;
  tag?: string;
}

// BookTalk form.
export type FieldType = "text" | "email" | "textarea";
export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  hint?: string;
  required?: boolean;
  rows?: number;
}

export interface BookTalkBullet {
  text: string;
  tone?: Tone;
}

// FAQ.
export interface Faq {
  q: string;
  a: string;
}

// ChatBot.
export interface ChatReply {
  match: string[]; // case-insensitive substrings; first match wins
  text: string;
}

export interface ChatBot {
  name: string;
  tagline: string;
  greeting: string;
}
