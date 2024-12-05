
// JavaScript for accessibility improvements

// Toggle the visibility of comments when the button is clicked or activated by the keyboard
document.addEventListener('DOMContentLoaded', function () {
  const showHideButton = document.querySelector('.show-hide');
  const commentSection = document.querySelector('.comment-wrapper');
  
  // Toggle visibility when the button is clicked
  showHideButton.addEventListener('click', function() {
    commentSection.style.display = commentSection.style.display === 'none' ? 'block' : 'none';
    showHideButton.textContent = commentSection.style.display === 'none' ? 'Show comments' : 'Hide comments';
  });

  // Make the button keyboard accessible
  showHideButton.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // Prevent default action (like scrolling on spacebar)
      showHideButton.click(); // Trigger the button click programmatically
    }
  });

  // Ensure the button is focusable and receives focus for keyboard users
  showHideButton.setAttribute('tabindex', '0');
  showHideButton.setAttribute('aria-expanded', 'false');
  showHideButton.setAttribute('aria-controls', 'comments-section');

  // Set the correct ARIA attributes when comments are shown or hidden
  const updateAriaAttributes = () => {
    const isCommentsVisible = commentSection.style.display !== 'none';
    showHideButton.setAttribute('aria-expanded', isCommentsVisible.toString());
    commentSection.setAttribute('aria-hidden', (!isCommentsVisible).toString());
  };

  // Initialize the ARIA attributes when the page loads
  updateAriaAttributes();
});
