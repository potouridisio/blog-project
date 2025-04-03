import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Database from "better-sqlite3";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// In-memory SQLite DB
const db = new Database(":memory:");

// Schema setup
db.exec(`
  CREATE TABLE users (username TEXT PRIMARY KEY, password TEXT);
  CREATE TABLE sessions (token TEXT PRIMARY KEY, username TEXT);
  CREATE TABLE posts (id TEXT PRIMARY KEY, title TEXT, content TEXT, author TEXT);
  CREATE TABLE comments (id TEXT PRIMARY KEY, postId TEXT, content TEXT, author TEXT);
`);

db.prepare(`INSERT INTO users (username, password) VALUES (?, ?)`).run(
  "student",
  "pass"
);

// Auth middleware
function authenticate(req, res, next) {
  const token = req.headers["authorization"];
  const session = db
    .prepare(`SELECT username FROM sessions WHERE token = ?`)
    .get(token);
  if (!session) return res.status(401).json({ error: "Unauthorized" });
  req.username = session.username;
  next();
}

// --- [Routes below: login, posts, comments same as before] ---

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = db
    .prepare(`SELECT * FROM users WHERE username = ? AND password = ?`)
    .get(username, password);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const token = "token-" + uuidv4();
  db.prepare(`INSERT INTO sessions (token, username) VALUES (?, ?)`).run(
    token,
    username
  );
  res.json({ token });
});

// Posts endpoints (get, post, put, delete)
app.get("/posts", authenticate, (req, res) => {
  const posts = db.prepare(`SELECT * FROM posts`).all();
  res.json(posts);
});

app.post("/posts", authenticate, (req, res) => {
  const id = uuidv4();
  const { title, content } = req.body;
  db.prepare(
    `INSERT INTO posts (id, title, content, author) VALUES (?, ?, ?, ?)`
  ).run(id, title, content, req.username);
  res.status(201).json({ id, title, content, author: req.username });
});

app.get("/posts/:id", authenticate, (req, res) => {
  const post = db
    .prepare(`SELECT * FROM posts WHERE id = ?`)
    .get(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
});

app.put("/posts/:id", authenticate, (req, res) => {
  const post = db
    .prepare(`SELECT * FROM posts WHERE id = ?`)
    .get(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });

  const { title, content } = req.body;
  db.prepare(`UPDATE posts SET title = ?, content = ? WHERE id = ?`).run(
    title,
    content,
    req.params.id
  );

  const updated = db
    .prepare(`SELECT * FROM posts WHERE id = ?`)
    .get(req.params.id);
  res.json(updated);
});

app.delete("/posts/:id", authenticate, (req, res) => {
  db.prepare(`DELETE FROM posts WHERE id = ?`).run(req.params.id);
  res.status(204).end();
});

// Comments endpoints
app.get("/posts/:postId/comments", authenticate, (req, res) => {
  const list = db
    .prepare(`SELECT * FROM comments WHERE postId = ?`)
    .all(req.params.postId);
  res.json(list);
});

app.post("/posts/:postId/comments", authenticate, (req, res) => {
  const post = db
    .prepare(`SELECT * FROM posts WHERE id = ?`)
    .get(req.params.postId);
  if (!post) return res.status(404).json({ error: "Post not found" });

  const id = uuidv4();
  const { content } = req.body;
  db.prepare(
    `INSERT INTO comments (id, postId, content, author) VALUES (?, ?, ?, ?)`
  ).run(id, req.params.postId, content, req.username);

  res
    .status(201)
    .json({ id, postId: req.params.postId, content, author: req.username });
});

app.put("/comments/:id", authenticate, (req, res) => {
  const comment = db
    .prepare(`SELECT * FROM comments WHERE id = ?`)
    .get(req.params.id);
  if (!comment) return res.status(404).json({ error: "Comment not found" });

  const { content } = req.body;
  db.prepare(`UPDATE comments SET content = ? WHERE id = ?`).run(
    content,
    req.params.id
  );

  const updated = db
    .prepare(`SELECT * FROM comments WHERE id = ?`)
    .get(req.params.id);
  res.json(updated);
});

app.delete("/comments/:id", authenticate, (req, res) => {
  db.prepare(`DELETE FROM comments WHERE id = ?`).run(req.params.id);
  res.status(204).end();
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
