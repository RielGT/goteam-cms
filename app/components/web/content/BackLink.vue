<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string;
    href: string;
  }>(),
  {},
);
</script>

<template>
  <a
    :href="href"
    class="group inline-flex items-center gap-2 py-2 -mx-1 px-2 rounded-full text-sm font-mono text-zinc-500 dark:text-zinc-400 hover:text-brand-purple dark:hover:text-brand-purple transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-ink"
  >
    <svg
      aria-hidden="true"
      class="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 24 24"
    >
      <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
    {{ label }}
  </a>
</template>
