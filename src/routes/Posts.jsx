/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from 'react';
import { useLoaderData, useOutletContext } from 'react-router';

import PostCard from '../components/PostCard';

export async function loader() {
  return {
    posts: await fetch('/api/posts').then((res) => res.json()),
    users: await fetch('/api/users').then((res) => res.json()),
  };
}

function Posts() {
  const session = useOutletContext();
  const { posts: initialPosts, users } = useLoaderData();
  const [posts, setPosts] = useState(initialPosts);

  useEffect(() => {
    if (initialPosts) {
      setPosts(initialPosts);
    }
  }, [initialPosts]);

  /**
   * Handles adding a comment to a post.
   *
   * @param {string} comment - The comment to be added.
   * @param {number} postIndex - The index of the post.
   *
   * @returns {void}
   */
  const handleAddComment = (comment, postIndex) => {
    if (!comment) {
      return undefined;
    } else {
      const newPosts = posts.slice().map((obj) => Object.assign({}, obj));
      const post = newPosts[postIndex];

      fetch(`/api/posts/${post.id}/comments`, {
        body: JSON.stringify({ body: comment, userId: session.user.id }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((comment) => {
          post.comments.push(comment);
          setPosts(newPosts);
        });
    }
  };

  /**
   * Handles deleting a comment from a post.
   *
   * @param {string} commentId - The ID of the comment to be deleted.
   * @param {number} postIndex - The index of the post.
   *
   * @returns {void}
   */
  const handleDeleteComment = (commentId, postIndex) => {
    const newPosts = posts.slice().map((obj) => Object.assign({}, obj));
    const post = newPosts[postIndex];
    const commentIndex = post.comments.findIndex((comment) => comment.id === commentId);

    post.comments.splice(commentIndex, 1);

    setPosts(newPosts);

    fetch(`/api/posts/${post.id}/comments/${commentId}`, {
      method: 'DELETE',
    });
  };

  /**
   * Handles editing a comment in a post.
   *
   * @param {string} commentId - The ID of the comment to be edited.
   * @param {string} newComment - The updated comment content.
   * @param {number} postIndex - The index of the post.
   *
   * @returns {void}
   */
  const handleEditComment = (commentId, newComment, postIndex) => {
    const newPosts = posts.slice().map((obj) => Object.assign({}, obj));
    const post = newPosts[postIndex];
    const commentIndex = post.comments.findIndex((comment) => comment.id === commentId);

    post.comments[commentIndex].body = newComment;

    setPosts(newPosts);

    fetch(`/api/posts/${post.id}/comments/${commentId}`, {
      body: JSON.stringify({ body: newComment }),
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  /**
   * Handles toggling the like status of a post.
   *
   * @param {number} postIndex - The index of the post.
   *
   * @returns {void}
   */
  const handleToggleLike = (postIndex) => {
    const newPosts = posts.slice().map((obj) => Object.assign({}, obj));
    const post = newPosts[postIndex];
    const likeIndex = post.likes.findIndex((like) => like.userId === session.user.id);

    if (likeIndex === -1) {
      fetch(`/api/posts/${post.id}/like`, {
        body: JSON.stringify({ userId: session.user.id }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((like) => {
          post.likes.push(like);
          setPosts(newPosts);
        });
    } else {
      const likeId = post.likes[likeIndex];
      post.likes.splice(likeIndex, 1);
      setPosts(newPosts);
      fetch(`/api/posts/${post.id}/like/${likeId}`, {
        body: JSON.stringify({ userId: session.user.id }),
        method: 'DELETE',
      });
    }
  };

  return (
    <div className="space-y-6 py-6">
      {posts
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map(({ id, ...post }, index) => (
          <PostCard
            key={id}
            onAddComment={(comment) => handleAddComment(comment, index)}
            onDelete={() => setPosts(posts.filter((post) => post.id !== id))}
            onDeleteComment={(commentId) => handleDeleteComment(commentId, index)}
            onEditComment={(commentId, comment) => handleEditComment(commentId, comment, index)}
            onToggleLike={() => handleToggleLike(index)}
            session={session}
            users={users}
            {...post}
          />
        ))}
    </div>
  );
}

export default Posts;
