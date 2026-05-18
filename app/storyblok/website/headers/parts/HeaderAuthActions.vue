<script setup lang="ts">
import type { HeaderButton } from '~/types/website/header'

defineProps<{
  buttons: HeaderButton[]
}>()
</script>

<template>
  <div class="flex items-center gap-2">
    <NuxtLink
      v-for="btn in buttons"
      :key="btn._uid"
      :to="btn.link?.cached_url || '#'"
      class="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-[var(--header-light-nav-text,#374151)] hover:bg-gray-100 focus:outline-none dark:text-[var(--header-dark-nav-text,#d1d5db)] dark:hover:bg-white/10"
    >
      <span v-if="btn.show_icon && btn.icon" class="size-4" aria-hidden="true">{{ btn.icon }}</span>
      {{ btn.label }}
    </NuxtLink>
  </div>
</template>
