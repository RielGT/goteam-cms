<script setup lang="ts">
import type { Header } from '~/types/website/header'

const props = defineProps<{
  blok: Pick<Header, 'nav_items' | 'cta_buttons' | 'action_buttons' | 'brand_image' | 'brand_text' | 'show_brand_image' | 'show_brand_text' | 'brand_link'>
  menuId?: string
}>()

const id = computed(() => props.menuId || 'header-mobile-menu')
const openItems = ref<Set<string>>(new Set())

function toggleItem(uid: string) {
  if (openItems.value.has(uid)) {
    openItems.value.delete(uid)
  } else {
    openItems.value.add(uid)
  }
}
</script>

<template>
  <!-- Trigger button — rendered in the parent layout -->
  <button
    type="button"
    class="hs-collapse-toggle inline-flex size-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none lg:hidden dark:text-gray-300 dark:hover:bg-white/10"
    :data-hs-collapse="`#${id}`"
    aria-label="Open mobile menu"
  >
    <svg class="size-5 hs-collapse-open:hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
    <svg class="hidden size-5 hs-collapse-open:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  </button>

  <!-- Collapsible panel -->
  <div
    :id="id"
    class="hs-collapse hidden w-full overflow-hidden transition-all duration-300 lg:hidden"
  >
    <div
      class="mt-2 flex flex-col gap-1 rounded-xl border border-[var(--header-light-border,#e5e7eb)] bg-[var(--header-light-mobile-bg,#ffffff)] p-4 dark:border-[var(--header-dark-border,#374151)] dark:bg-[var(--header-dark-mobile-bg,#1f2937)]"
    >
      <template v-for="item in blok.nav_items" :key="item._uid">
        <!-- Item with children -->
        <template v-if="item.children?.length">
          <button
            type="button"
            class="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-[var(--header-light-nav-text,#374151)] hover:bg-gray-50 dark:text-[var(--header-dark-nav-text,#d1d5db)] dark:hover:bg-white/5"
            @click="toggleItem(item._uid)"
          >
            <span class="flex items-center gap-2">
              <span v-if="item.icon" class="size-4" aria-hidden="true">{{ item.icon }}</span>
              {{ item.label }}
            </span>
            <svg
              class="size-4 transition-transform duration-200"
              :class="{ 'rotate-180': openItems.has(item._uid) }"
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
          <div v-show="openItems.has(item._uid)" class="ms-4 flex flex-col gap-1 border-l border-gray-200 pl-3 dark:border-gray-700">
            <NuxtLink
              v-for="child in item.children"
              :key="child._uid"
              :to="child.link?.cached_url || '#'"
              :target="child.open_in_new_tab ? '_blank' : undefined"
              class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--header-light-nav-text,#6b7280)] hover:bg-gray-50 dark:text-[var(--header-dark-nav-text,#9ca3af)] dark:hover:bg-white/5"
            >
              <span v-if="child.icon" class="size-4" aria-hidden="true">{{ child.icon }}</span>
              {{ child.label }}
            </NuxtLink>
          </div>
        </template>

        <!-- Leaf link -->
        <NuxtLink
          v-else
          :to="item.link?.cached_url || '#'"
          :target="item.open_in_new_tab ? '_blank' : undefined"
          class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[var(--header-light-nav-text,#374151)] hover:bg-gray-50 dark:text-[var(--header-dark-nav-text,#d1d5db)] dark:hover:bg-white/5"
        >
          <span v-if="item.icon" class="size-4" aria-hidden="true">{{ item.icon }}</span>
          {{ item.label }}
        </NuxtLink>
      </template>

      <!-- CTA buttons in mobile -->
      <div v-if="blok.cta_buttons?.length" class="mt-2 flex flex-col gap-2 border-t border-gray-100 pt-3 dark:border-gray-700">
        <NuxtLink
          v-for="btn in blok.cta_buttons"
          :key="btn._uid"
          :to="btn.link?.cached_url || '#'"
          class="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          {{ btn.label }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
