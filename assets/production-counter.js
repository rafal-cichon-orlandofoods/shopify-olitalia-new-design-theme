// Production Counter Animation - Based on Sustainability Counter
// Lightweight counter animation using Intersection Observer API

class ProductionCounter {
  constructor() {
    this.counters = document.querySelectorAll('.production-figma__stat-number[data-target]');
    this.animatedCounters = new Set();
    this.init();
  }

  init() {
    if (this.counters.length === 0) return;

    // Create intersection observer
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        threshold: 0.5, // Trigger when 50% visible
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all counters
    this.counters.forEach(counter => {
      this.observer.observe(counter);
    });
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && !this.animatedCounters.has(entry.target)) {
        this.animateCounter(entry.target);
        this.animatedCounters.add(entry.target);
      }
    });
  }

  animateCounter(element) {
    const target = element.dataset.target;
    const originalText = element.textContent;
    
    // Parse target value and detect format
    const format = this.detectFormat(originalText);
    const numericTarget = this.parseNumericValue(target);
    
    if (numericTarget === null) return;

    let current = 0;
    const duration = 1500; // 1.5 seconds
    const steps = 60;
    const increment = numericTarget / steps;
    const stepDuration = duration / steps;

    element.classList.add('counting');

    const timer = setInterval(() => {
      current += increment;
      
      if (current >= numericTarget) {
        current = numericTarget;
        clearInterval(timer);
      }

      element.textContent = this.formatNumber(current, format);
    }, stepDuration);
  }

  detectFormat(text) {
    return {
      hasPlus: text.includes('+'),
      hasPercent: text.includes('%'),
      hasK: text.includes('K'),
      hasKL: text.includes('KL'),
      isZero: text.toLowerCase().includes('zero'),
      originalText: text
    };
  }

  parseNumericValue(value) {
    // Handle special cases
    if (value.toLowerCase() === 'zero') return 0;
    
    // Remove non-numeric characters except decimal points
    const cleaned = value.replace(/[^\d.]/g, '');
    const parsed = parseFloat(cleaned);
    
    return isNaN(parsed) ? null : parsed;
  }

  formatNumber(num, format) {
    // Handle zero case
    if (format.isZero && num === 0) {
      return 'Zero';
    }

    // Round to appropriate precision
    const rounded = Math.round(num);
    let result = rounded.toString();

    // Add formatting
    if (format.hasK && !format.hasKL) {
      result += 'K';
    } else if (format.hasKL) {
      result += 'KL';
    }
    
    if (format.hasPercent) {
      result += '%';
    }
    
    if (format.hasPlus) {
      result += '+';
    }

    return result;
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.animatedCounters.clear();
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProductionCounter();
});

// Handle page navigation (for SPA-like behavior)
document.addEventListener('shopify:section:load', () => {
  new ProductionCounter();
});