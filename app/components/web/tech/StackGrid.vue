<script setup lang="ts">
import { ref, computed } from 'vue';

type Tone = 'purple' | 'green' | 'orange';
type Category = 'language' | 'framework' | 'backend' | 'data' | 'styling' | 'infra' | 'tools';

interface Tech {
  name: string;
  svg: string;
  category: Category;
  blurb: string;
  years?: number;
}

withDefaults(defineProps<{ contained?: boolean }>(), { contained: true });

const techs: Tech[] = [
  { name: 'TypeScript',  category: 'language',  years: 6, blurb: 'strict-mode-by-default. my safety net.',
    svg: '<svg viewBox="0 0 128 128"><path fill="#3178C6" d="M0 64v64h128V0H0z"/><path fill="#fff" d="M22.7 65.1v5.2h16.6v47.1h11.7V70.3h16.6v-5.1c0-2.8 0-5.2-.2-5.2-.1-.1-10-.2-22-.1l-21.9.1zm81.6-5.4c3.2.8 5.7 2.2 7.9 4.5 1.2 1.3 2.9 3.5 3.1 4 0 .2-5.5 3.9-8.8 6-.1 0-.6-.5-1.1-1.4-1.6-2.3-3.3-3.3-5.8-3.5-3.8-.3-6.3 1.7-6.3 5 0 1 .2 1.6.5 2.3.8 1.6 2.2 2.5 6.7 4.5 8.4 3.6 12 6 14.2 9.3 2.5 3.7 3.1 9.7 1.4 14.1-1.9 4.8-6.4 8-12.7 9.1-2 .3-6.6.3-8.7 0-4.7-.9-9-3.2-12.1-6.5-1.2-1.3-3.6-4.8-3.5-5 .2-.1.7-.5 1.2-.8.5-.4 2.4-1.5 4.1-2.5l3.2-1.9.7 1c.9 1.4 2.9 3.4 4.1 4 3.4 1.8 8.1 1.6 10.4-.5.9-.9 1.2-1.8 1.2-3.2 0-1.3-.2-1.9-.9-2.9-.9-1.3-2.7-2.4-7.9-4.6-5.9-2.5-8.4-4.1-10.7-6.5-1.3-1.5-2.5-3.7-3.1-5.7-.4-1.7-.5-5.8-.2-7.5 1.1-5 4.9-8.5 10.4-9.6 1.8-.3 5.9-.2 7.6.2z"/></svg>' },
  { name: 'React',       category: 'framework', years: 7, blurb: 'still my default for product UI.',
    svg: '<svg viewBox="0 0 128 128"><circle fill="#61DAFB" cx="64" cy="64" r="11.4"/><g stroke="#61DAFB" stroke-width="4" fill="none"><ellipse cx="64" cy="64" rx="56" ry="21"/><ellipse cx="64" cy="64" rx="56" ry="21" transform="rotate(60 64 64)"/><ellipse cx="64" cy="64" rx="56" ry="21" transform="rotate(120 64 64)"/></g></svg>' },
  { name: 'Next.js',     category: 'framework', years: 5, blurb: 'app router. RSC. ship faster.',
    svg: '<svg viewBox="0 0 128 128"><path d="M64 0a64 64 0 1 0 0 128A64 64 0 0 0 64 0zm-7 33.4l31.4 47.4V33.4h6.6v61.2h-7.9L55.6 47.2v47.4H49V33.4h8z" fill="currentColor"/></svg>' },
  { name: 'Remix',       category: 'framework', years: 2, blurb: 'web standards first. love it for forms.',
    svg: '<svg viewBox="0 0 128 128"><path fill="#FF6B35" d="M64 0L8 128h112zM64 24l32 80H32z"/></svg>' },
  { name: 'Node.js',     category: 'backend',   years: 8, blurb: 'where most of my APIs live.',
    svg: '<svg viewBox="0 0 128 128"><path fill="#83CD29" d="M64 128a6.4 6.4 0 0 1-3.2-.9l-10.2-6c-1.5-.8-.8-1.1-.3-1.3 2-.7 2.4-.9 4.6-2.1.2-.1.5-.1.8.1l7.8 4.7c.3.2.7.2 1 0l30.6-17.7c.3-.2.5-.5.5-.9V68.6c0-.4-.2-.7-.5-.9l-30.6-17.7c-.3-.2-.7-.2-1 0L33 67.7c-.3.2-.5.5-.5.9v35.4c0 .3.2.7.5.8l8.4 4.9c4.5 2.3 7.3-.4 7.3-3.1V71.7c0-.5.4-.9.9-.9h3.9c.5 0 .9.4.9.9v34.9c0 6-3.3 9.5-9 9.5-1.8 0-3.2 0-7.1-1.9l-8-4.6a6.4 6.4 0 0 1-3.2-5.5V68.6a6.4 6.4 0 0 1 3.2-5.5L60.8 45.4a6.7 6.7 0 0 1 6.4 0l30.6 17.7a6.4 6.4 0 0 1 3.2 5.5v35.4a6.4 6.4 0 0 1-3.2 5.5l-30.6 17.7a6.4 6.4 0 0 1-3.2.8z"/></svg>' },
  { name: 'tRPC',        category: 'backend',   years: 3, blurb: 'end-to-end types. no schema dance.',
    svg: '<svg viewBox="0 0 128 128"><path fill="#06B6D4" d="M37 19.7L8 64l29 44.3 23-15.4L46.1 64 60 35.1zM91 19.7L62 64l29 44.3 23-15.4L100.1 64 114 35.1z"/></svg>' },
  { name: 'PostgreSQL',  category: 'data',      years: 8, blurb: 'boring on purpose. JSONB when it matters.',
    svg: '<svg viewBox="0 0 128 128"><path fill="#336791" d="M93.8 93c.6-5 .4-5.8 4.2-5 1 .1 1.7.2 2.6.2 2.7 0 6.1-.6 8.1-1.5 4.3-2 7-5.4 2.7-4.5-9.6 2-10.3-1.3-10.3-1.3 10.2-15.1 14.4-34.3 10.8-39C102 25.3 86.9 29.6 86.7 29.7l-.1.1c-1.9-.6-4-1-6.4-1-4.3-.1-7.6.4-11 1.7L69 30.4c-.4-.2-9.2-5.5-19.1-1.8-6.8 2.6-9.5 8.6-6.4 22.5 4.5 19.3 12.7 22.7 14.5 22.3.6-.1.7-.7.8-1.2l.1-1.6c-2.2-2.4-2.3-6.7-2-9.6l.7-.7c.4 1.4 1 2.7 1.8 4 2.1 3.2 6.9 8.5 12.6 6.7 4.2-1.3 7.3-7.7 7.3-7.7s1.1 11.1 2.7 14.7c1.6 3.5-3.6 11.2-7.4 13.4-.4.2-.5.4-.1.4 1 .1 3.8 0 7.4-3.1 3.5-3 6-7 7.4-10.8 1.4-3.7 2-4.3 2.5-3.8.4.6 0 4.9-2 7.3-1.5 1.9-7 6.6-8.7 8.3-.8.7-1 .7-1.4.8-.4.1-.8.3-.6.6.3.4 1.2.9 2.5 1.4 2.6.9 5.8 1.4 9.2.7 5.8-1.1 6.7-7.7 7.2-10.2.4-2.5 1.4-2.6 1.4-2.6z"/></svg>' },
  { name: 'Prisma',      category: 'data',      years: 4, blurb: 'great migrations. honest about its limits.',
    svg: '<svg viewBox="0 0 128 128"><path fill="currentColor" d="M64 0L0 26.7v74.6L64 128l64-26.7V26.7L64 0zm0 13.6l50.4 21V93.4L64 114.4 13.6 93.4V34.6L64 13.6z"/><path fill="currentColor" d="M64 30L30 44v40l34 14 34-14V44L64 30zm0 12l22 9.1v25.8L64 86l-22-9.1V51.1L64 42z"/></svg>' },
  { name: 'Supabase',    category: 'data',      years: 3, blurb: 'postgres + auth + storage. fast start.',
    svg: '<svg viewBox="0 0 128 128"><rect width="128" height="128" rx="20" fill="#181818"/><path d="M44 50v28l24-14z" fill="#10B981"/></svg>' },
  { name: 'Tailwind CSS',category: 'styling',   years: 5, blurb: 'design tokens, in the markup.',
    svg: '<svg viewBox="0 0 128 128"><path fill="#38BDF8" d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.535-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.871 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64z"/></svg>' },
  { name: 'Vercel',      category: 'infra',     years: 5, blurb: 'edge + preview deploys. just works.',
    svg: '<svg viewBox="0 0 128 128"><path fill="currentColor" d="M64 0L0 110.4h128zm0 25.4L23.4 95.8h81.2z"/></svg>' },
  { name: 'Cloudflare',  category: 'infra',     years: 4, blurb: 'workers, R2, DNS. the toolbelt.',
    svg: '<svg viewBox="0 0 128 128"><path fill="#F38020" d="M115.7 78.5c-1.5-5.2-7.1-9-12.2-9 -.5 0-1.1 0-1.6.1l-.7.2-22.5 7.3-2.5.8 1.2-2.3 7.4-13.4c.6-1 .9-2.2.9-3.4 0-1.7-.6-3.3-1.7-4.6-3.2-3.6-9.4-2.7-12.8 1.9L57.5 64.2 50 70.4l-2-2.4c-4.1-4.7-10.5-7.5-17.1-7.5C18.2 60.5 8.1 70.7 8.1 83.2c0 1.4.1 2.7.4 4.1l1.4 7c.4 1.7 1.9 2.9 3.6 2.8h95.6c1.8 0 3.3-1.3 3.7-3l1.6-5.7c.4-1.5.5-3 .5-4.5 0-1.8-.4-3.5-1.2-5.4z"/></svg>' },
  { name: 'Stripe',      category: 'infra',     years: 5, blurb: 'billing without the tears.',
    svg: '<svg viewBox="0 0 128 128"><circle cx="64" cy="64" r="64" fill="#635BFF"/><path fill="#fff" d="M59.4 47.6c0-2.9 2.4-4 6.3-4 5.7 0 12.8 1.7 18.5 4.7v-17.6c-6.2-2.5-12.4-3.4-18.5-3.4-15.1 0-25.1 7.9-25.1 21 0 20.5 28.2 17.2 28.2 26 0 3.4-3 4.5-7.1 4.5-6.2 0-14.2-2.5-20.5-6v17.9c7 3 14.1 4.3 20.5 4.3 15.5 0 26.1-7.7 26.1-21 0-22.1-28.4-18.1-28.4-26.4z"/></svg>' },
  { name: 'Git',         category: 'tools',     years: 9, blurb: 'rebase > merge. fight me.',
    svg: '<svg viewBox="0 0 128 128"><path fill="#F05032" d="M124.7 58L70 3.3a5.7 5.7 0 0 0-8.1 0L50.5 14.8l14.4 14.4a6.8 6.8 0 0 1 8.7 8.7l13.9 13.9a6.8 6.8 0 1 1-4.1 3.8L70.5 42.9v34a6.8 6.8 0 1 1-5.6-.2V42.4a6.8 6.8 0 0 1-3.7-9L46.9 19 3.3 62.5a5.7 5.7 0 0 0 0 8.1l54.7 54.7a5.7 5.7 0 0 0 8.1 0l54.5-54.5a5.7 5.7 0 0 0 0-8.1"/></svg>' },
  { name: 'Bash',        category: 'tools',     years: 9, blurb: 'one-liners that should not exist.',
    svg: '<svg viewBox="0 0 128 128"><circle cx="64" cy="64" r="60" fill="currentColor"/><text x="64" y="78" text-anchor="middle" fill="#fff" font-family="monospace" font-weight="bold" font-size="32">sh</text></svg>' },
];

const categories: { id: Category | 'all'; label: string; tone: Tone | 'neutral' }[] = [
  { id: 'all',       label: 'everything',  tone: 'neutral' },
  { id: 'framework', label: 'frameworks',  tone: 'purple'  },
  { id: 'backend',   label: 'backend',     tone: 'green'   },
  { id: 'data',      label: 'data',        tone: 'orange'  },
  { id: 'styling',   label: 'styling',     tone: 'purple'  },
  { id: 'infra',     label: 'infra',       tone: 'green'   },
  { id: 'tools',     label: 'tools',       tone: 'orange'  },
  { id: 'language',  label: 'languages',   tone: 'purple'  },
];

const toneByCategory: Record<Category, Tone> = {
  language:  'purple',
  framework: 'purple',
  backend:   'green',
  data:      'orange',
  styling:   'purple',
  infra:     'green',
  tools:     'orange',
};

const activeFilter = ref<Category | 'all'>('all');
const hoveredIdx = ref<number | null>(null);

const filtered = computed(() =>
  activeFilter.value === 'all'
    ? techs
    : techs.filter(t => t.category === activeFilter.value),
);

const focused = computed(() =>
  hoveredIdx.value !== null ? filtered.value[hoveredIdx.value] : null,
);
</script>

<template>
  <section
    aria-label="Tech stack"
    class="border-y border-zinc-200/70 dark:border-white/5 bg-white/40 dark:bg-white/[0.02] py-24 sm:py-32"
  >
    <div class="max-w-6xl mx-auto px-5 sm:px-8">
      <!-- Header row: eyebrow + heading + live focus readout -->
      <div class="flex flex-col gap-6 mb-10 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div class="flex items-center gap-3 text-xs font-mono text-zinc-500 dark:text-zinc-500 mb-4">
            <span class="w-1.5 h-1.5 rounded-full bg-brand-green pulse-dot" />
            <span>/ tools I reach for daily</span>
          </div>
          <h2 class="font-display text-4xl sm:text-5xl font-bold text-ink dark:text-white leading-tight">
            The stack — <span class="text-brand-purple">hover to inspect.</span>
          </h2>
        </div>

        <!-- Live "focus" readout swaps with the hovered card -->
        <div
          class="min-h-[68px] sm:min-w-[280px] sm:max-w-sm rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 px-4 py-3 shadow-soft transition"
          aria-live="polite"
        >
          <p class="text-[11px] font-mono text-zinc-500 dark:text-zinc-500 mb-1">
            / {{ focused ? 'now inspecting' : 'pick one' }}
          </p>
          <p class="text-sm text-zinc-800 dark:text-zinc-200 leading-snug">
            <template v-if="focused">
              <span class="font-semibold">{{ focused.name }}</span>
              <span class="text-zinc-500 dark:text-zinc-500"> — {{ focused.blurb }}</span>
            </template>
            <template v-else>
              <span class="text-zinc-500 dark:text-zinc-500">{{ filtered.length }} tools. hover any tile for the story.</span>
            </template>
          </p>
        </div>
      </div>

      <!-- Filter chips -->
      <div class="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Filter tech by category">
        <button
          v-for="c in categories"
          :key="c.id"
          type="button"
          role="tab"
          :aria-selected="activeFilter === c.id"
          class="filter-chip"
          :class="{
            'filter-chip--active': activeFilter === c.id,
            'filter-chip--purple': activeFilter === c.id && c.tone === 'purple',
            'filter-chip--green':  activeFilter === c.id && c.tone === 'green',
            'filter-chip--orange': activeFilter === c.id && c.tone === 'orange',
          }"
          @click="activeFilter = c.id"
        >
          {{ c.label }}
        </button>
      </div>

      <!-- Grid -->
      <ul
        class="tech-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
        :class="{ 'tech-grid--focused': hoveredIdx !== null }"
        @mouseleave="hoveredIdx = null"
      >
        <li
          v-for="(t, i) in filtered"
          :key="t.name"
          class="tech-card group"
          :class="[`tone-${toneByCategory[t.category]}`, { 'tech-card--active': hoveredIdx === i }]"
          @mouseenter="hoveredIdx = i"
          @focusin="hoveredIdx = i"
          tabindex="0"
        >
          <!-- Subtle brand tint wash that fades in on hover -->
          <span class="tech-card__wash" aria-hidden="true" />

          <!-- Icon -->
          <span class="tech-card__icon" v-html="t.svg" />

          <!-- Name + meta -->
          <div class="relative z-10 mt-3 flex items-center justify-between gap-2">
            <span class="font-display text-base font-semibold text-ink dark:text-white">
              {{ t.name }}
            </span>
            <span
              v-if="t.years"
              class="text-[10px] font-mono text-zinc-500 dark:text-zinc-500 shrink-0"
            >
              {{ t.years }}y
            </span>
          </div>

          <!-- Category tag (revealed on hover) -->
          <span class="tech-card__tag">
            <span class="w-1 h-1 rounded-full bg-current opacity-70" />
            {{ t.category }}
          </span>
        </li>
      </ul>

      <!-- Footnote -->
      <p class="mt-8 text-xs font-mono text-zinc-500 dark:text-zinc-500">
        / not a checklist — these are the ones I'd pick again tomorrow.
      </p>
    </div>
  </section>
</template>

<style scoped>
/* ---------- Filter chips ---------- */
.filter-chip {
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  padding: 0.4rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid rgb(228 228 231);
  color: rgb(82 82 91);
  background: transparent;
  transition: all 150ms ease;
  cursor: pointer;
}
:where(.dark) .filter-chip { border-color: rgba(255,255,255,0.10); color: rgb(161 161 170); }
.filter-chip:hover { border-color: #8B5CF6; color: #8B5CF6; }

.filter-chip--active { border-color: currentColor; }
.filter-chip--purple { background: rgba(139,92,246,0.10); border-color: rgba(139,92,246,0.20); color: #8B5CF6; }
.filter-chip--green  { background: rgba(16,185,129,0.10); border-color: rgba(16,185,129,0.20); color: #10B981; }
.filter-chip--orange { background: rgba(251,146,60,0.10); border-color: rgba(251,146,60,0.20); color: #FB923C; }

/* ---------- Grid focus dimming ---------- */
.tech-grid--focused .tech-card:not(.tech-card--active) { opacity: 0.45; filter: saturate(0.6); }

/* ---------- Card ---------- */
.tech-card {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: 1rem;
  border-radius: 1rem; /* rounded-2xl-ish without the visual weight */
  border: 1px solid rgb(228 228 231);
  background: #fff;
  box-shadow: 0 1px 0 rgba(0,0,0,0.04), 0 8px 24px -12px rgba(0,0,0,0.08);
  transition: transform 250ms ease, border-color 250ms ease, opacity 250ms ease, filter 250ms ease;
  cursor: default;
  outline: none;
}
:where(.dark) .tech-card { border-color: rgba(255,255,255,0.10); background: rgb(24 24 27); }

.tech-card:hover,
.tech-card--active,
.tech-card:focus-visible {
  transform: translateY(-2px);
}
.tone-purple.tech-card:hover, .tone-purple.tech-card--active, .tone-purple.tech-card:focus-visible { border-color: rgba(139,92,246,0.40); }
.tone-green.tech-card:hover,  .tone-green.tech-card--active,  .tone-green.tech-card:focus-visible  { border-color: rgba(16,185,129,0.40); }
.tone-orange.tech-card:hover, .tone-orange.tech-card--active, .tone-orange.tech-card:focus-visible { border-color: rgba(251,146,60,0.45); }

.tech-card:focus-visible {
  box-shadow: 0 0 0 2px rgba(139,92,246,0.40), 0 1px 0 rgba(0,0,0,0.04), 0 8px 24px -12px rgba(0,0,0,0.08);
}

/* Soft brand wash that fades in on hover */
.tech-card__wash {
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 0;
  transition: opacity 250ms ease;
  background: radial-gradient(120% 80% at 0% 0%, var(--wash-from) 0%, transparent 60%);
  pointer-events: none;
}
.tone-purple { --wash-from: rgba(139,92,246,0.12); }
.tone-green  { --wash-from: rgba(16,185,129,0.12); }
.tone-orange { --wash-from: rgba(251,146,60,0.14); }
.tech-card:hover .tech-card__wash,
.tech-card--active .tech-card__wash,
.tech-card:focus-visible .tech-card__wash { opacity: 1; }

/* Icon */
.tech-card__icon {
  position: relative;
  z-index: 1;
  display: inline-flex;
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  transition: transform 350ms cubic-bezier(.22,.61,.36,1);
}
.tech-card__icon :deep(svg) { width: 100%; height: 100%; display: block; }
.tech-card:hover .tech-card__icon,
.tech-card--active .tech-card__icon,
.tech-card:focus-visible .tech-card__icon { transform: scale(1.12) rotate(-3deg); }

/* Mono tone color for "currentColor" SVGs (Next.js, Vercel, Prisma) */
.tone-purple .tech-card__icon { color: #0D0B1E; }
:where(.dark) .tone-purple .tech-card__icon { color: #fff; }
.tone-green  .tech-card__icon { color: #10B981; }
.tone-orange .tech-card__icon { color: #FB923C; }

/* Category tag — slides up on hover */
.tech-card__tag {
  position: relative;
  z-index: 1;
  margin-top: 0.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  padding: 0.15rem 0.5rem;
  border-radius: 9999px;
  background: rgb(244 244 245);
  color: rgb(113 113 122);
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 200ms ease, transform 200ms ease;
}
:where(.dark) .tech-card__tag { background: rgba(255,255,255,0.05); color: rgb(161 161 170); }

.tone-purple.tech-card:hover .tech-card__tag,
.tone-purple.tech-card--active .tech-card__tag,
.tone-purple.tech-card:focus-visible .tech-card__tag {
  background: rgba(139,92,246,0.10); color: #8B5CF6;
}
.tone-green.tech-card:hover .tech-card__tag,
.tone-green.tech-card--active .tech-card__tag,
.tone-green.tech-card:focus-visible .tech-card__tag {
  background: rgba(16,185,129,0.10); color: #10B981;
}
.tone-orange.tech-card:hover .tech-card__tag,
.tone-orange.tech-card--active .tech-card__tag,
.tone-orange.tech-card:focus-visible .tech-card__tag {
  background: rgba(251,146,60,0.12); color: #FB923C;
}

.tech-card:hover .tech-card__tag,
.tech-card--active .tech-card__tag,
.tech-card:focus-visible .tech-card__tag {
  opacity: 1;
  transform: translateY(0);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .tech-card,
  .tech-card__icon,
  .tech-card__wash,
  .tech-card__tag,
  .filter-chip {
    transition: none !important;
    transform: none !important;
  }
  .tech-grid--focused .tech-card:not(.tech-card--active) { opacity: 1; filter: none; }
}
</style>
