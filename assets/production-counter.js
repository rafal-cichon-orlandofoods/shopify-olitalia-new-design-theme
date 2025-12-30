// Counter animation for production page - works with any AI block ID
class ProductionCounter {
  constructor() {
    // Find all stat number elements that match the AI innovation pattern - more specific search
    this.counters = document.querySelectorAll('[class*="ai-innovation-stat-number-"], .ai-innovation-stat-number-aagpvcmz0n25xaze3naigenblock2fff632kqwkw8');
    this.observer = null;
    console.log('Found production counters:', this.counters.length); // Debug
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
    const hasComma = text.includes(',');
    
    // Extract number - handle comma-separated numbers like "1,600+"
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
      if (targetValue % 1 === 0) {
        displayValue = Math.floor(currentValue).toString();
      } else {
        displayValue = currentValue.toFixed(1);
      }
      
      // Add comma formatting for large numbers (like 1,600)
      if (hasComma && targetValue >= 1000) {
        displayValue = Math.floor(currentValue).toLocaleString();
      }
      
      // Add original suffixes
      if (hasPercent) displayValue += '%';
      if (hasPlus) displayValue += '+';
      
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
    new ProductionCounter();
  });
} else {
  new ProductionCounter();
}