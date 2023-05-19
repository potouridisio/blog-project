/* eslint-disable no-undef */
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');
const { POSTS, USERS } = require('./data.cjs'); // Import the POSTS and USERS arrays

// Create a new Express app
const app = express();

app.use(express.json());

// Create an in-memory SQLite database
const db = new sqlite3.Database(':memory:');

// Create the tables
db.serialize(() => {
  db.run(`
    CREATE TABLE users (
      id TEXT PRIMARY KEY,
      email TEXT,
      name TEXT,
      role TEXT
    )
  `);

  db.run(`
    CREATE TABLE posts (
      id TEXT PRIMARY KEY,
      title TEXT,
      body TEXT,
      createdAt TEXT,
      userId TEXT,
      FOREIGN KEY (userId) REFERENCES users(id)
    )
  `);

  db.run(`
    CREATE TABLE comments (
      id TEXT PRIMARY KEY,
      body TEXT,
      createdAt TEXT,
      userId TEXT,
      postId TEXT,
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (postId) REFERENCES posts(id)
    )
  `);

  db.run(`
    CREATE TABLE likes (
      id TEXT PRIMARY KEY,
      userId TEXT,
      postId TEXT,
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (postId) REFERENCES posts(id)
    )
  `);

  // Seed the tables with data
  const seedData = () => {
    // Insert users
    USERS.forEach((user) => {
      db.run('INSERT INTO users (id, email, name, role) VALUES (?, ?, ?, ?)', [
        user.id,
        user.email,
        user.name,
        user.role,
      ]);
    });

    // Insert posts
    POSTS.forEach((post) => {
      const postId = uuidv4();
      db.run('INSERT INTO posts (id, title, body, createdAt, userId) VALUES (?, ?, ?, ?, ?)', [
        postId,
        post.title,
        post.body,
        post.createdAt,
        post.userId,
      ]);

      // Insert comments
      post.comments.forEach((comment) => {
        db.run('INSERT INTO comments (id, body, createdAt, userId, postId) VALUES (?, ?, ?, ?, ?)', [
          comment.id,
          comment.body,
          comment.createdAt,
          comment.userId,
          postId,
        ]);
      });

      // Insert likes
      post.likes.forEach((like) => {
        db.run('INSERT INTO likes (id, userId, postId) VALUES (?, ?, ?)', [like.id, like.userId, postId]);
      });
    });
  };

  seedData();
});

// Get all posts
app.get('/posts', (req, res) => {
  db.all('SELECT * FROM posts', [], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const posts = rows.map((row) => {
        const post = { ...row };
        post.likes = [];
        post.comments = [];
        return post;
      });

      db.all('SELECT * FROM likes', [], (likesErr, likesRows) => {
        if (likesErr) {
          console.error(likesErr);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          likesRows.forEach((likeRow) => {
            const post = posts.find((p) => p.id === likeRow.postId);
            if (post) {
              post.likes.push(likeRow);
            }
          });

          db.all('SELECT * FROM comments', [], (commentsErr, commentsRows) => {
            if (commentsErr) {
              console.error(commentsErr);
              res.status(500).json({ error: 'Internal server error' });
            } else {
              commentsRows.forEach((commentRow) => {
                const post = posts.find((p) => p.id === commentRow.postId);
                if (post) {
                  post.comments.push(commentRow);
                }
              });

              res.json(posts);
            }
          });
        }
      });
    }
  });
});

// Get all users
app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(rows);
    }
  });
});

// Get posts of a specific user
app.get('/users/:userId/posts', (req, res) => {
  const { userId } = req.params;

  db.all('SELECT * FROM posts WHERE userId = ?', [userId], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const posts = rows.map((row) => {
        const post = { ...row };
        post.likes = [];
        post.comments = [];
        return post;
      });

      db.all('SELECT * FROM likes', [], (likesErr, likesRows) => {
        if (likesErr) {
          console.error(likesErr);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          likesRows.forEach((likeRow) => {
            const post = posts.find((p) => p.id === likeRow.postId);
            if (post) {
              post.likes.push(likeRow);
            }
          });

          db.all('SELECT * FROM comments', [], (commentsErr, commentsRows) => {
            if (commentsErr) {
              console.error(commentsErr);
              res.status(500).json({ error: 'Internal server error' });
            } else {
              commentsRows.forEach((commentRow) => {
                const post = posts.find((p) => p.id === commentRow.postId);
                if (post) {
                  post.comments.push(commentRow);
                }
              });

              res.json(posts);
            }
          });
        }
      });
    }
  });
});

// Get session
app.get('/session', (req, res) => {
  db.get('SELECT * FROM users LIMIT 1', [], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const session = { user: row };
      res.json(session);
    }
  });
});

// Add post
app.post('/posts', (req, res) => {
  const { title, body, userId } = req.body;
  const postId = uuidv4();
  const createdAt = new Date().toISOString();

  db.run(
    'INSERT INTO posts (id, title, body, createdAt, userId) VALUES (?, ?, ?, ?, ?)',
    [postId, title, body, createdAt, userId],
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        const post = {
          id: postId,
          title: title,
          body: body,
          createdAt: createdAt,
          userId: userId,
          likes: [],
          comments: [],
        };
        res.status(201).json(post);
      }
    },
  );
});

// Delete post
app.delete('/posts/:postId', (req, res) => {
  const { postId } = req.params;

  db.run('DELETE FROM posts WHERE id = ?', [postId], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.sendStatus(204);
    }
  });
});

// Like/Dislike post
app.post('/posts/:postId/like', (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;
  const likeId = uuidv4();

  db.run('INSERT INTO likes (id, userId, postId) VALUES (?, ?, ?)', [likeId, userId, postId], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      // Retrieve the added like object
      const query = 'SELECT * FROM likes WHERE id = ?';
      db.get(query, [likeId], (likeErr, likeRow) => {
        if (likeErr) {
          console.error(likeErr);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          res.status(201).json(likeRow);
        }
      });
    }
  });
});

app.delete('/posts/:postId/like', (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  db.run('DELETE FROM likes WHERE postId = ? AND userId = ?', [postId, userId], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.sendStatus(204);
    }
  });
});

// Add comment to post
app.post('/posts/:postId/comments', (req, res) => {
  const { postId } = req.params;
  const { body, userId } = req.body;
  const commentId = uuidv4();
  const createdAt = new Date().toISOString();

  db.run(
    'INSERT INTO comments (id, body, createdAt, userId, postId) VALUES (?, ?, ?, ?, ?)',
    [commentId, body, createdAt, userId, postId],
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        const comment = {
          id: commentId,
          body: body,
          createdAt: createdAt,
          userId: userId,
          postId: postId,
        };
        res.status(201).json(comment);
      }
    },
  );
});

// Edit comment
app.put('/posts/:postId/comments/:commentId', (req, res) => {
  const { postId, commentId } = req.params;
  const { body } = req.body;

  db.run('UPDATE comments SET body = ? WHERE postId = ? AND id = ?', [body, postId, commentId], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.sendStatus(204);
    }
  });
});

// Delete comment
app.delete('/posts/:postId/comments/:commentId', (req, res) => {
  const { postId, commentId } = req.params;

  db.run('DELETE FROM comments WHERE postId = ? AND id = ?', [postId, commentId], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.sendStatus(204);
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
