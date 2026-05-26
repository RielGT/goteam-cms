<script setup lang="ts">
import type { BadgeContent, Cta, HeroImage, HeroCodeSnippet } from "../types";

defineProps<{
  availability?: BadgeContent;
  headline: string;
  subheadline?: string;
  ctas?: Cta[];
  image: HeroImage;
  codeSnippet?: HeroCodeSnippet;
  floatingBadge?: string;
}>();
</script>

<template>
  <section class="relative overflow-hidden">
    <div class="absolute inset-0 bg-grid opacity-60 pointer-events-none" />
    <div class="max-w-6xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-20 relative">
      <div class="grid lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-7 reveal">
          <WebUiBadge v-if="availability" v-bind="availability" />

          <h1
            class="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.02] mt-6"
            v-html="headline"
          />

          <p
            v-if="subheadline"
            class="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed"
          >
            {{ subheadline }}
          </p>

          <div v-if="ctas?.length" class="mt-9 flex flex-wrap items-center gap-4">
            <WebUiCta v-for="c in ctas" :key="c.href" v-bind="c" />
          </div>
        </div>

        <div class="lg:col-span-5 reveal relative">
          <div class="relative">
            <div class="relative rounded-3xl overflow-hidden aspect-[4/5] bg-gradient-to-br from-brand-purple/20 via-brand-green/10 to-brand-orange/20 border border-zinc-200 dark:border-white/10">
              <img
                :src="image.src"
                :alt="image.alt"
                class="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal"
                loading="lazy"
              >
              <div
                v-if="image.caption"
                class="absolute top-4 left-4 bg-paper dark:bg-ink text-ink dark:text-zinc-100 border border-zinc-200 dark:border-white/10 rounded-full px-3 py-1.5 text-xs font-mono shadow-soft"
              >
                {{ image.caption }}
              </div>
            </div>

            <div
              v-if="codeSnippet"
              class="hidden sm:block absolute -bottom-8 -left-8 w-64 rotate-[-3deg] rounded-xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-soft"
            >
              <div class="flex items-center gap-1.5 px-3 py-2 border-b border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-950">
                <span class="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span class="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span class="w-2.5 h-2.5 rounded-full bg-green-400" />
                <span class="ml-2 text-[10px] font-mono text-zinc-500">{{ codeSnippet.filename }}</span>
              </div>
              <pre class="text-[11px] font-mono p-3 leading-relaxed text-zinc-700 dark:text-zinc-300" v-html="codeSnippet.html" />
            </div>

            <div
              v-if="floatingBadge"
              class="hidden sm:flex absolute -top-6 -right-4 rotate-[6deg] items-center gap-2 bg-brand-orange text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-soft"
            >
              <span>{{ floatingBadge }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
