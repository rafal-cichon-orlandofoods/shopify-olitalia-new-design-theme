// Lightweight counter animation for sustainability page
class SustainabilityCounter {
  constructor() {
    this.counters = document.querySelectorAll('.sustainability-figma__stat-number');
    this.observer = null;
    this.init();
  }

  init() {
    if (!this.counters.length) return;
    
    // Create intersection observer
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          this.observer.unobserve(entry.target); // Animate only once
        }
      });
    }, {
      threshold: 0.5, // Trigger when 50% visible
      rootMargin: '0px 0px -50px 0px' // Start animation a bit before fully visible
    });

    // Observe all counters
    this.counters.forEach(counter => {
      this.observer.observe(counter);
    });
  }

  animateCounter(element) {
    const text = element.textContent.trim();
    const hasPercent = text.includes('%');
    const hasPlus = text.includes('+');
    const hasUnit = text.includes('KL');
    
    // Extract number
    let targetValue = parseFloat(text.replace(/[^\d.]/g, ''));
    if (isNaN(targetValue)) return;

    // Animation settings
    const duration = 1500; // 1.5 seconds
    const startTime = performance.now();
    const startValue = 0;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (targetValue - startValue) * easeOut;
      
      // Format number based on original format
      let displayValue;
      if (text === 'Zero') {
        displayValue = progress > 0.8 ? 'Zero' : Math.floor(currentValue).toString();
      } else if (targetValue % 1 === 0) {
        displayValue = Math.floor(currentValue).toString();
      } else {
        displayValue = currentValue.toFixed(1);
      }
      
      // Add original suffixes
      if (hasPercent) displayValue += '%';
      if (hasPlus) displayValue += '+';
      if (hasUnit) displayValue += 'KL';
      
      element.textContent = displayValue;
      element.classList.add('counting');
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new SustainabilityCounter();
  });
} else {
  new SustainabilityCounter();
}