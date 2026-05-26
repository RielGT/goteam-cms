<script setup lang="ts">
import type { SectionHeaderContent, BookTalkBullet, FormField, NavLink } from "../types";

withDefaults(
  defineProps<{
    header: SectionHeaderContent;
    sectionId?: string;
    bullets?: BookTalkBullet[];
    fields: FormField[];
    submitLabel?: string;
    successLabel?: string;
    fallback?: { prefix: string; link: NavLink };
  }>(),
  {
    sectionId: undefined,
    bullets: () => [],
    submitLabel: "Send it →",
    successLabel: "Thanks — talk soon ✓",
    fallback: undefined,
  },
);

const onSubmit = (e: Event, label: string) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  if (btn) btn.textContent = label;
  form.reset();
};
</script>

<template>
  <section :id="sectionId" class="relative overflow-hidden border-y border-zinc-200/70 dark:border-white/5 bg-white/40 dark:bg-white/[0.02]">
    <div class="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
    <div class="relative max-w-5xl mx-auto px-5 sm:px-8 py-24 sm:py-32 grid lg:grid-cols-5 gap-12 items-start">
      <div class="lg:col-span-2 reveal">
        <WebUiSectionHeader v-bind="header" />

        <div v-if="bullets?.length" class="mt-8 space-y-3 text-sm">
          <div v-for="(b, i) in bullets" :key="i" class="flex items-center gap-3">
            <span
              class="w-1.5 h-1.5 rounded-full"
              :class="{
                'bg-brand-green': (b.tone ?? 'green') === 'green',
                'bg-brand-purple': b.tone === 'purple',
                'bg-brand-orange': b.tone === 'orange',
              }"
            />
            {{ b.text }}
          </div>
        </div>
      </div>

      <form
        class="lg:col-span-3 reveal p-7 sm:p-9 rounded-2xl border border-zinc-200 dark:border-white/10 bg-paper dark:bg-ink shadow-soft space-y-5"
        @submit="(e) => onSubmit(e, successLabel)"
      >
        <div v-for="f in fields" :key="f.id">
          <label class="block text-xs font-mono text-zinc-500 mb-2" :for="f.id">
            {{ f.label }}
            <span v-if="f.hint" class="text-zinc-400">{{ f.hint }}</span>
          </label>
          <textarea
            v-if="f.type === 'textarea'"
            :id="f.id"
            :required="f.required"
            :rows="f.rows ?? 3"
            :placeholder="f.placeholder"
            class="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition resize-none"
          />
          <input
            v-else
            :id="f.id"
            :required="f.required"
            :type="f.type"
            :placeholder="f.placeholder"
            class="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition"
          >
        </div>
        <button type="submit" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-purple text-white px-7 py-3.5 rounded-full font-medium hover:bg-ink dark:hover:bg-white dark:hover:text-ink transition-all hover:-translate-y-0.5">
          {{ submitLabel }}
        </button>
        <p v-if="fallback" class="text-xs text-zinc-500">
          {{ fallback.prefix }}
          <a :href="fallback.link.href" class="underline hover:text-brand-purple">{{ fallback.link.label }}</a>
        </p>
      </form>
    </div>
  </section>
</template>
