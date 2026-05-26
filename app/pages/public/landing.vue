<script setup lang="ts">
definePageMeta({ layout: false });

const defaultTheme: "light" | "dark" = "light";

useHead({
  htmlAttrs: {
    "data-default-theme": defaultTheme,
  },
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
      // Runs before paint to apply saved theme and avoid flash.
      // Falls back to the page-level default (data-default-theme) when no
      // user preference is stored — overrides the OS-level prefers-color-scheme.
      innerHTML: `(function(){var t=localStorage.getItem('theme');var d=document.documentElement.getAttribute('data-default-theme')||'light';var dark=t?t==='dark':d==='dark';document.documentElement.classList.toggle('dark',dark);})();`,
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
    <WebMiscScrollToTop />
    <WebMiscChatBot />
  </div>
</template>
