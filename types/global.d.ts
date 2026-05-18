import type noUiSliderLib from "nouislider";

declare global {
  interface Window {
    // Optional third-party libraries
    _: unknown;
    $: JQueryStatic;
    jQuery: JQueryStatic;
    DataTable: unknown;
    Dropzone: unknown;
    noUiSlider: typeof noUiSliderLib;
    VanillaCalendarPro: unknown;
    // Preline UI
    HSStaticMethods: { autoInit: (target?: string | Element) => void };
  }
}

export {};
