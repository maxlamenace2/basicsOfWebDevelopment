document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('header nav');

  toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
  const buttons = document.querySelectorAll('.card-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            window.location.href = 'https://maxlamenace2.github.io/basicsOfWebDevelopment/task-k/order.html'; // Remplace par le lien de ta page de commande
        });
    });
});


