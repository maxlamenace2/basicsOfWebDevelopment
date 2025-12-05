document.addEventListener("DOMContentLoaded", () => {
  // Hamburger menu
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('header nav');

  toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
  
// Boutons "Rent This"
  const buttons = document.querySelectorAll('.btn.card-btn');
  buttons.forEach(btn => {
      btn.addEventListener('click', () => {
          window.location.href = 'order.html';
      });
  });
  
});
