import "./style.css";

import { getPosts } from "./api";
import { renderPosts } from "./utils";

const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "/login";
}

const posts = await getPosts(token);

renderPosts(posts, token);
