// Add interactivity to the Call-to-Action Button
document.getElementById("cta-btn").addEventListener("click", () => {
    alert("Thank you for clicking the button!");
});
function toggleMenu() {
    const navbarLinks = document.querySelector('.navbar-links');
    navbarLinks.style.display = (navbarLinks.style.display === "flex" ? "none" : "flex");
}
