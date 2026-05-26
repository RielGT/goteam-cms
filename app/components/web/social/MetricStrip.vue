<script setup lang="ts">
import { computed } from "vue";
import type { StatItem, Tone } from "../types";

const props = withDefaults(
  defineProps<{
    sectionId?: string;
    eyebrow?: string;
    items: StatItem[];
    livePulseOnFirst?: boolean;
  }>(),
  {
    sectionId: undefined,
    eyebrow: undefined,
    livePulseOnFirst: false,
  },
);

// Tone rotation purple → green → orange → green (matches §11.1 project-row
// rotation in the brand guide). The first cell is always purple; consumers
// can override per item by setting tone on the StatItem.
const rotation: Tone[] = ["purple", "green", "orange", "green"];
const toneFor = (i: number, override?: Tone): Tone =>
  override ?? rotation[i % rotation.length]!;

const valueClass = (t: Tone) =>
  ({
    purple: "text-brand-purple",
    green: "text-brand-green",
    orange: "text-brand-orange",
  })[t];

const gridCols = computed(() => {
  const n = props.items.length;
  if (n <= 2) return "grid-cols-2 lg:grid-cols-2";
  if (n === 3) return "grid-cols-2 lg:grid-cols-3";
  return "grid-cols-2 lg:grid-cols-4";
});
</script>

<template>
  <section
    :id="sectionId"
    class="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20"
    aria-label="Key metrics"
  >
    <p
      v-if="eyebrow"
      class="font-mono text-xs text-zinc-500 mb-6"
    >
      {{ eyebrow }}
    </p>

    <dl
      :class="[
        'grid gap-px bg-zinc-200 dark:bg-white/10 rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10',
        gridCols,
      ]"
    >
      <div
        v-for="(item, i) in items"
        :key="`metric-${i}`"
        class="bg-paper dark:bg-ink p-6 sm:p-8 flex flex-col-reverse"
      >
        <dt
          class="font-mono text-xs text-zinc-500 mt-3 leading-relaxed flex items-center gap-2"
        >
          <span
            v-if="livePulseOnFirst && i === 0"
            aria-hidden="true"
            class="w-1.5 h-1.5 rounded-full bg-brand-green pulse-dot shrink-0"
          />
          <span>{{ item.label }}</span>
        </dt>
        <dd
          class="font-display text-4xl sm:text-5xl font-bold leading-none"
          :class="valueClass(toneFor(i, item.tone))"
        >
          {{ item.value }}
        </dd>
      </div>
    </dl>
  </section>
</template>
