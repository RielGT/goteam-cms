<script setup lang="ts">
import type { Tone } from "../types";

withDefaults(
  defineProps<{
    tag: string;
    tagTone?: Tone;
    date: string;
    dateISO?: string;
    readTime?: string;
    author?: string;
  }>(),
  { tagTone: "purple", dateISO: undefined, readTime: undefined, author: undefined },
);
</script>

<template>
  <div
    role="group"
    aria-label="article metadata"
    class="flex flex-wrap items-center gap-3 text-[11px] font-mono text-zinc-500 dark:text-zinc-400"
  >
    <WebUiBadge :label="tag" :tone="tagTone" :dot="false" />
    <span class="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" aria-hidden="true" />
    <time :datetime="dateISO ?? date">{{ date }}</time>
    <template v-if="readTime">
      <span class="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" aria-hidden="true" />
      <span>{{ readTime }}</span>
    </template>
    <template v-if="author">
      <span class="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" aria-hidden="true" />
      <span>by {{ author }}</span>
    </template>
  </div>
</template>
