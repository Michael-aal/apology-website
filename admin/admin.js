document.addEventListener("DOMContentLoaded", () => {
  loadResponses();
});

async function loadResponses() {

  try {

    const response = await fetch(
      "https://apology-website-173f.onrender.com/api/responses"
    );

    const data = await response.json();

    if (!data.success) {
      throw new Error("Failed to fetch responses");
    }

    displayStats(data.responses);
    displayResponses(data.responses);

  } catch (error) {

    console.error("Error loading responses:", error);

    const container =
      document.getElementById("responsesContainer");

    if (container) {
      container.innerHTML =
        "<p>Unable to load responses.</p>";
    }

  }
}