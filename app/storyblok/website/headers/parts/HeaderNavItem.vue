<script setup lang="ts">
import type { HeaderNavItem as NavItem } from '~/types/website/header'
import HeaderDropdown from './HeaderDropdown.vue'

const props = defineProps<{
  item: NavItem
}>()

const hasChildren = computed(() => Array.isArray(props.item.children) && props.item.children.length > 0)
</script>

<template>
  <div v-if="hasChildren" class="hs-dropdown relative inline-flex [--placement:bottom-left]">
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

    <HeaderDropdown :items="item.children" />
  </div>

  <NuxtLink
    v-else
    :to="item.link?.cached_url || '#'"
    :target="item.open_in_new_tab ? '_blank' : undefined"
    class="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-[var(--header-light-nav-text,#374151)] hover:text-[var(--header-light-nav-hover,#2563eb)] focus:outline-none dark:text-[var(--header-dark-nav-text,#d1d5db)] dark:hover:text-[var(--header-dark-nav-hover,#60a5fa)]"
  >
    <span v-if="item.icon" class="size-4 shrink-0" aria-hidden="true">{{ item.icon }}</span>
    {{ item.label }}
    <span
      v-if="item.badge"
      class="ms-1 rounded-full bg-blue-100 px-1.5 py-0.5 text-xs font-semibold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
    >
      {{ item.badge }}
    </span>
  </NuxtLink>
</template>
