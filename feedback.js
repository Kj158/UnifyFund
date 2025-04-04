document.addEventListener("DOMContentLoaded", () => {
  const feedbackForm = document.getElementById("feedbackform");
  const successMessage = document.getElementById("success-message");

  feedbackForm.addEventListener("submit", async (e) => {
      e.preventDefault(); 

      const formData = new FormData(feedbackForm);

      try {
          const response = await fetch(feedbackForm.action, {
              method: "POST",
              body: formData,
              headers: { "Accept": "application/json" }
          });

          const result = await response.json();
          if (result.ok) {
              successMessage.style.display = "block"; 
              feedbackForm.reset();
          } else {
              throw new Error("Error submitting feedback.");
          }
      } catch (error) {
          console.error("Submission error:", error);
          alert("Failed to submit feedback. Try again.");
      }
  });
});
