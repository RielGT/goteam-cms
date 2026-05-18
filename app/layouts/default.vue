<script setup>
const currentYear = new Date().getFullYear();
</script>
<template>
	<div>
		<slot />
		<footer>All rights reserved © {{ currentYear }}</footer>
	</div>
</template>
