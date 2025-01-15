document.addEventListener("DOMContentLoaded", () => {
    // Attach click events to mood boxes
    const moodOptions = document.querySelectorAll(".mood-option");
  
    moodOptions.forEach((option) => {
      option.addEventListener("click", () => {
        const selectedMood = option.getAttribute("data-mood"); // Get the mood
        console.log("Selected Mood:", selectedMood);
  
        // Save the mood to sessionStorage (or pass it to the next page via query params)
        sessionStorage.setItem("selectedMood", selectedMood);
  
        // Redirect to the player page
        window.location.href = "/player.html"; // Update with the actual path to your player site
      });
    });
  });
  