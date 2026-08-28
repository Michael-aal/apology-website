document.addEventListener("DOMContentLoaded", () => {
  loadResponses();
});

async function loadResponses() {
  try {
    const response = await fetch(
      "https://apology-website-173f.onrender.com/api/responses"
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to fetch responses");
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

function displayStats(responses) {
  const total = responses.length;

  const forgive = responses.filter(
    response => response.answer === "forgive"
  ).length;

  const notForgive = responses.filter(
    response => response.answer === "not_forgive"
  ).length;

  document.getElementById("totalResponses").textContent = total;
  document.getElementById("forgiveResponses").textContent = forgive;
  document.getElementById("notForgiveResponses").textContent = notForgive;
}

function displayResponses(responses) {
  const container =
    document.getElementById("responsesContainer");

  if (!container) return;

  if (responses.length === 0) {
    container.innerHTML = "<p>No responses yet.</p>";
    return;
  }

  container.innerHTML = responses
    .map((response, index) => {
      const answer =
        response.answer === "forgive"
          ? "Forgive 🤍"
          : "Not Forgive 🌷";

      const date =
        new Date(response.createdAt).toLocaleString();

      return `
        <div class="response-item">
          <strong>#${index + 1}</strong>
          <span>${answer}</span>
          <small>${date}</small>
        </div>
      `;
    })
    .join("");
}