import { getPosts, getSession, getUsers } from '../lib/api';
import { useLoaderData } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { useState } from 'react';
import { useAuth } from '../lib/auth';

export async function loader() {
  const initialPosts = await getPosts();
  const initialUsers = await getUsers();
  return { initialPosts, initialUsers };
}

export default function Posts() {
  const { initialPosts } = useLoaderData();
  const { initialUsers } = useLoaderData();

  const [posts, setPosts] = useState(initialPosts);
  const [users, setUsers] = useState(initialUsers);
  const session = useAuth();

  const handleComment = (comment, postIndex) => {
    if (!comment) {
      return undefined;
    } else {
      const newPosts = posts.slice().map((obj) => Object.assign({}, obj));
      const post = newPosts[postIndex];
      post.comments.push({
        body: comment,
        createdAt: new Date().toISOString(),
        id: crypto.randomUUID(),
        userId: session.user.id,
      });
      setPosts(newPosts);
    }
  };

  const handleDeleteComment = (commentId, postIndex) => {
    const newPosts = posts.slice().map((obj) => Object.assign({}, obj));
    const post = newPosts[postIndex];
    post.comments = post.comments.filter((comment) => comment.id !== commentId);
    setPosts(newPosts);
  };

  const handleEditComment = (commentId, newComment, postIndex) => {
    const newPosts = posts.slice().map((obj) => Object.assign({}, obj));
    const post = newPosts[postIndex];
    post.comments.forEach((comment) => {
      if (comment.id === commentId) {
        comment.body = newComment;
      }
    });
    setPosts(newPosts);
  };

  const handleLike = (postIndex) => {
    const newPosts = posts.slice().map((obj) => Object.assign({}, obj));
    const post = newPosts[postIndex];
    const like = post.likes.find((like) => like.userId === session.user.id);

    if (like) {
      post.likes = post.likes.filter((like) => like.userId !== session.user.id);
    } else {
      post.likes.push({
        id: crypto.randomUUID(),
        userId: session.user.id,
      });
    }
    setPosts(newPosts);
  };

  return (
    <main className="mx-auto max-w-6xl grow p-6">
      <div className="h-16" />
      <div className="space-y-6 py-6">
        {posts

          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map(({ id, ...post }, index) => (
            <PostCard
              key={id}
              onComment={(comment) => handleComment(comment, index)}
              onDelete={() => posts.filter((post) => post.id !== id)}
              onDeleteComment={(commentId) => handleDeleteComment(commentId, index)}
              onEditComment={(commentId, comment) => handleEditComment(commentId, comment, index)}
              onLike={() => handleLike(index)}
              users={users}
              {...post}
            />
          ))}
      </div>
    </main>
  );
}
