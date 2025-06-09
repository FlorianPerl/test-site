// Simple console log events for button clicks
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    console.log(`${btn.textContent} clicked`);
  });
});
