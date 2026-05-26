<script setup lang="ts">
const onSubmit = (e: Event) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  if (btn) btn.textContent = "Thanks — talk soon ✓";
  form.reset();
};
</script>

<template>
  <section id="talk" class="relative overflow-hidden border-y border-zinc-200/70 dark:border-white/5 bg-white/40 dark:bg-white/[0.02]">
    <div class="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
    <div class="relative max-w-5xl mx-auto px-5 sm:px-8 py-24 sm:py-32 grid lg:grid-cols-5 gap-12 items-start">
      <div class="lg:col-span-2 reveal">
        <p class="font-mono text-xs text-brand-purple mb-3">/ let's talk</p>
        <h2 class="font-display text-4xl sm:text-5xl font-bold leading-tight">Free 30-min call. No pitch deck.</h2>
        <p class="mt-5 text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">Tell me what you're building. I'll tell you honestly whether I can help, what it'd take, and roughly when I could start.</p>

        <div class="mt-8 space-y-3 text-sm">
          <div class="flex items-center gap-3"><span class="w-1.5 h-1.5 rounded-full bg-brand-green" /> Usually reply in under 24 hours</div>
          <div class="flex items-center gap-3"><span class="w-1.5 h-1.5 rounded-full bg-brand-green" /> Friendly call, no sales script</div>
          <div class="flex items-center gap-3"><span class="w-1.5 h-1.5 rounded-full bg-brand-green" /> Booking for June 2026 onward</div>
        </div>
      </div>

      <form class="lg:col-span-3 reveal p-7 sm:p-9 rounded-2xl border border-zinc-200 dark:border-white/10 bg-paper dark:bg-ink shadow-soft space-y-5" @submit="onSubmit">
        <div>
          <label class="block text-xs font-mono text-zinc-500 mb-2" for="name">Your name</label>
          <input
            id="name" required type="text" placeholder="e.g. Sam"
            class="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition"
          >
        </div>
        <div>
          <label class="block text-xs font-mono text-zinc-500 mb-2" for="email">Email</label>
          <input
            id="email" required type="email" placeholder="sam@yourstartup.com"
            class="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition"
          >
        </div>
        <div>
          <label class="block text-xs font-mono text-zinc-500 mb-2" for="idea">What are you building? <span class="text-zinc-400">(1–2 sentences is plenty)</span></label>
          <textarea
            id="idea" required rows="3" placeholder="Trying to build a tool that..."
            class="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition resize-none"
          />
        </div>
        <button type="submit" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-purple text-white px-7 py-3.5 rounded-full font-medium hover:bg-ink dark:hover:bg-white dark:hover:text-ink transition-all hover:-translate-y-0.5">
          Send it →
        </button>
        <p class="text-xs text-zinc-500">Or just <a href="mailto:hi@alex.dev" class="underline hover:text-brand-purple">email me directly</a> — that works too.</p>
      </form>
    </div>
  </section>
</template>
