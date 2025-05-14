// DOM Elements specific to home page
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

// Projects Filtering
function initProjectsFilter() {
  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filterValue = button.getAttribute('data-filter');
        
        // Filter projects
        projectCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          
          card.style.transform = 'scale(0.8)';
          card.style.opacity = '0';
          
          setTimeout(() => {
            if (filterValue === 'all' || filterValue === cardCategory) {
              card.style.display = 'block';
              setTimeout(() => {
                card.style.transform = 'scale(1)';
                card.style.opacity = '1';
              }, 10);
            } else {
              card.style.display = 'none';
            }
          }, 300);
        });
      });
    });
  }
}

// Typing Animation
function initTypingAnimation() {
  const typingElement = document.querySelector('.typing-text');
  
  if (typingElement) {
    const phrases = [' Software Developer', ' Designer', 'Mobile App Developer', 'CyberSecurity Enthusiast','Freelancer'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;
    
    function type() {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        // Remove character
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
      } else {
        // Add character
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
      }
      
      // If word is complete
      if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause at end
        isEnd = true;
        isDeleting = true;
        setTimeout(type, 1500);
      } else if (isDeleting && charIndex === 0) {
        // Move to next phrase
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 500);
      } else {
        // Set typing speed
        let typingSpeed = isDeleting ? 80 : 120;
        // Slower when near the end
        if (isEnd) {
          typingSpeed = 50;
          isEnd = false;
        }
        setTimeout(type, typingSpeed);
      }
    }
    
    // Start typing animation
    setTimeout(type, 1000);
  }
}

// Initialize home page specific functions
document.addEventListener('DOMContentLoaded', () => {
  initProjectsFilter();
  initTypingAnimation();
  
  // Add 'reveal' class to sections for animation
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('reveal');
  });
});