<template>
  <section class="relative overflow-hidden">
    <div class="absolute inset-0 bg-grid opacity-60 pointer-events-none" />
    <div class="max-w-6xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-20 relative">
      <div class="grid lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-7 reveal">
          <div class="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full bg-brand-green/10 text-brand-green border border-brand-green/20">
            <span class="w-1.5 h-1.5 rounded-full bg-brand-green pulse-dot" />
            Booking for June 2026
          </div>

          <h1 class="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.02] mt-6">
            I build web apps that <span class="squiggle text-brand-purple">actually ship</span> on time.
          </h1>

          <p class="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed">
            Hey, I'm Alex — a freelance full stack dev. I help founders and small teams turn half-baked ideas into real, working products that users love (and don't break on Mondays).
          </p>

          <div class="mt-9 flex flex-wrap items-center gap-4">
            <a href="#talk" class="group inline-flex items-center gap-2 bg-brand-purple text-white px-6 py-3.5 rounded-full font-medium hover:bg-ink dark:hover:bg-white dark:hover:text-ink transition-all hover:-translate-y-0.5 shadow-soft">
              Tell me about your project
              <svg class="w-4 h-4 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </a>
            <a href="#work" class="inline-flex items-center gap-2 text-sm font-medium hover:text-brand-purple transition">
              or peek at the work
              <svg class="hand-arrow w-12 h-3" viewBox="0 0 60 12" fill="none"><path d="M2 6 Q 20 2 40 6 L 55 6 M 50 2 L 55 6 L 50 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
          </div>
        </div>

        <div class="lg:col-span-5 reveal relative">
          <div class="relative">
            <div class="relative rounded-3xl overflow-hidden aspect-[4/5] bg-gradient-to-br from-brand-purple/20 via-brand-green/10 to-brand-orange/20 border border-zinc-200 dark:border-white/10">
              <img
                src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=900&q=80"
                alt="Alex working at a sunlit desk with coffee"
                class="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal"
                loading="lazy"
              >
              <div class="absolute top-4 left-4 bg-paper dark:bg-ink text-ink dark:text-zinc-100 border border-zinc-200 dark:border-white/10 rounded-full px-3 py-1.5 text-xs font-mono shadow-soft">
                ☕ probably on coffee #3
              </div>
            </div>

            <div class="hidden sm:block absolute -bottom-8 -left-8 w-64 rotate-[-3deg] rounded-xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-soft">
              <div class="flex items-center gap-1.5 px-3 py-2 border-b border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-950">
                <span class="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span class="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span class="w-2.5 h-2.5 rounded-full bg-green-400" />
                <span class="ml-2 text-[10px] font-mono text-zinc-500">ship.ts</span>
              </div>
              <pre class="text-[11px] font-mono p-3 leading-relaxed text-zinc-700 dark:text-zinc-300">
                <span class="text-brand-purple">const</span> ship = <span class="text-brand-orange">async</span> () =&gt; {
                <span class="text-zinc-400">// no scope creep</span>
                <span class="text-brand-purple">await</span> build()
                <span class="text-brand-purple">return</span> <span class="text-brand-green">'on time'</span>
                }
              </pre>
            </div>

            <div class="hidden sm:flex absolute -top-6 -right-4 rotate-[6deg] items-center gap-2 bg-brand-orange text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-soft">
              <span>shipping since '17</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
