<script setup lang="ts">
import { computed } from "vue";
import type { ProsePart } from "../types";

const props = defineProps<{
  parts: ProsePart[];
}>();

const partClass = (emphasis?: ProsePart["emphasis"]) => {
  switch (emphasis) {
    case "muted":
      return "text-zinc-500 dark:text-zinc-500";
    case "highlight":
      return "text-brand-purple font-semibold";
    case "accent":
      return "text-brand-orange font-semibold";
    default:
      return "";
  }
};

const renderedParts = computed(() => props.parts);
</script>

<template>
  <section class="border-y border-zinc-200/70 dark:border-white/5 bg-white/40 dark:bg-white/[0.02]">
    <div class="max-w-4xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
      <p class="font-display text-2xl sm:text-4xl leading-snug reveal">
        <template v-for="(part, i) in renderedParts" :key="i"><span :class="partClass(part.emphasis)">{{ part.text }}</span><template v-if="i < renderedParts.length - 1"> </template></template>
      </p>
    </div>
  </section>
</template>
