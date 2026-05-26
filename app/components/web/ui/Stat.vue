<script setup lang="ts">
import { computed } from "vue";
import type { Tone } from "../types";

const props = withDefaults(
  defineProps<{
    value: string;
    label: string;
    tone?: Tone | "neutral";
    bordered?: boolean;
  }>(),
  { tone: "neutral", bordered: false },
);

const valueClass = computed(
  () =>
    ({
      purple: "text-brand-purple",
      green: "text-brand-green",
      orange: "text-brand-orange",
      neutral: "text-ink dark:text-white",
    })[props.tone],
);
</script>

<template>
  <div :class="bordered ? 'p-4 rounded-xl border border-zinc-200 dark:border-white/10' : ''">
    <div class="font-display text-2xl sm:text-3xl font-bold" :class="valueClass">
      <slot name="value">{{ value }}</slot>
    </div>
    <div class="text-[11px] font-mono text-zinc-500 mt-1">{{ label }}</div>
  </div>
</template>
