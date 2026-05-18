<script setup>
defineProps({ blok: { type: Object, default: () => ({}) } });
</script>

<template>
	<div v-editable="blok" class="grid">
		<StoryblokComponent
			v-for="currentBlok in blok.columns"
			:key="currentBlok._uid"
			:blok="currentBlok"
		/>
	</div>
</template>
