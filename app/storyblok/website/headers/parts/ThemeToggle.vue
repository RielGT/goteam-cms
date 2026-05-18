<script setup lang="ts">
import type { ThemeMode } from '~/types/website/header'
import { useThemeMode } from '~/composables/website/headers/useThemeMode'

const props = defineProps<{
  defaultTheme?: ThemeMode
}>()

const { isDark, toggleTheme } = useThemeMode(props.defaultTheme ?? 'auto', true)
</script>

<template>
  <button
    type="button"
    class="inline-flex size-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none dark:text-gray-300 dark:hover:bg-white/10"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggleTheme"
  >
    <!-- Sun icon — shown in dark mode -->
    <svg v-if="isDark" class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
    <!-- Moon icon — shown in light mode -->
    <svg v-else class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  </button>
</template>
