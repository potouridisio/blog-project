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
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const userInitials = getInitials(user.name);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow">
        <div className="h-16 flex items-center max-w-6xl mx-auto px-6 justify-between">
          <h1 className="font-semibold text-xl">Blog Project</h1>
          <button
            className="flex items-center justify-center text-center h-10 w-10 rounded-full text-white font-medium select-none"
            style={{ backgroundColor: getInitialsColor(userInitials) }}
          >
            {userInitials}
          </button>
        </div>
      </header>
      <main className="max-w-6xl mx-auto grow p-6">
        <div className="h-16" />
        <div className="space-y-6 mt-6">
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
