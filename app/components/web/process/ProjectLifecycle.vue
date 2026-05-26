<script setup lang="ts">
import type {
  SectionHeaderContent,
  LifecycleStep,
  LifecyclePanel,
  LifecycleArtifact,
  StatItem,
  Cta,
  Tone,
} from "../types";

defineProps<{
  header: SectionHeaderContent;
  sectionId?: string;
  steps: LifecycleStep[];
  panels: LifecyclePanel[];
  artifacts: LifecycleArtifact[];
  stats: StatItem[];
  footer?: { title: string; subtitle: string; cta: Cta };
}>();

const toneBg: Record<Tone, string> = {
  purple: "bg-brand-purple/10 text-brand-purple",
  green: "bg-brand-green/10 text-brand-green",
  orange: "bg-brand-orange/10 text-brand-orange",
};
const toneDot: Record<Tone, string> = {
  purple: "bg-brand-purple",
  green: "bg-brand-green",
  orange: "bg-brand-orange",
};
const toneText: Record<Tone, string> = {
  purple: "text-brand-purple",
  green: "text-brand-green",
  orange: "text-brand-orange",
};
</script>

<template>
  <section :id="sectionId" class="relative overflow-hidden border-y border-zinc-200/70 dark:border-white/5 bg-paper dark:bg-ink">
    <div class="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
    <div class="absolute -top-32 -left-24 w-96 h-96 rounded-full bg-brand-purple/10 blur-3xl pointer-events-none" />
    <div class="absolute -bottom-32 -right-24 w-96 h-96 rounded-full bg-brand-green/10 blur-3xl pointer-events-none" />

    <div class="relative max-w-6xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
      <div class="max-w-2xl mb-12 reveal">
        <WebUiSectionHeader v-bind="header" />
      </div>

      <div id="lcRail" class="relative mb-10 pt-2">
        <div class="hidden sm:block absolute top-1/2 -translate-y-1/2 h-1 rounded-full bg-zinc-200 dark:bg-white/10 overflow-hidden" style="left: 8.333%; right: 8.333%;">
          <div id="lcProgress" class="h-full bg-gradient-to-r from-brand-purple via-brand-green to-brand-orange transition-all duration-700 ease-out" style="width: 0%" />
        </div>

        <div role="tablist" aria-label="Project lifecycle phases" class="relative grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-2">
          <button
            v-for="(p, idx) in steps"
            :key="p.label"
            role="tab"
            :data-lc-step="idx"
            :aria-selected="idx === 0 ? 'true' : 'false'"
            class="lc-step group flex flex-col items-center gap-2 focus:outline-none"
          >
            <span
              class="lc-dot relative w-12 h-12 rounded-full grid place-items-center font-mono text-xs font-semibold border-2 bg-paper dark:bg-ink shadow-soft transition-all"
              :class="idx === 0 ? 'border-brand-purple text-brand-purple' : 'border-zinc-300 dark:border-white/15 text-zinc-500 dark:text-zinc-400'"
            >{{ p.num }}</span>
            <span
              class="lc-label text-[11px] sm:text-xs font-mono text-center"
              :class="idx === 0 ? 'text-ink dark:text-white font-semibold' : 'text-zinc-500 dark:text-zinc-400 transition'"
            >{{ p.label }}</span>
          </button>
        </div>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-4 mb-6 reveal">
        <div class="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
          <span id="lcPhaseIndex" class="text-brand-purple font-semibold">01</span>
          <span>/</span>
          <span>{{ String(steps.length).padStart(2, "0") }}</span>
          <span class="mx-2 text-zinc-300 dark:text-white/20">•</span>
          <span id="lcPhaseDuration">{{ panels[0]?.duration }}</span>
        </div>
        <div class="flex items-center gap-2">
          <button id="lcAutoplay" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border border-zinc-200 dark:border-white/10 hover:border-brand-purple hover:text-brand-purple transition">
            <svg id="lcAutoplayIcon" class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            <span id="lcAutoplayLabel">Autoplay</span>
          </button>
          <button id="lcPrev" aria-label="Previous phase" class="w-8 h-8 grid place-items-center rounded-full border border-zinc-200 dark:border-white/10 hover:border-brand-purple hover:text-brand-purple transition">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button id="lcNext" aria-label="Next phase" class="w-8 h-8 grid place-items-center rounded-full border border-zinc-200 dark:border-white/10 hover:border-brand-purple hover:text-brand-purple transition">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>

      <div class="grid lg:grid-cols-12 gap-6">
        <div class="lg:col-span-7 reveal">
          <div id="lcPanels" class="relative rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 p-7 sm:p-9 shadow-soft min-h-[420px] overflow-hidden">
            <article
              v-for="(panel, idx) in panels"
              :key="panel.title"
              :data-lc-panel="idx"
              class="lc-panel"
              :class="idx !== 0 ? 'hidden' : ''"
            >
              <div class="flex items-center gap-2 mb-4">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono" :class="toneBg[panel.tone]">
                  <span class="w-1.5 h-1.5 rounded-full" :class="toneDot[panel.tone]" /> phase {{ panel.num }}
                </span>
                <span class="text-[11px] font-mono text-zinc-400">{{ panel.duration }}</span>
              </div>
              <h3 class="font-display text-2xl sm:text-3xl font-bold mb-3">{{ panel.title }}</h3>
              <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5">{{ panel.body }}</p>
              <ul class="space-y-2.5 text-sm">
                <li v-for="b in panel.bullets" :key="b.text" class="flex gap-3">
                  <span class="font-mono mt-0.5" :class="toneText[panel.tone]">→</span>
                  <span class="text-zinc-700 dark:text-zinc-300">
                    <strong class="text-ink dark:text-white">{{ b.label }}</strong> {{ b.text }}
                  </span>
                </li>
              </ul>
            </article>
          </div>
        </div>

        <div class="lg:col-span-5 reveal">
          <div class="rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-950 text-zinc-100 shadow-soft overflow-hidden">
            <div class="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.03]">
              <div class="flex items-center gap-1.5">
                <span class="w-3 h-3 rounded-full bg-red-400/80" />
                <span class="w-3 h-3 rounded-full bg-yellow-400/80" />
                <span class="w-3 h-3 rounded-full bg-green-400/80" />
              </div>
              <div id="lcArtifactTitle" class="text-[11px] font-mono text-zinc-400 truncate">{{ artifacts[0]?.filename }}</div>
              <div class="text-[10px] font-mono text-zinc-500">live</div>
            </div>

            <div class="relative p-5 sm:p-6 font-mono text-[12.5px] leading-relaxed min-h-[420px]">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <pre
                v-for="(a, idx) in artifacts"
                :key="a.filename"
                :data-lc-artifact="idx"
                class="lc-artifact whitespace-pre-wrap text-zinc-300"
                :class="idx !== 0 ? 'hidden' : ''"
                v-html="a.html"
              />
            </div>
          </div>

          <div class="mt-5 grid grid-cols-3 gap-3">
            <div v-for="(s, i) in stats" :key="s.label" class="p-4 rounded-xl border border-zinc-200 dark:border-white/10 bg-paper dark:bg-ink">
              <div :id="`lcStat${i + 1}`" class="font-display text-2xl font-bold text-ink dark:text-white">{{ s.value }}</div>
              <div class="text-[11px] font-mono text-zinc-500 mt-1">{{ s.label }}</div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="footer" class="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/60 dark:bg-white/[0.03] reveal">
        <div>
          <p class="font-display text-lg font-semibold">{{ footer.title }}</p>
          <p class="text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">{{ footer.subtitle }}</p>
        </div>
        <a
          :href="footer.cta.href"
          class="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-ink text-white dark:bg-white dark:text-ink font-medium hover:bg-brand-purple dark:hover:bg-brand-purple dark:hover:text-white transition shadow-soft"
        >
          {{ footer.cta.label }}
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </a>
      </div>
    </div>
  </section>
</template>
