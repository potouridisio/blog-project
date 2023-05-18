import { useEffect, useState } from 'react';
import Avatar from './components/Avatar';
import PostCard from './components/PostCard';
import { useAuth } from './lib/auth';
import { usePosts, useUsers } from './lib/hooks';

function App() {
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

  const handleAddComment = (comment, postIndex) => {
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

  if (isLoadingInitialData) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <header className="fixed left-0 top-0 z-50 w-full bg-white shadow">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <h1 className="text-xl font-semibold">Blog Project</h1>
          <Avatar component="button">{session.user.name}</Avatar>
        </div>
      </header>
      <main className="mx-auto max-w-6xl grow p-6">
        <div className="h-16" />
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
                onLike={() => handleLike(index)}
                users={users}
                {...post}
              />
            ))}
        </div>
      </main>
    </div>
  );
}

export default App;
