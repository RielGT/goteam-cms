<script setup lang="ts">
import type { Header } from '~/types/website/header'
import HeaderBrand from '../parts/HeaderBrand.vue'
import HeaderCtaGroup from '../parts/HeaderCtaGroup.vue'
import HeaderMobileMenu from '../parts/HeaderMobileMenu.vue'
import ThemeToggle from '../parts/ThemeToggle.vue'

defineProps<{ blok: Header }>()
</script>

<template>
  <div
    class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8"
  >
    <!-- Brand -->
    <HeaderBrand :blok="blok" />

    <!-- Minimal nav: only a few links, no dropdowns -->
    <nav class="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
      <NuxtLink
        v-for="item in blok.nav_items"
        :key="item._uid"
        :to="item.link?.cached_url || '#'"
        :target="item.open_in_new_tab ? '_blank' : undefined"
        class="rounded-lg px-3 py-2 text-sm font-medium text-[var(--header-light-nav-text,#374151)] hover:text-[var(--header-light-nav-hover,#2563eb)] focus:outline-none dark:text-[var(--header-dark-nav-text,#d1d5db)] dark:hover:text-[var(--header-dark-nav-hover,#60a5fa)]"
      >
        {{ item.label }}
      </NuxtLink>
    </nav>

    <!-- Right side: CTA-focused -->
    <div class="flex items-center gap-2">
      <ThemeToggle v-if="blok.allow_theme_toggle" :default-theme="blok.default_theme" />
      <HeaderCtaGroup :buttons="blok.cta_buttons" :action-buttons="blok.action_buttons" class="hidden sm:flex" />
      <HeaderMobileMenu :blok="blok" menu-id="minimal-mobile-menu" />
    </div>
  </div>
</template>
