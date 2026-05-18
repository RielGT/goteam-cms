<script setup lang="ts">
import type { Header } from '~/types/website/header'
import HeaderUtilityBar from '../parts/HeaderUtilityBar.vue'
import HeaderBrand from '../parts/HeaderBrand.vue'
import HeaderNav from '../parts/HeaderNav.vue'
import HeaderCtaGroup from '../parts/HeaderCtaGroup.vue'
import HeaderMobileMenu from '../parts/HeaderMobileMenu.vue'
import HeaderSearch from '../parts/HeaderSearch.vue'
import ThemeToggle from '../parts/ThemeToggle.vue'

defineProps<{ blok: Header }>()
</script>

<template>
  <div class="flex flex-col">
    <!-- Utility topbar -->
    <HeaderUtilityBar :blok="blok" />

    <!-- Main header row -->
    <div
      class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:flex-nowrap lg:px-8"
    >
      <HeaderBrand :blok="blok" />
      <HeaderNav :items="blok.nav_items" />

      <div class="flex items-center gap-2">
        <HeaderSearch v-if="blok.show_search" />
        <ThemeToggle v-if="blok.allow_theme_toggle" :default-theme="blok.default_theme" />
        <HeaderCtaGroup :buttons="blok.cta_buttons" :action-buttons="blok.action_buttons" class="hidden sm:flex" />
        <HeaderMobileMenu :blok="blok" menu-id="utility-mobile-menu" />
      </div>
    </div>
  </div>
</template>
