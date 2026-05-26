<script setup lang="ts">
definePageMeta({ layout: false });

useHead({
  title: "Alex Rivera — Freelance Full Stack Developer",
  meta: [
    {
      name: "description",
      content:
        "I build web apps that actually ship on time. Freelance full stack developer helping founders turn ideas into shipped products.",
    },
  ],
  script: [
    {
      // Runs before paint to apply saved theme and avoid flash
      innerHTML: `(function(){var t=localStorage.getItem('theme');if(t==='dark'||(t===null&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}})();`,
      tagPosition: "head",
    },
  ],
});
</script>

<template>
  <div>
    <LandingSiteHeader />
    <LandingHeroSection />
    <LandingTechStackSection />
    <LandingHookSection />
    <LandingRecentWorkSection />
    <LandingCaseStudiesSection />
    <LandingPatternCardsSection />
    <LandingFeaturedPostsSection />
    <LandingHowIWorkSection />
    <LandingProcessLifecycleSection />
    <LandingProcessCycleSection />
    <LandingTestimonialsSection />
    <LandingLinkedInRecsSection />
    <LandingLinkedInCtaSection />
    <LandingTalkSection />
    <LandingFaqSection />
    <LandingSiteFooter />
  </div>
</template>
