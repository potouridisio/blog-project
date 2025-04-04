import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";

import "./style.css";

const token = localStorage.getItem("token");

if (token) {
  window.location.href = "/posts";
}

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const username = formData.get("username");
  const password = formData.get("password");

  const response = await fetch("http://localhost:3000/login", {
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const json = await response.json();

  if ("error" in json) {
    const errorMessage = document.createElement("p");

    errorMessage.className = "mb-6 text-center text-sm text-red-500";
    errorMessage.id = "errorMessage";
    errorMessage.textContent = json.error;

    const existingErrorMessage = document.getElementById("errorMessage");

    if (existingErrorMessage) {
      existingErrorMessage.remove();
    }

    form.insertAdjacentElement("afterbegin", errorMessage);
  } else {
    localStorage.setItem("token", json.token);

    window.location.href = "/posts";
  }
});
