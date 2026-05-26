<script setup lang="ts">
import { computed, useId } from "vue";
import type { Cta, FeatureTab, SectionHeaderContent, Tone } from "../types";

const props = withDefaults(
  defineProps<{
    header: SectionHeaderContent;
    sectionId?: string;
    tabs: FeatureTab[];
    activeTone?: Tone;
    imageAspect?: "4/5" | "16/10";
    imageOrder?: "left" | "right";
    ctas?: Cta[];
  }>(),
  {
    sectionId: undefined,
    activeTone: "purple",
    imageAspect: "4/5",
    imageOrder: "left",
    ctas: undefined,
  },
);

// Unique ID base so two instances of FeatureTabs on one page do not collide
// on Preline's data-hs-tab anchor wiring.
const uid = useId();
const tabId = (i: number) => `${uid}-feature-tab-${i}`;
const panelId = (i: number) => `${uid}-feature-panel-${i}`;

const indicatorClass = computed(
  () =>
    ({
      purple: "bg-brand-purple",
      green: "bg-brand-green",
      orange: "bg-brand-orange",
    })[props.activeTone],
);

const aspectClass = computed(() =>
  props.imageAspect === "16/10" ? "aspect-[16/10]" : "aspect-[4/5]",
);

// Desktop column order. Tabs default to opposite side of the image.
const imageOrderClass = computed(() =>
  props.imageOrder === "left" ? "lg:order-1" : "lg:order-2",
);
const tabsOrderClass = computed(() =>
  props.imageOrder === "left" ? "lg:order-2" : "lg:order-1",
);
</script>

<template>
  <section
    :id="sectionId"
    class="max-w-6xl mx-auto px-5 sm:px-8 py-24 sm:py-32"
  >
    <div class="max-w-2xl mb-12 sm:mb-16 reveal">
      <WebUiSectionHeader v-bind="header" />
    </div>

    <!-- 12-col layout: image (6) + tabs (6), image-left by default. -->
    <div class="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
      <!-- Image column -->
      <div class="mb-10 lg:mb-0 lg:col-span-6" :class="imageOrderClass">
        <div
          v-for="(t, i) in tabs"
          :id="panelId(i)"
          :key="`panel-${i}`"
          :class="i === 0 ? '' : 'hidden'"
          role="tabpanel"
          :aria-labelledby="tabId(i)"
        >
          <div
            class="overflow-hidden rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-soft"
            :class="aspectClass"
          >
            <img
              :src="t.image"
              :alt="t.imageAlt"
              loading="lazy"
              class="w-full h-full object-cover"
            >
          </div>
        </div>
      </div>

      <!-- Tabs column -->
      <div class="lg:col-span-6" :class="tabsOrderClass">
        <nav
          class="grid gap-3 sm:gap-4"
          aria-label="Feature tabs"
          role="tablist"
          aria-orientation="vertical"
        >
          <button
            v-for="(t, i) in tabs"
            :id="tabId(i)"
            :key="`tab-${i}`"
            type="button"
            :class="[
              'hs-tab-active:bg-white dark:hs-tab-active:bg-zinc-900',
              'hs-tab-active:shadow-soft hs-tab-active:border-transparent',
              'text-start hover:bg-zinc-50 dark:hover:bg-white/[0.04]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/40 focus-visible:ring-offset-2 focus-visible:ring-offset-paper dark:focus-visible:ring-offset-ink',
              'p-4 md:p-5 rounded-2xl border border-transparent',
              'transition-colors duration-200',
              i === 0 ? 'active' : '',
            ]"
            :aria-selected="i === 0 ? 'true' : 'false'"
            :data-hs-tab="`#${panelId(i)}`"
            :aria-controls="panelId(i)"
            role="tab"
          >
            <span class="flex gap-x-5">
              <!-- Active accent indicator -->
              <span
                aria-hidden="true"
                :class="[
                  'shrink-0 w-1 self-stretch rounded-full',
                  'opacity-0 hs-tab-active:opacity-100 transition-opacity',
                  indicatorClass,
                ]"
              />

              <!-- Optional icon -->
              <span
                v-if="t.icon"
                aria-hidden="true"
                class="shrink-0 mt-1 w-6 h-6 md:w-7 md:h-7 text-zinc-500 hs-tab-active:text-ink dark:hs-tab-active:text-white transition-colors"
                v-html="t.icon"
              />

              <span class="grow">
                <span
                  class="block text-lg font-display font-semibold text-zinc-600 dark:text-zinc-400 hs-tab-active:text-ink dark:hs-tab-active:text-white transition-colors"
                >
                  {{ t.title }}
                </span>
                <span
                  class="block mt-1 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed"
                >
                  {{ t.body }}
                </span>
              </span>
            </span>
          </button>
        </nav>

        <div
          v-if="ctas?.length"
          class="mt-9 flex flex-wrap items-center gap-4"
        >
          <WebUiCta v-for="c in ctas" :key="c.href" v-bind="c" />
        </div>
      </div>
    </div>
  </section>
</template>
