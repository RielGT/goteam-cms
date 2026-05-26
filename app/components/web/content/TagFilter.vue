<script setup lang="ts">
import type { TagFilterOption } from "../types";

withDefaults(
  defineProps<{
    tags: TagFilterOption[];
    modelValue: string;
    ariaLabel?: string;
  }>(),
  { ariaLabel: "Filter by tag" },
);

defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>

<template>
  <div
    role="tablist"
    :aria-label="ariaLabel"
    class="flex flex-wrap gap-2"
  >
    <button
      v-for="t in tags"
      :key="t.id"
      type="button"
      role="tab"
      :aria-selected="modelValue === t.id"
      class="font-mono text-[11px] px-3 py-1.5 rounded-full border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-ink"
      :class="
        modelValue === t.id
          ? 'bg-brand-purple/10 border-brand-purple/20 text-brand-purple'
          : 'border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:border-brand-purple hover:text-brand-purple'
      "
      @click="$emit('update:modelValue', t.id)"
    >
      {{ t.label }}
    </button>
  </div>
</template>
