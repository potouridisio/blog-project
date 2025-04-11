import "./style.css";

import { addComment, getComments, getPosts } from "./api";
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

  await addComment(postId, content, token);

  const comments = await getComments(postId, token);

  renderComments(comments);

  event.target.content.value = "";
});
