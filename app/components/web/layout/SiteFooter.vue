<script setup lang="ts">
import type { Brand, BadgeContent, FooterGroup, NavLink } from "../types";

withDefaults(
  defineProps<{
    brand: Brand;
    tagline?: string;
    availability?: BadgeContent;
    groups?: FooterGroup[];
    legal?: string;
    backToTop?: NavLink;
  }>(),
  {
    tagline: undefined,
    availability: undefined,
    groups: () => [],
    legal: undefined,
    backToTop: undefined,
  },
);
</script>

<template>
  <footer class="border-t border-zinc-200/70 dark:border-white/5">
    <div class="max-w-6xl mx-auto px-5 sm:px-8 py-14">
      <div class="grid md:grid-cols-3 gap-10 items-start">
        <div>
          <a :href="brand.href" class="font-display font-bold text-lg flex items-center gap-2">
            <span class="inline-block w-2.5 h-2.5 rounded-full bg-brand-green pulse-dot" />
            {{ brand.name }}<span class="text-brand-purple">{{ brand.accent }}</span>
          </a>
          <p v-if="tagline" class="mt-4 text-sm text-zinc-600 dark:text-zinc-400 max-w-xs">{{ tagline }}</p>
          <WebUiBadge v-if="availability" v-bind="availability" class="mt-5" />
        </div>

        <div v-for="g in groups" :key="g.eyebrow">
          <p class="font-mono text-xs text-zinc-500 mb-4">{{ g.eyebrow }}</p>
          <ul class="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            <li v-for="l in g.links" :key="l.href">
              <a
                :href="l.href"
                :target="l.external ? '_blank' : undefined"
                :rel="l.external ? 'noopener' : undefined"
                class="hover:text-brand-purple transition"
              >{{ l.label }}</a>
            </li>
          </ul>
        </div>
      </div>

      <div v-if="legal || backToTop" class="mt-12 pt-6 border-t border-zinc-200/70 dark:border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-zinc-500 font-mono">
        <p v-if="legal">{{ legal }}</p>
        <p v-if="backToTop">↑ <a :href="backToTop.href" class="hover:text-brand-purple transition">{{ backToTop.label }}</a></p>
      </div>
    </div>
  </footer>
</template>
