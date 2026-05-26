<script setup lang="ts">
import { computed } from "vue";
import type { Tone } from "../types";

const props = withDefaults(
  defineProps<{
    src: string;
    alt: string;
    size?: "sm" | "md" | "lg" | "xl";
    ringTone?: Tone;
    ring?: boolean;
  }>(),
  { size: "md", ringTone: "purple", ring: false },
);

const sizeClass = computed(
  () =>
    ({
      sm: "w-8 h-8",
      md: "w-10 h-10",
      lg: "w-12 h-12",
      xl: "w-20 h-20",
    })[props.size],
);

const ringClass = computed(() => {
  if (!props.ring) return "";
  const tone = props.ringTone ?? "purple";
  return {
    purple: "ring-2 ring-brand-purple/20",
    green: "ring-2 ring-brand-green/20",
    orange: "ring-2 ring-brand-orange/20",
  }[tone];
});
</script>

<template>
  <img :src="src" :alt="alt" class="rounded-full object-cover" :class="[sizeClass, ringClass]">
</template>
