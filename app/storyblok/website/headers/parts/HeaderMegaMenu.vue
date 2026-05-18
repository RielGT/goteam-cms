<script setup lang="ts">
import type { HeaderNavItem, HeaderPromoCard } from '~/types/website/header'
import HeaderPromoCardComponent from './HeaderPromoCard.vue'

defineProps<{
  item: HeaderNavItem
  showPromoCard?: boolean
  promoCard?: HeaderPromoCard
}>()
</script>

<template>
  <div class="hs-dropdown relative inline-flex [--placement:bottom-left]">
    <button
      type="button"
      class="hs-dropdown-toggle inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-[var(--header-light-nav-text,#374151)] hover:text-[var(--header-light-nav-hover,#2563eb)] focus:outline-none dark:text-[var(--header-dark-nav-text,#d1d5db)] dark:hover:text-[var(--header-dark-nav-hover,#60a5fa)]"
    >
      <span v-if="item.icon" class="size-4 shrink-0" aria-hidden="true">{{ item.icon }}</span>
      {{ item.label }}
      <svg
        class="size-4 transition-transform duration-200 hs-dropdown-open:rotate-180"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>

    <div
      class="hs-dropdown-menu hidden w-full min-w-[600px] rounded-xl border border-[var(--header-light-border,#e5e7eb)] bg-[var(--header-light-dropdown-bg,#ffffff)] p-4 shadow-lg dark:border-[var(--header-dark-border,#374151)] dark:bg-[var(--header-dark-dropdown-bg,#1f2937)]"
      role="menu"
    >
      <div :class="['grid gap-6', showPromoCard && promoCard ? 'grid-cols-3' : 'grid-cols-2']">
        <!-- Nav item groups -->
        <div
          v-for="child in item.children"
          :key="child._uid"
          class="flex flex-col"
        >
          <!-- Group heading or regular link -->
          <template v-if="child.children?.length">
            <p class="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              {{ child.label }}
            </p>
            <NuxtLink
              v-for="grandchild in child.children"
              :key="grandchild._uid"
              :to="grandchild.link?.cached_url || '#'"
              :target="grandchild.open_in_new_tab ? '_blank' : undefined"
              class="flex items-start gap-3 rounded-lg p-2 hover:bg-gray-50 dark:hover:bg-white/5"
              role="menuitem"
            >
              <span v-if="grandchild.icon" class="mt-0.5 size-4 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true">
                {{ grandchild.icon }}
              </span>
              <span class="flex flex-col">
                <span class="text-sm font-medium text-[var(--header-light-dropdown-text,#111827)] dark:text-[var(--header-dark-dropdown-text,#f9fafb)]">
                  {{ grandchild.label }}
                </span>
                <span v-if="grandchild.description" class="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                  {{ grandchild.description }}
                </span>
              </span>
            </NuxtLink>
          </template>

          <NuxtLink
            v-else
            :to="child.link?.cached_url || '#'"
            :target="child.open_in_new_tab ? '_blank' : undefined"
            class="flex items-start gap-3 rounded-lg p-2 hover:bg-gray-50 dark:hover:bg-white/5"
            role="menuitem"
          >
            <span v-if="child.icon" class="mt-0.5 size-4 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true">
              {{ child.icon }}
            </span>
            <span class="flex flex-col">
              <span class="text-sm font-medium text-[var(--header-light-dropdown-text,#111827)] dark:text-[var(--header-dark-dropdown-text,#f9fafb)]">
                {{ child.label }}
              </span>
              <span v-if="child.description" class="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                {{ child.description }}
              </span>
            </span>
          </NuxtLink>
        </div>

        <!-- Promo card column -->
        <HeaderPromoCardComponent
          v-if="showPromoCard && promoCard"
          :card="promoCard"
        />
      </div>
    </div>
  </div>
</template>
