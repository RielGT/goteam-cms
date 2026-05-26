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
    <WebLayoutSiteHeader />
    <WebHeroMainHero />
    <WebTechStackOverview />
    <WebTechStackGrid />
    <WebMiscOpeningHook />
    <WebWorkRecentProjects />
    <WebWorkCaseStudies />
    <WebWorkFeaturedPosts />
    <WebProcessWorkApproach />
    <WebProcessProjectLifecycle />
    <WebProcessWorkCycle />
    <WebSocialClientTestimonials />
    <WebLinkedinPeerRecs />
    <WebLinkedinProfileCta />
    <WebMiscBookTalk />
    <WebMiscCommonQuestions />
    <WebLayoutSiteFooter />
  </div>
</template>
