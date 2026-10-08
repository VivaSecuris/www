// Keep the existing mobile menu accessible on the company pages.
const hubToggle = document.querySelector('.company-hub .nav-toggle');
const hubMenu = document.querySelector('.company-hub .nav-menu');
if (hubToggle && hubMenu) {
    const updateHubMenu = () => hubToggle.setAttribute('aria-expanded', String(hubMenu.classList.contains('is-open')));
    hubToggle.addEventListener('click', updateHubMenu);
    hubMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', updateHubMenu));
    updateHubMenu();
}
