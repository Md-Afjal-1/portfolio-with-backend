const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

// Hamburger pe click (menu open/close)
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle("open");
  links.forEach(link => {
    link.classList.toggle("fade");
  });
  hamburger.classList.toggle("toggle");
});

// Link pe click (scroll aur menu close)
links.forEach(li => {
  li.addEventListener('click', () => {
    navLinks.classList.remove("open");
    links.forEach(l => l.classList.remove("fade"));
    hamburger.classList.remove("toggle");
  });
});


// back to top button 
const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });


    // animation on scroll
    
// loder
