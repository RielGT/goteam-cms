<script setup lang="ts">
import type { Header } from '~/types/website/header'
import { useHeaderVariant } from '~/composables/website/headers/useHeaderVariant'
import { useHeaderStyles } from '~/composables/website/headers/useHeaderStyles'
import { useThemeMode } from '~/composables/website/headers/useThemeMode'

const props = defineProps<{ blok: Header }>()

const { variantComponent } = useHeaderVariant(props.blok)
const { themeStyles } = useHeaderStyles(props.blok)

// Initialize theme mode — composable handles SSR-safety internally
useThemeMode(props.blok.theme_mode ?? 'auto', props.blok.allow_theme_toggle)

const headerClasses = computed(() => [
  'w-full bg-[var(--header-light-bg,#ffffff)] text-[var(--header-light-nav-text,#374151)]',
  'dark:bg-[var(--header-dark-bg,#111827)] dark:text-[var(--header-dark-nav-text,#d1d5db)]',
  props.blok.enable_sticky ? 'sticky top-0 z-50' : 'relative',
  props.blok.enable_transparent_header ? 'bg-transparent dark:bg-transparent' : '',
  props.blok.enable_shadow
    ? 'shadow-sm border-b border-[var(--header-light-border,#e5e7eb)] dark:border-[var(--header-dark-border,#374151)]'
    : '',
])
</script>

<template>
  <header v-editable="blok" :class="headerClasses" :style="themeStyles">
    <component :is="variantComponent" :blok="blok" />
  </header>
</template>
