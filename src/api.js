export async function login(username, password) {
  const response = await fetch("http://localhost:3000/login", {
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const json = await response.json();

  return json;
}

function logout() {
  localStorage.removeItem("token");
}

export async function getPosts(token) {
  const response = await fetch("http://localhost:3000/posts", {
    headers: {
      Authorization: token,
    },
  });

  if (response.status === 401) {
    logout();

    window.location.href = "/login";
  }

  const json = await response.json();

  return json;
}

export async function getPost(postId, token) {
  const response = await fetch(`http://localhost:3000/posts/${postId}`, {
    headers: {
      Authorization: token,
    },
  });

  const json = await response.json();

  return json;
}

export async function getComments(postId, token) {
  const response = await fetch(
    `http://localhost:3000/posts/${postId}/comments`,
    {
      headers: {
        Authorization: token,
      },
    },
  );

  const json = await response.json();

  return json;
}

export async function addComment(postId, content, token) {
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

  return json;
}
