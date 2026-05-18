<script setup lang="ts">
import type { HeaderPromoCard } from '~/types/website/header'

defineProps<{
  card: HeaderPromoCard
}>()
</script>

<template>
  <div class="flex flex-col overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
    <img
      v-if="card.image?.filename"
      :src="card.image.filename"
      :alt="card.image.alt || card.title"
      class="h-40 w-full object-cover"
    >
    <div class="flex flex-col gap-2 p-4">
      <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ card.title }}</p>
      <p v-if="card.description" class="text-xs text-gray-500 dark:text-gray-400">{{ card.description }}</p>
      <NuxtLink
        v-if="card.link?.cached_url && card.button_label"
        :to="card.link.cached_url"
        class="mt-1 inline-flex items-center text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
      >
        {{ card.button_label }}
        <svg class="ms-1 size-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </NuxtLink>
    </div>
  </div>
</template>
