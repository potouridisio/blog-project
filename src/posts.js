import "./style.css";

const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "/login";
}

const response = await fetch("http://localhost:3000/posts", {
  headers: {
    Authorization: token,
  },
});

const posts = await response.json();

const postsNav = document.getElementById("postsNav");

for (const post of posts) {
  const postLink = document.createElement("a");
  const removePostButton = document.createElement("button");
  removePostButton.innerHTML = ` <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="size-4"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
    />
  </svg> `;
  removePostButton.className =
    "-mr-2 cursor-pointer hover:bg-indigo-200/50 p-2 opacity-0 hover:opacity-100 ";
  removePostButton.id = "removePost";
  removePostButton.title = "Remove post";
  removePostButton.type = "button";
  postLink.className =
    " flex items-center justify-between px-4 py-2.5 text-sm text-indigo-900 hover:bg-indigo-300/70 focus:bg-indigo-300/70 focus:outline-0";
  postLink.href = "#";
  postLink.textContent = post.title;

  removePostButton.addEventListener("click", (event) => {
    event.stopPropagation();

    postLink.remove();
    postTitle.textContent = "";
    postContent.textContent = "";
  });
  postLink.addEventListener("click", async (event) => {
    event.preventDefault();

    const response = await fetch(`http://localhost:3000/posts/${post.id}`, {
      headers: {
        Authorization: token,
      },
    });

    const json = await response.json();

    const postTitle = document.getElementById("postTitle");
    const postContent = document.getElementById("postContent");

    postTitle.textContent = json.title;
    postContent.textContent = json.content;
  });
  postLink.appendChild(removePostButton);
  postsNav.appendChild(postLink);
}
