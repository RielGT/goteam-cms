<script setup lang="ts">
interface Post { tag: string; date: string; readTime: string; title: string; excerpt: string; image: string; }
const posts: Post[] = [
  { tag: "Engineering", date: "May 12, 2026", readTime: "6 min read", title: "Why I stopped reaching for Redis on every project", excerpt: "Postgres can do more than you think. A tour of the queues, locks, and caches I've replaced with a single table.", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80" },
  { tag: "Freelance", date: "Apr 28, 2026", readTime: "4 min read", title: "The \"scope creep\" line I steal from carpenters", excerpt: "One question I ask in every client kickoff that has saved me hundreds of awkward conversations.", image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=900&q=80" },
  { tag: "Tooling", date: "Apr 14, 2026", readTime: "8 min read", title: "My 2026 dev setup, after 9 years of tweaking", excerpt: "Editor, terminal, window manager, and the weirdly specific keyboard shortcut I refuse to live without.", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80" },
  { tag: "Shipping", date: "Mar 30, 2026", readTime: "5 min read", title: "Ship-it Friday: a tiny ritual that fixed my deadlines", excerpt: "How a no-meeting, no-PR-review afternoon every week made me 30% more reliable to clients.", image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80" },
  { tag: "Engineering", date: "Mar 16, 2026", readTime: "7 min read", title: "tRPC is the most underrated tool in my stack", excerpt: "Type-safety across the wire without ceremony. A walkthrough with real-world client examples.", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80" },
  { tag: "Career", date: "Mar 02, 2026", readTime: "9 min read", title: "From full-time to freelance: the first 90 days", excerpt: "What I got right, what I got embarrassingly wrong, and the numbers behind the leap.", image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80" },
];
</script>

<template>
  <section id="posts" class="border-y border-zinc-200/70 dark:border-white/5 bg-white/40 dark:bg-white/[0.02]">
    <div class="max-w-6xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
      <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 reveal">
        <div>
          <p class="font-mono text-xs text-brand-purple mb-3">/ from the blog</p>
          <h2 class="font-display text-4xl sm:text-5xl font-bold leading-tight">Things I've written lately.</h2>
          <p class="mt-4 text-zinc-600 dark:text-zinc-400 max-w-lg">Notes from real projects — what worked, what didn't, and the boring bits in between.</p>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <button id="fpPrev" aria-label="Previous posts" class="w-11 h-11 grid place-items-center rounded-full border border-zinc-200 dark:border-white/10 bg-paper dark:bg-ink hover:border-brand-purple hover:text-brand-purple transition disabled:opacity-40 disabled:cursor-not-allowed">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button id="fpNext" aria-label="Next posts" class="w-11 h-11 grid place-items-center rounded-full border border-zinc-200 dark:border-white/10 bg-paper dark:bg-ink hover:border-brand-purple hover:text-brand-purple transition disabled:opacity-40 disabled:cursor-not-allowed">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>

      <div class="overflow-hidden -mx-2 reveal">
        <div id="fpTrack" class="fp-track">
          <div v-for="p in posts" :key="p.title" class="fp-slide">
            <a href="#" class="fp-card group block h-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-paper dark:bg-ink hover:border-brand-purple transition shadow-soft">
              <div class="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                <img :src="p.image" alt="" class="w-full h-full object-cover" loading="lazy"/>
                <span class="absolute top-3 left-3 text-[10px] font-mono px-2.5 py-1 rounded-full bg-paper/95 dark:bg-ink/95 backdrop-blur border border-zinc-200 dark:border-white/10">{{ p.tag }}</span>
              </div>
              <div class="p-6">
                <div class="flex items-center gap-2 text-[11px] font-mono text-zinc-500 mb-3">
                  <span>{{ p.date }}</span>
                  <span class="w-1 h-1 rounded-full bg-zinc-400"></span>
                  <span>{{ p.readTime }}</span>
                </div>
                <h3 class="font-display text-xl font-bold leading-snug group-hover:text-brand-purple transition">{{ p.title }}</h3>
                <p class="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{{ p.excerpt }}</p>
                <span class="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-purple">Read post
                  <svg class="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between gap-4 mt-10">
        <div id="fpDots" class="flex items-center gap-2"></div>
        <a href="#" class="inline-flex items-center gap-2 text-sm font-medium hover:text-brand-purple transition">All posts →</a>
      </div>
    </div>
  </section>
</template>
