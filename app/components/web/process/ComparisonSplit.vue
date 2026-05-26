<script setup lang="ts">
import type {
  ComparisonColumn,
  SectionHeaderContent,
} from "../types";

defineProps<{
  header: SectionHeaderContent;
  sectionId?: string;
  left: ComparisonColumn;
  right: ComparisonColumn;
}>();
</script>

<template>
  <section
    :id="sectionId"
    class="max-w-5xl mx-auto px-5 sm:px-8 py-20 sm:py-28"
  >
    <div class="max-w-2xl mb-12 sm:mb-16 reveal">
      <WebUiSectionHeader v-bind="header" />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
      <!-- Left / without column — muted -->
      <article
        class="reveal rounded-2xl border border-zinc-200/70 dark:border-white/5 bg-zinc-100/60 dark:bg-white/[0.02] p-6 sm:p-8"
      >
        <h3
          class="font-display text-2xl font-bold text-zinc-500 line-through decoration-zinc-400/70"
        >
          {{ left.label }}
        </h3>
        <ul role="list" class="mt-6 space-y-3">
          <li
            v-for="(item, i) in left.items"
            :key="`l-${i}`"
            class="flex items-start gap-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-500"
          >
            <span
              aria-hidden="true"
              class="shrink-0 mt-0.5 grid place-items-center w-5 h-5 rounded-full bg-zinc-200/80 dark:bg-white/[0.04] text-zinc-400"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-3 h-3"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </span>
            <span>{{ item }}</span>
          </li>
        </ul>
      </article>

      <!-- Right / with column — soft purple highlight -->
      <article
        class="reveal rounded-2xl border border-brand-purple/20 bg-brand-purple/5 dark:bg-brand-purple/10 p-6 sm:p-8 shadow-soft"
      >
        <h3 class="font-display text-2xl font-bold text-ink dark:text-white">
          {{ right.label }}
        </h3>
        <ul role="list" class="mt-6 space-y-3">
          <li
            v-for="(item, i) in right.items"
            :key="`r-${i}`"
            class="flex items-start gap-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300"
          >
            <span
              aria-hidden="true"
              class="shrink-0 mt-0.5 grid place-items-center w-5 h-5 rounded-full bg-brand-green/15 text-brand-green border border-brand-green/30"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-3 h-3"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <span>{{ item }}</span>
          </li>
        </ul>
      </article>
    </div>
  </section>
</template>
