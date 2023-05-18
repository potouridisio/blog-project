import { useEffect, useState } from 'react';

import PostCard from '../components/PostCard';
import { useAuth } from '../lib/auth';
import { usePosts, useUsers } from '../lib/hooks';

function Posts() {
  const session = useAuth();
  const { isLoading: isLoadingPosts, posts: initialPosts } = usePosts();
  const [posts, setPosts] = useState(initialPosts);
  const { isLoading: isLoadingUsers, users } = useUsers();
  const isLoadingInitialData = isLoadingPosts || isLoadingUsers;

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

    // /posts/:postId/comments/:commentId
    // DELETE
    fetch(`/api/posts/${post.id}/comments/${commentId}`, {
      method: 'DELETE',
    });

    setPosts(newPosts);
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

    post.comments.forEach((comment) => {
      if (comment.id === commentId) {
        comment.body = newComment;

        // /posts/:postId/comments/:commentId
        // PUT
        // { body: newComment }
        fetch(`/api/posts/${post.id}/comments/${commentId}`, {
          body: JSON.stringify({ body: newComment }),
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
    });

    setPosts(newPosts);
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
      post.likes.push({
        id: crypto.randomUUID(),
        userId: session.user.id,
      });
    } else {
      post.likes.splice(likeIndex, 1);
    }

    setPosts(newPosts);
  };

  if (isLoadingInitialData) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

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
            users={users}
            {...post}
          />
        ))}
    </div>
  );
}

export default Posts;
