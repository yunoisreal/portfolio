document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Navigation Toggle ---
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const mainNav = document.getElementById('mainNav');

    if (mobileNavToggle && mainNav) {
        mobileNavToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            // Change hamburger icon to 'x' and vice versa
            const icon = mobileNavToggle.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when a nav link is clicked
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Check if the menu is active and if the screen is mobile size
                // (to prevent closing on desktop for anchor links)
                if (mainNav.classList.contains('active') && window.innerWidth <= 768) {
                    mainNav.classList.remove('active');
                    mobileNavToggle.querySelector('i').classList.remove('fa-times');
                    mobileNavToggle.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    }

    // --- Submenu Toggle (for touch devices/accessibility) ---
    const hasSubmenus = document.querySelectorAll('.has-submenu');

    hasSubmenus.forEach(item => {
        const submenuLink = item.querySelector('a'); // The main link for the submenu
        const submenu = item.querySelector('.submenu'); // The actual submenu ul

        if (submenuLink && submenu) {
            submenuLink.addEventListener('click', (event) => {
                // Only prevent default if on a small screen (mobile menu)
                // This prevents navigation and allows submenu to open/close
                if (window.innerWidth <= 768) { // Matches the CSS breakpoint for mobile nav
                    event.preventDefault(); // Stop default link behavior
                    item.classList.toggle('submenu-active'); // Toggle class to show/hide submenu
                    // Optional: Close other submenus if open (for single open submenu)
                    hasSubmenus.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('submenu-active')) {
                            otherItem.classList.remove('submenu-active');
                        }
                    });
                }
                // On larger screens, the CSS :hover handles submenu display
            });
        }
    });


    // --- Set current year in footer ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});