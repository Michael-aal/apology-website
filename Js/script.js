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


// Save her response
function saveResponse(response) {

  localStorage.setItem("apologyResponse", response);

  localStorage.setItem(
    "responseTime",
    new Date().toISOString()
  );

  window.location.href = "Response.html";
}