<script setup lang="ts">
import type { BadgeContent, Cta, StatItem, LinkedInCard, NavLink } from "../types";

withDefaults(
  defineProps<{
    eyebrow?: BadgeContent;
    headline: string;
    body?: string;
    primaryCta: Cta;
    secondaryLink?: NavLink;
    stats?: StatItem[];
    card: LinkedInCard;
    cardCallout?: string;
    avatarHref?: string;
    connectHref?: string;
    messageHref?: string;
  }>(),
  {
    avatarHref: "#",
    connectHref: "#",
    messageHref: "#",
    eyebrow: undefined,
    body: undefined,
    secondaryLink: undefined,
    stats: undefined,
    cardCallout: undefined,
  },
);
</script>

<template>
  <section class="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
    <div class="relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-white/10 bg-ink dark:bg-zinc-900 p-8 sm:p-14">
      <div class="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div class="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-brand-purple/30 blur-3xl pointer-events-none" />
      <div class="absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-brand-green/20 blur-3xl pointer-events-none" />

      <div class="relative grid lg:grid-cols-12 gap-10 items-center">
        <div class="lg:col-span-7 text-white reveal">
          <div v-if="eyebrow" class="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full bg-white/10 text-white border border-white/15 mb-6">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3v9zM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.78 1.78 0 0 1-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a.66.66 0 0 0 0 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66l.04 5.44z"/></svg>
            {{ eyebrow.label }}
          </div>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <h2
            class="font-display text-4xl sm:text-5xl font-bold leading-tight"
            v-html="headline"
          />
          <p v-if="body" class="mt-5 text-lg text-white/70 max-w-xl leading-relaxed">{{ body }}</p>

          <div class="mt-8 flex flex-wrap items-center gap-4">
            <a
              :href="primaryCta.href"
              :target="primaryCta.external ? '_blank' : undefined"
              :rel="primaryCta.external ? 'noopener' : undefined"
              class="group inline-flex items-center gap-2.5 bg-white text-ink px-6 py-3.5 rounded-full font-medium hover:bg-brand-purple hover:text-white transition-all hover:-translate-y-0.5 shadow-soft"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3v9zM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.78 1.78 0 0 1-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a.66.66 0 0 0 0 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66l.04 5.44z"/></svg>
              {{ primaryCta.label }}
              <svg class="w-4 h-4 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </a>
            <a v-if="secondaryLink" :href="secondaryLink.href" class="inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition">
              {{ secondaryLink.label }} →
            </a>
          </div>

          <div v-if="stats?.length" class="mt-10 grid grid-cols-3 gap-6 max-w-md">
            <div v-for="s in stats" :key="s.label">
              <div class="font-display text-2xl font-bold text-white flex items-center gap-1.5">
                <span v-if="s.tone === 'green'" class="w-2 h-2 rounded-full bg-brand-green pulse-dot" />
                {{ s.value }}
              </div>
              <div class="text-xs font-mono text-white/50 mt-1">{{ s.label }}</div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-5 reveal">
          <div class="relative">
            <div class="rounded-2xl bg-white dark:bg-zinc-900 overflow-hidden shadow-soft border border-zinc-200 dark:border-white/10 rotate-[-1.5deg] hover:rotate-0 transition-transform duration-500">
              <div class="h-24 bg-gradient-to-r from-brand-purple via-brand-purple to-brand-green relative">
                <div class="absolute inset-0 bg-grid opacity-30" />
              </div>
              <div class="px-5 pb-5 -mt-10 relative">
                <a :href="avatarHref" class="inline-block relative z-10">
                  <img :src="card.avatar" alt="" class="w-20 h-20 rounded-full ring-4 ring-white dark:ring-zinc-900 object-cover">
                </a>
                <div class="mt-3">
                  <div class="flex items-center gap-1.5">
                    <h3 class="font-semibold text-ink dark:text-white">{{ card.name }}</h3>
                    <svg class="w-3.5 h-3.5 text-brand-purple" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3v9zM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.78 1.78 0 0 1-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a.66.66 0 0 0 0 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66l.04 5.44z"/></svg>
                  </div>
                  <p class="text-sm text-zinc-600 dark:text-zinc-400">{{ card.headline }}</p>
                  <p class="text-xs text-zinc-500 mt-1">{{ card.subline }}</p>
                </div>
                <div class="mt-4 flex items-center gap-2">
                  <a :href="connectHref" class="flex-1 inline-flex items-center justify-center gap-1.5 bg-brand-purple text-white text-sm font-medium py-2 rounded-full hover:bg-ink transition">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
                    Connect
                  </a>
                  <a :href="messageHref" class="px-4 py-2 rounded-full border border-zinc-300 dark:border-white/10 text-sm font-medium text-ink dark:text-white hover:border-brand-purple hover:text-brand-purple transition">Message</a>
                </div>
              </div>
            </div>
            <div v-if="cardCallout" class="absolute -top-3 -right-3 rotate-[8deg] bg-brand-orange text-white text-xs font-mono px-3 py-1.5 rounded-full shadow-soft">
              {{ cardCallout }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
