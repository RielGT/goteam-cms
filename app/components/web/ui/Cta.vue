<script setup lang="ts">
import { computed } from "vue";
import type { CtaVariant } from "../types";

const props = withDefaults(
  defineProps<{
    label: string;
    href: string;
    variant?: CtaVariant;
    external?: boolean;
    showArrow?: boolean;
  }>(),
  { variant: "primary", external: false, showArrow: true },
);

const classes = computed(() => {
  switch (props.variant) {
    case "primary":
      return "group inline-flex items-center gap-2 bg-brand-purple text-white px-6 py-3.5 rounded-full font-medium hover:bg-ink dark:hover:bg-white dark:hover:text-ink transition-all hover:-translate-y-0.5 shadow-soft";
    case "ghost":
      return "inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-200 dark:border-white/10 text-sm font-medium hover:border-brand-purple hover:text-brand-purple transition";
    case "link":
    default:
      return "group inline-flex items-center gap-2 text-sm font-medium hover:text-brand-purple transition";
  }
});

const rel = computed(() => (props.external ? "noopener" : undefined));
const target = computed(() => (props.external ? "_blank" : undefined));
</script>

<template>
  <a :href="href" :target="target" :rel="rel" :class="classes">
    <slot name="leading" />
    {{ label }}
    <svg
      v-if="showArrow"
      class="w-4 h-4 group-hover:translate-x-1 transition"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 24 24"
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  </a>
</template>
