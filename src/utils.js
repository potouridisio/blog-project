import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { getComments, getPost } from "./api";

dayjs.extend(relativeTime);

export function renderPosts(posts, token) {
  const postsNav = document.getElementById("postsNav");

  postsNav.addEventListener("click", async (event) => {
    const postId = event.target.dataset.postId;

    const post = await getPost(postId, token);

    renderPost(post);

    const comments = await getComments(post.id, token);

    renderComments(comments);

    const commentForm = document.getElementById("commentForm");

    commentForm.setAttribute("data-post-id", postId);
  });

  for (const post of posts) {
    const postLink = document.createElement("a");

    postLink.className =
      "block px-4 py-2.5 text-sm font-medium text-indigo-900 hover:bg-indigo-300/70 focus:bg-indigo-300/70 focus:outline-0";
    postLink.setAttribute("data-post-id", post.id);
    postLink.href = "#";
    postLink.textContent = post.title;

    postsNav.appendChild(postLink);
  }
}

function renderPost(post) {
  const postTitle = document.getElementById("postTitle");
  const postContent = document.getElementById("postContent");

  postTitle.textContent = post.title;
  postContent.textContent = post.content;
}

export function renderComments(comments) {
  const commentsList = document.getElementById("commentsList");

  commentsList.innerHTML = "";

  for (const comment of comments) {
    const commentListItem = document.createElement("li");

    commentListItem.innerHTML = `
        <h4 class="mb-2 text-sm font-medium text-indigo-700">${comment.author}</h4>
        <p class="mb-2 text-xs text-indigo-500">${dayjs(comment.createdAt).fromNow()}</p>
        <p class="text-sm text-indigo-900">${comment.content}</p>
      `;

    commentsList.appendChild(commentListItem);
  }
}
