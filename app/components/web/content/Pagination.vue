<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    currentPage: number;
    totalPages: number;
    baseHref: string;
  }>(),
  {},
);

type PageItem = { type: "page"; page: number } | { type: "ellipsis"; key: string };

const pages = computed<PageItem[]>(() => {
  const total = props.totalPages;
  const current = props.currentPage;
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => ({ type: "page", page: i + 1 }) as PageItem);
  }
  const items: PageItem[] = [{ type: "page", page: 1 }];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) items.push({ type: "ellipsis", key: "l" });
  for (let p = start; p <= end; p++) items.push({ type: "page", page: p });
  if (end < total - 1) items.push({ type: "ellipsis", key: "r" });
  items.push({ type: "page", page: total });
  return items;
});

const hrefFor = (page: number) => `${props.baseHref}${page}`;
const isFirst = computed(() => props.currentPage <= 1);
const isLast = computed(() => props.currentPage >= props.totalPages);
</script>

<template>
  <nav
    v-if="totalPages > 1"
    aria-label="Pagination"
    class="mt-16 flex items-center justify-center gap-2 flex-wrap"
  >
    <a
      :href="isFirst ? undefined : hrefFor(currentPage - 1)"
      :aria-disabled="isFirst ? 'true' : 'false'"
      :tabindex="isFirst ? -1 : 0"
      aria-label="Previous page"
      class="w-11 h-11 grid place-items-center rounded-full border border-zinc-200 dark:border-white/10 bg-paper dark:bg-ink hover:border-brand-purple hover:text-brand-purple transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/40"
      :class="isFirst ? 'opacity-40 pointer-events-none' : ''"
    >
      <svg aria-hidden="true" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
    </a>

    <template v-for="item in pages">
      <span
        v-if="item.type === 'ellipsis'"
        :key="`e-${item.key}`"
        class="w-11 h-11 grid place-items-center font-mono text-sm text-zinc-400 dark:text-zinc-600"
      >…</span>
      <a
        v-else
        :key="`p-${item.page}`"
        :href="hrefFor(item.page)"
        :aria-current="item.page === currentPage ? 'page' : undefined"
        :aria-label="`Go to page ${item.page}`"
        class="w-11 h-11 grid place-items-center rounded-full border font-mono text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/40"
        :class="
          item.page === currentPage
            ? 'bg-brand-purple text-white border-brand-purple'
            : 'border-zinc-200 dark:border-white/10 bg-paper dark:bg-ink hover:border-brand-purple hover:text-brand-purple'
        "
      >{{ item.page }}</a>
    </template>

    <a
      :href="isLast ? undefined : hrefFor(currentPage + 1)"
      :aria-disabled="isLast ? 'true' : 'false'"
      :tabindex="isLast ? -1 : 0"
      aria-label="Next page"
      class="w-11 h-11 grid place-items-center rounded-full border border-zinc-200 dark:border-white/10 bg-paper dark:bg-ink hover:border-brand-purple hover:text-brand-purple transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/40"
      :class="isLast ? 'opacity-40 pointer-events-none' : ''"
    >
      <svg aria-hidden="true" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
    </a>
  </nav>
</template>
