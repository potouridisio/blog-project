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
    event.target.content.className = event.target.content.className.replaceAll(
      "indigo",
      "red",
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

  event.target.content.className = event.target.content.className.replaceAll(
    "red",
    "indigo",
  );
});

const addpostbtn = document.getElementById("openDialog");
const EnterNewPost = document.getElementById("EnterNewPost");
const cancelbtn = EnterNewPost.querySelector("#cancelbtn");

addpostbtn.addEventListener("click", () => {
  EnterNewPost.showModal();
});
cancelbtn.addEventListener("click", (e) => {
  EnterNewPost.close();
});
EnterNewPost.addEventListener("submit", async (event) =>{
  event.preventDefault();

  const NewTitle = event.target.NewTitleContent.value;
  const NewContent = event.target.NewPostContent.value;
  await addNewPost(NewTitle , NewContent, token);
  const NewPosts = await getPosts(token);
  const clearDoubles = document.getElementById("postsNav");
  clearDoubles.innerHTML = "";
  renderPosts(NewPosts, token);
  EnterNewPost.close();
});
