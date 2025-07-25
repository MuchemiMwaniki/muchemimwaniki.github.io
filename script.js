// Fade-in effect for cards
document.addEventListener("scroll", function () {
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            card.classList.add("visible");
        }
    });
});

// Scroll-to-top button
const scrollBtn = document.getElementById("scrollTopBtn");
window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
};
scrollBtn.onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
