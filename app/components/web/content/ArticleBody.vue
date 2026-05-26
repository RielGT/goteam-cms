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

<style>
.article-body {
  color: rgb(82 82 91);
  line-height: 1.7;
  font-size: 1rem;
}

.article-body h2,
.article-body h3,
.article-body h4 {
  font-family: "Space Grotesk", system-ui, sans-serif;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #0D0B1E;
  line-height: 1.2;
}

.article-body h2 { font-size: 1.875rem; margin-top: 3rem; margin-bottom: 1rem; }
.article-body h3 { font-size: 1.5rem;  margin-top: 2.25rem; margin-bottom: 0.75rem; }
.article-body h4 { font-size: 1.25rem; margin-top: 2rem;    margin-bottom: 0.5rem; }

.article-body p { margin-top: 1.25rem; margin-bottom: 1.25rem; }

.article-body a {
  color: #0D0B1E;
  text-decoration: underline;
  text-decoration-color: rgb(212 212 216);
  text-underline-offset: 2px;
  transition: color 150ms ease, text-decoration-color 150ms ease;
}
.article-body a:hover { color: #8B5CF6; text-decoration-color: #8B5CF6; }

.article-body strong { font-weight: 600; color: #0D0B1E; }

.article-body em { font-style: italic; }

.article-body code {
  background-color: rgba(139, 92, 246, 0.10);
  color: #8B5CF6;
  border-radius: 0.375rem;
  padding: 0.125rem 0.4rem;
  font-family: "JetBrains Mono", monospace;
  font-size: 0.875em;
}

.article-body pre {
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
.article-body pre code {
  background-color: transparent;
  color: inherit;
  padding: 0;
  font-size: inherit;
}

.article-body blockquote {
  border-left: 2px solid rgba(139, 92, 246, 0.4);
  padding-left: 1.25rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: rgb(82 82 91);
}

.article-body ul,
.article-body ol {
  margin: 1.25rem 0;
  padding-left: 1.5rem;
}
.article-body ul { list-style: disc; }
.article-body ol { list-style: decimal; }
.article-body li { margin: 0.5rem 0; }
.article-body li::marker { color: #8B5CF6; }

.article-body hr {
  border: 0;
  border-top: 1px solid rgb(228 228 231);
  margin: 3rem 0;
}

.article-body img {
  border-radius: 1rem;
  border: 1px solid rgb(228 228 231);
  margin: 2rem 0;
  width: 100%;
  height: auto;
}

.dark .article-body { color: rgb(228 228 231); }
.dark .article-body h2,
.dark .article-body h3,
.dark .article-body h4 { color: #ffffff; }
.dark .article-body a { color: #ffffff; text-decoration-color: rgba(255,255,255,0.25); }
.dark .article-body a:hover { color: #C4B5FD; text-decoration-color: #C4B5FD; }
.dark .article-body strong { color: #ffffff; }
.dark .article-body code {
  background-color: rgba(139, 92, 246, 0.20);
  color: #C4B5FD;
}
.dark .article-body blockquote { color: rgb(228 228 231); }
.dark .article-body hr { border-top-color: rgba(255,255,255,0.1); }
.dark .article-body img { border-color: rgba(255,255,255,0.1); }
</style>
