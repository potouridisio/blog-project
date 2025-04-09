import "./style.css";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { getComments, getPost, getPosts } from "./api";

dayjs.extend(relativeTime);

const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "/login";
}

const posts = await getPosts(token);

const postsNav = document.getElementById("postsNav");

for (const { id, title } of posts) {
  const postLink = document.createElement("a");

  postLink.className =
    "block px-4 py-2.5 text-sm text-indigo-900 hover:bg-indigo-300/70 focus:bg-indigo-300/70 focus:outline-0";
  postLink.href = "#";
  postLink.textContent = title;
  postLink.addEventListener("click", async (event) => {
    event.preventDefault();

    const post = await getPost(id, token);

    const postTitle = document.getElementById("postTitle");
    const postContent = document.getElementById("postContent");

    postTitle.textContent = post.title;
    postContent.textContent = post.content;

    const comments = await getComments(post.id, token);

    const commentsList = document.getElementById("commentsList");

    commentsList.innerHTML = "";

    for (const comment of comments) {
      const commentListItem = document.createElement("li");

      commentListItem.innerHTML = `
        <h4 class="text-sm font-semibold text-indigo-700">${comment.author}</h4>
        <p class="mb-2 text-xs text-indigo-500">${dayjs(comment.createdAt).fromNow()}</p>
        <p class="text-sm text-indigo-900">${comment.content}</p>
      `;

      commentsList.appendChild(commentListItem);
    }
  });

  postsNav.appendChild(postLink);
}
