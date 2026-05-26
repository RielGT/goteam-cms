<script setup lang="ts">
import { computed } from "vue";
import type { Tone, BadgeContent } from "../types";

const props = withDefaults(
  defineProps<{
    eyebrow: string;
    eyebrowTone?: Tone;
    title: string;
    description?: string;
    badge?: BadgeContent;
  }>(),
  { eyebrowTone: "purple", description: undefined, badge: undefined },
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
  <section class="max-w-4xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-12 sm:pb-16">
    <div class="space-y-6">
      <WebUiBadge v-if="badge" v-bind="badge" />
      <p class="font-mono text-xs" :class="eyebrowClass">{{ eyebrow }}</p>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <h1
        class="font-display text-5xl sm:text-6xl font-bold leading-[1.05] text-ink dark:text-white"
        v-html="title"
      />
      <p
        v-if="description"
        class="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl"
      >
        {{ description }}
      </p>
    </div>
  </section>
</template>
