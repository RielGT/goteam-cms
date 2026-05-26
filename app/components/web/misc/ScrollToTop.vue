<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const visible = ref(false);

function onScroll() {
  visible.value = window.scrollY > 400;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-2"
  >
    <button
      v-if="visible"
      aria-label="Scroll to top"
      class="fixed bottom-24 right-5 sm:bottom-28 sm:right-8 z-40 w-12 h-12 grid place-items-center rounded-full border border-zinc-200 dark:border-white/10 bg-paper/95 dark:bg-ink/95 backdrop-blur text-zinc-600 dark:text-zinc-400 shadow-lg shadow-ink/5 dark:shadow-black/40 hover:-translate-y-0.5 hover:border-brand-purple hover:text-brand-purple transition print:hidden"
      @click="scrollToTop"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  </Transition>
</template>
