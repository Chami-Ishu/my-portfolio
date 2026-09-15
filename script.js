/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


/* Close menu when clicking a navigation link */

document.querySelectorAll(".nav-links a").forEach((link) => {

    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });

});


/* =====================================================
   PROFILE IMAGE FALLBACK
===================================================== */

const profileImage = document.getElementById("profileImage");
const profilePlaceholder = document.getElementById("profilePlaceholder");


/*
   If profile.jpg exists,
   hide the CI placeholder.
*/

profileImage.addEventListener("load", () => {

    profilePlaceholder.style.display = "none";

});


/*
   If profile.jpg doesn't exist,
   show the CI placeholder instead.
*/

profileImage.addEventListener("error", () => {

    profileImage.style.display = "none";

    profilePlaceholder.style.display = "flex";

});


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach((element) => {

    observer.observe(element);

});


/* =====================================================
   FOOTER YEAR
===================================================== */

document.getElementById("year").textContent =
    new Date().getFullYear();
