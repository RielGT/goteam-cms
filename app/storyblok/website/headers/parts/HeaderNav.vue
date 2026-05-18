<script setup lang="ts">
import type { HeaderNavItem } from '~/types/website/header'
import HeaderNavItemComponent from './HeaderNavItem.vue'

defineProps<{
  items: HeaderNavItem[]
}>()
</script>

<template>
  <nav class="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
    <HeaderNavItemComponent
      v-for="item in items"
      :key="item._uid"
      :item="item"
    />
  </nav>
</template>
