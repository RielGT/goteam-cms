/**
 * Client-side behavior for the landing page, ported from the static mockup.
 * Re-runs on every route change so it picks up freshly-mounted DOM nodes.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const init = () => {
    const root = document.documentElement;

    // Theme toggle
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      root.classList.add("dark");
    }
    const themeBtn = document.getElementById("themeToggle");
    if (themeBtn && !themeBtn.dataset.bound) {
      themeBtn.dataset.bound = "1";
      themeBtn.addEventListener("click", () => {
        root.classList.toggle("dark");
        localStorage.setItem("theme", root.classList.contains("dark") ? "dark" : "light");
      });
    }

    // Reveal on scroll
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));

    // Featured posts multi-card carousel
    (function () {
      const track = document.getElementById("fpTrack");
      if (!track || (track as HTMLElement).dataset.bound) return;
      (track as HTMLElement).dataset.bound = "1";
      const slides = Array.from(track.querySelectorAll<HTMLElement>(".fp-slide"));
      const prev = document.getElementById("fpPrev") as HTMLButtonElement | null;
      const next = document.getElementById("fpNext") as HTMLButtonElement | null;
      const dotsWrap = document.getElementById("fpDots");
      if (!prev || !next || !dotsWrap) return;
      let i = 0;

      const perView = () => (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
      const maxIndex = () => Math.max(0, slides.length - perView());

      const buildDots = () => {
        dotsWrap.innerHTML = "";
        const pages = maxIndex() + 1;
        for (let p = 0; p < pages; p++) {
          const d = document.createElement("button");
          d.className = "fp-dot";
          d.setAttribute("aria-label", `Go to slide ${p + 1}`);
          d.addEventListener("click", () => go(p));
          dotsWrap.appendChild(d);
        }
      };

      const go = (n: number) => {
        i = Math.max(0, Math.min(maxIndex(), n));
        const step = 100 / perView();
        track.style.transform = `translateX(-${i * step}%)`;
        Array.from(dotsWrap.children).forEach((d, idx) => d.classList.toggle("active", idx === i));
        prev.disabled = i === 0;
        next.disabled = i === maxIndex();
      };

      prev.addEventListener("click", () => go(i - 1));
      next.addEventListener("click", () => go(i + 1));

      let resizeTimer: ReturnType<typeof setTimeout>;
      window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          buildDots();
          go(Math.min(i, maxIndex()));
        }, 120);
      });

      buildDots();
      go(0);
    })();

    // Case study carousel
    (function () {
      const track = document.getElementById("csTrack");
      if (!track || (track as HTMLElement).dataset.bound) return;
      (track as HTMLElement).dataset.bound = "1";
      const slides = Array.from(track.querySelectorAll<HTMLElement>(".cs-slide"));
      const prev = document.getElementById("csPrev") as HTMLButtonElement | null;
      const next = document.getElementById("csNext") as HTMLButtonElement | null;
      const dotsWrap = document.getElementById("csDots");
      const progress = document.getElementById("csProgress");
      const curEl = document.getElementById("csCurrent");
      const totEl = document.getElementById("csTotal");
      const titleEl = document.getElementById("csTitle");
      if (!prev || !next || !dotsWrap || !progress || !curEl || !totEl || !titleEl) return;
      let i = 0;

      totEl.textContent = String(slides.length).padStart(2, "0");

      slides.forEach((_, idx) => {
        const d = document.createElement("button");
        d.className = "cs-dot";
        d.setAttribute("aria-label", `Go to case study ${idx + 1}`);
        d.addEventListener("click", () => go(idx));
        dotsWrap.appendChild(d);
      });
      const dots = Array.from(dotsWrap.children);

      const go = (n: number) => {
        i = Math.max(0, Math.min(slides.length - 1, n));
        track.style.transform = `translateX(-${i * 100}%)`;
        dots.forEach((d, idx) => d.classList.toggle("active", idx === i));
        progress.style.width = `${((i + 1) / slides.length) * 100}%`;
        curEl.textContent = String(i + 1).padStart(2, "0");
        titleEl.textContent = slides[i].dataset.title || "";
        prev.disabled = i === 0;
        next.disabled = i === slides.length - 1;
        slides[i].querySelectorAll<HTMLElement>(".cs-metric-num").forEach((el) => {
          el.style.animation = "none";
          void el.offsetWidth;
          el.style.animation = "";
        });
      };

      prev.addEventListener("click", () => go(i - 1));
      next.addEventListener("click", () => go(i + 1));
      go(0);
    })();

    // LinkedIn recommendations carousel
    (function () {
      const track = document.getElementById("recTrack") as HTMLElement | null;
      if (!track || track.dataset.bound) return;
      track.dataset.bound = "1";
      const cards = Array.from(track.querySelectorAll<HTMLElement>(".rec-card"));
      const prevBtn = document.getElementById("recPrev") as HTMLButtonElement | null;
      const nextBtn = document.getElementById("recNext") as HTMLButtonElement | null;
      const dotsWrap = document.getElementById("recDots");
      if (!prevBtn || !nextBtn || !dotsWrap) return;

      cards.forEach((_, i) => {
        const d = document.createElement("button");
        d.className = "rec-dot";
        d.setAttribute("aria-label", `Go to recommendation ${i + 1}`);
        d.addEventListener("click", () => scrollToCard(i));
        dotsWrap.appendChild(d);
      });
      const dots = Array.from(dotsWrap.children);

      const cardStep = () =>
        cards.length < 2 ? cards[0]?.offsetWidth || 0 : cards[1].offsetLeft - cards[0].offsetLeft;
      const scrollToCard = (i: number) => track.scrollTo({ left: cardStep() * i, behavior: "smooth" });
      const currentIndex = () => {
        const step = cardStep();
        return step ? Math.round(track.scrollLeft / step) : 0;
      };
      const updateUI = () => {
        const i = currentIndex();
        dots.forEach((d, idx) => d.classList.toggle("active", idx === i));
        prevBtn.disabled = i <= 0;
        nextBtn.disabled = i >= cards.length - 1;
      };

      prevBtn.addEventListener("click", () => scrollToCard(Math.max(0, currentIndex() - 1)));
      nextBtn.addEventListener("click", () => scrollToCard(Math.min(cards.length - 1, currentIndex() + 1)));
      track.addEventListener("scroll", () => window.requestAnimationFrame(updateUI), { passive: true });
      window.addEventListener("resize", updateUI);

      cards.forEach((card) => {
        const btn = card.querySelector<HTMLButtonElement>(".rec-toggle");
        if (!btn) return;
        btn.addEventListener("click", () => {
          const expanded = card.classList.toggle("expanded");
          btn.textContent = expanded ? "Show less ↑" : "Read more →";
        });
      });

      updateUI();
    })();

    // Lifecycle (process) timeline
    (function () {
      const steps = document.querySelectorAll<HTMLElement>("[data-lc-step]");
      const panels = document.querySelectorAll<HTMLElement>("[data-lc-panel]");
      const artifacts = document.querySelectorAll<HTMLElement>("[data-lc-artifact]");
      if (!steps.length || (steps[0] as HTMLElement).dataset.bound) return;
      (steps[0] as HTMLElement).dataset.bound = "1";

      const titles = [
        "discovery-call-recap.md",
        "statement-of-work.pdf",
        "flows-v0.3.fig",
        "standup-thu.md",
        "qa-report.md",
        "launch-runbook.md",
      ];
      const durations = ["~30 min", "~3 days", "~1 week", "~3–6 weeks", "~3–5 days", "launch day"];
      const activeClasses = [
        ["border-brand-purple", "text-brand-purple"],
        ["border-brand-purple", "text-brand-purple"],
        ["border-brand-green", "text-brand-green"],
        ["border-brand-green", "text-brand-green"],
        ["border-brand-orange", "text-brand-orange"],
        ["border-brand-orange", "text-brand-orange"],
      ];
      const doneClasses = [
        ["bg-brand-purple", "border-brand-purple", "text-white"],
        ["bg-brand-purple", "border-brand-purple", "text-white"],
        ["bg-brand-green", "border-brand-green", "text-white"],
        ["bg-brand-green", "border-brand-green", "text-white"],
        ["bg-brand-orange", "border-brand-orange", "text-white"],
        ["bg-brand-orange", "border-brand-orange", "text-white"],
      ];

      const progress = document.getElementById("lcProgress");
      const phaseIndex = document.getElementById("lcPhaseIndex");
      const phaseDuration = document.getElementById("lcPhaseDuration");
      const artifactTitle = document.getElementById("lcArtifactTitle");
      const prevBtn = document.getElementById("lcPrev");
      const nextBtn = document.getElementById("lcNext");
      const autoBtn = document.getElementById("lcAutoplay");
      const autoIcon = document.getElementById("lcAutoplayIcon");
      const autoLabel = document.getElementById("lcAutoplayLabel");

      let active = 0;
      let autoplay = false;
      let timer: ReturnType<typeof setInterval> | null = null;

      const setActive = (i: number) => {
        active = (i + steps.length) % steps.length;
        steps.forEach((s, idx) => {
          const dot = s.querySelector<HTMLElement>(".lc-dot");
          const label = s.querySelector<HTMLElement>(".lc-label");
          if (!dot || !label) return;
          const isActive = idx === active;
          const isDone = idx < active;
          s.setAttribute("aria-selected", isActive ? "true" : "false");

          dot.classList.remove(
            "border-brand-purple", "text-brand-purple",
            "border-brand-green", "text-brand-green",
            "border-brand-orange", "text-brand-orange",
            "bg-brand-purple", "bg-brand-green", "bg-brand-orange",
            "text-white", "border-zinc-300", "dark:border-white/15",
            "text-zinc-500", "dark:text-zinc-400"
          );

          if (isActive) {
            dot.classList.add(...activeClasses[idx]);
            dot.style.transform = "scale(1.12)";
            dot.style.boxShadow = "0 0 0 4px var(--lc-bg, #FEFCFB), 0 8px 24px -8px rgba(139,92,246,0.35)";
            label.classList.remove("text-zinc-500", "dark:text-zinc-400");
            label.classList.add("text-ink", "dark:text-white", "font-semibold");
          } else if (isDone) {
            dot.classList.add(...doneClasses[idx]);
            dot.style.transform = "scale(1)";
            dot.style.boxShadow = "";
            label.classList.remove("text-zinc-500", "dark:text-zinc-400", "font-semibold");
            label.classList.add("text-zinc-600", "dark:text-zinc-300");
          } else {
            dot.classList.add("border-zinc-300", "dark:border-white/15", "text-zinc-500", "dark:text-zinc-400");
            dot.style.transform = "scale(1)";
            dot.style.boxShadow = "";
            label.classList.remove("text-ink", "dark:text-white", "font-semibold", "text-zinc-600", "dark:text-zinc-300");
            label.classList.add("text-zinc-500", "dark:text-zinc-400");
          }
        });

        panels.forEach((p, idx) => p.classList.toggle("hidden", idx !== active));
        artifacts.forEach((a, idx) => a.classList.toggle("hidden", idx !== active));

        const pct = (active / (steps.length - 1)) * 100;
        if (progress) (progress as HTMLElement).style.width = pct + "%";
        if (phaseIndex) phaseIndex.textContent = String(active + 1).padStart(2, "0");
        if (phaseDuration) phaseDuration.textContent = durations[active];
        if (artifactTitle) artifactTitle.textContent = titles[active];
      };

      steps.forEach((s) =>
        s.addEventListener("click", () => {
          stopAuto();
          setActive(parseInt(s.dataset.lcStep || "0", 10));
        })
      );
      prevBtn?.addEventListener("click", () => { stopAuto(); setActive(active - 1); });
      nextBtn?.addEventListener("click", () => { stopAuto(); setActive(active + 1); });

      const startAuto = () => {
        autoplay = true;
        if (autoIcon) autoIcon.innerHTML = '<path d="M6 5h4v14H6zM14 5h4v14h-4z"/>';
        if (autoLabel) autoLabel.textContent = "Pause";
        timer = setInterval(() => setActive(active + 1), 3500);
      };
      const stopAuto = () => {
        autoplay = false;
        if (autoIcon) autoIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
        if (autoLabel) autoLabel.textContent = "Autoplay";
        if (timer) { clearInterval(timer); timer = null; }
      };
      autoBtn?.addEventListener("click", () => (autoplay ? stopAuto() : startAuto()));

      setActive(0);
    })();

    // Process cycle (radial)
    (function () {
      const wheel = document.getElementById("pcWheel");
      const nodesContainer = document.getElementById("pcNodes");
      if (!wheel || !nodesContainer || (wheel as HTMLElement).dataset.bound) return;
      (wheel as HTMLElement).dataset.bound = "1";

      const phases = [
        { key: "Discovery", meta: "phase 01 · ~30 min", color: "#8B5CF6", tone: "purple" as const },
        { key: "Scope", meta: "phase 02 · ~3 days", color: "#8B5CF6", tone: "purple" as const },
        { key: "Design", meta: "phase 03 · ~1 week", color: "#10B981", tone: "green" as const },
        { key: "Build", meta: "phase 04 · ~3–6 weeks", color: "#10B981", tone: "green" as const },
        { key: "QA", meta: "phase 05 · ~3–5 days", color: "#FB923C", tone: "orange" as const },
        { key: "Deploy", meta: "phase 06 · + 30 days", color: "#FB923C", tone: "orange" as const },
      ];
      const N = phases.length;

      const positions = phases.map((_, i) => {
        const angle = -Math.PI / 2 + (i * 2 * Math.PI) / N;
        return { angle, x: 50 + 42 * Math.cos(angle), y: 50 + 42 * Math.sin(angle) };
      });

      nodesContainer.innerHTML = phases
        .map(
          (p, i) => `
        <button type="button" data-pc-node="${i}" aria-label="${p.key}"
                class="pc-node absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
                style="left: ${positions[i].x}%; top: ${positions[i].y}%;">
          <span class="pc-dot relative grid place-items-center w-14 h-14 rounded-full border-2 bg-paper dark:bg-ink font-mono text-[11px] font-semibold transition-all duration-300"
                style="border-color: ${p.color}; color: ${p.color};">
            ${String(i + 1).padStart(2, "0")}
          </span>
          <span class="pc-node-label absolute left-1/2 -translate-x-1/2 mt-2 text-[11px] font-mono whitespace-nowrap text-zinc-500 dark:text-zinc-400 transition-colors">
            ${p.key}
          </span>
        </button>`
        )
        .join("");

      const crumbs = document.getElementById("pcCrumbs");
      if (crumbs) {
        crumbs.innerHTML = phases
          .map(
            (p, i) =>
              `<span data-pc-crumb="${i}" class="pc-crumb px-2 py-0.5 rounded transition-colors cursor-pointer">${String(
                i + 1
              ).padStart(2, "0")} ${p.key}</span>${
                i < N - 1
                  ? '<span class="text-zinc-300 dark:text-white/15">→</span>'
                  : '<span class="text-brand-orange">↩</span>'
              }`
          )
          .join("");
      }

      const arc = document.getElementById("pcArc");
      const spoke = document.getElementById("pcSpoke");
      const hubLabel = document.getElementById("pcHubLabel");
      const hubMeta = document.getElementById("pcHubMeta");
      const panels = document.querySelectorAll<HTMLElement>("[data-pc-panel]");
      const nodeBtns = document.querySelectorAll<HTMLButtonElement>("[data-pc-node]");
      const crumbEls = document.querySelectorAll<HTMLElement>("[data-pc-crumb]");
      const prevBtn = document.getElementById("pcPrev");
      const nextBtn = document.getElementById("pcNext");
      const autoBtn = document.getElementById("pcAuto");
      const autoIcon = document.getElementById("pcAutoIcon");
      const autoLbl = document.getElementById("pcAutoLabel");

      const CIRC = 2 * Math.PI * 168;
      let active = 0;
      let autoplay = false;
      let timer: ReturnType<typeof setInterval> | null = null;

      const setActive = (i: number) => {
        active = ((i % N) + N) % N;
        const p = phases[active];
        const filled = (active / (N - 1)) * CIRC;
        if (arc) {
          (arc as SVGElement).style.stroke = p.color;
          arc.setAttribute("stroke-dashoffset", String(CIRC - filled));
        }
        if (spoke) {
          const cx = 50, cy = 50;
          const tx = positions[active].x, ty = positions[active].y;
          spoke.setAttribute("x1", String(cx * 4));
          spoke.setAttribute("y1", String(cy * 4));
          spoke.setAttribute("x2", String(tx * 4));
          spoke.setAttribute("y2", String(ty * 4));
          spoke.setAttribute("stroke", p.color);
          spoke.setAttribute("opacity", "0.6");
        }
        if (hubLabel) hubLabel.textContent = p.key;
        if (hubMeta) {
          hubMeta.textContent = p.meta;
          (hubMeta as HTMLElement).style.color = p.color;
        }

        nodeBtns.forEach((btn, idx) => {
          const dot = btn.querySelector<HTMLElement>(".pc-dot");
          const label = btn.querySelector<HTMLElement>(".pc-node-label");
          const ph = phases[idx];
          if (!dot || !label) return;
          const isActive = idx === active;
          if (isActive) {
            dot.style.background = ph.color;
            dot.style.color = "#fff";
            dot.style.transform = "scale(1.15)";
            dot.style.boxShadow = `0 0 0 4px var(--pc-bg, #FEFCFB), 0 8px 24px -6px ${ph.color}66`;
            label.classList.remove("text-zinc-500", "dark:text-zinc-400");
            label.classList.add("text-ink", "dark:text-white", "font-semibold");
          } else {
            dot.style.background = "";
            dot.style.color = ph.color;
            dot.style.transform = "scale(1)";
            dot.style.boxShadow = "";
            label.classList.remove("text-ink", "dark:text-white", "font-semibold");
            label.classList.add("text-zinc-500", "dark:text-zinc-400");
          }
        });

        panels.forEach((el, idx) => el.classList.toggle("hidden", idx !== active));

        const crumbActiveClasses: Record<"purple" | "green" | "orange", string[]> = {
          purple: ["bg-brand-purple/10", "text-brand-purple"],
          green: ["bg-brand-green/10", "text-brand-green"],
          orange: ["bg-brand-orange/10", "text-brand-orange"],
        };
        crumbEls.forEach((el, idx) => {
          el.classList.remove(
            "bg-brand-purple/10", "text-brand-purple",
            "bg-brand-green/10", "text-brand-green",
            "bg-brand-orange/10", "text-brand-orange",
            "text-ink", "dark:text-white"
          );
          if (idx === active) el.classList.add(...crumbActiveClasses[phases[idx].tone]);
          else if (idx < active) el.classList.add("text-ink", "dark:text-white");
        });
      };

      nodeBtns.forEach((b) =>
        b.addEventListener("click", () => {
          stopAuto();
          setActive(parseInt(b.dataset.pcNode || "0", 10));
        })
      );
      crumbEls.forEach((b) =>
        b.addEventListener("click", () => {
          stopAuto();
          setActive(parseInt(b.dataset.pcCrumb || "0", 10));
        })
      );
      prevBtn?.addEventListener("click", () => { stopAuto(); setActive(active - 1); });
      nextBtn?.addEventListener("click", () => { stopAuto(); setActive(active + 1); });

      const startAuto = () => {
        autoplay = true;
        if (autoIcon) autoIcon.innerHTML = '<path d="M6 5h4v14H6zM14 5h4v14h-4z"/>';
        if (autoLbl) autoLbl.textContent = "Pause cycle";
        timer = setInterval(() => setActive(active + 1), 3200);
      };
      const stopAuto = () => {
        autoplay = false;
        if (autoIcon) autoIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
        if (autoLbl) autoLbl.textContent = "Spin the cycle";
        if (timer) { clearInterval(timer); timer = null; }
      };
      autoBtn?.addEventListener("click", () => (autoplay ? stopAuto() : startAuto()));

      nodeBtns.forEach((b) =>
        b.addEventListener("mouseenter", () => {
          const idx = parseInt(b.dataset.pcNode || "0", 10);
          if (idx !== active) setActive(idx);
        })
      );

      setActive(0);
    })();
  };

  nuxtApp.hook("app:mounted", () => setTimeout(init, 0));
  nuxtApp.hook("page:finish", () => setTimeout(init, 0));
});
