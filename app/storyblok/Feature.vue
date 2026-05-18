<script setup>
defineProps({ blok: { type: Object, default: () => ({}) } });
</script>

<template>
	<div v-editable="blok" class="feature">
		<span>{{ blok.name }}</span>
	</div>
</template>
