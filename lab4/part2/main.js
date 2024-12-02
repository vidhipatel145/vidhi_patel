
/* 
Name: Vidhi Patel 
File: main.js 
Date: 01 December 2024 
This JavaScript file implements the interactive image gallery, including the lightbox feature.
*/

// Get all gallery items and the lightbox elements
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const caption = document.getElementById('caption');
const closeBtn = document.getElementById('close');

// Function to open the lightbox with the clicked image and caption
function openLightbox(event) {
  lightbox.style.display = 'flex';
  lightboxImg.src = event.target.src;
  caption.textContent = event.target.getAttribute('data-caption');
}

// Function to close the lightbox
function closeLightbox() {
  lightbox.style.display = 'none';
}

// Add event listeners to each gallery item
galleryItems.forEach(item => {
  item.addEventListener('click', openLightbox);
});

// Add event listener to close the lightbox
closeBtn.addEventListener('click', closeLightbox);

// Close the lightbox if the user clicks anywhere outside of the image
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});
