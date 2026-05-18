<script setup>
defineProps({ blok: { type: Object, default: () => ({}) } });
</script>

<template>
  <div
    v-editable="blok"
    class="flex flex-col bg-white border border-gray-100 shadow-md rounded-2xl p-6 hover:shadow-lg transition-shadow duration-200"
  >
    <!-- Icon -->
    <div class="flex justify-center items-center size-12 bg-blue-600 rounded-xl mb-4 shrink-0">
      <img v-if="blok.icon?.filename" :src="blok.icon.filename" :alt="blok.icon.alt || blok.name" class="shrink-0 size-6 object-contain" />
      <svg
        v-else
        class="shrink-0 size-6 text-white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect width="10" height="14" x="3" y="8" rx="2" />
        <path d="M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4" />
        <path d="M8 18h.01" />
      </svg>
    </div>

    <!-- Title -->
    <h3 class="text-base font-bold text-gray-900">
      {{ blok.name }}
    </h3>

    <!-- Description -->
    <p v-if="blok.description" class="mt-2 text-sm text-gray-500 leading-relaxed">
      {{ blok.description }}
    </p>

    <!-- Link -->
    <a
      v-if="blok.link"
      class="mt-4 inline-flex items-center gap-x-1 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
      :href="blok.link"
    >
      {{ blok.link_label || 'Learn more' }}
      <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m9 18 6-6-6-6" />
      </svg>
    </a>
  </div>
</template>
