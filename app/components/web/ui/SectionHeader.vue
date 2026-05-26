<script setup lang="ts">
import { computed } from "vue";
import type { Tone } from "../types";

const props = withDefaults(
  defineProps<{
    eyebrow: string;
    eyebrowTone?: Tone;
    title: string;
    description?: string;
  }>(),
  { eyebrowTone: "purple", description: undefined },
);

const eyebrowClass = computed(
  () =>
    ({
      purple: "text-brand-purple",
      green: "text-brand-green",
      orange: "text-brand-orange",
    })[props.eyebrowTone ?? "purple"],
);
</script>

<template>
  <div>
    <p class="font-mono text-xs mb-3" :class="eyebrowClass">{{ eyebrow }}</p>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <h2
      class="font-display text-4xl sm:text-5xl font-bold leading-tight"
      v-html="title"
    />
    <p v-if="description" class="mt-4 text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
      {{ description }}
    </p>
  </div>
</template>
