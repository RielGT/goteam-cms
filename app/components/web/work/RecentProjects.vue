<script setup lang="ts">
import type { SectionHeaderContent, Project, NavLink, Tone } from "../types";

defineProps<{
  header: SectionHeaderContent;
  sectionId?: string;
  projects: Project[];
  secondaryLink?: NavLink;
}>();

const toneClass = (t: Tone) =>
  ({ purple: "text-brand-purple", green: "text-brand-green", orange: "text-brand-orange" })[t];
</script>

<template>
  <section :id="sectionId" class="max-w-6xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
    <div class="flex items-end justify-between mb-14 reveal">
      <WebUiSectionHeader v-bind="header" />
      <a
        v-if="secondaryLink"
        :href="secondaryLink.href"
        class="hidden sm:inline-flex text-sm font-medium hover:text-brand-purple transition"
      >{{ secondaryLink.label }} →</a>
    </div>

    <div class="space-y-24">
      <article
        v-for="p in projects"
        :key="p.number"
        class="project-card grid lg:grid-cols-12 gap-8 lg:gap-14 items-center reveal"
      >
        <div class="lg:col-span-7" :class="p.reverse ? 'order-2 lg:order-1' : ''">
          <div class="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-soft">
            <img :src="p.image" :alt="p.alt" class="w-full aspect-[16/10] object-cover" loading="lazy">
          </div>
        </div>
        <div class="lg:col-span-5" :class="p.reverse ? 'order-1 lg:order-2' : ''">
          <p class="font-mono text-xs mb-2" :class="toneClass(p.categoryTone)">{{ p.number }} — {{ p.category }}</p>
          <h3 class="font-display text-3xl font-bold mb-3">{{ p.title }}</h3>
          <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5">{{ p.description }}</p>
          <ul class="text-sm space-y-2 mb-6">
            <li v-for="b in p.bullets" :key="b" class="flex gap-3 text-zinc-700 dark:text-zinc-300">
              <span class="text-brand-purple font-mono">→</span> {{ b }}
            </li>
          </ul>
          <div class="flex items-center gap-4">
            <a href="#" class="inline-flex items-center gap-2 text-sm font-medium border-b border-current hover:text-brand-purple hover:border-brand-purple transition">
              {{ p.cta }}
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M7 17L17 7M7 7h10v10"/></svg>
            </a>
            <span v-if="p.meta" class="text-xs font-mono text-zinc-500">{{ p.meta }}</span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
