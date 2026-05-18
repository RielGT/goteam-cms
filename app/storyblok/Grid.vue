<script setup>
defineProps({ blok: { type: Object, default: () => ({}) } });
</script>

<template>
  <div v-editable="blok" class="w-full bg-gray-50 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
    <div class="max-w-5xl mx-auto">
      <!-- Section Heading -->
      <div v-if="blok.title || blok.subtitle" class="text-center mb-12">
        <h2 v-if="blok.title" class="text-3xl font-bold text-gray-900 md:text-4xl leading-tight">
          {{ blok.title }}
        </h2>
        <p v-if="blok.subtitle" class="mt-3 text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
          {{ blok.subtitle }}
        </p>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StoryblokComponent
          v-for="currentBlok in blok.columns"
          :key="currentBlok._uid"
          :blok="currentBlok"
        />
      </div>
    </div>
  </div>
</template>
