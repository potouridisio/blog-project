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

  postLink.className =
    "block px-4 py-2.5 text-sm text-indigo-900 hover:bg-indigo-300/70 focus:bg-indigo-300/70 focus:outline-0";
  postLink.href = "#";
  postLink.textContent = post.title;
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

  postsNav.appendChild(postLink);
}
