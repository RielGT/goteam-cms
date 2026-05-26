<script setup lang="ts">
import type { SectionHeaderContent, Testimonial, WideTestimonial } from "../types";

defineProps<{
  header: SectionHeaderContent;
  sectionId?: string;
  featured: Testimonial;
  secondary?: Testimonial[];
  wide?: WideTestimonial;
}>();
</script>

<template>
  <section :id="sectionId" class="max-w-6xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
    <div class="mb-14 reveal">
      <WebUiSectionHeader v-bind="header" />
    </div>

    <div class="grid lg:grid-cols-3 gap-6">
      <figure class="reveal lg:col-span-2 p-8 sm:p-10 rounded-2xl bg-brand-purple text-white relative overflow-hidden">
        <svg class="absolute top-6 right-6 w-16 h-16 opacity-15" viewBox="0 0 24 24" fill="currentColor"><path d="M7 7h4v4H7v4H3V11a4 4 0 0 1 4-4zm10 0h4v4h-4v4h-4V11a4 4 0 0 1 4-4z"/></svg>
        <blockquote class="font-display text-2xl sm:text-3xl leading-snug">"{{ featured.quote }}"</blockquote>
        <figcaption class="mt-8 flex items-center gap-4">
          <img :src="featured.avatar" class="w-12 h-12 rounded-full border-2 border-white/30" :alt="featured.name">
          <div>
            <div class="font-semibold">{{ featured.name }}</div>
            <div class="text-sm text-white/85">{{ featured.role }}</div>
          </div>
        </figcaption>
      </figure>

      <figure
        v-for="t in secondary"
        :key="t.name"
        class="reveal p-8 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900"
      >
        <blockquote class="font-display text-xl leading-snug">"{{ t.quote }}"</blockquote>
        <figcaption class="mt-6 flex items-center gap-3">
          <img :src="t.avatar" class="w-10 h-10 rounded-full" :alt="t.name">
          <div>
            <div class="font-semibold text-sm">{{ t.name }}</div>
            <div class="text-xs text-zinc-500">{{ t.role }}</div>
          </div>
        </figcaption>
      </figure>

      <figure
        v-if="wide"
        class="reveal lg:col-span-3 p-8 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 flex flex-col md:flex-row gap-8 items-start"
      >
        <div class="md:flex-1">
          <blockquote class="font-display text-xl leading-snug">"{{ wide.quote }}"</blockquote>
          <figcaption class="mt-6 flex items-center gap-3">
            <img :src="wide.author.avatar" class="w-10 h-10 rounded-full" :alt="wide.author.name">
            <div>
              <div class="font-semibold text-sm">{{ wide.author.name }}</div>
              <div class="text-xs text-zinc-500">{{ wide.author.role }}</div>
            </div>
          </figcaption>
        </div>
        <div v-if="wide.chat" class="md:w-72 shrink-0 rounded-xl border border-zinc-200 dark:border-white/10 p-4 bg-zinc-50 dark:bg-zinc-950 font-mono text-xs">
          <div class="flex items-center gap-2 mb-2">
            <span class="w-2 h-2 rounded-full bg-brand-green" />
            <span class="font-semibold">{{ wide.chat.handle }}</span>
            <span class="text-zinc-500">{{ wide.chat.time }}</span>
          </div>
          <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed">{{ wide.chat.message }}</p>
        </div>
      </figure>
    </div>
  </section>
</template>
