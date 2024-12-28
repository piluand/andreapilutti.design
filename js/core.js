/* Page Transition */
document.addEventListener("DOMContentLoaded", () => {
    const transitionContainer = document.querySelector(".page-transition");

    // Fade in the page on load
    transitionContainer.classList.add("fade-in");

    // Handle link clicks
    const links = document.querySelectorAll("a");

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent default navigation
            const url = link.href;

            // Add fade-out class
            transitionContainer.classList.remove("fade-in");
            transitionContainer.classList.add("fade-out");

            // Wait for the fade-out transition to complete before navigating
            setTimeout(() => {
                window.location.href = url;
            }, 500); // Match the CSS transition duration (500ms)
        });
    });
});

/* Cards Fade-in/out */
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // Select all card elements
    const cards = document.querySelectorAll(".card");

    // Loop through each card and create a ScrollTrigger
    cards.forEach(card => {
        gsap.fromTo(card, 
            { opacity: 0, y: 20, scale: 0.95 }, // Initial state
            { 
                opacity: 1, 
                y: 0, 
                scale: 1, // Final state
                scrollTrigger: {
                    trigger: card,
                    start: "top 100%",
                    end: "top 50%",
                    scrub: true,
                    toggleActions: "play reverse play reverse",
                }
            }
        );
    });
});