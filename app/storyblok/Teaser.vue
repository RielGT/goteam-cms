<script setup>
defineProps({ blok: { type: Object, default: () => ({}) } });
</script>

<template>
  <div v-editable="blok" class="relative w-full bg-white">
    <div class="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 flex flex-col items-center text-center">
      <!-- Announcement Banner -->
      <a
        v-if="blok.announcement_text"
        :href="blok.announcement_link || '#'"
        class="inline-flex items-center gap-x-2 bg-gray-50 border border-gray-200 text-sm text-gray-700 p-1 ps-3 rounded-full transition hover:border-gray-300 focus:outline-none mb-8"
      >
        {{ blok.announcement_text }}
        <span class="py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full bg-gray-200 font-semibold text-sm text-gray-600">
          <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </span>
      </a>

      <!-- Title -->
      <h1 v-if="blok.headline" class="font-extrabold text-gray-900 text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight max-w-3xl">
        {{ blok.headline }}
      </h1>

      <!-- Description -->
      <p v-if="blok.description" class="mt-6 text-lg text-gray-500 leading-relaxed max-w-xl">
        {{ blok.description }}
      </p>

      <!-- CTA Buttons -->
      <div v-if="blok.cta_primary_label || blok.cta_secondary_label" class="mt-10 flex flex-wrap gap-3 justify-center">
        <a
          v-if="blok.cta_primary_label"
          :href="blok.cta_primary_link || '#'"
          class="py-3 px-6 inline-flex items-center gap-x-2 text-sm font-semibold rounded-xl border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-colors duration-150"
        >
          {{ blok.cta_primary_label }}
          <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </a>
        <a
          v-if="blok.cta_secondary_label"
          :href="blok.cta_secondary_link || '#'"
          class="py-3 px-6 inline-flex items-center gap-x-2 text-sm font-semibold rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none transition-colors duration-150"
        >
          {{ blok.cta_secondary_label }}
        </a>
      </div>
    </div>
  </div>
</template>
