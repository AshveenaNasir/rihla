/**
 * Rihla Travel - News Page Hero Slider
 * Logic: Handles card sliding, active state toggling, and text content updates.
 * Note: Video is kept continuous by not re-assigning the src.
 */

const rhlData = [
    { 
        title: "Back-to-back <br>events", 
        desc: "Experience the most exclusive heritage and luxury events in the region."
    },
    { 
        title: "Do you like <br>Arts & History", 
        desc: "A seasonal celebration of art, culture, and community in the heart of Paris."
    },
    { 
        title: "Enjoy <br>Sports Event", 
        desc: "Experience cricket match across the India for Rihla members." 
    }
];

let rhlIndex = 0;

/**
 * Main function to move the slider and update text
 * @param {number} targetIndex - The index of the slide to move to
 */
function moveRhlSlider(targetIndex) {
    const track = document.getElementById('rhlTrack');
    const cards = document.querySelectorAll('.rhl-event-card');
    const textGroup = document.getElementById('rhlTextGroup');
    
    // 1. Boundary Guard: Loops back to start or end
    if (targetIndex < 0) targetIndex = rhlData.length - 1;
    if (targetIndex >= rhlData.length) targetIndex = 0;

    rhlIndex = targetIndex;

    // 2. Move the Track
    // Calculation: (Card Width: 320px + Gap: 25px) = 345px
    const moveX = rhlIndex * 345;
    if (track) {
        track.style.transform = `translateX(-${moveX}px)`;
    }

    // 3. Toggle the 'active' class for styling (brightness/scale)
    cards.forEach((card, i) => {
        card.classList.toggle('active', i === rhlIndex);
    });

    // 4. Update Text Content with Fade Animation
    if (textGroup) {
        // Start fade out
        textGroup.style.opacity = '0';
        textGroup.style.transform = 'translateY(15px)';

        setTimeout(() => {
            // Update Title and Description from rhlData
            const titleEl = document.getElementById('rhlTitle');
            const descEl = document.getElementById('rhlDesc');

            if (titleEl) titleEl.innerHTML = rhlData[rhlIndex].title;
            if (descEl) descEl.innerText = rhlData[rhlIndex].desc;
            
            // VIDEO UPDATE REMOVED: 
            // We do not touch rhlMainVideo.src here so the background remains seamless.

            // Fade back in
            textGroup.style.opacity = '1';
            textGroup.style.transform = 'translateY(0)';
        }, 400); // Matches CSS transition timing
    }
}

/**
 * Initialization on Page Load
 */
document.addEventListener('DOMContentLoaded', () => {
    const nextBtn = document.getElementById('rhlNext');
    const prevBtn = document.getElementById('rhlPrev');
    const cards = document.querySelectorAll('.rhl-event-card');

    // Attach Next Button Listener
    if (nextBtn) {
        nextBtn.addEventListener('click', () => moveRhlSlider(rhlIndex + 1));
    }

    // Attach Previous Button Listener
    if (prevBtn) {
        prevBtn.addEventListener('click', () => moveRhlSlider(rhlIndex - 1));
    }

    // Allow clicking on any card to slide to it directly
    cards.forEach((card, i) => {
        card.addEventListener('click', () => moveRhlSlider(i));
    });

    // Optional: Auto-slide every 8 seconds
    // setInterval(() => moveRhlSlider(rhlIndex + 1), 8000);
});

//This is the details of event section
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('explorerTrack');
    const nextBtn = document.getElementById('explorerNext');
    const prevBtn = document.getElementById('explorerPrev');
    const cards = document.querySelectorAll('.rhl-event-bento');
    
    let index = 0;
    
    // Calculate the total move distance (Card width + Gap)
    // We get the actual width of the first card dynamically
    const getScrollAmount = () => {
        const cardWidth = cards[0].offsetWidth;
        const gap = 30; // Matches CSS gap
        return cardWidth + gap;
    };

    nextBtn.addEventListener('click', () => {
        // Prevent sliding too far
        const maxIndex = cards.length - Math.floor(track.parentElement.offsetWidth / cards[0].offsetWidth);
        if (index < maxIndex) {
            index++;
            updateSlider();
        } else {
            index = 0; // Loop back to start if at the end
            updateSlider();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (index > 0) {
            index--;
            updateSlider();
        } else {
            index = cards.length - 1; // Loop to end
            updateSlider();
        }
    });

    function updateSlider() {
        const amount = getScrollAmount();
        track.style.transform = `translateX(-${index * amount}px)`;
    }
});

//This is for the faq section in the contact page
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        
        // Close other items if you want only one open at a time
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            if (otherItem !== item) otherItem.classList.remove('active');
        });

        // Toggle current item
        item.classList.toggle('active');
    });
});

//This section is for the cta section of news
document.getElementById('rhl-subscription-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Stop page from refreshing

    const form = this;
    const confirmation = document.getElementById('rhl-confirmation');

    // Hide the form
    form.classList.add('hidden');

    // Show the confirmation message
    confirmation.classList.remove('hidden');
});