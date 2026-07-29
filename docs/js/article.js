const ratingContainer = document.getElementById("rating-container");
const ratingButtons = document.getElementById("rating-buttons");
const feedbackForm = document.getElementById("feedback-form");
const feedbackLabel = document.getElementById("feedback-label");
const feedbackComment = document.getElementById("feedback-comment");

let articleName;

function handleFeedbackSubmit(event) {
  event.preventDefault();

  const comment = feedbackComment.value.trim();
  if (comment && comment.length > 0) {
    try {
      window.umami.track("feedback-submit-comment", { comment: comment, article: articleName });
      feedbackLabel.textContent = "Thanks for your feedback and comment!";
      if (ratingContainer)
        ratingContainer.classList.add("comment-submitted");
    } catch (err) {
      console.error("Error tracking feedback comment:", err);
      if (feedbackLabel)
        feedbackLabel.textContent = "Erm... something went wrong. Maybe try again later? Thanks for trying though!";
    }
  }
}

function initFeedbackForm() {
  if (ratingButtons) {
    ratingButtons.addEventListener("click", (event) => {
      // Umami already handles rating button clicks
      // Disable buttons
      const buttons = ratingButtons.querySelectorAll("button");
      buttons.forEach((button) => {
        button.disabled = true;
      });

      // Show feedback form
      if (feedbackForm && ratingContainer) ratingContainer.classList.add("completed");
    });
  }

  if (feedbackForm) {
    articleName = feedbackForm.getAttribute("data-article");

    if (!articleName) {
      console.error("Feedback form is missing the 'data-article' attribute.");
      feedbackForm.style.display = "none"; // Hide the form if article name is missing
      return;
    }

    feedbackForm.addEventListener("submit", handleFeedbackSubmit);
  }
}

document.addEventListener("DOMContentLoaded", initFeedbackForm);