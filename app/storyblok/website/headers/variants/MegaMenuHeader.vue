<script setup lang="ts">
import type { Header } from '~/types/website/header'
import HeaderBrand from '../parts/HeaderBrand.vue'
import HeaderMegaMenu from '../parts/HeaderMegaMenu.vue'
import HeaderNavItem from '../parts/HeaderNavItem.vue'
import HeaderCtaGroup from '../parts/HeaderCtaGroup.vue'
import HeaderMobileMenu from '../parts/HeaderMobileMenu.vue'
import HeaderSearch from '../parts/HeaderSearch.vue'
import ThemeToggle from '../parts/ThemeToggle.vue'

const props = defineProps<{ blok: Header }>()

// Items with children render as mega menus; leaf items render as regular nav links
const megaItems = computed(() => props.blok.nav_items?.filter(i => i.children?.length > 1) ?? [])
const regularItems = computed(() => props.blok.nav_items?.filter(i => !i.children?.length || i.children.length <= 1) ?? [])

const promoCard = computed(() => props.blok.promo_card?.[0] ?? null)
</script>

<template>
  <div
    class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:flex-nowrap lg:px-8"
  >
    <!-- Brand -->
    <HeaderBrand :blok="blok" />

    <!-- Desktop navigation -->
    <nav class="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
      <HeaderMegaMenu
        v-for="item in megaItems"
        :key="item._uid"
        :item="item"
        :show-promo-card="blok.show_promo_card && !!promoCard"
        :promo-card="promoCard ?? undefined"
      />
      <HeaderNavItem
        v-for="item in regularItems"
        :key="item._uid"
        :item="item"
      />
    </nav>

    <!-- Right side -->
    <div class="flex items-center gap-2">
      <HeaderSearch v-if="blok.show_search" />
      <ThemeToggle v-if="blok.allow_theme_toggle" :default-theme="blok.default_theme" />
      <HeaderCtaGroup :buttons="blok.cta_buttons" :action-buttons="blok.action_buttons" class="hidden sm:flex" />
      <HeaderMobileMenu :blok="blok" menu-id="mega-mobile-menu" />
    </div>
  </div>
</template>
