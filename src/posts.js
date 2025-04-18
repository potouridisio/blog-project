import "./style.css";

import { addComment, getComments, getPosts, addPost } from "./api";
import { renderPosts, renderComments, resetFormStyles } from "./utils";
import { doc } from "prettier";

const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "/login";
}

const posts = await getPosts(token);

renderPosts(posts, token);

const commentForm = document.getElementById("commentForm");

commentForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const postId = event.target.dataset.postId;
  const content = event.target.content.value;

  if (!content) {
    const errorMessage = document.createElement("p");

    errorMessage.className = "mt-2 text-sm text-red-500";
    errorMessage.id = "errorMessage";
    errorMessage.textContent = "Content field is required";

    const existingErrorMessage = document.getElementById("errorMessage");

    if (existingErrorMessage) {
      existingErrorMessage.remove();
    }

    event.target.content.insertAdjacentElement("afterend", errorMessage);
    const contentInput = event.target.content;

    contentInput.classList.add(
      "border-red-300",
      "focus:border-red-500",
      "focus:ring-red-500",
    );
    contentInput.classList.remove(
      "border-indigo-300",
      "focus:border-indigo-500",
      "focus:ring-indigo-500",
    );
    event.target.content.focus();

    return;
  }

  await addComment(postId, content, token);

  const comments = await getComments(postId, token);

  renderComments(comments);

  event.target.content.value = "";

  const existingErrorMessage = document.getElementById("errorMessage");

  existingErrorMessage.remove();

  contentInput.classList.remove(
    "border-red-300",
    "focus:border-red-500",
    "focus:ring-red-500",
  );
  contentInput.classList.add(
    "border-indigo-300",
    "focus:border-indigo-500",
    "focus:ring-indigo-500",
  );
});

const openModal = document.querySelector("[data-open-modal]");
const modal = document.querySelector("[data-modal]");
const dialog = document.querySelector("dialog");
const cancelButton = document.getElementById("cancelButton");

openModal.addEventListener("click", () => {
  modal.showModal();
});

cancelButton.addEventListener("click", (event) => {
  resetFormStyles();

  modal.close();
});

dialog.addEventListener("mousedown", (event) => {
  const dialogDimensions = dialog.getBoundingClientRect();
  if (
    event.clientX < dialogDimensions.left ||
    event.clientX > dialogDimensions.right ||
    event.clientY < dialogDimensions.top ||
    event.clientY > dialogDimensions.bottom
  ) {
    resetFormStyles();
    modal.close();
  }
});

const addPostForm = document.getElementById("addPostForm");

addPostForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = event.target.title.value;
  const content = event.target.content.value;
  const titleInput = event.target.title;
  const contentInput = event.target.content;
  if (!title || !content) {
    const errorMessage = document.createElement("p");
    errorMessage.id = "postErrorMessage";
    errorMessage.className = "mt-2 text-sm text-red-500";
    errorMessage.textContent = "Both title and content are required";

    const existingError = document.getElementById("postErrorMessage");
    if (existingError) existingError.remove();

    contentInput.insertAdjacentElement("afterend", errorMessage);

    if (!title) {
      titleInput.classList.add(
        "border-red-300",
        "focus:border-red-500",
        "focus:ring-red-500",
      );
      titleInput.classList.remove(
        "border-indigo-300",
        "focus:border-indigo-500",
        "focus:ring-indigo-500",
      );
      titleInput.focus();
    }

    if (!content) {
      contentInput.classList.add(
        "border-red-300",
        "focus:border-red-500",
        "focus:ring-red-500",
      );
      contentInput.classList.remove(
        "border-indigo-300",
        "focus:border-indigo-500",
        "focus:ring-indigo-500",
      );
      if (title) contentInput.focus();
    }

    return;
  }

  await addPost(title, content, token);

  const updatedPosts = await getPosts(token);

  document.getElementById("postsNav").innerHTML = "";
  renderPosts(updatedPosts, token);
  const existingError = document.getElementById("postErrorMessage");
  if (existingError) existingError.remove();

  titleInput.classList.remove(
    "border-red-300",
    "focus:border-red-500",
    "focus:ring-red-500",
  );
  titleInput.classList.add(
    "border-indigo-300",
    "focus:border-indigo-500",
    "focus:ring-indigo-500",
  );

  contentInput.classList.remove(
    "border-red-300",
    "focus:border-red-500",
    "focus:ring-red-500",
  );
  contentInput.classList.add(
    "border-indigo-300",
    "focus:border-indigo-500",
    "focus:ring-indigo-500",
  );

  event.target.reset();
  modal.close();
});
