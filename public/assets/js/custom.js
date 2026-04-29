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

// chatboat
document.addEventListener("DOMContentLoaded", function () {

  const chatToggle = document.getElementById("chatToggle");
  const chatBox = document.getElementById("chatBox");
  const closeChat = document.getElementById("closeChat");
  const chatInput = document.getElementById("chatInput");
  const sendMessageBtn = document.getElementById("sendMessageBtn");
  const chatMessages = document.getElementById("chatMessages");

  // Open chat
  chatToggle.addEventListener("click", () => {
    chatBox.style.display = "flex";
    chatInput.focus();
  });

  // Close chat
  closeChat.addEventListener("click", () => {
    chatBox.style.display = "none";
  });

  // Send message
  sendMessageBtn.addEventListener("click", () => {

    const message = chatInput.value.trim().toLowerCase();
    if (!message) return;

    chatMessages.innerHTML += `<div class="user-msg">${message}</div>`;
    chatInput.value = "";

    let reply = getBotReply(message);

    chatMessages.innerHTML += `<div class="bot-msg">${reply}</div>`;
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });

});

function getBotReply(message) {

  if (message.includes("hi") || message.includes("hello")) {
    return "Hello 👋 I'm Afjal's virtual assistant. How can I help you?";
  }

  if (message.includes("skill")) {
    return "Afjal has strong skills in HTML, CSS, JavaScript, Bootstrap, Responsive Design.";
  }

  if (message.includes("project")) {
    return "He has built portfolio websites, travel websites, contact forms and responsive UI projects.";
  }

  if (message.includes("experience")) {
    return "Afjal started working in July 2024 and has experience in frontend development.";
  }

  if (message.includes("contact")) {
    return "You can contact Afjal through the contact form on this website.";
  }

  if (message.includes("hire")) {
    return "Afjal is available for frontend and full-stack development roles. Feel free to reach out!";
  }

  if (message.includes("resume")) {
    return "You can download Afjal's resume from the Resume section of this portfolio.";
  }

  return "I'm here to help! You can ask about skills, projects, experience, resume, or contact details 😊";
}

// ================= robot eyes blink =================
document.getElementById("chatToggle").addEventListener("click", function () {
  this.style.animation = "bounceClick 0.4s";
  setTimeout(() => {
    this.style.animation = "floatBot 3s ease-in-out infinite, glowPulse 2s ease-in-out infinite";
  }, 400);
});

// ================= CONTACT FORM =================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

  contactForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const formData = {

      name: document.getElementById("name").value,

      email: document.getElementById("email").value,

      message: document.getElementById("message").value

    };

    try {

      const response = await fetch("https://portfolio-with-backend-rv99.onrender.com/send", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(formData)

      });

      const data = await response.json();

      if (data.success) {

        alert("Message sent successfully ✅");

        contactForm.reset();

      } else {

        alert("Failed to send message ❌");

        console.log(data);

      }

    } catch (error) {

      console.error("FORM ERROR:", error);

      alert("Server Error ❌");

    }

  });

}