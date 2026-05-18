<script setup lang="ts">
import type { Header } from '~/types/website/header'

defineProps<{
  blok: Pick<Header, 'utility_links' | 'show_language_switcher' | 'show_social_links' | 'show_auth_buttons' | 'cta_buttons'>
}>()
</script>

<template>
  <div
    class="border-b border-[var(--header-light-border,#e5e7eb)] bg-[var(--header-light-bg,#f9fafb)] dark:border-[var(--header-dark-border,#374151)] dark:bg-[var(--header-dark-bg,#111827)]"
  >
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 sm:px-6 lg:px-8">
      <!-- Utility links -->
      <div class="flex items-center gap-4">
        <template v-for="item in blok.utility_links" :key="item._uid">
          <NuxtLink
            :to="item.link?.cached_url || '#'"
            class="flex items-center gap-1 text-xs text-[var(--header-light-nav-text,#6b7280)] hover:text-[var(--header-light-nav-hover,#2563eb)] dark:text-[var(--header-dark-nav-text,#9ca3af)] dark:hover:text-[var(--header-dark-nav-hover,#60a5fa)]"
          >
            <span v-if="item.icon" class="size-3.5" aria-hidden="true">{{ item.icon }}</span>
            {{ item.label }}
          </NuxtLink>
        </template>
      </div>

      <!-- Right-side actions -->
      <div class="flex items-center gap-3">
        <!-- Language switcher placeholder -->
        <template v-if="blok.show_language_switcher">
          <button
            type="button"
            class="flex items-center gap-1 text-xs text-[var(--header-light-nav-text,#6b7280)] hover:text-[var(--header-light-nav-hover,#2563eb)] dark:text-[var(--header-dark-nav-text,#9ca3af)] dark:hover:text-[var(--header-dark-nav-hover,#60a5fa)]"
          >
            <svg class="size-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            EN
          </button>
        </template>

        <!-- Auth buttons -->
        <template v-if="blok.show_auth_buttons">
          <NuxtLink
            v-for="btn in blok.cta_buttons"
            :key="btn._uid"
            :to="btn.link?.cached_url || '#'"
            class="text-xs font-medium text-[var(--header-light-nav-text,#374151)] hover:text-[var(--header-light-nav-hover,#2563eb)] dark:text-[var(--header-dark-nav-text,#d1d5db)] dark:hover:text-[var(--header-dark-nav-hover,#60a5fa)]"
          >
            {{ btn.label }}
          </NuxtLink>
        </template>
      </div>
    </div>
  </div>
</template>
