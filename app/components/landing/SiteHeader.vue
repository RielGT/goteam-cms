<template>
  <header class="sticky top-0 z-50 backdrop-blur bg-paper/70 dark:bg-ink/70 border-b border-zinc-200/60 dark:border-white/5">
    <nav class="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
      <a href="#" class="font-display font-bold text-lg flex items-center gap-2">
        <span class="inline-block w-2.5 h-2.5 rounded-full bg-brand-green pulse-dot" />
        alex<span class="text-brand-purple">.dev</span>
      </a>
      <div class="hidden md:flex items-center gap-7 text-sm text-zinc-600 dark:text-zinc-400">
        <a href="#work" class="hover:text-ink dark:hover:text-white transition">Work</a>
        <a href="#process" class="hover:text-ink dark:hover:text-white transition">How I work</a>
        <a href="#words" class="hover:text-ink dark:hover:text-white transition">Kind words</a>
        <a href="#faq" class="hover:text-ink dark:hover:text-white transition">FAQ</a>
      </div>
      <div class="flex items-center gap-3">
        <button
          id="themeToggle"
          aria-label="Toggle dark mode"
          class="w-9 h-9 grid place-items-center rounded-full border border-zinc-200 dark:border-white/10 hover:border-brand-purple hover:text-brand-purple transition"
        >
          <svg class="hidden dark:block w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
          <svg class="block dark:hidden w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>
        </button>
        <a href="#talk" class="hidden sm:inline-flex items-center gap-2 bg-ink text-paper dark:bg-white dark:text-ink text-sm font-medium px-4 py-2 rounded-full hover:bg-brand-purple dark:hover:bg-brand-purple dark:hover:text-white transition">
          Let's chat →
        </a>
      </div>
    </nav>
  </header>
</template>
