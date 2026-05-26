<script setup lang="ts">
import type { SectionHeaderContent, Faq } from "../types";

defineProps<{
  header: SectionHeaderContent;
  sectionId?: string;
  faqs: Faq[];
}>();
</script>

<template>
  <section :id="sectionId" class="max-w-4xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
    <div class="mb-12 reveal">
      <WebUiSectionHeader v-bind="header" />
    </div>

    <div class="divide-y divide-zinc-200 dark:divide-white/10 border-y border-zinc-200 dark:border-white/10">
      <details v-for="f in faqs" :key="f.q" class="group py-6 reveal">
        <summary class="flex items-center justify-between cursor-pointer list-none">
          <span class="font-display text-lg sm:text-xl font-semibold pr-6">{{ f.q }}</span>
          <span class="shrink-0 w-8 h-8 grid place-items-center rounded-full border border-zinc-200 dark:border-white/10 group-open:bg-brand-purple group-open:text-white group-open:border-brand-purple transition">
            <svg class="w-3 h-3 group-open:rotate-45 transition" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
          </span>
        </summary>
        <p class="mt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">{{ f.a }}</p>
      </details>
    </div>
  </section>
</template>
