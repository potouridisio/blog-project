import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { getComments, getPost } from "./api";

dayjs.extend(relativeTime);

export function renderPosts(posts, token) {
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

      renderPost(post);

      const comments = await getComments(post.id, token);

      renderComments(comments);
    });

    postsNav.appendChild(postLink);
  }
}

function renderPost(post) {
  const postTitle = document.getElementById("postTitle");
  const postContent = document.getElementById("postContent");

  postTitle.textContent = post.title;
  postContent.textContent = post.content;
}

function renderComments(comments) {
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

  const commentForm = createCommentForm();

  commentsList.insertAdjacentElement("afterend", commentForm);
}

function createCommentForm(postId, token) {
  const commentForm = document.createElement("form");

  commentForm.id = "commentForm";

  const existingCommentForm = document.getElementById("commentForm");

  if (existingCommentForm) {
    existingCommentForm.remove();
  }

  commentForm.addEventListener("submit", async (event) => {
    event.preventDefault();

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

    const json = await response.json();
  });

  return commentForm;
}
