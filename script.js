// Minimal JavaScript for the blog
// Currently handles: dark mode persistence (optional)

// Dark mode toggle (if you want to add a manual toggle later)
function initDarkMode() {
    // Respects system preference by default via CSS @media (prefers-color-scheme: dark)
    // Add a toggle button to HTML if you want manual control:
    // <button id="dark-mode-toggle" aria-label="Toggle dark mode"></button>

    const toggle = document.getElementById('dark-mode-toggle');
    if (!toggle) return;

    // Check for saved preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;

    document.documentElement.classList.toggle('dark', isDark);
    updateToggleButton(isDark);

    toggle.addEventListener('click', () => {
        const newIsDark = !document.documentElement.classList.contains('dark');
        document.documentElement.classList.toggle('dark', newIsDark);
        localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
        updateToggleButton(newIsDark);
    });

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            document.documentElement.classList.toggle('dark', e.matches);
            updateToggleButton(e.matches);
        }
    });

    function updateToggleButton(isDark) {
        toggle.textContent = isDark ? '☀️' : '🌙';
        toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                target.focus({ preventScroll: true });
            }
        });
    });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initSmoothScroll();
});