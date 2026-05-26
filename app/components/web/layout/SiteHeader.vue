<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Brand, NavLink, Cta } from "../types";

withDefaults(
  defineProps<{
    brand: Brand;
    nav?: NavLink[];
    themeToggle?: boolean;
    cta?: Cta;
  }>(),
  { nav: () => [], themeToggle: true, cta: undefined },
);

const isDark = ref(false);

onMounted(() => {
  isDark.value = document.documentElement.classList.contains("dark");
});

function toggleTheme() {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle("dark", isDark.value);
  localStorage.setItem("theme", isDark.value ? "dark" : "light");
}
</script>

<template>
  <header class="sticky top-0 z-50 backdrop-blur bg-paper/70 dark:bg-ink/70 border-b border-zinc-200/60 dark:border-white/5">
    <nav class="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
      <a :href="brand.href" class="font-display font-bold text-lg flex items-center gap-2">
        <span class="inline-block w-2.5 h-2.5 rounded-full bg-brand-green pulse-dot" />
        {{ brand.name }}<span class="text-brand-purple">{{ brand.accent }}</span>
      </a>
      <div class="hidden md:flex items-center gap-7 text-sm text-zinc-600 dark:text-zinc-400">
        <a
          v-for="link in nav"
          :key="link.href"
          :href="link.href"
          class="hover:text-ink dark:hover:text-white transition"
        >
          {{ link.label }}
        </a>
      </div>
      <div class="flex items-center gap-3">
        <button
          v-if="themeToggle"
          aria-label="Toggle dark mode"
          class="w-9 h-9 grid place-items-center rounded-full border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:border-brand-purple hover:text-brand-purple transition"
          @click="toggleTheme"
        >
          <svg v-if="isDark" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>
        </button>
        <a
          v-if="cta"
          :href="cta.href"
          class="hidden sm:inline-flex items-center gap-2 bg-ink text-paper dark:bg-white dark:text-ink text-sm font-medium px-4 py-2 rounded-full hover:bg-brand-purple dark:hover:bg-brand-purple dark:hover:text-white transition"
        >
          {{ cta.label }} →
        </a>
      </div>
    </nav>
  </header>
</template>
