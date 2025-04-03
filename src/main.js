import "./style.css";

const token = localStorage.getItem("token");

if (token) {
  window.location.href = "/posts";
}

const baseURL = "http://localhost:3000";

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const username = formData.get("username");
  const password = formData.get("password");

  const response = await fetch(`${baseURL}/login`, {
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const json = await response.json();

  if ("error" in json) {
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.textContent = json.error;
    errorMessage.classList.toggle("hidden");
  } else {
    localStorage.setItem("token", json.token);
    window.location.href = "/posts";
  }
});
