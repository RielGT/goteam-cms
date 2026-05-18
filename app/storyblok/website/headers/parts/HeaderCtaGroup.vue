<script setup lang="ts">
import type { HeaderButton } from '~/types/website/header'

defineProps<{
  buttons: HeaderButton[]
  actionButtons?: HeaderButton[]
}>()

const styleClasses: Record<string, string> = {
  primary:
    'inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:bg-blue-500 dark:hover:bg-blue-600',
  secondary:
    'inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-200 focus:outline-none dark:bg-white/10 dark:text-white dark:hover:bg-white/20',
  ghost:
    'inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-white/10',
  outline:
    'inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none dark:border-gray-600 dark:text-gray-200 dark:hover:bg-white/10',
  icon: 'inline-flex items-center justify-center size-9 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none dark:text-gray-300 dark:hover:bg-white/10',
}
</script>

<template>
  <div class="flex items-center gap-2">
    <NuxtLink
      v-for="btn in actionButtons"
      :key="btn._uid"
      :to="btn.link?.cached_url || '#'"
      :class="styleClasses[btn.style] || styleClasses.ghost"
    >
      <span v-if="btn.show_icon && btn.icon" aria-hidden="true">{{ btn.icon }}</span>
      <span v-if="btn.style !== 'icon'">{{ btn.label }}</span>
    </NuxtLink>

    <NuxtLink
      v-for="btn in buttons"
      :key="btn._uid"
      :to="btn.link?.cached_url || '#'"
      :class="styleClasses[btn.style] || styleClasses.primary"
    >
      <span v-if="btn.show_icon && btn.icon" aria-hidden="true">{{ btn.icon }}</span>
      {{ btn.label }}
    </NuxtLink>
  </div>
</template>
