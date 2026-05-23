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
