<template>
  <section id="words" class="max-w-6xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
    <div class="mb-14 reveal">
      <p class="font-mono text-xs text-brand-purple mb-3">/ kind words</p>
      <h2 class="font-display text-4xl sm:text-5xl font-bold max-w-2xl">What people have said after we shipped.</h2>
    </div>

    <div class="grid lg:grid-cols-3 gap-6">
      <figure class="reveal lg:col-span-2 p-8 sm:p-10 rounded-2xl bg-brand-purple text-white relative overflow-hidden">
        <svg class="absolute top-6 right-6 w-16 h-16 opacity-15" viewBox="0 0 24 24" fill="currentColor"><path d="M7 7h4v4H7v4H3V11a4 4 0 0 1 4-4zm10 0h4v4h-4v4h-4V11a4 4 0 0 1 4-4z"/></svg>
        <blockquote class="font-display text-2xl sm:text-3xl leading-snug">
          "Alex shipped a working MVP in seven weeks and didn't ghost us after. Honestly, the best money we spent in our pre-seed."
        </blockquote>
        <figcaption class="mt-8 flex items-center gap-4">
          <img src="https://i.pravatar.cc/80?img=12" class="w-12 h-12 rounded-full border-2 border-white/30" alt="Maya Chen">
          <div>
            <div class="font-semibold">Maya Chen</div>
            <div class="text-sm text-white/70">Founder, Finch Analytics</div>
          </div>
        </figcaption>
      </figure>

      <figure class="reveal p-8 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900">
        <blockquote class="font-display text-xl leading-snug">
          "He pushed back on half of my ideas — and was right every time. Saved me months."
        </blockquote>
        <figcaption class="mt-6 flex items-center gap-3">
            <img src="https://i.pravatar.cc/80?img=33" class="w-10 h-10 rounded-full" alt="Jordan Smith">
          <div>
            <div class="font-semibold text-sm">Jordan Smith</div>
            <div class="text-xs text-zinc-500">Solo founder, Stack</div>
          </div>
        </figcaption>
      </figure>

      <figure class="reveal lg:col-span-3 p-8 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 flex flex-col md:flex-row gap-8 items-start">
        <div class="md:flex-1">
          <blockquote class="font-display text-xl leading-snug">
            "We'd been burned by two agencies before. Alex felt different from the first call — clear, no-bs, and genuinely interested in the problem. The app he built has been running for a year with basically zero issues."
          </blockquote>
          <figcaption class="mt-6 flex items-center gap-3">
            <img src="https://i.pravatar.cc/80?img=58" class="w-10 h-10 rounded-full" alt="Priya Anand">
            <div>
              <div class="font-semibold text-sm">Priya Anand</div>
              <div class="text-xs text-zinc-500">Ops Lead, Northwind</div>
            </div>
          </figcaption>
        </div>
        <div class="md:w-72 shrink-0 rounded-xl border border-zinc-200 dark:border-white/10 p-4 bg-zinc-50 dark:bg-zinc-950 font-mono text-xs">
          <div class="flex items-center gap-2 mb-2">
            <span class="w-2 h-2 rounded-full bg-brand-green" />
            <span class="font-semibold">priya</span>
            <span class="text-zinc-500">9:42 AM</span>
          </div>
          <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed">honestly this is the calmest launch we've ever had 🙏 ship-it Friday for real this time</p>
        </div>
      </figure>
    </div>
  </section>
</template>
