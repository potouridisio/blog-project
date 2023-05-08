import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import { getPosts, getSession, getUsers } from "./api";
import { getInitials, getInitialsColor, timeAgo, truncateBody } from "./utils";

// η App επιστρέφει JSX που περιέχει το header και το main, το header περιέχει το όνομα της εφαρμογής
// και το κουμπί του χρήστη και το main τα posts
function App() {
  // ο χρήστης που έχει κάνει login
  const [user, setUser] = useState(null);
  // ένας πίνακας με τους χρήστες της εφαρμογής
  const [users, setUsers] = useState([]);
  // ένας πίνακας με τα posts της εφαρμογής
  const [posts, setPosts] = useState([]);
  // ένας πίνακας με τα id των posts που έχουν ανοιχτά τα σχόλια
  const [expandedComments, setExpandedComments] = useState([]);
  const [expandedPosts, setExpandedPosts] = useState([]);

  useEffect(() => {
    // οι εντολές μέσα στο useEffect θα εκτελεστούν μόνο μία φορά όταν το component φορτωθεί για πρώτη
    // φορά, η getSession επιστρέφει ένα promise που όταν ολοκληρωθεί θα έχει τα δεδομένα του χρήστη
    getSession().then((data) => {
      setUser(data.user);
    });
    // η getPosts επιστρέφει ένα promise που όταν ολοκληρωθεί θα έχει τα δεδομένα των posts
    getPosts().then((data) => {
      setPosts(data);
    });
    // η getUsers επιστρέφει ένα promise που όταν ολοκληρωθεί θα έχει τα δεδομένα των χρηστών
    getUsers().then(setUsers);
  }, []);

  // η handleToggleComment θα καλείται όταν ο χρήστης πατάει το κουμπί για να ανοίξει/κλείσει τα σχόλια
  // ενός post
  const handleToggleComment = (event, postId) => {
    event.preventDefault();

    // αν το postId υπάρχει στον πίνακα expandedComments
    if (expandedComments.includes(postId)) {
      // τότε το αφαιρούμε
      setExpandedComments(expandedComments.filter((id) => id !== postId));
    } else {
      // αλλιώς το προσθέτουμε
      setExpandedComments([...expandedComments, postId]);
    }
  };

  // η handleToggleLike θα καλείται όταν ο χρήστης πατάει το κουμπί
  // για να κάνει like/unlike ένα post
  const handleToggleLike = (postIndex) => {
    // δημιουργούμε έναν κλώνο του πίνακα posts
    // για να μπορέσουμε να τον τροποποιήσουμε
    // χωρίς να αλλάξουμε τον αρχικό πίνακα
    const newPosts = structuredClone(posts);

    // βρίσκουμε το post που θέλουμε να κάνουμε like/unlike
    const post = newPosts[postIndex];

    // βρίσκουμε το like του χρήστη στο post
    const like = post.likes.find((like) => like.userId === user.id);

    // αν ο χρήστης έχει κάνει like στο post
    if (like) {
      // τότε το αφαιρούμε
      post.likes = post.likes.filter((like) => like.userId !== user.id);
    } else {
      // αλλιώς το προσθέτουμε
      post.likes.push({
        // το id του like είναι το μεγαλύτερο id των υπαρχόντων likes + 1
        id: Math.max(...post.likes.map((like) => like.id)) + 1,
        // το userId είναι το id του χρήστη που έκανε login
        userId: user.id,
      });
    }

    // αντικαθιστούμε τον πίνακα posts με τον κλώνο
    setPosts(newPosts);
  };

  const handleTogglePosts = (postId) => {
    if (expandedPosts.includes(postId)) {
      setExpandedPosts(expandedPosts.filter((id) => id !== postId));
    } else {
      setExpandedPosts([...expandedPosts, postId]);
    }
  };

  // αν δεν έχουμε τον χρήστη ή τους χρήστες ή τα posts
  // τότε εμφανίζουμε το loading message
  if (!user || !users.length || !posts.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  // βρίσκουμε τα αρχικά του χρήστη
  const userInitials = getInitials(user.name);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow">
        <div className="h-16 flex items-center max-w-6xl mx-auto px-6 justify-between">
          <h1 className="font-semibold text-xl">Blog Project</h1>
          {user ? (
            // αν ο χρήστης έχει κάνει login
            // δηλαδή έχουμε τα δεδομένα του στο user
            // τότε εμφανίζουμε το κουμπί με τα αρχικά του
            // π.χ. αν ο χρήστης έχει το όνομα "John Doe"
            // τότε το κουμπί θα έχει τα αρχικά "JD"
            <button
              className="flex items-center justify-center text-center h-10 w-10 rounded-full text-white font-medium select-none"
              style={{ backgroundColor: getInitialsColor(userInitials) }}
            >
              {userInitials}
            </button>
          ) : // αλλιώς τίποτα
          null}
        </div>
      </header>
      <main className="max-w-6xl mx-auto grow p-6">
        <div className="h-16" />
        <div className="space-y-6 mt-6">
          {
            // για κάθε post
            posts.map((post, index) => (
              // εμφανίζουμε τον τίτλο και το κείμενο του περικομμένο στους 240 χαρακτήρες
              // καθώς και τα σχόλια και τα likes
              // το κουμπί για τα likes έχει τον αριθμό των likes
              // και είναι διαφορετικό αν ο χρήστης έχει κάνει like
              // ή όχι στο post
              // το κουμπί για τα σχόλια έχει τον αριθμό των σχολίων
              // και εμφανίζει τα σχόλια αν είναι κλειστά
              <div key={post.id} className="p-6 bg-white rounded-lg shadow">
                <h2 className="font-semibold text-lg mb-3">{post.title}</h2>
                {expandedPosts.includes(post.id) ? (
                  <p className="text-sm text-gray-500">{post.body}</p>
                ) : (
                  <p className="text-sm text-gray-500"></p>
                )}
                <p className="text-sm text-gray-500">
                  {truncateBody(post.body)}&nbsp;
                  <a
                    className={
                      expandedPosts.includes(post.id)
                        ? "hidden"
                        : "font-medium hover:underline"
                    }
                    href="#"
                    onClick={() => handleTogglePosts(post.id)}
                  >
                    See more
                  </a>
                </p>
                <div className="flex items-center justify-between mt-6">
                  <button
                    className="inline-flex items-center text-sm text-gray-500"
                    onClick={() => handleToggleLike(index)}
                  >
                    {
                      // ο χρήστης έχει κάνει like στο post
                      // ανάλογα με αυτό εμφανίζουμε το κατάλληλο εικονίδιο
                      // και τον αριθμό των likes
                      // π.χ. αν ο χρήστης έχει κάνει like το post έχουμε:
                      // <AiFillHeart /> 1
                      // αλλιώς έχουμε:
                      // <AiOutlineHeart /> 0
                      post.likes.some((like) => like.userId === user.id) ? (
                        <AiFillHeart
                          className="shrink-0 fill-red-500"
                          size={20}
                        />
                      ) : (
                        <AiOutlineHeart
                          className="shrink-0 fill-gray-500"
                          size={20}
                        />
                      )
                    }
                    &nbsp;
                    {post.likes.length}
                  </button>

                  <a
                    className="text-sm text-gray-500 hover:underline"
                    href="#"
                    onClick={(event) => handleToggleComment(event, post.id)}
                  >
                    {post.comments.length} comments
                  </a>
                </div>
                {
                  // αν το post έχει ανοιχτά τα σχόλια
                  // τότε εμφανίζουμε τα σχόλια
                  // αλλιώς τίποτα
                  expandedComments.includes(post.id) ? (
                    <>
                      <hr className="border-t-gray-200 mb-4 mt-6" />
                      <ul className="flex flex-col items-start space-y-3 py-3">
                        {
                          // για κάθε σχόλιο
                          post.comments.map((comment) => {
                            // βρίσκουμε τον χρήστη που έκανε το σχόλιο
                            const commentUser = users.find(
                              (user) => user.id === comment.userId
                            );
                            // βρίσκουμε τα αρχικά του χρήστη που έκανε το σχόλιο
                            const commentUserInitials = commentUser
                              ? getInitials(commentUser.name)
                              : "";

                            return (
                              // εμφανίζουμε το σχόλιο
                              // με τα αρχικά του χρήστη που το έκανε
                              // και το όνομα του χρήστη που το έκανε
                              // καθώς και το κείμενο του σχολίου
                              // και τον χρόνο που πέρασε από τότε που έγινε
                              <li
                                className="relative flex flex-col items-end pl-10"
                                key={comment.id}
                              >
                                <div
                                  className="absolute flex items-center justify-center text-center text-xs left-0 top-0 h-8 w-8 text-white rounded-full font-medium select-none"
                                  style={{
                                    backgroundColor:
                                      getInitialsColor(commentUserInitials),
                                  }}
                                >
                                  {commentUserInitials}
                                </div>
                                <div className="bg-gray-100 px-3 py-1.5 rounded-lg">
                                  {
                                    // αν έχουμε τον χρήστη που έκανε το σχόλιο
                                    // τότε εμφανίζουμε το όνομά του
                                    // αλλιώς τίποτα
                                    commentUser ? (
                                      <h3 className="text-sm font-medium">
                                        {commentUser.name}
                                      </h3>
                                    ) : null
                                  }
                                  <p className="text-sm text-gray-500">
                                    {comment.body}
                                  </p>
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  {timeAgo(new Date(comment.createdAt))}
                                </p>
                              </li>
                            );
                          })
                        }
                      </ul>
                    </>
                  ) : null
                }
              </div>
            ))
          }
        </div>
      </main>
    </div>
  );
}

export default App;
