<script setup lang="ts">
const isOpen = ref(false)
const searchInput = ref<HTMLInputElement | null>(null)

async function openSearch() {
  isOpen.value = true
  await nextTick()
  searchInput.value?.focus()
}

function closeSearch() {
  isOpen.value = false
}
</script>

<template>
  <div class="relative">
    <button
      v-if="!isOpen"
      type="button"
      class="inline-flex size-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none dark:text-gray-300 dark:hover:bg-white/10"
      aria-label="Open search"
      @click="openSearch"
    >
      <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    </button>

    <div v-else class="flex items-center gap-2">
      <input
        ref="searchInput"
        type="search"
        class="h-9 w-48 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
        placeholder="Search…"
        @keydown.escape="closeSearch"
      >
      <button
        type="button"
        class="inline-flex size-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-white/10"
        aria-label="Close search"
        @click="closeSearch"
      >
        <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>
