import "./style.css";

import { login } from "./api";

const token = localStorage.getItem("token");

if (token) {
  window.location.href = "/";
}

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = event.target.username.value;
  const password = event.target.password.value;

  const user = await login(username, password);

  if ("error" in user) {
    const errorMessage = document.createElement("p");

    errorMessage.className = "mb-6 text-center text-sm text-red-500";
    errorMessage.id = "errorMessage";
    errorMessage.textContent = user.error;

    const existingErrorMessage = document.getElementById("errorMessage");

    if (existingErrorMessage) {
      existingErrorMessage.remove();
    }

    form.insertAdjacentElement("afterbegin", errorMessage);
  } else {
    localStorage.setItem("token", user.token);

    window.location.href = "/";
  }
});
