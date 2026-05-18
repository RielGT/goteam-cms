<script setup lang="ts">
import type { HeaderNavItem } from '~/types/website/header'

defineProps<{
  items: HeaderNavItem[]
}>()
</script>

<template>
  <div
    class="hs-dropdown-menu hidden min-w-48 rounded-lg border border-[var(--header-light-border,#e5e7eb)] bg-[var(--header-light-dropdown-bg,#ffffff)] p-1 shadow-md transition-[opacity,margin] dark:border-[var(--header-dark-border,#374151)] dark:bg-[var(--header-dark-dropdown-bg,#1f2937)]"
    role="menu"
    aria-orientation="vertical"
  >
    <template v-for="item in items" :key="item._uid">
      <NuxtLink
        :to="item.link?.cached_url || '#'"
        :target="item.open_in_new_tab ? '_blank' : undefined"
        class="flex items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-[var(--header-light-dropdown-text,#374151)] hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-[var(--header-dark-dropdown-text,#d1d5db)] dark:hover:bg-white/10 dark:focus:bg-white/10"
        role="menuitem"
      >
        <span v-if="item.icon" class="size-4 shrink-0" aria-hidden="true">
          {{ item.icon }}
        </span>
        <span class="grow">{{ item.label }}</span>
        <span
          v-if="item.badge"
          class="ms-auto rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
        >
          {{ item.badge }}
        </span>
      </NuxtLink>
    </template>
  </div>
</template>
