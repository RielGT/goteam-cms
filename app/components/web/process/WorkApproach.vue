<script setup lang="ts">
import type { SectionHeaderContent, ApproachStep, Tone } from "../types";

defineProps<{
  header: SectionHeaderContent;
  sectionId?: string;
  steps: ApproachStep[];
}>();

const numColor = (t: Tone) =>
  ({
    purple: "text-brand-purple/20 dark:text-brand-purple/30",
    green: "text-brand-green/20 dark:text-brand-green/30",
    orange: "text-brand-orange/20 dark:text-brand-orange/30",
  })[t];

const hoverBorder = (t: Tone) =>
  ({
    purple: "hover:border-brand-purple",
    green: "hover:border-brand-green",
    orange: "hover:border-brand-orange",
  })[t];
</script>

<template>
  <section :id="sectionId" class="bg-white/40 dark:bg-white/[0.02] border-y border-zinc-200/70 dark:border-white/5">
    <div class="max-w-6xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
      <div class="max-w-2xl mb-16 reveal">
        <WebUiSectionHeader v-bind="header" />
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <div
          v-for="s in steps"
          :key="s.num"
          class="reveal relative p-7 rounded-2xl border border-zinc-200 dark:border-white/10 bg-paper dark:bg-ink transition"
          :class="hoverBorder(s.tone)"
        >
          <span class="absolute -top-4 left-7 font-display text-5xl font-bold" :class="numColor(s.tone)">{{ s.num }}</span>
          <h3 class="font-display text-xl font-bold mt-4 mb-3">{{ s.title }}</h3>
          <p class="text-zinc-600 dark:text-zinc-400 text-[15px] leading-relaxed">{{ s.body }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
