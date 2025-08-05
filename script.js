// Toggle Navbar for Mobile
document.getElementById("menu-toggle").addEventListener("click", () => {
    document.querySelector(".navbar-links").classList.toggle("show");
});

// Back to Top Button
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 200 ? "block" : "none";
});
backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Dark Mode Toggle
document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// CTA Button (if any)
const ctaBtn = document.getElementById("cta-btn");
if (ctaBtn) {
    ctaBtn.addEventListener("click", () => {
        alert("Thank you for clicking the button!");
    });
}