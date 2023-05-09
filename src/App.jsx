import { getInitials, getInitialsColor } from './utils';

// useContext

import PostCard from './PostCard';
import { usePosts, useUser, useUsers } from './hooks';

function App() {
  const user = useUser();
  const posts = usePosts();
  // const [posts, setPosts] = useState(initialPosts);
  const users = useUsers();

  const handleToggleLike = (postIndex) => {
    const newPosts = structuredClone(posts);
    const post = newPosts[postIndex];

    const like = post.likes.find((like) => like.userId === user.id);

    if (like) {
      post.likes = post.likes.filter((like) => like.userId !== user.id);
    } else {
      post.likes.push({
        id: Math.max(...post.likes.map((like) => like.id)) + 1,
        userId: user.id,
      });
    }

    // setPosts(newPosts);
  };

  const handleCommentSubmit = (comment, index) => {
    if (!comment) {
      return;
    } else {
      const newPosts = structuredClone(posts);
      const post = newPosts[index];

      post.comments.push({
        id: Math.max(...post.comments.map((comment) => comment.id)) + 1,
        userId: user.id,
        body: comment,
        createdAt: new Date().toISOString(),
      });

      // setPosts(newPosts);
    }
  };

  if (!user || !users.length || !posts.length) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  const userInitials = getInitials(user.name);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <header className="fixed left-0 top-0 z-50 w-full bg-white shadow">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <h1 className="text-xl font-semibold">Blog Project</h1>
          <button
            className="flex h-10 w-10 select-none items-center justify-center rounded-full text-center font-medium text-white"
            style={{ backgroundColor: getInitialsColor(userInitials) }}
          >
            {userInitials}
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-6xl grow p-6">
        <div className="h-16" />
        <div className="mt-6 space-y-6">
          {/* eslint-disable-next-line no-unused-vars */}
          {posts.map(({ id, ...post }, index) => (
            <PostCard
              key={post.id}
              user={user}
              users={users}
              onSubmitComment={(comment) => handleCommentSubmit(comment, index)}
              onClickLike={() => handleToggleLike(index)}
              {...post}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
