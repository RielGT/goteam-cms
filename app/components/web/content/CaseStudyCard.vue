<script setup lang="ts">
import type { StatItem, Tone } from "../types";

withDefaults(
  defineProps<{
    title: string;
    tag: string;
    status?: string;
    image?: string;
    imageAlt?: string;
    stats?: StatItem[];
    stack?: string[];
    excerpt: string;
    href: string;
    featured?: boolean;
  }>(),
  {
    status: undefined,
    image: undefined,
    imageAlt: "",
    stats: () => [],
    stack: () => [],
    featured: false,
  },
);

const toneRotation: Tone[] = ["purple", "green", "orange"];
</script>

<template>
  <article
    class="group rounded-2xl border border-zinc-200 dark:border-white/10 bg-paper dark:bg-ink p-6 sm:p-8 shadow-soft hover:border-brand-purple transition relative overflow-hidden"
    :class="featured ? 'lg:p-10' : ''"
  >
    <div
      v-if="featured"
      class="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-purple/5 via-transparent to-brand-orange/5"
      aria-hidden="true"
    />
    <p
      v-if="featured"
      class="relative font-mono text-xs text-brand-purple mb-4"
    >/ featured case study</p>

    <div
      class="relative grid gap-6 lg:gap-8 items-start"
      :class="featured ? 'lg:grid-cols-12' : 'lg:grid-cols-5'"
    >
      <a
        v-if="image"
        :href="href"
        tabindex="-1"
        aria-hidden="true"
        class="block relative rounded-xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900"
        :class="featured ? 'lg:col-span-7' : 'lg:col-span-2'"
      >
        <img
          :src="image"
          :alt="imageAlt"
          loading="lazy"
          class="w-full aspect-[16/10] object-cover group-hover:scale-[1.02] transition duration-500"
        >
        <div class="absolute top-3 left-3 flex items-center gap-2">
          <span class="text-[10px] font-mono px-2.5 py-1 rounded-full bg-paper/95 dark:bg-ink/95 backdrop-blur border border-zinc-200 dark:border-white/10">{{ tag }}</span>
          <WebUiBadge v-if="status" :label="status" tone="green" />
        </div>
      </a>

      <div
        class="space-y-5"
        :class="image ? (featured ? 'lg:col-span-5' : 'lg:col-span-3') : 'lg:col-span-12'"
      >
        <h3
          class="font-display font-bold leading-snug text-ink dark:text-white"
          :class="featured ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'"
        >
          <a
            :href="href"
            class="group-hover:text-brand-purple dark:group-hover:text-brand-purple transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-ink rounded-sm"
          >{{ title }}</a>
        </h3>
        <p class="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">{{ excerpt }}</p>

        <div v-if="stats?.length" class="grid grid-cols-3 gap-3">
          <WebUiStat
            v-for="(s, i) in stats.slice(0, 3)"
            :key="s.label"
            :value="s.value"
            :label="s.label"
            :tone="s.tone ?? toneRotation[i]"
            bordered
          />
        </div>

        <div v-if="stack?.length" class="flex flex-wrap gap-1.5">
          <span
            v-for="t in stack"
            :key="t"
            class="text-[11px] font-mono px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-white/10 text-zinc-600 dark:text-zinc-300"
          >{{ t }}</span>
        </div>

        <a
          :href="href"
          class="inline-flex items-center gap-2 text-sm font-medium border-b border-current hover:text-brand-purple hover:border-brand-purple transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-ink rounded-sm"
        >
          Read the deep dive
          <svg aria-hidden="true" class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
        </a>
      </div>
    </div>
  </article>
</template>
