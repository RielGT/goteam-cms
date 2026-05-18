<script setup>
defineProps({ blok: { type: Object, default: () => ({}) } });
</script>

<template>
  <main v-editable="blok" class="w-full flex-1">
    <StoryblokComponent
      v-for="currentBlok in blok.body"
      :key="currentBlok._uid"
      :blok="currentBlok"
    />
  </main>
</template>
