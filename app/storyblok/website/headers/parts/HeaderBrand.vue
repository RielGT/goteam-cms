<script setup lang="ts">
import type { Header } from '~/types/website/header'

const props = defineProps<{
  blok: Pick<Header, 'brand_image' | 'brand_text' | 'show_brand_image' | 'show_brand_text' | 'brand_link'>
}>()

const href = computed(() => props.blok.brand_link?.cached_url || '/')
</script>

<template>
  <NuxtLink :to="href" class="flex items-center gap-2 shrink-0">
    <img
      v-if="blok.show_brand_image && blok.brand_image?.filename"
      :src="blok.brand_image.filename"
      :alt="blok.brand_image.alt || blok.brand_text"
      class="h-8 w-auto object-contain"
    >
    <span
      v-if="blok.show_brand_text && blok.brand_text"
      class="text-xl font-bold text-[var(--header-light-nav-text,inherit)] dark:text-[var(--header-dark-nav-text,inherit)]"
    >
      {{ blok.brand_text }}
    </span>
  </NuxtLink>
</template>
