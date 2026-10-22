export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    // 1. Apply initial state on the server to prevent Flash of Unstyled Content (FOUC)
    getSSRProps(binding) {
      const classes = ['reveal'];
      if (binding.value?.delay) {
        classes.push(`delay-${binding.value.delay}`);
      }
      return { class: classes.join(' ') };
    },

    mounted(el, binding) {
      el.classList.add('reveal');
      if (binding.value?.delay) {
        el.classList.add(`delay-${binding.value.delay}`);
      }
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            el.classList.add('in-view');
            
            // Read the actual delay applied by CSS (e.g., "3.3s" or "3300ms")
            const computedDelay = getComputedStyle(el).transitionDelay;
            let delayMs = parseFloat(computedDelay);
            if (!computedDelay.includes('ms')) {
              delayMs *= 1000; // Convert seconds to milliseconds
            }
            
            // Read the actual duration (e.g., "0.6s" -> 600ms)
            const computedDuration = getComputedStyle(el).transitionDuration;
            let durationMs = parseFloat(computedDuration);
            if (!computedDuration.includes('ms')) {
              durationMs *= 1000;
            }
            
            // Remove classes only after the entire animation finishes
            setTimeout(() => {
              el.classList.remove('reveal', 'in-view');
              // Dynamically remove the specific delay class
              if (binding.value?.delay) {
                el.classList.remove(`delay-${binding.value.delay}`);
              }
            }, delayMs + durationMs + 50);
            
            observer.unobserve(el);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }); // threshold 0.1 is usually smoother than 0.12
      
      observer.observe(el);
    }
  });
});