// Read More functionality for long text sections
class ReadMore {
  constructor() {
    this.containers = document.querySelectorAll('[data-read-more]');
    this.init();
  }

  init() {
    if (!this.containers.length) return;

    this.containers.forEach(container => {
      const btn = container.querySelector('.read-more-btn');
      const preview = container.querySelector('.text-preview');
      const full = container.querySelector('.text-full');
      
      if (!btn || !preview || !full) return;

      // Check if there's actually more content to show
      const previewText = preview.textContent.trim();
      const fullText = full.textContent.trim();
      
      // If content is the same or very similar, hide the button
      if (previewText.length >= fullText.length * 0.9) {
        btn.style.display = 'none';
        preview.style.display = 'none';
        full.style.display = 'block';
        return;
      }

      btn.addEventListener('click', () => {
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        
        if (isExpanded) {
          // Collapse
          preview.style.display = 'block';
          full.style.display = 'none';
          btn.setAttribute('aria-expanded', 'false');
          btn.querySelector('.read-more-text').style.display = 'inline';
          btn.querySelector('.read-less-text').style.display = 'none';
          
          // Scroll back to section title
          const section = container.closest('[class*="__collaboration"], [class*="__people"]');
          if (section) {
            const title = section.querySelector('h2');
            if (title) {
              title.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        } else {
          // Expand
          preview.style.display = 'none';
          full.style.display = 'block';
          btn.setAttribute('aria-expanded', 'true');
          btn.querySelector('.read-more-text').style.display = 'none';
          btn.querySelector('.read-less-text').style.display = 'inline';
        }
      });
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ReadMore();
  });
} else {
  new ReadMore();
}
