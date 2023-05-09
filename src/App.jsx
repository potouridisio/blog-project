import { usePosts, useSession, useUsers } from './hooks';
import PostCard from './PostCard';
import { getInitials, getInitialsColor } from './utils';

function App() {
  // η useSession() επιστρέφει ένα αντικείμενο με τις τιμές των isLoading και session
  const { isLoading: isLoadingSession, session } = useSession();
  // η usePosts() επιστρέφει ένα αντικείμενο με τις τιμές των isLoading και posts
  const { isLoading: isLoadingPosts, posts } = usePosts();
  // const [posts, setPosts] = useState(initialPosts);
  // η useUsers() επιστρέφει ένα αντικείμενο με τις τιμές των isLoading και users
  const { isLoading: isLoadingUsers, users } = useUsers();
  // η isLoadingInitialData είναι true αν οι τιμές των isLoadingSession, isLoadingPosts και isLoadingUsers είναι true
  const isLoadingInitialData = isLoadingPosts || isLoadingSession || isLoadingUsers;

  // η handleLike() δέχεται το index του post που έγινε like
  const handleLike = (postIndex) => {
    // αντιγράφουμε τον πίνακα posts
    const newPosts = posts.slice().map((obj) => Object.assign({}, obj));

    // βρίσκουμε το post που έγινε like
    const post = newPosts[postIndex];
    // βρίσκουμε το like του χρήστη στο post
    const like = post.likes.find((like) => like.userId === session.user.id);
    // αν υπάρχει like του χρήστη στο post τότε το αφαιρούμε, αλλιώς το προσθέτουμε
    if (like) {
      post.likes = post.likes.filter((like) => like.userId !== session.user.id);
    } else {
      post.likes.push({
        // βρίσκουμε το μεγαλύτερο id των likes και προσθέτουμε 1
        id: Math.max(...post.likes.map((like) => like.id)) + 1,
        userId: session.user.id,
      });
    }

    // setPosts(newPosts);
  };

  // η handleComment() δέχεται το σχόλιο και το index του post στο οποίο έγινε το σχόλιο
  const handleComment = (comment, index) => {
    // αν δεν υπάρχει σχόλιο τότε επιστρέφουμε undefined
    if (!comment) {
      return undefined;
    } else {
      // αντιγράφουμε τον πίνακα posts
      const newPosts = posts.slice().map((obj) => Object.assign({}, obj));

      // βρίσκουμε το post στο οποίο έγινε το σχόλιο
      const post = newPosts[index];
      // προσθέτουμε το σχόλιο στο post
      post.comments.push({
        body: comment,
        createdAt: new Date().toISOString(),
        id: Math.max(...post.comments.map((comment) => comment.id)) + 1,
        userId: session.user.id,
      });

      // setPosts(newPosts);
    }
  };

  // αν οι τιμές των isLoadingSession, isLoadingPosts και isLoadingUsers είναι true τότε επιστρέφουμε το μήνυμα "Loading..."
  if (isLoadingInitialData) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  const userInitials = getInitials(session.user.name);

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
              key={id}
              onComment={(comment) => handleComment(comment, index)}
              onLike={() => handleLike(index)}
              session={session}
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
