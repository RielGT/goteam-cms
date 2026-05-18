<script setup>
defineProps({ blok: { type: Object, default: () => ({}) } });
</script>

<template>
	<div v-editable="blok" class="teaser">
		<h2>{{ blok.headline }}</h2>
	</div>
</template>
