<script setup lang="ts">
import type { SectionHeaderContent, CaseStudySlide, Tone } from "../types";

const props = defineProps<{
  header: SectionHeaderContent;
  description?: string;
  sectionId?: string;
  slides: CaseStudySlide[];
}>();

const statColor = (t: Tone) =>
  ({ purple: "text-brand-purple", green: "text-brand-green", orange: "text-brand-orange" })[t];

const total = props.slides.length.toString().padStart(2, "0");
</script>

<template>
  <section :id="sectionId" class="max-w-6xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
    <div class="grid lg:grid-cols-12 gap-8 mb-10 items-end reveal">
      <div class="lg:col-span-8">
        <WebUiSectionHeader v-bind="header" />
      </div>
      <p v-if="description" class="lg:col-span-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">{{ description }}</p>
    </div>

    <div class="flex items-center justify-between mb-6 reveal">
      <div class="flex items-center gap-3 text-sm text-zinc-500">
        <span id="csCurrent" class="font-mono text-2xl font-bold text-ink dark:text-white">01</span>
        <span class="font-mono">/ <span id="csTotal">{{ total }}</span></span>
        <span class="hidden sm:block ml-3 text-xs font-mono text-zinc-400">— <span id="csTitle">{{ slides[0]?.title }}</span></span>
      </div>
      <div class="flex items-center gap-2">
        <button id="csPrev" aria-label="Previous case study" class="w-11 h-11 grid place-items-center rounded-full border border-zinc-200 dark:border-white/10 bg-paper dark:bg-ink hover:border-brand-purple hover:text-brand-purple transition disabled:opacity-40 disabled:cursor-not-allowed">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button id="csNext" aria-label="Next case study" class="w-11 h-11 grid place-items-center rounded-full border border-zinc-200 dark:border-white/10 bg-paper dark:bg-ink hover:border-brand-purple hover:text-brand-purple transition disabled:opacity-40 disabled:cursor-not-allowed">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </div>

    <div class="h-1 rounded-full bg-zinc-200/70 dark:bg-white/5 overflow-hidden mb-10 reveal">
      <div id="csProgress" class="h-full bg-gradient-to-r from-brand-purple to-brand-green transition-all duration-500" style="width:25%" />
    </div>

    <div class="cs-carousel relative -mx-5 sm:mx-0 overflow-hidden">
      <div id="csTrack" class="flex transition-transform duration-500 ease-out" style="will-change: transform;">
        <article
          v-for="s in slides"
          :key="s.title"
          class="cs-slide shrink-0 w-full px-5 sm:px-0"
          :data-title="s.title"
        >
          <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start rounded-2xl border border-zinc-200 dark:border-white/10 bg-paper dark:bg-ink p-6 sm:p-10 shadow-soft">
            <div class="lg:col-span-7 space-y-5">
              <div class="relative rounded-xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900">
                <img :src="s.image" :alt="s.alt" class="w-full aspect-[16/10] object-cover">
                <div class="absolute top-4 left-4 flex items-center gap-2">
                  <span class="text-[10px] font-mono px-2.5 py-1 rounded-full bg-paper/95 dark:bg-ink/95 backdrop-blur border border-zinc-200 dark:border-white/10">{{ s.tag }}</span>
                  <span class="text-[10px] font-mono px-2.5 py-1 rounded-full bg-brand-green/15 text-brand-green border border-brand-green/30">{{ s.status }}</span>
                </div>
              </div>
              <div class="grid grid-cols-3 gap-3">
                <div v-for="st in s.stats" :key="st.label" class="p-4 rounded-xl border border-zinc-200 dark:border-white/10">
                  <div class="font-display text-3xl font-bold" :class="statColor(st.tone ?? 'purple')">
                    <span class="cs-metric-num">{{ st.value }}</span>
                  </div>
                  <div class="text-[11px] font-mono text-zinc-500 mt-1">{{ st.label }}</div>
                </div>
              </div>
              <div class="flex flex-wrap gap-1.5">
                <span v-for="t in s.stack" :key="t" class="text-[11px] font-mono px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400">{{ t }}</span>
              </div>
            </div>

            <div class="lg:col-span-5 space-y-7">
              <div>
                <p class="font-mono text-xs text-brand-orange mb-2">→ the problem</p>
                <h3 class="font-display text-2xl font-bold mb-3">{{ s.problemTitle }}</h3>
                <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed text-[15px]">{{ s.problemBody }}</p>
              </div>
              <div>
                <p class="font-mono text-xs text-brand-purple mb-4">→ how it came together</p>
                <div class="space-y-6">
                  <div v-for="step in s.steps" :key="step.num" class="cs-step flex gap-4">
                    <span class="cs-step-dot">{{ step.num }}</span>
                    <div>
                      <h4 class="font-semibold text-sm mb-1">{{ step.title }}</h4>
                      <p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{{ step.body }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="p-5 rounded-xl bg-brand-purple/5 dark:bg-brand-purple/10 border border-brand-purple/20">
                <p class="font-mono text-xs text-brand-purple mb-2">→ the result</p>
                <p class="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{{ s.result }}</p>
              </div>
              <div class="flex items-center gap-4">
                <a href="#" class="inline-flex items-center gap-2 text-sm font-medium border-b border-current hover:text-brand-purple hover:border-brand-purple transition">
                  {{ s.primaryCta }}
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M7 17L17 7M7 7h10v10"/></svg>
                </a>
                <a href="#talk" class="text-sm font-medium text-brand-purple hover:underline">Build something like this →</a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>

    <div id="csDots" class="flex items-center justify-center gap-2 mt-8" />
  </section>
</template>
