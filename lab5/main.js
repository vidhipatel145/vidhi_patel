document.getElementById('toggle-comments').addEventListener('click', function () {
  const commentsSection = document.getElementById('comments-section');
  if (commentsSection.hidden) {
    commentsSection.hidden = false;
    this.textContent = 'Hide comments';
  } else {
    commentsSection.hidden = true;
    this.textContent = 'Show comments';
  }
});
