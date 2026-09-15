// =========================
// MOBILE MENU
// =========================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");

        if (navLinks.classList.contains("active")) {
            menuBtn.textContent = "✕";
        } else {
            menuBtn.textContent = "☰";
        }
    });


    // Close mobile menu after clicking a link

    const navItems = document.querySelectorAll(".nav-links a");

    navItems.forEach((item) => {

        item.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuBtn.textContent = "☰";

        });

    });

}


// =========================
// SCROLL ANIMATION
// =========================

const animatedElements = document.querySelectorAll(
    ".section-heading, .about-content, .skill-card, .project-card, .education-card, .contact-box"
);

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


animatedElements.forEach((element) => {

    element.style.opacity = "0";
    element.style.transform = "translateY(25px)";
    element.style.transition = "opacity 0.7s ease, transform 0.7s ease";

    observer.observe(element);

});


// =========================
// CURRENT YEAR
// =========================

const footerText = document.querySelector(".footer p");

if (footerText) {

    const currentYear = new Date().getFullYear();

    footerText.innerHTML =
        `© ${currentYear} Chamishka Ishani. All Rights Reserved.`;

}
