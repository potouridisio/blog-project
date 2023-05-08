import { useEffect, useState } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";

import { getPosts, getSession, getUsers } from "./api";
import { getInitials, getInitialsColor, timeAgo, truncateBody } from "./utils";

// η App είναι ένα functional component
// ένα functional component είναι μία συνάρτηση που επιστρέφει JSX
// η App επιστρέφει JSX που περιέχει το header και το main
// το header περιέχει το όνομα της εφαρμογής και το κουμπί του χρήστη
// το main περιέχει τα posts της εφαρμογής
function App() {
  // ο χρήστης που έχει κάνει login
  const [user, setUser] = useState(null);
  // ένας πίνακας με τους χρήστες της εφαρμογής
  const [users, setUsers] = useState([]);
  // ένας πίνακας με τα posts της εφαρμογής
  const [posts, setPosts] = useState([]);
  // ένας πίνακας με τα id των posts που έχουν ανοιχτά τα σχόλια
  const [expandedComments, setExpandedComments] = useState([]);

  const [expandPosts, setExpandPosts] = useState([]);

  useEffect(() => {
    // οι εντολές μέσα στο useEffect θα εκτελεστούν μόνο μία φορά
    // όταν το component φορτωθεί για πρώτη φορά

    // η getSession επιστρέφει ένα promise που όταν ολοκληρωθεί
    // θα έχει τα δεδομένα του χρήστη
    getSession().then((data) => {
      setUser(data.user);
    });
    // η getPosts επιστρέφει ένα promise που όταν ολοκληρωθεί
    // θα έχει τα δεδομένα των posts
    getPosts().then((data) => {
      setPosts(data);
    });
    // η getUsers επιστρέφει ένα promise που όταν ολοκληρωθεί
    // θα έχει τα δεδομένα των χρηστών
    getUsers().then(setUsers);
  }, []);

  // η handleToggleComment θα καλείται όταν ο χρήστης πατάει το κουμπί
  // για να ανοίξει/κλείσει τα σχόλια ενός post
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

  const handleSeeMore = (postId) => {
    postId--;
    const newPosts = [...expandPosts];
    newPosts[postId] = true;
    setExpandPosts(newPosts);
  };

  // βρίσκουμε τα αρχικά του χρήστη
  const userInitials = user ? getInitials(user.name) : "";

  return (
    <div className="flex min-h-screen bg-gray-100">
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow">
        <div className="h-16 flex items-center max-w-6xl mx-auto px-6 justify-between">
          <div className="font-semibold text-xl">Blog Project</div>
          {user ? (
            // αν ο χρήστης έχει κάνει login
            // δηλαδή έχουμε τα δεδομένα του στο user
            // τότε εμφανίζουμε το κουμπί με τα αρχικά του
            // π.χ. αν ο χρήστης έχει το όνομα "John Doe"
            // τότε το κουμπί θα έχει τα αρχικά "JD"
            <button
              className="flex items-center justify-center text-center h-10 w-10 rounded-full text-white font-semibold"
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
            posts.map((post) => (
              // εμφανίζουμε τον τίτλο και το κείμενο του περικομμένο στους 240 χαρακτήρες
              // καθώς και τα σχόλια και τα likes
              // το κουμπί για τα likes έχει τον αριθμό των likes
              // και είναι διαφορετικό αν ο χρήστης έχει κάνει like
              // ή όχι στο post
              // το κουμπί για τα σχόλια έχει τον αριθμό των σχολίων
              // και εμφανίζει τα σχόλια αν είναι κλειστά
              <div key={post.id} className="p-6 bg-white rounded-lg shadow">
                <div className="font-semibold text-lg mb-3">{post.title}</div>
                <div className="text-gray-500">
                  {!expandPosts[post.id - 1] ? (
                    <>
                      {truncateBody(post.body)}
                      <a
                        onClick={() => handleSeeMore(post.id)}
                        className="text-gray-500 font-semibold hover:underline"
                        href="#"
                      >
                        See more
                      </a>
                    </>
                  ) : (
                    post.body
                  )}
                </div>
                <div className="flex items-center justify-between mt-6">
                  <button className="inline-flex items-center text-sm text-gray-500">
                    {
                      // ο χρήστης έχει κάνει like στο post
                      // ανάλογα με αυτό εμφανίζουμε το κατάλληλο εικονίδιο
                      // και τον αριθμό των likes
                      // π.χ. αν ο χρήστης έχει κάνει like το post έχουμε:
                      // <AiFillLike /> 1
                      // αλλιώς έχουμε:
                      // <AiOutlineLike /> 0
                      user ? (
                        post.likes.some((like) => like.userId === user.id) ? (
                          <AiFillLike
                            className="fill-blue-500 shrink-0"
                            size={20}
                          />
                        ) : (
                          <AiOutlineLike className="shrink-0" size={20} />
                        )
                      ) : null
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
                    <ul className="flex flex-col items-start space-y-3 py-3 mt-6">
                      {
                        // για κάθε σχόλιο
                        post.comments.map((comment) => {
                          // βρίσκουμε τον χρήστη που έκανε το σχόλιο
                          const commentUser = users.find(
                            (user) => user.id === comment.userId
                          );
                          // βρίσκουμε τα αρχικά του χρήστη
                          const initials = commentUser
                            ? getInitials(commentUser.name)
                            : "";

                          return (
                            // εμφανίζουμε το σχόλιο
                            // με τα αρχικά του χρήστη που το έκανε
                            // και το όνομα του χρήστη που το έκανε
                            // καθώς και το κείμενο του σχολίου
                            // και τον χρόνο που πέρασε από τότε που έγινε
                            <li
                              className="relative flex flex-col pl-10"
                              key={comment.id}
                            >
                              <div
                                className="absolute flex items-center justify-center text-center text-sm left-0 top-0 h-8 w-8 text-white rounded-full font-semibold"
                                style={{
                                  backgroundColor: getInitialsColor(initials),
                                }}
                              >
                                {initials}
                              </div>
                              <div className="bg-gray-50 px-3 py-1.5 rounded-lg">
                                {
                                  // αν έχουμε τον χρήστη που έκανε το σχόλιο
                                  // τότε εμφανίζουμε το όνομά του
                                  // αλλιώς τίποτα
                                  commentUser ? (
                                    <div className="text-sm font-semibold">
                                      {commentUser.name}
                                    </div>
                                  ) : null
                                }
                                <div className="text-sm text-gray-500">
                                  {comment.body}
                                </div>
                              </div>
                              <p className="text-xs text-gray-500 ml-auto mt-0.5">
                                {timeAgo(new Date(comment.createdAt))}
                              </p>
                            </li>
                          );
                        })
                      }
                    </ul>
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
