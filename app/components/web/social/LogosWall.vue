<script setup lang="ts">
import { computed } from "vue";
import type { LogoItem } from "../types";

const props = withDefaults(
  defineProps<{
    sectionId?: string;
    eyebrow?: string;
    caption?: string;
    logos: LogoItem[];
    monochrome?: boolean;
  }>(),
  {
    sectionId: undefined,
    eyebrow: "/ teams I've shipped with",
    caption: undefined,
    monochrome: true,
  },
);

const logoClass = computed(() =>
  props.monochrome
    ? "h-7 w-auto max-w-[120px] opacity-70 hover:opacity-100 grayscale hover:grayscale-0 transition"
    : "h-7 w-auto max-w-[120px] opacity-80 hover:opacity-100 transition",
);
</script>

<template>
  <section
    :id="sectionId"
    class="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20"
    aria-label="Client logos"
  >
    <div
      class="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] px-6 sm:px-10 py-10"
    >
      <div
        v-if="eyebrow"
        class="flex items-center gap-3 mb-8 text-center sm:text-left justify-center sm:justify-start"
      >
        <span
          aria-hidden="true"
          class="hidden sm:block flex-1 h-px bg-zinc-200 dark:bg-white/5 max-w-12"
        />
        <p class="font-mono text-xs text-zinc-500">{{ eyebrow }}</p>
        <span
          aria-hidden="true"
          class="flex-1 h-px bg-zinc-200 dark:bg-white/5"
        />
      </div>

      <ul
        role="list"
        class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-8 items-center justify-items-center"
      >
        <li v-for="l in logos" :key="l.name" class="flex items-center">
          <a
            v-if="l.href"
            :href="l.href"
            :aria-label="l.name"
            rel="noopener"
            target="_blank"
            :class="logoClass"
          >
            <span aria-hidden="true" class="block h-full" v-html="l.svg" />
          </a>
          <span
            v-else
            role="img"
            :aria-label="l.name"
            :class="logoClass"
          >
            <span aria-hidden="true" class="block h-full" v-html="l.svg" />
          </span>
        </li>
      </ul>

      <p
        v-if="caption"
        class="text-xs font-mono text-zinc-500 text-center mt-8"
      >
        {{ caption }}
      </p>
    </div>
  </section>
</template>
