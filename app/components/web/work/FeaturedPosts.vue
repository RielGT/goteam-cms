<script setup lang="ts">
import type { SectionHeaderContent, Post, NavLink } from "../types";

defineProps<{
  header: SectionHeaderContent;
  sectionId?: string;
  posts: Post[];
  seeAll?: NavLink;
}>();
</script>

<template>
  <section :id="sectionId" class="border-y border-zinc-200/70 dark:border-white/5 bg-white/40 dark:bg-white/[0.02]">
    <div class="max-w-6xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
      <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 reveal">
        <WebUiSectionHeader v-bind="header" />
        <div class="flex items-center gap-2 shrink-0">
          <button id="fpPrev" aria-label="Previous posts" class="w-11 h-11 grid place-items-center rounded-full border border-zinc-200 dark:border-white/10 bg-paper dark:bg-ink hover:border-brand-purple hover:text-brand-purple transition disabled:opacity-40 disabled:cursor-not-allowed">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button id="fpNext" aria-label="Next posts" class="w-11 h-11 grid place-items-center rounded-full border border-zinc-200 dark:border-white/10 bg-paper dark:bg-ink hover:border-brand-purple hover:text-brand-purple transition disabled:opacity-40 disabled:cursor-not-allowed">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>

      <div class="overflow-hidden -mx-2 reveal">
        <div id="fpTrack" class="fp-track">
          <div v-for="p in posts" :key="p.title" class="fp-slide">
            <a href="#" class="fp-card group block h-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 hover:border-brand-purple transition shadow-soft">
              <div class="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                <img :src="p.image" alt="" class="w-full h-full object-cover" loading="lazy">
                <span class="absolute top-3 left-3 text-[10px] font-mono px-2.5 py-1 rounded-full bg-paper/95 dark:bg-ink/95 backdrop-blur border border-zinc-200 dark:border-white/10">{{ p.tag }}</span>
              </div>
              <div class="p-6">
                <div class="flex items-center gap-2 text-[11px] font-mono text-zinc-500 mb-3">
                  <span>{{ p.date }}</span>
                  <span class="w-1 h-1 rounded-full bg-zinc-400" />
                  <span>{{ p.readTime }}</span>
                </div>
                <h3 class="font-display text-xl font-bold leading-snug group-hover:text-brand-purple transition">{{ p.title }}</h3>
                <p class="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{{ p.excerpt }}</p>
                <span class="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-purple">Read post
                  <svg class="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between gap-4 mt-10">
        <div id="fpDots" class="flex items-center gap-2" />
        <a v-if="seeAll" :href="seeAll.href" class="inline-flex items-center gap-2 text-sm font-medium hover:text-brand-purple transition">{{ seeAll.label }} →</a>
      </div>
    </div>
  </section>
</template>
