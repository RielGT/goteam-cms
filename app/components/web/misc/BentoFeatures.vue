<script setup lang="ts">
import { computed } from "vue";
import type { BentoTile, SectionHeaderContent, Tone } from "../types";

const props = withDefaults(
  defineProps<{
    header: SectionHeaderContent;
    sectionId?: string;
    tiles: BentoTile[];
    pattern?: "2-3" | "3-2" | "1-2-2-1";
  }>(),
  { sectionId: undefined, pattern: "2-3" },
);

// Per-tile column span on lg — driven by pattern + index. Mobile is always
// single-column (each tile is full width, no class needed).
//
// Patterns assume a 6-col lg grid:
//   2-3       → row1: 4 + 2,         row2: 2 + 2 + 2   (5 tiles)
//   3-2       → row1: 2 + 2 + 2,     row2: 4 + 2       (5 tiles)
//   1-2-2-1   → row1: 6,             row2: 3 + 3, row3: 6 (4 tiles)
const lgColSpan = computed(() => (i: number): string => {
  const idx = i;
  switch (props.pattern) {
    case "3-2":
      if (idx < 3) return "lg:col-span-2";
      if (idx === 3) return "lg:col-span-4";
      return "lg:col-span-2";
    case "1-2-2-1":
      if (idx === 0) return "lg:col-span-6";
      if (idx === 1 || idx === 2) return "lg:col-span-3";
      return "lg:col-span-6";
    case "2-3":
    default:
      if (idx === 0) return "lg:col-span-4";
      if (idx === 1) return "lg:col-span-2";
      return "lg:col-span-2";
  }
});

const iconWrapClass = (t: Tone) =>
  ({
    purple: "bg-brand-purple/10 text-brand-purple",
    green: "bg-brand-green/10 text-brand-green",
    orange: "bg-brand-orange/10 text-brand-orange",
  })[t];

const hoverBorderClass = (t: Tone) =>
  ({
    purple: "hover:border-brand-purple",
    green: "hover:border-brand-green",
    orange: "hover:border-brand-orange",
  })[t];
</script>

<template>
  <section
    :id="sectionId"
    class="max-w-6xl mx-auto px-5 sm:px-8 py-24 sm:py-32"
  >
    <div class="max-w-2xl mb-12 sm:mb-16 reveal">
      <WebUiSectionHeader v-bind="header" />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-6 gap-4 sm:gap-6">
      <article
        v-for="(t, i) in tiles"
        :key="`bento-${i}`"
        :class="[
          'reveal rounded-2xl border border-zinc-200 dark:border-white/10 bg-paper dark:bg-ink p-6 sm:p-8 shadow-soft transition-colors',
          lgColSpan(i),
          hoverBorderClass(t.tone),
        ]"
      >
        <span
          aria-hidden="true"
          class="grid place-items-center w-11 h-11 rounded-xl"
          :class="iconWrapClass(t.tone)"
        >
          <span class="w-5 h-5" v-html="t.icon" />
        </span>
        <h3 class="font-display text-xl font-bold mt-5 mb-2">{{ t.title }}</h3>
        <p
          class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed"
        >
          {{ t.body }}
        </p>
      </article>
    </div>
  </section>
</template>
