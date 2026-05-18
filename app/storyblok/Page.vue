<script setup>
defineProps({ blok: { type: Object, default: () => ({}) } });
</script>

<template>
  <div v-editable="blok">
    <StoryblokComponent
      v-for="currentBlok in blok.body"
      :key="currentBlok._uid"
      :blok="currentBlok"
    />
  </div>
</template>
