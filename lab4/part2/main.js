// Step 1: Make a list of all the image names
const images = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

// Step 2: Get the spot where we want to put the thumbnail images
const thumbBar = document.querySelector('.thumb-bar');
// Get the big image spot where we will show the full picture
const displayedImg = document.querySelector('.displayed-img');
// Get the text of the big image
const displayedAlt = document.querySelector('.displayed-img');

// Step 3: Go through the list of images and show them as thumbnails
images.forEach(function(image, index) {
    const newImage = document.createElement('img'); // Create a new image
    newImage.setAttribute('src', `images/${image}`); // Set the image to be the one in the list
    newImage.setAttribute('alt', `Image ${index + 1}`); // Set the text for the image
    thumbBar.appendChild(newImage); // Put the new image in the thumb-bar
});

// Step 4: Make the thumbnail images clickable
thumbBar.addEventListener('click', function(event) {
    if (event.target.tagName === 'IMG') { // Check if the clicked item is an image
        displayedImg.setAttribute('src', event.target.getAttribute('src')); // Change the big image
        displayedAlt.setAttribute('alt', event.target.getAttribute('alt')); // Change the text for the big image
    }
});

// Step 5: Get the Darken/Lighten button and the overlay spot
const btn = document.querySelector('button.dark');
const overlay = document.querySelector('.overlay');

// Step 6: Make the Darken/Lighten button work
btn.addEventListener('click', function() {
    if (btn.getAttribute('class') === 'dark') { // If the button says "Darken"
        btn.setAttribute('class', 'light'); // Change the button to "Lighten"
        btn.textContent = 'Lighten'; // Change button text
        overlay.style.backgroundColor = 'rgb(0 0 0 / 50%)'; // Darken the image
    } else { // If the button says "Lighten"
        btn.setAttribute('class', 'dark'); // Change the button back to "Darken"
        btn.textContent = 'Darken'; // Change button text back
        overlay.style.backgroundColor = 'rgb(0 0 0 / 0%)'; // Remove the darkening effect
    }
});

