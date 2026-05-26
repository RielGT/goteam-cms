<script setup lang="ts">
import { ref, computed } from "vue";
import type { Tech, TechCategory, TechCategoryFilter, SectionHeaderContent } from "../types";

const props = defineProps<{
  header: SectionHeaderContent;
  techs: Tech[];
  categories: TechCategoryFilter[];
  footnote?: string;
}>();

const toneByCategory: Record<TechCategory, "purple" | "green" | "orange"> = {
  language: "purple",
  framework: "purple",
  backend: "green",
  data: "orange",
  styling: "purple",
  infra: "green",
  tools: "orange",
};

const activeFilter = ref<TechCategory | "all">("all");
const hoveredIdx = ref<number | null>(null);

const filtered = computed(() =>
  activeFilter.value === "all"
    ? props.techs
    : props.techs.filter((t) => t.category === activeFilter.value),
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
      <div class="flex flex-col gap-6 mb-10 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div class="flex items-center gap-3 text-xs font-mono text-zinc-500 dark:text-zinc-500 mb-4">
            <span class="w-1.5 h-1.5 rounded-full bg-brand-green pulse-dot" />
            <span>{{ header.eyebrow }}</span>
          </div>
          <h2 class="font-display text-4xl sm:text-5xl font-bold text-ink dark:text-white leading-tight" v-html="header.title" />
        </div>

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
          tabindex="0"
          @mouseenter="hoveredIdx = i"
          @focusin="hoveredIdx = i"
        >
          <span class="tech-card__wash" aria-hidden="true" />
          <span class="tech-card__icon" v-html="t.svg" />

          <div class="relative z-10 mt-3 flex items-center justify-between gap-2">
            <span class="font-display text-base font-semibold text-ink dark:text-white">{{ t.name }}</span>
            <span v-if="t.years" class="text-[10px] font-mono text-zinc-500 dark:text-zinc-500 shrink-0">{{ t.years }}y</span>
          </div>

          <span class="tech-card__tag">
            <span class="w-1 h-1 rounded-full bg-current opacity-70" />
            {{ t.category }}
          </span>
        </li>
      </ul>

      <p v-if="footnote" class="mt-8 text-xs font-mono text-zinc-500 dark:text-zinc-500">{{ footnote }}</p>
    </div>
  </section>
</template>

<style scoped>
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

.tech-grid--focused .tech-card:not(.tech-card--active) { opacity: 0.45; filter: saturate(0.6); }

.tech-card {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: 1rem;
  border-radius: 1rem;
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

.tone-purple .tech-card__icon { color: #0D0B1E; }
:where(.dark) .tone-purple .tech-card__icon { color: #fff; }
.tone-green  .tech-card__icon { color: #10B981; }
.tone-orange .tech-card__icon { color: #FB923C; }

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
.tone-purple.tech-card:focus-visible .tech-card__tag { background: rgba(139,92,246,0.10); color: #8B5CF6; }
.tone-green.tech-card:hover .tech-card__tag,
.tone-green.tech-card--active .tech-card__tag,
.tone-green.tech-card:focus-visible .tech-card__tag { background: rgba(16,185,129,0.10); color: #10B981; }
.tone-orange.tech-card:hover .tech-card__tag,
.tone-orange.tech-card--active .tech-card__tag,
.tone-orange.tech-card:focus-visible .tech-card__tag { background: rgba(251,146,60,0.12); color: #FB923C; }

.tech-card:hover .tech-card__tag,
.tech-card--active .tech-card__tag,
.tech-card:focus-visible .tech-card__tag {
  opacity: 1;
  transform: translateY(0);
}

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
