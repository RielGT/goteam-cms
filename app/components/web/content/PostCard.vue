<script setup lang="ts">
import { computed } from "vue";
import type { Tone } from "../types";

const props = withDefaults(
  defineProps<{
    tag: string;
    tagTone?: Tone;
    date: string;
    dateISO?: string;
    readTime?: string;
    title: string;
    excerpt: string;
    href: string;
    image?: string;
    imageAlt?: string;
    featured?: boolean;
  }>(),
  {
    tagTone: "purple",
    dateISO: undefined,
    readTime: undefined,
    image: undefined,
    imageAlt: "",
    featured: false,
  },
);

const variant = computed<"text" | "image" | "featured">(() => {
  if (props.featured && props.image) return "featured";
  if (props.image) return "image";
  return "text";
});

const arrowText = "Read post";
</script>

<template>
  <!-- Featured / hero variant: full-bleed image with text overlay -->
  <a
    v-if="variant === 'featured'"
    :href="href"
    class="group relative block overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/10 shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-ink"
  >
    <div class="relative aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
      <img
        :src="image"
        :alt="imageAlt"
        loading="lazy"
        class="w-full h-full object-cover group-hover:scale-[1.03] transition duration-700"
      >
      <div class="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" aria-hidden="true" />
    </div>
    <div class="absolute bottom-0 left-0 right-0 p-6 sm:p-10 text-white">
      <div class="flex flex-wrap items-center gap-3 text-[11px] font-mono text-white/75">
        <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 text-white border border-white/25 backdrop-blur">{{ tag }}</span>
        <span class="w-1 h-1 rounded-full bg-white/40" aria-hidden="true" />
        <time :datetime="dateISO ?? date">{{ date }}</time>
        <template v-if="readTime">
          <span class="w-1 h-1 rounded-full bg-white/40" aria-hidden="true" />
          <span>{{ readTime }}</span>
        </template>
      </div>
      <h3 class="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-3xl">{{ title }}</h3>
      <p class="mt-3 text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl line-clamp-2">{{ excerpt }}</p>
      <span class="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-white">
        {{ arrowText }}
        <svg aria-hidden="true" class="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
      </span>
    </div>
  </a>

  <!-- With-image variant: side-by-side -->
  <a
    v-else-if="variant === 'image'"
    :href="href"
    class="group grid sm:grid-cols-5 rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-soft hover:border-brand-purple transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-ink"
  >
    <div class="sm:col-span-2 relative aspect-[16/10] sm:aspect-auto overflow-hidden bg-zinc-100 dark:bg-zinc-900">
      <img
        :src="image"
        :alt="imageAlt"
        loading="lazy"
        class="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500"
      >
      <WebUiBadge
        :label="tag"
        :tone="tagTone"
        :dot="false"
        class="absolute top-3 left-3 backdrop-blur"
      />
    </div>
    <div class="sm:col-span-3 p-6 sm:p-8 flex flex-col">
      <div class="flex items-center gap-2 text-[11px] font-mono text-zinc-500 dark:text-zinc-500">
        <time :datetime="dateISO ?? date">{{ date }}</time>
        <template v-if="readTime">
          <span class="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" aria-hidden="true" />
          <span>{{ readTime }}</span>
        </template>
      </div>
      <h3 class="mt-3 font-display text-xl sm:text-2xl font-bold leading-snug group-hover:text-brand-purple transition">{{ title }}</h3>
      <p class="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">{{ excerpt }}</p>
      <span class="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-purple">
        {{ arrowText }}
        <svg aria-hidden="true" class="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
      </span>
    </div>
  </a>

  <!-- Text-only variant -->
  <a
    v-else
    :href="href"
    class="group block p-7 sm:p-8 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-soft hover:border-brand-purple transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-ink"
  >
    <WebUiBadge :label="tag" :tone="tagTone" :dot="false" />
    <div class="mt-4 flex items-center gap-2 text-[11px] font-mono text-zinc-500 dark:text-zinc-500">
      <time :datetime="dateISO ?? date">{{ date }}</time>
      <template v-if="readTime">
        <span class="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" aria-hidden="true" />
        <span>{{ readTime }}</span>
      </template>
    </div>
    <h3 class="mt-3 font-display text-2xl font-bold leading-snug group-hover:text-brand-purple transition">{{ title }}</h3>
    <p class="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">{{ excerpt }}</p>
    <span class="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-purple">
      {{ arrowText }}
      <svg aria-hidden="true" class="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
    </span>
  </a>
</template>
