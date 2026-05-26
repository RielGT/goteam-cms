<script setup lang="ts">
import { computed } from "vue";
import type { Tone } from "../types";

const props = withDefaults(
  defineProps<{
    label: string;
    tone?: Tone;
    dot?: boolean;
  }>(),
  { tone: "green", dot: true },
);

const toneClass = computed(
  () =>
    ({
      purple: "bg-brand-purple/10 text-brand-purple border border-brand-purple/20",
      green: "bg-brand-green/10 text-brand-green border border-brand-green/20",
      orange: "bg-brand-orange/10 text-brand-orange border border-brand-orange/20",
    })[props.tone],
);

const dotClass = computed(
  () =>
    ({
      purple: "bg-brand-purple",
      green: "bg-brand-green",
      orange: "bg-brand-orange",
    })[props.tone],
);
</script>

<template>
  <span
    class="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full"
    :class="toneClass"
  >
    <span v-if="dot" class="w-1.5 h-1.5 rounded-full pulse-dot" :class="dotClass" />
    <slot>{{ label }}</slot>
  </span>
</template>
