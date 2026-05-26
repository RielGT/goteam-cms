<script setup lang="ts">
import type { PostCardData } from "../types";

withDefaults(
  defineProps<{
    header?: string;
    items: PostCardData[];
  }>(),
  { header: "/ more like this" },
);

// Strip `id` before spreading onto PostCard. PostCard has a multi-root
// template (v-if/v-else-if/v-else) so fallthrough attrs there cause
// SSR/client hydration mismatches.
const cardProps = (item: PostCardData) => {
  const { id: _id, ...rest } = item;
  return { ...rest, featured: false };
};
</script>

<template>
  <section
    v-if="items.length"
    aria-labelledby="related-heading"
    class="border-t border-zinc-200 dark:border-white/10"
  >
    <div class="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
      <div class="flex items-end justify-between mb-10">
        <div>
          <p class="font-mono text-xs text-brand-purple mb-3">{{ header }}</p>
          <h2
            id="related-heading"
            class="font-display text-3xl sm:text-4xl font-bold leading-tight text-ink dark:text-white"
          >
            Keep reading.
          </h2>
        </div>
      </div>

      <div class="lg:hidden -mx-5 px-5 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4">
        <div
          v-for="item in items"
          :key="item.id"
          class="snap-start shrink-0 w-[85%]"
        >
          <WebContentPostCard v-bind="cardProps(item)" />
        </div>
      </div>

      <div class="hidden lg:grid lg:grid-cols-3 gap-8">
        <WebContentPostCard
          v-for="item in items"
          :key="item.id"
          v-bind="cardProps(item)"
        />
      </div>
    </div>
  </section>
</template>
