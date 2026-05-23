<script setup lang="ts">
const faqs = [
  { q: "How much does a project cost?", a: "Most projects land between $8k and $40k depending on scope. I quote per-project (not per-hour) so you know the number upfront. Smaller things — landing pages, internal tools — start around $3k." },
  { q: "How long does it take?", a: "Real MVPs usually take 4–8 weeks. Bigger builds, 2–4 months. I work with one or two clients at a time so your project actually gets attention, not a slot in a queue." },
  { q: "Do you work alone or with a team?", a: "Solo, by default. For bigger projects I bring in a trusted designer or mobile dev I've shipped with before — you'll meet them up front, no anonymous handoffs." },
  { q: "What if I just have a rough idea?", a: "Perfect — that's most of my clients. We'll spend the first week shaping it into something concrete: scope, priorities, what to cut. You don't need to come with a spec." },
  { q: "What happens after launch?", a: "30 days of free fixes are included. After that, you can keep me on a small monthly retainer, hire me ad-hoc, or take everything in-house — the code is yours, well-documented, no lock-in." },
];
</script>

<template>
  <section id="faq" class="max-w-4xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
    <div class="mb-12 reveal">
      <p class="font-mono text-xs text-brand-purple mb-3">/ questions?</p>
      <h2 class="font-display text-4xl sm:text-5xl font-bold">The stuff people ask first.</h2>
    </div>

    <div class="divide-y divide-zinc-200 dark:divide-white/10 border-y border-zinc-200 dark:border-white/10">
      <details v-for="f in faqs" :key="f.q" class="group py-6 reveal">
        <summary class="flex items-center justify-between cursor-pointer list-none">
          <span class="font-display text-lg sm:text-xl font-semibold pr-6">{{ f.q }}</span>
          <span class="shrink-0 w-8 h-8 grid place-items-center rounded-full border border-zinc-200 dark:border-white/10 group-open:bg-brand-purple group-open:text-white group-open:border-brand-purple transition">
            <svg class="w-3 h-3 group-open:rotate-45 transition" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
          </span>
        </summary>
        <p class="mt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">{{ f.a }}</p>
      </details>
    </div>
  </section>
</template>
