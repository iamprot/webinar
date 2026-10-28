import Lenis from "lenis";

export default defineNuxtPlugin(() => {
    // Initialize Lenis with custom inertia duration
    const lenis = new Lenis({
        duration: 1.2, // The higher the number, the longer the glide/inertia
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Default ease-out curve
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
    });

    // Use requestAnimationFrame to sync Lenis with the browser's render loop
    let rafId: number;
    function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Clean up during Hot Module Replacement (HMR) in development
    if (import.meta.hot) {
        import.meta.hot.dispose(() => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        });
    }

    // Provide Lenis globally if you need to trigger scrollTo elsewhere
    return {
        provide: {
            lenis,
        },
    };
});
