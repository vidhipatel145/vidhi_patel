// Step 1: List all the image file names
const imageList = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

// Step 2: Get places from the HTML to show images
const thumbBar = document.querySelector('.thumb-bar'); // Where small images go
const bigImage = document.querySelector('.displayed-img'); // The main big image
const button = document.querySelector('button.dark'); // Button to darken/lighten
const overlay = document.querySelector('.overlay'); // The dark overlay area

// Step 3: Add small images to the thumbnail bar
imageList.forEach((imageName, index) => {
    let smallImage = document.createElement('img'); // Make a new image
    smallImage.src = `images/${imageName}`; // Set its picture file
    smallImage.alt = `Thumbnail ${index + 1}`; // Add a short description
    thumbBar.appendChild(smallImage); // Put it in the thumbnail bar
});

// Step 4: Make clicking a small image change the big image
thumbBar.addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') { // Make sure we clicked an image
        bigImage.src = event.target.src; // Change the big image's picture
        bigImage.alt = event.target.alt; // Change the big image's description
    }
});

// Step 5: Add the darken/lighten feature
button.addEventListener('click', () => {
    if (button.className === 'dark') { // If the button says "Darken"
        button.className = 'light'; // Change it to "Lighten"
        button.textContent = 'Lighten'; // Update the button text
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Add darkness
    } else { // If the button says "Lighten"
        button.className = 'dark'; // Change it back to "Darken"
        button.textContent = 'Darken'; // Update the button text
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)'; // Remove darkness
    }
});
