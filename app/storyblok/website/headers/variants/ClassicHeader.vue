<script setup lang="ts">
import type { Header } from '~/types/website/header'
import HeaderBrand from '../parts/HeaderBrand.vue'
import HeaderNav from '../parts/HeaderNav.vue'
import HeaderCtaGroup from '../parts/HeaderCtaGroup.vue'
import HeaderMobileMenu from '../parts/HeaderMobileMenu.vue'
import HeaderSearch from '../parts/HeaderSearch.vue'
import HeaderAuthActions from '../parts/HeaderAuthActions.vue'
import ThemeToggle from '../parts/ThemeToggle.vue'

defineProps<{ blok: Header }>()
</script>

<template>
  <div
    class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:flex-nowrap lg:px-8"
  >
    <!-- Brand -->
    <HeaderBrand :blok="blok" />

    <!-- Desktop nav -->
    <HeaderNav :items="blok.nav_items" />

    <!-- Right side actions -->
    <div class="flex items-center gap-2">
      <HeaderSearch v-if="blok.show_search" />
      <HeaderAuthActions v-if="blok.show_auth_buttons && blok.action_buttons?.length" :buttons="blok.action_buttons" />
      <ThemeToggle v-if="blok.allow_theme_toggle" :default-theme="blok.default_theme" />
      <HeaderCtaGroup :buttons="blok.cta_buttons" :action-buttons="[]" class="hidden sm:flex" />

      <!-- Mobile trigger + panel (self-contained) -->
      <HeaderMobileMenu :blok="blok" menu-id="classic-mobile-menu" />
    </div>
  </div>
</template>
