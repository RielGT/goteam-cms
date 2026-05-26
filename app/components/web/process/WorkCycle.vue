<script setup lang="ts">
import type { SectionHeaderContent, WorkCyclePanel, NavLink, Tone } from "../types";

defineProps<{
  header: SectionHeaderContent;
  sectionId?: string;
  panels: WorkCyclePanel[];
  cta?: NavLink;
  hint?: string;
}>();

const toneText: Record<Tone, string> = {
  purple: "text-brand-purple",
  green: "text-brand-green",
  orange: "text-brand-orange",
};
const toneBg: Record<Tone, string> = {
  purple: "bg-brand-purple/10 text-brand-purple",
  green: "bg-brand-green/10 text-brand-green",
  orange: "bg-brand-orange/10 text-brand-orange",
};
</script>

<template>
  <section :id="sectionId" class="relative overflow-hidden bg-white/40 dark:bg-white/[0.02] border-b border-zinc-200/70 dark:border-white/5">
    <div class="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
    <div class="relative max-w-6xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
      <div class="max-w-2xl mb-14 reveal">
        <WebUiSectionHeader v-bind="header" />
      </div>

      <div class="grid lg:grid-cols-12 gap-10 items-center">
        <div class="lg:col-span-5 reveal">
          <div id="pcWheel" class="relative aspect-square max-w-[480px] mx-auto">
            <div class="absolute inset-0 grid place-items-center pointer-events-none">
              <div class="text-center">
                <p class="font-mono text-[10px] text-zinc-400 mb-1">/ currently</p>
                <p id="pcHubLabel" class="font-display text-2xl font-bold text-ink dark:text-white">{{ panels[0]?.subtitle }}</p>
                <p id="pcHubMeta" class="font-mono text-[11px] text-brand-purple mt-1">phase {{ panels[0]?.num }} · {{ panels[0]?.tag }}</p>
              </div>
            </div>

            <svg viewBox="0 0 400 400" class="absolute inset-0 w-full h-full" aria-hidden="true">
              <defs>
                <linearGradient id="pcRing" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#8B5CF6"/>
                  <stop offset="50%" stop-color="#10B981"/>
                  <stop offset="100%" stop-color="#FB923C"/>
                </linearGradient>
              </defs>
              <circle cx="200" cy="200" r="168" fill="none" stroke="currentColor" class="text-zinc-200 dark:text-white/10" stroke-width="1.5" stroke-dasharray="3 6" vector-effect="non-scaling-stroke"/>
              <circle id="pcArc" cx="200" cy="200" r="168" fill="none" stroke="url(#pcRing)" stroke-width="3" stroke-linecap="round" stroke-dasharray="1055.6" stroke-dashoffset="1055.6" transform="rotate(-90 200 200)" vector-effect="non-scaling-stroke" style="transition: stroke-dashoffset .8s cubic-bezier(.2,.7,.2,1), stroke .4s ease;"/>
              <line id="pcSpoke" x1="200" y1="200" x2="200" y2="200" stroke="currentColor" class="text-brand-purple" stroke-width="1.5" stroke-dasharray="3 4" opacity="0.5" style="transition: all .6s ease;"/>
            </svg>

            <div id="pcNodes" class="absolute inset-0" />
          </div>

          <div class="mt-8 flex items-center justify-center gap-3">
            <button id="pcPrev" aria-label="Previous phase" class="w-9 h-9 grid place-items-center rounded-full border border-zinc-200 dark:border-white/10 hover:border-brand-purple hover:text-brand-purple transition">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button id="pcAuto" class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono border border-zinc-200 dark:border-white/10 hover:border-brand-purple hover:text-brand-purple transition">
              <svg id="pcAutoIcon" class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              <span id="pcAutoLabel">Spin the cycle</span>
            </button>
            <button id="pcNext" aria-label="Next phase" class="w-9 h-9 grid place-items-center rounded-full border border-zinc-200 dark:border-white/10 hover:border-brand-purple hover:text-brand-purple transition">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>

        <div class="lg:col-span-7 reveal">
          <div class="relative rounded-2xl border border-zinc-200 dark:border-white/10 bg-paper dark:bg-ink shadow-soft overflow-hidden min-h-[460px]">
            <div class="flex items-center gap-1 px-6 pt-5 pb-3 border-b border-zinc-200/70 dark:border-white/5 overflow-x-auto">
              <span id="pcCrumbs" class="flex items-center gap-1 text-[11px] font-mono text-zinc-400 whitespace-nowrap" />
            </div>

            <div id="pcContent" class="p-7 sm:p-9">
              <article
                v-for="(panel, idx) in panels"
                :key="panel.title"
                :data-pc-panel="idx"
                class="pc-panel"
                :class="idx !== 0 ? 'hidden' : ''"
              >
                <div class="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p class="font-mono text-[11px]" :class="toneText[panel.tone]">phase {{ panel.num }} · {{ panel.subtitle }}</p>
                    <h3 class="font-display text-3xl font-bold mt-1">{{ panel.title }}</h3>
                  </div>
                  <span class="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono" :class="toneBg[panel.tone]">{{ panel.tag }}</span>
                </div>
                <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6" v-html="panel.body" />
                <div class="grid sm:grid-cols-2 gap-3">
                  <div v-for="card in panel.cards" :key="card.label" class="p-4 rounded-xl border border-zinc-200 dark:border-white/10">
                    <p class="text-[11px] font-mono text-zinc-400 mb-1">{{ card.label }}</p>
                    <p class="text-sm">{{ card.text }}</p>
                  </div>
                </div>
              </article>
            </div>

            <div class="px-6 py-3 border-t border-zinc-200/70 dark:border-white/5 flex items-center justify-between gap-4 text-[11px] font-mono text-zinc-500">
              <span v-if="hint" class="hidden sm:inline">{{ hint }}</span>
              <a v-if="cta" :href="cta.href" class="inline-flex items-center gap-1.5 text-brand-purple hover:underline">{{ cta.label }} →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
