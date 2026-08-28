document.addEventListener("DOMContentLoaded", () => {

  // Display saved name everywhere
  const nameElements = document.querySelectorAll(".user-name");
  const savedName = localStorage.getItem("apologyName");

  nameElements.forEach((element) => {
    if (savedName) {
      element.textContent = savedName;
    } else {
      element.textContent = "there";
    }
  });


  // Name form
  const nameForm = document.getElementById("nameForm");

  if (nameForm) {

    nameForm.addEventListener("submit", (event) => {

      event.preventDefault();

      const nameInput = document.getElementById("nameInput");
      const name = nameInput.value.trim();

      if (!name) {
        return;
      }

      localStorage.setItem("apologyName", name);

      window.location.href = "Apology.html";
    });

  }


  // Response page
  const responseTitle = document.getElementById("responseTitle");
  const responseMessage = document.getElementById("responseMessage");
  const responseEmoji = document.getElementById("responseEmoji");

  const savedResponse = localStorage.getItem("apologyResponse");

  if (
    responseTitle &&
    responseMessage &&
    responseEmoji &&
    savedResponse
  ) {

    if (savedResponse === "Yes, I forgive you 🤍") {

      responseEmoji.textContent = "🤍";

      responseTitle.textContent =
        "Oh chim!! , Thank you for forgiving me.";

      responseMessage.textContent =
        "I really appreciate that. I don't take your forgiveness for granted.";

    } else {

      responseEmoji.textContent = "🌷";

      responseTitle.textContent =
        "That's okay.";

      responseMessage.textContent =
        "Take all the time you need. I respect how you feel, and there is no pressure from me.";

    }

  }

});
async function saveResponse(answer) {

  const name = localStorage.getItem("apologyName");

  if (!name) {
    alert("Please enter your name first.");
    window.location.href = "name.html";
    return;
  }

  try {

    const response = await fetch(
      "https://https://apology-website-173f.onrender.com/api/responses",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          name: name,
          answer: answer
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to save response");
    }

    localStorage.setItem("apologyResponse", answer);

    window.location.href = "response.html";

  } catch (error) {

    console.error("Error:", error);

    alert(
      "Something went wrong. Please try again."
    );
  }
}