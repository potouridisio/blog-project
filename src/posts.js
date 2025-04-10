import "./style.css";

import { getComments, getPosts } from "./api";
import { renderPosts, renderComments } from "./utils";

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

  const response = await fetch(
    `http://localhost:3000/posts/${postId}/comments`,
    {
      body: JSON.stringify({ content }),
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      method: "POST",
    },
  );

  await response.json();

  const comments = await getComments(postId, token);

  renderComments(comments);

  event.target.content.value = "";
});
