<script setup lang="ts">
withDefaults(
  defineProps<{
    html: string;
  }>(),
  {},
);
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <article class="article-body" v-html="html" />
</template>

<style scoped>
.article-body {
  color: rgb(63 63 70);
  line-height: 1.7;
  font-size: 1rem;
}
:global(.dark) .article-body { color: rgb(212 212 216); }

.article-body :deep(h2),
.article-body :deep(h3),
.article-body :deep(h4) {
  font-family: "Space Grotesk", system-ui, sans-serif;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #0D0B1E;
  line-height: 1.2;
}
:global(.dark) .article-body :deep(h2),
:global(.dark) .article-body :deep(h3),
:global(.dark) .article-body :deep(h4) { color: rgb(244 244 245); }

.article-body :deep(h2) { font-size: 1.875rem; margin-top: 3rem; margin-bottom: 1rem; }
.article-body :deep(h3) { font-size: 1.5rem;  margin-top: 2.25rem; margin-bottom: 0.75rem; }
.article-body :deep(h4) { font-size: 1.25rem; margin-top: 2rem;    margin-bottom: 0.5rem; }

.article-body :deep(p) { margin-top: 1.25rem; margin-bottom: 1.25rem; }

.article-body :deep(a) {
  color: #0D0B1E;
  text-decoration: underline;
  text-decoration-color: rgb(212 212 216);
  text-underline-offset: 2px;
  transition: color 150ms ease, text-decoration-color 150ms ease;
}
:global(.dark) .article-body :deep(a) { color: rgb(244 244 245); text-decoration-color: rgba(255,255,255,0.2); }
.article-body :deep(a:hover) { color: #8B5CF6; text-decoration-color: #8B5CF6; }

.article-body :deep(strong) { font-weight: 600; color: #0D0B1E; }
:global(.dark) .article-body :deep(strong) { color: rgb(244 244 245); }

.article-body :deep(em) { font-style: italic; }

.article-body :deep(code) {
  background-color: rgba(139, 92, 246, 0.10);
  color: #8B5CF6;
  border-radius: 0.375rem;
  padding: 0.125rem 0.4rem;
  font-family: "JetBrains Mono", monospace;
  font-size: 0.875em;
}

.article-body :deep(pre) {
  background-color: #09090B;
  color: #10B981;
  font-family: "JetBrains Mono", monospace;
  font-size: 0.875rem;
  border-radius: 1rem;
  padding: 1.25rem 1.5rem;
  overflow-x: auto;
  margin: 2rem 0;
  border: 1px solid rgba(255,255,255,0.05);
}
.article-body :deep(pre code) {
  background-color: transparent;
  color: inherit;
  padding: 0;
  font-size: inherit;
}

.article-body :deep(blockquote) {
  border-left: 2px solid rgba(139, 92, 246, 0.4);
  padding-left: 1.25rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: rgb(82 82 91);
}
:global(.dark) .article-body :deep(blockquote) { color: rgb(161 161 170); }

.article-body :deep(ul),
.article-body :deep(ol) {
  margin: 1.25rem 0;
  padding-left: 1.5rem;
}
.article-body :deep(ul) { list-style: disc; }
.article-body :deep(ol) { list-style: decimal; }
.article-body :deep(li) { margin: 0.5rem 0; }
.article-body :deep(li::marker) { color: #8B5CF6; }

.article-body :deep(hr) {
  border: 0;
  border-top: 1px solid rgb(228 228 231);
  margin: 3rem 0;
}
:global(.dark) .article-body :deep(hr) { border-top-color: rgba(255,255,255,0.1); }

.article-body :deep(img) {
  border-radius: 1rem;
  border: 1px solid rgb(228 228 231);
  margin: 2rem 0;
  width: 100%;
  height: auto;
}
:global(.dark) .article-body :deep(img) { border-color: rgba(255,255,255,0.1); }
</style>
