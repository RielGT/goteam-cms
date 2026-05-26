<script setup lang="ts">
interface Pill { name: string; svg: string; }

withDefaults(defineProps<{ contained?: boolean }>(), { contained: true });

const pills: Pill[] = [
  { name: "TypeScript", svg: '<svg viewBox="0 0 128 128"><path fill="#3178C6" d="M0 64v64h128V0H0z"/><path fill="#fff" d="M22.7 65.1v5.2h16.6v47.1h11.7V70.3h16.6v-5.1c0-2.8 0-5.2-.2-5.2-.1-.1-10-.2-22-.1l-21.9.1zm81.6-5.4c3.2.8 5.7 2.2 7.9 4.5 1.2 1.3 2.9 3.5 3.1 4 0 .2-5.5 3.9-8.8 6-.1 0-.6-.5-1.1-1.4-1.6-2.3-3.3-3.3-5.8-3.5-3.8-.3-6.3 1.7-6.3 5 0 1 .2 1.6.5 2.3.8 1.6 2.2 2.5 6.7 4.5 8.4 3.6 12 6 14.2 9.3 2.5 3.7 3.1 9.7 1.4 14.1-1.9 4.8-6.4 8-12.7 9.1-2 .3-6.6.3-8.7 0-4.7-.9-9-3.2-12.1-6.5-1.2-1.3-3.6-4.8-3.5-5 .2-.1.7-.5 1.2-.8.5-.4 2.4-1.5 4.1-2.5l3.2-1.9.7 1c.9 1.4 2.9 3.4 4.1 4 3.4 1.8 8.1 1.6 10.4-.5.9-.9 1.2-1.8 1.2-3.2 0-1.3-.2-1.9-.9-2.9-.9-1.3-2.7-2.4-7.9-4.6-5.9-2.5-8.4-4.1-10.7-6.5-1.3-1.5-2.5-3.7-3.1-5.7-.4-1.7-.5-5.8-.2-7.5 1.1-5 4.9-8.5 10.4-9.6 1.8-.3 5.9-.2 7.6.2z"/></svg>' },
  { name: "React", svg: '<svg viewBox="0 0 128 128"><circle fill="#61DAFB" cx="64" cy="64" r="11.4"/><g stroke="#61DAFB" stroke-width="4" fill="none"><ellipse cx="64" cy="64" rx="56" ry="21"/><ellipse cx="64" cy="64" rx="56" ry="21" transform="rotate(60 64 64)"/><ellipse cx="64" cy="64" rx="56" ry="21" transform="rotate(120 64 64)"/></g></svg>' },
  { name: "Next.js", svg: '<svg viewBox="0 0 128 128"><path d="M64 0a64 64 0 1 0 0 128A64 64 0 0 0 64 0zm-7 33.4l31.4 47.4V33.4h6.6v61.2h-7.9L55.6 47.2v47.4H49V33.4h8z" fill="currentColor"/></svg>' },
  { name: "Node.js", svg: '<svg viewBox="0 0 128 128"><path fill="#83CD29" d="M64 128a6.4 6.4 0 0 1-3.2-.9l-10.2-6c-1.5-.8-.8-1.1-.3-1.3 2-.7 2.4-.9 4.6-2.1.2-.1.5-.1.8.1l7.8 4.7c.3.2.7.2 1 0l30.6-17.7c.3-.2.5-.5.5-.9V68.6c0-.4-.2-.7-.5-.9l-30.6-17.7c-.3-.2-.7-.2-1 0L33 67.7c-.3.2-.5.5-.5.9v35.4c0 .3.2.7.5.8l8.4 4.9c4.5 2.3 7.3-.4 7.3-3.1V71.7c0-.5.4-.9.9-.9h3.9c.5 0 .9.4.9.9v34.9c0 6-3.3 9.5-9 9.5-1.8 0-3.2 0-7.1-1.9l-8-4.6a6.4 6.4 0 0 1-3.2-5.5V68.6a6.4 6.4 0 0 1 3.2-5.5L60.8 45.4a6.7 6.7 0 0 1 6.4 0l30.6 17.7a6.4 6.4 0 0 1 3.2 5.5v35.4a6.4 6.4 0 0 1-3.2 5.5l-30.6 17.7a6.4 6.4 0 0 1-3.2.8z"/></svg>' },
  { name: "PostgreSQL", svg: '<svg viewBox="0 0 128 128"><path fill="#336791" d="M93.8 93c.6-5 .4-5.8 4.2-5 1 .1 1.7.2 2.6.2 2.7 0 6.1-.6 8.1-1.5 4.3-2 7-5.4 2.7-4.5-9.6 2-10.3-1.3-10.3-1.3 10.2-15.1 14.4-34.3 10.8-39C102 25.3 86.9 29.6 86.7 29.7l-.1.1c-1.9-.6-4-1-6.4-1-4.3-.1-7.6.4-11 1.7L69 30.4c-.4-.2-9.2-5.5-19.1-1.8-6.8 2.6-9.5 8.6-6.4 22.5 4.5 19.3 12.7 22.7 14.5 22.3.6-.1.7-.7.8-1.2l.1-1.6c-2.2-2.4-2.3-6.7-2-9.6l.7-.7c.4 1.4 1 2.7 1.8 4 2.1 3.2 6.9 8.5 12.6 6.7 4.2-1.3 7.3-7.7 7.3-7.7s1.1 11.1 2.7 14.7c1.6 3.5-3.6 11.2-7.4 13.4-.4.2-.5.4-.1.4 1 .1 3.8 0 7.4-3.1 3.5-3 6-7 7.4-10.8 1.4-3.7 2-4.3 2.5-3.8.4.6 0 4.9-2 7.3-1.5 1.9-7 6.6-8.7 8.3-.8.7-1 .7-1.4.8-.4.1-.8.3-.6.6.3.4 1.2.9 2.5 1.4 2.6.9 5.8 1.4 9.2.7 5.8-1.1 6.7-7.7 7.2-10.2.4-2.5 1.4-2.6 1.4-2.6z"/></svg>' },
  { name: "Tailwind CSS", svg: '<svg viewBox="0 0 128 128"><path fill="#38BDF8" d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.535-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.871 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64z"/></svg>' },
  { name: "Git", svg: '<svg viewBox="0 0 128 128"><path fill="#F05032" d="M124.7 58L70 3.3a5.7 5.7 0 0 0-8.1 0L50.5 14.8l14.4 14.4a6.8 6.8 0 0 1 8.7 8.7l13.9 13.9a6.8 6.8 0 1 1-4.1 3.8L70.5 42.9v34a6.8 6.8 0 1 1-5.6-.2V42.4a6.8 6.8 0 0 1-3.7-9L46.9 19 3.3 62.5a5.7 5.7 0 0 0 0 8.1l54.7 54.7a5.7 5.7 0 0 0 8.1 0l54.5-54.5a5.7 5.7 0 0 0 0-8.1"/></svg>' },
  { name: "Prisma", svg: '<svg viewBox="0 0 128 128"><path fill="#000" d="M64 0L0 26.7v74.6L64 128l64-26.7V26.7L64 0zm0 13.6l50.4 21V93.4L64 114.4 13.6 93.4V34.6L64 13.6z"/><path fill="#000" d="M64 30L30 44v40l34 14 34-14V44L64 30zm0 12l22 9.1v25.8L64 86l-22-9.1V51.1L64 42z"/></svg>' },
  { name: "tRPC", svg: '<svg viewBox="0 0 128 128"><path fill="#06B6D4" d="M37 19.7L8 64l29 44.3 23-15.4L46.1 64 60 35.1zM91 19.7L62 64l29 44.3 23-15.4L100.1 64 114 35.1z"/></svg>' },
  { name: "Stripe", svg: '<svg viewBox="0 0 128 128"><circle cx="64" cy="64" r="64" fill="#635BFF"/><path fill="#fff" d="M59.4 47.6c0-2.9 2.4-4 6.3-4 5.7 0 12.8 1.7 18.5 4.7v-17.6c-6.2-2.5-12.4-3.4-18.5-3.4-15.1 0-25.1 7.9-25.1 21 0 20.5 28.2 17.2 28.2 26 0 3.4-3 4.5-7.1 4.5-6.2 0-14.2-2.5-20.5-6v17.9c7 3 14.1 4.3 20.5 4.3 15.5 0 26.1-7.7 26.1-21 0-22.1-28.4-18.1-28.4-26.4z"/></svg>' },
  { name: "Vercel", svg: '<svg viewBox="0 0 128 128"><path fill="#000" d="M64 0L0 110.4h128zm0 25.4L23.4 95.8h81.2z"/></svg>' },
  { name: "Cloudflare", svg: '<svg viewBox="0 0 128 128"><path fill="#F38020" d="M115.7 78.5c-1.5-5.2-7.1-9-12.2-9 -.5 0-1.1 0-1.6.1l-.7.2-22.5 7.3-2.5.8 1.2-2.3 7.4-13.4c.6-1 .9-2.2.9-3.4 0-1.7-.6-3.3-1.7-4.6-3.2-3.6-9.4-2.7-12.8 1.9L57.5 64.2 50 70.4l-2-2.4c-4.1-4.7-10.5-7.5-17.1-7.5C18.2 60.5 8.1 70.7 8.1 83.2c0 1.4.1 2.7.4 4.1l1.4 7c.4 1.7 1.9 2.9 3.6 2.8h95.6c1.8 0 3.3-1.3 3.7-3l1.6-5.7c.4-1.5.5-3 .5-4.5 0-1.8-.4-3.5-1.2-5.4z"/></svg>' },
  { name: "Remix", svg: '<svg viewBox="0 0 128 128"><path fill="#FF6B35" d="M64 0L8 128h112zM64 24l32 80H32z"/></svg>' },
  { name: "Bash", svg: '<svg viewBox="0 0 128 128"><circle cx="64" cy="64" r="60" fill="#000"/><text x="64" y="78" text-anchor="middle" fill="#fff" font-family="monospace" font-weight="bold" font-size="32">sh</text></svg>' },
  { name: "Supabase", svg: '<svg viewBox="0 0 128 128"><rect width="128" height="128" rx="20" fill="#181818"/><path d="M44 50v28l24-14z" fill="#10B981"/></svg>' },
];
</script>

<template>
  <section aria-label="Tech stack" class="border-y border-zinc-200/70 dark:border-white/5 bg-white/40 dark:bg-white/[0.02] py-10">
    <!-- Label row — contained, matches all other sections -->
    <div class="max-w-6xl mx-auto px-5 sm:px-8 mb-6">
      <div class="flex items-center gap-3 text-xs font-mono text-zinc-500 dark:text-zinc-500">
        <span class="w-1.5 h-1.5 rounded-full bg-brand-green pulse-dot" />
        <span>/ tools I reach for daily</span>
        <span class="flex-1 h-px bg-zinc-200 dark:bg-white/5" />
        <span class="hidden sm:inline text-zinc-400 dark:text-zinc-500">hover to pause →</span>
      </div>
    </div>

    <!-- Marquee — full-bleed by default, contained when prop is set -->
    <div class="overflow-hidden marquee marquee-mask" :class="contained ? 'max-w-6xl mx-auto px-5 sm:px-8' : 'w-full'">
      <div class="marquee-track">
        <div class="flex items-center">
          <span v-for="p in pills" :key="`a-${p.name}`" class="tech-pill">
            <span v-html="p.svg" />
            {{ p.name }}
          </span>
        </div>
        <div class="flex items-center" aria-hidden="true">
          <span v-for="p in pills" :key="`b-${p.name}`" class="tech-pill">
            <span v-html="p.svg" />
            {{ p.name }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
