<script setup lang="ts">
import type { TechPill } from "../types";

withDefaults(
  defineProps<{
    eyebrow?: string;
    hint?: string;
    pills: TechPill[];
    contained?: boolean;
  }>(),
  { eyebrow: "/ tools I reach for daily", hint: "hover to pause →", contained: true },
);
</script>

<template>
  <section aria-label="Tech stack" class="border-y border-zinc-200/70 dark:border-white/5 bg-white/40 dark:bg-white/[0.02] py-10">
    <div class="max-w-6xl mx-auto px-5 sm:px-8 mb-6">
      <div class="flex items-center gap-3 text-xs font-mono text-zinc-500 dark:text-zinc-500">
        <span class="w-1.5 h-1.5 rounded-full bg-brand-green pulse-dot" />
        <span>{{ eyebrow }}</span>
        <span class="flex-1 h-px bg-zinc-200 dark:bg-white/5" />
        <span v-if="hint" class="hidden sm:inline text-zinc-400 dark:text-zinc-500">{{ hint }}</span>
      </div>
    </div>

    <div class="overflow-hidden marquee marquee-mask" :class="contained ? 'max-w-6xl mx-auto px-5 sm:px-8' : 'w-full'">
      <div class="marquee-track">
        <div class="flex items-center">
          <span v-for="p in pills" :key="`a-${p.name}`" class="tech-pill">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-html="p.svg" />
            {{ p.name }}
          </span>
        </div>
        <div class="flex items-center" aria-hidden="true">
          <span v-for="p in pills" :key="`b-${p.name}`" class="tech-pill">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-html="p.svg" />
            {{ p.name }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
