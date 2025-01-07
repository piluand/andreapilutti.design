// ### PAGE TRANSITION ### //

document.addEventListener("DOMContentLoaded", () => {
    const transitionContainer = document.querySelector(".page-transition");

    // Fade in the page on load
    transitionContainer.classList.add("fade-in");

    // Handle link clicks
    const links = document.querySelectorAll("a");

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            // Exclude links with class "no-transition"
            if (link.classList.contains("no-transition")) {
                return; // Skip the transition logic
            }

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

// ### CARDS FADE IN/OUT  ### //

document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // Select all card elements
    const cards = document.querySelectorAll(".fade");

    // Loop through each card and create a ScrollTrigger
    cards.forEach(card => {
        // Exclude cards with the class .no-fade
        if (card.classList.contains("no-fade")) {
            return; // Skip this card
        }

        gsap.fromTo(card, 
            { opacity: 0, y: 20, scale: 1 }, // Initial state
            { 
                opacity: 1, 
                y: 0, 
                scale: 1, // Final state
                scrollTrigger: {
                    trigger: card,
                    start: "top 100%", // Animation starts when the card enters the viewport
                    end: "top 50%", // Animation ends when the card moves halfway into the viewport
                    scrub: true, // Smooth scroll-based animation
                    toggleActions: "play reverse play reverse", // Play and reverse animation on scroll
                }
            }
        );
    });
});

// ### OVERLAY ### //

// Function to open the overlay
document.querySelectorAll('.showOverlay').forEach(element => {
    element.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default link behavior
      const overlay = document.getElementById('overlay');
      if (overlay) {
        overlay.style.display = 'block'; // Show the overlay
        document.body.style.overflow = 'hidden'; // Prevent body from scrolling
      }
    });
  });
  
// Function to close the overlay and pause the video
document.querySelectorAll('.hideOverlay').forEach(element => {
    element.addEventListener('click', function() {
        const overlay = document.getElementById('overlay');
        if (overlay) {
            overlay.style.display = 'none';
            document.body.style.overflow = '';
            if (window.player) {
                window.player.pause().then(function() {
                    console.log('Video paused successfully');
                }).catch(function(error) {
                    console.error('Error pausing the video:', error);
                });
            }
        }
    });
});

// ### ACCORDION ### //

document.addEventListener('DOMContentLoaded', function() {
    const panels = document.querySelectorAll('.panel');

    panels.forEach(panel => {
        const link = panel.querySelector('a');

        link.addEventListener('click', function(event) {
            event.preventDefault();

            // Close any currently open panels
            panels.forEach(p => {
                if (p !== panel) p.classList.remove('active');
            });

            // Toggle the clicked panel
            panel.classList.toggle('active');
        });
    });
});

// ### ANTI SPAM ### //

document.addEventListener("DOMContentLoaded", function () {
    // Get all elements with the class 'email-protected'
    const emailLinks = document.querySelectorAll(".email-protected");

    emailLinks.forEach(link => {
      // Get the obfuscated email parts from data attributes
      const user = link.getAttribute("data-user");
      const domain = link.getAttribute("data-domain");

      // Construct the email address
      const email = `${user}@${domain}`;

      // Set the mailto link
      link.href = `mailto:${email}`;
    });
  });