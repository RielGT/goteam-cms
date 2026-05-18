<script setup>
defineProps({ blok: { type: Object, default: () => ({}) } });
</script>

<template>
  <!-- Feature Grid Section -->
  <div v-editable="blok" class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
    <!-- Section Heading -->
    <div v-if="blok.title || blok.subtitle" class="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
      <h2
        v-if="blok.title"
        class="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white"
      >
        {{ blok.title }}
      </h2>
      <p
        v-if="blok.subtitle"
        class="mt-1 text-gray-600 dark:text-neutral-400"
      >
        {{ blok.subtitle }}
      </p>
    </div>

    <!-- Grid -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <StoryblokComponent
        v-for="currentBlok in blok.columns"
        :key="currentBlok._uid"
        :blok="currentBlok"
      />
    </div>
  </div>
</template>
