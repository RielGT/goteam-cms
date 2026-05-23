<template>
  <section id="process-lifecycle" class="relative overflow-hidden border-y border-zinc-200/70 dark:border-white/5 bg-paper dark:bg-ink">
    <div class="absolute inset-0 bg-grid opacity-40 pointer-events-none"></div>
    <div class="absolute -top-32 -left-24 w-96 h-96 rounded-full bg-brand-purple/10 blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-32 -right-24 w-96 h-96 rounded-full bg-brand-green/10 blur-3xl pointer-events-none"></div>

    <div class="relative max-w-6xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
      <div class="max-w-2xl mb-12 reveal">
        <p class="font-mono text-xs text-brand-purple mb-3">/ how I work — the full lifecycle</p>
        <h2 class="font-display text-4xl sm:text-5xl font-bold">From <span class="squiggle text-brand-green">first call</span> to live in production.</h2>
        <p class="mt-4 text-zinc-600 dark:text-zinc-400 text-lg">Click any phase to see what actually happens — the artifacts, the cadence, and the receipts.</p>
      </div>

      <div class="relative mb-10 pt-2" id="lcRail">
        <div class="hidden sm:block absolute top-1/2 -translate-y-1/2 h-1 rounded-full bg-zinc-200 dark:bg-white/10 overflow-hidden" style="left: 8.333%; right: 8.333%;">
          <div id="lcProgress" class="h-full bg-gradient-to-r from-brand-purple via-brand-green to-brand-orange transition-all duration-700 ease-out" style="width: 0%"></div>
        </div>

        <div role="tablist" aria-label="Project lifecycle phases" class="relative grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-2">
          <button v-for="(p, idx) in steps" :key="p.label" role="tab" :data-lc-step="idx" :aria-selected="idx === 0 ? 'true' : 'false'" class="lc-step group flex flex-col items-center gap-2 focus:outline-none">
            <span class="lc-dot relative w-12 h-12 rounded-full grid place-items-center font-mono text-xs font-semibold border-2 bg-paper dark:bg-ink shadow-soft transition-all"
                  :class="idx === 0 ? 'border-brand-purple text-brand-purple' : 'border-zinc-300 dark:border-white/15 text-zinc-500 dark:text-zinc-400'">
              {{ p.num }}
            </span>
            <span class="lc-label text-[11px] sm:text-xs font-mono text-center"
                  :class="idx === 0 ? 'text-ink dark:text-white font-semibold' : 'text-zinc-500 dark:text-zinc-400 transition'">
              {{ p.label }}
            </span>
          </button>
        </div>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-4 mb-6 reveal">
        <div class="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
          <span id="lcPhaseIndex" class="text-brand-purple font-semibold">01</span>
          <span>/</span>
          <span>06</span>
          <span class="mx-2 text-zinc-300 dark:text-white/20">•</span>
          <span id="lcPhaseDuration">~3 days</span>
        </div>
        <div class="flex items-center gap-2">
          <button id="lcAutoplay" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border border-zinc-200 dark:border-white/10 hover:border-brand-purple hover:text-brand-purple transition">
            <svg id="lcAutoplayIcon" class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            <span id="lcAutoplayLabel">Autoplay</span>
          </button>
          <button id="lcPrev" aria-label="Previous phase" class="w-8 h-8 grid place-items-center rounded-full border border-zinc-200 dark:border-white/10 hover:border-brand-purple hover:text-brand-purple transition">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button id="lcNext" aria-label="Next phase" class="w-8 h-8 grid place-items-center rounded-full border border-zinc-200 dark:border-white/10 hover:border-brand-purple hover:text-brand-purple transition">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>

      <div class="grid lg:grid-cols-12 gap-6">
        <div class="lg:col-span-7 reveal">
          <div id="lcPanels" class="relative rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 p-7 sm:p-9 shadow-soft min-h-[420px] overflow-hidden">
            <article v-for="(panel, idx) in panels" :key="panel.title" :data-lc-panel="idx" class="lc-panel" :class="idx !== 0 ? 'hidden' : ''">
              <div class="flex items-center gap-2 mb-4">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono" :class="toneBg[panel.tone]">
                  <span class="w-1.5 h-1.5 rounded-full" :class="toneDot[panel.tone]"></span> phase {{ panel.num }}
                </span>
                <span class="text-[11px] font-mono text-zinc-400">{{ panel.duration }}</span>
              </div>
              <h3 class="font-display text-2xl sm:text-3xl font-bold mb-3">{{ panel.title }}</h3>
              <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5">{{ panel.body }}</p>
              <ul class="space-y-2.5 text-sm">
                <li v-for="b in panel.bullets" :key="b.text" class="flex gap-3">
                  <span class="font-mono mt-0.5" :class="toneText[panel.tone]">→</span>
                  <span class="text-zinc-700 dark:text-zinc-300"><strong class="text-ink dark:text-white">{{ b.label }}</strong> {{ b.text }}</span>
                </li>
              </ul>
            </article>
          </div>
        </div>

        <div class="lg:col-span-5 reveal">
          <div class="rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-950 text-zinc-100 shadow-soft overflow-hidden">
            <div class="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.03]">
              <div class="flex items-center gap-1.5">
                <span class="w-3 h-3 rounded-full bg-red-400/80"></span>
                <span class="w-3 h-3 rounded-full bg-yellow-400/80"></span>
                <span class="w-3 h-3 rounded-full bg-green-400/80"></span>
              </div>
              <div id="lcArtifactTitle" class="text-[11px] font-mono text-zinc-400 truncate">discovery-call-recap.md</div>
              <div class="text-[10px] font-mono text-zinc-500">live</div>
            </div>

            <div class="relative p-5 sm:p-6 font-mono text-[12.5px] leading-relaxed min-h-[420px]">
              <pre data-lc-artifact="0" class="lc-artifact whitespace-pre-wrap text-zinc-300"><span class="text-brand-purple"># Recap — Maya / Finch Analytics</span>
<span class="text-zinc-500">Date: Mon, Mar 4 · 32 min</span>

<span class="text-brand-green">// problem</span>
Founders losing hours/week stitching
Stripe + HubSpot data into Notion.

<span class="text-brand-green">// success looks like</span>
- ship MVP in &lt; 8 weeks
- 5 design partners using daily
- &lt; $200/mo infra at launch

<span class="text-brand-green">// risks I flagged</span>
- HubSpot API rate limits
- you don't have a designer (yet)
- "AI insights" is undefined → cut?

<span class="text-brand-orange">// my honest read</span>
Real problem. Tight but doable.
I'm a fit. Proposal Wed.</pre>

              <pre data-lc-artifact="1" class="lc-artifact hidden whitespace-pre-wrap text-zinc-300"><span class="text-brand-purple"># Statement of Work — v1</span>
<span class="text-zinc-500">Finch Analytics · 7 weeks · fixed</span>

<span class="text-brand-green">SCOPE — in</span>
✓ Stripe + HubSpot ingest
✓ unified customer timeline
✓ Slack + email digests
✓ team workspace, 3 roles

<span class="text-red-400">SCOPE — out (v2)</span>
✗ "AI insights" (revisit post-launch)
✗ Salesforce, Intercom
✗ mobile app

<span class="text-brand-green">MILESTONES</span>
M1  wk 2  · auth + ingest live
M2  wk 4  · timeline + digest
M3  wk 6  · roles + billing
M4  wk 7  · launch

<span class="text-brand-orange">PRICE</span>  $42,000 · 30/40/30
<span class="text-brand-orange">START</span>  Mon Mar 18</pre>

              <pre data-lc-artifact="2" class="lc-artifact hidden whitespace-pre-wrap text-zinc-300"><span class="text-brand-purple"># Flows — v0.3</span>
<span class="text-zinc-500">figma.com/file/finch-mvp</span>

<span class="text-brand-green">flows mapped</span>
[1] sign-up → connect stripe
[2] sign-up → connect hubspot
[3] view customer timeline
[4] configure digest cadence
[5] invite teammate (admin/viewer)

<span class="text-brand-green">edge cases written</span>
· empty state · 0 customers
· stripe disconnected mid-sync
· hubspot 429 rate limit
· invited user already exists

<span class="text-brand-orange">data model — sketch</span>
User ─┬─ Workspace ─┬─ Integration
      │             └─ Customer
      └─ Membership(role)

<span class="text-brand-purple">→ awaiting your Loom approval</span></pre>

              <pre data-lc-artifact="3" class="lc-artifact hidden whitespace-pre-wrap text-zinc-300"><span class="text-brand-purple"># Standup — Thu Apr 11</span>
<span class="text-zinc-500">staging.finch.app · build wk 4</span>

<span class="text-brand-green">$ git log --oneline -5</span>
a3f9c2  feat: hubspot OAuth flow
71b0de  fix: stripe webhook idempotency
e4c1aa  test: timeline merge edge cases
9d8721  chore: bump next 14.2 → 14.3
2b04f5  feat: digest scheduler (cron)

<span class="text-brand-green">linear ▸ this week</span>
✓ FIN-42  hubspot ingest         done
✓ FIN-44  timeline merge logic   done
◐ FIN-47  digest preview UI      80%
○ FIN-51  role permissions       next

<span class="text-brand-orange">⚠ 1 thing for you</span>
need decision on digest default
cadence: daily or weekly? (loom ↗)</pre>

              <pre data-lc-artifact="4" class="lc-artifact hidden whitespace-pre-wrap text-zinc-300"><span class="text-brand-purple"># QA Report — pre-launch</span>
<span class="text-zinc-500">build 1.0.0-rc.3 · Tue May 14</span>

<span class="text-brand-green">automated</span>
✓ 184 unit tests          pass
✓ 27  e2e (playwright)    pass
✓ lighthouse perf         94
✓ lighthouse a11y         98
✓ axe-core violations     0

<span class="text-brand-green">manual UAT</span>
✓ Maya          12 flows ok
✓ partner #1    found 2 bugs (fixed)
✓ partner #2    found 1 bug  (fixed)

<span class="text-brand-orange">load test</span>
1k concurrent · p95 240ms ✓
stripe webhook burst ✓ no drops

<span class="text-red-400">deferred → v1.1</span>
· bulk csv export (FIN-89)
· dark mode polish (FIN-91)

<span class="text-brand-purple">verdict: ship Friday.</span></pre>

              <pre data-lc-artifact="5" class="lc-artifact hidden whitespace-pre-wrap text-zinc-300"><span class="text-brand-purple"># Launch — Fri May 17</span>
<span class="text-zinc-500">prod.finch.app · v1.0.0</span>

<span class="text-brand-green">$ vercel deploy --prod</span>
✓ build         42s
✓ migrations    ok (3 applied)
✓ smoke tests   ok
✓ DNS cutover   propagated

<span class="text-brand-green">monitoring live</span>
· Sentry        errors  → #alerts
· Datadog       p95     → dash ↗
· BetterStack   uptime  → status ↗

<span class="text-brand-orange">handover bundle</span>
✓ repo access (you = admin)
✓ env vars vault (1Password)
✓ runbook.md (incidents, rollback)
✓ architecture.md + diagram
✓ Loom walkthrough (18 min)

<span class="text-brand-purple"># 30-day support clock starts now.
# Slack channel stays open. Sleep well.</span></pre>
            </div>
          </div>

          <div class="mt-5 grid grid-cols-3 gap-3">
            <div class="p-4 rounded-xl border border-zinc-200 dark:border-white/10 bg-paper dark:bg-ink">
              <div id="lcStat1" class="font-display text-2xl font-bold text-ink dark:text-white">7 wks</div>
              <div class="text-[11px] font-mono text-zinc-500 mt-1">avg timeline</div>
            </div>
            <div class="p-4 rounded-xl border border-zinc-200 dark:border-white/10 bg-paper dark:bg-ink">
              <div id="lcStat2" class="font-display text-2xl font-bold text-ink dark:text-white">2×/wk</div>
              <div class="text-[11px] font-mono text-zinc-500 mt-1">demo cadence</div>
            </div>
            <div class="p-4 rounded-xl border border-zinc-200 dark:border-white/10 bg-paper dark:bg-ink">
              <div id="lcStat3" class="font-display text-2xl font-bold text-ink dark:text-white">30 days</div>
              <div class="text-[11px] font-mono text-zinc-500 mt-1">free post-launch</div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/60 dark:bg-white/[0.03] reveal">
        <div>
          <p class="font-display text-lg font-semibold">Like the way I work?</p>
          <p class="text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">Phase 01 is free. Worst case, you get a second opinion.</p>
        </div>
        <a href="#talk" class="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-ink text-white dark:bg-white dark:text-ink font-medium hover:bg-brand-purple dark:hover:bg-brand-purple dark:hover:text-white transition shadow-soft">
          Book a discovery call
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  { num: "01", label: "Discovery" }, { num: "02", label: "Scope" },
  { num: "03", label: "Design" }, { num: "04", label: "Build" },
  { num: "05", label: "QA" }, { num: "06", label: "Deploy" },
];

interface Bullet { label: string; text: string; }
type Tone = "brand-purple" | "brand-green" | "brand-orange";
interface Panel { num: string; tone: Tone; duration: string; title: string; body: string; bullets: Bullet[]; }

const toneBg: Record<Tone, string> = {
  "brand-purple": "bg-brand-purple/10 text-brand-purple",
  "brand-green":  "bg-brand-green/10 text-brand-green",
  "brand-orange": "bg-brand-orange/10 text-brand-orange",
};
const toneDot: Record<Tone, string> = {
  "brand-purple": "bg-brand-purple",
  "brand-green":  "bg-brand-green",
  "brand-orange": "bg-brand-orange",
};
const toneText: Record<Tone, string> = {
  "brand-purple": "text-brand-purple",
  "brand-green":  "text-brand-green",
  "brand-orange": "text-brand-orange",
};

const panels: Panel[] = [
  {
    num: "01", tone: "brand-purple", duration: "~30 min call · free",
    title: "Discovery — figuring out if this is real.",
    body: "A no-deck, no-pitch call. You walk me through the problem and the people you're solving it for. I ask uncomfortable questions about scope, timeline, and budget early — because finding out later is expensive.",
    bullets: [
      { label: "What you'll get:", text: "a written recap with my honest read, risks I see, and whether I'm a fit." },
      { label: "What I need:", text: "30 minutes, any context you've got, and an honest budget range." },
      { label: "If we're not a fit:", text: "I'll point you to two devs who probably are. Free of charge." },
    ],
  },
  {
    num: "02", tone: "brand-purple", duration: "~3 days · fixed-price proposal",
    title: "Scope — pricing reality, not optimism.",
    body: "I write a one-page proposal: what we're building, what we're explicitly not building, the timeline with milestones, and a fixed price. No \"TBD\" line items. No vague AI sprinkled on top.",
    bullets: [
      { label: "Deliverable:", text: "proposal PDF, signed SOW, 30% deposit invoice." },
      { label: "Milestones:", text: "3–4 named checkpoints with go/no-go decisions you control." },
      { label: "Change requests:", text: "handled in writing, priced before any work starts." },
    ],
  },
  {
    num: "03", tone: "brand-green", duration: "~1 week · Figma + flow review",
    title: "Design — flows before pixels.",
    body: "If you don't have a designer, I sketch the critical user flows in Figma — login, core action, edge cases. We argue about the boring stuff (empty states, error copy) early so the build phase is just building.",
    bullets: [
      { label: "Output:", text: "clickable Figma prototype + data model sketch." },
      { label: "Got a designer already?", text: "Even better. I'll do a build-feasibility pass and flag anything risky." },
      { label: "Sign-off:", text: "short async Loom from you saying \"yes, build this.\"" },
    ],
  },
  {
    num: "04", tone: "brand-green", duration: "~3–6 weeks · in the open",
    title: "Build — staging URL from day one.",
    body: "You get a Linear board, a Slack channel, and a live staging environment by end of week one. Two Loom updates per week. You see PRs as they merge. No surprises, no theater.",
    bullets: [
      { label: "Cadence:", text: "Mon plan, Thu demo, Fri staging deploy. Async-first." },
      { label: "Stack defaults:", text: "Next.js, TypeScript, Postgres, Vercel — boring tech that scales." },
      { label: "Tests:", text: "written alongside code, not \"later.\" CI green or it doesn't ship." },
    ],
  },
  {
    num: "05", tone: "brand-orange", duration: "~3–5 days · pre-launch hardening",
    title: "QA — breaking it before users do.",
    body: "A hardening sprint: end-to-end tests on critical flows, accessibility audit, perf budget check, real-data load test, and a written security pass. Then we triage every bug into \"ship-blocker\" or \"next sprint.\"",
    bullets: [
      { label: "Checklist:", text: "Lighthouse ≥ 90, WCAG AA, error tracking wired, backups tested." },
      { label: "UAT:", text: "you and 1–2 real users break the staging app. I fix and re-deploy daily." },
      { label: "Rollback plan:", text: "documented, tested, one command away." },
    ],
  },
  {
    num: "06", tone: "brand-orange", duration: "launch day + 30 days support",
    title: "Deploy — calm launch, no fireworks.",
    body: "A boring launch is a good launch. Production deploy with feature flags, monitoring dashboards live, and a runbook for the first 72 hours. Then I hand over keys, ownership, and docs you can actually read.",
    bullets: [
      { label: "Handover:", text: "repo access, env vars, deployment guide, architecture diagram." },
      { label: "Free for 30 days:", text: "any bug introduced by me, I fix on my time." },
      { label: "After that:", text: "retainer for new features, or an introduction to a long-term hire." },
    ],
  },
];
</script>
