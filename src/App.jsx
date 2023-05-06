import { useEffect, useState } from 'react';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';

import { getPosts, getSession, getUsers } from './api';

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
  const handleToggleComment = (postId) => {
    // αν το postId υπάρχει στον πίνακα expandedComments
    if (expandedComments.includes(postId)) {
      // τότε το αφαιρούμε
      setExpandedComments(expandedComments.filter((id) => id !== postId));
    } else {
      // αλλιώς το προσθέτουμε
      setExpandedComments([...expandedComments, postId]);
    }
  };

  // η getInitials επιστρέφει τα αρχικά ενός ονόματος
  // π.χ. για τον χρήστη "John Doe" επιστρέφει "JD"
  const getInitials = (name) => {
    const [firstName, lastName] = name.split(' ');

    return `${firstName[0]}${lastName[0]}`;
  };

  return (
    <div>
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <div className="h-16 flex items-center max-w-7xl mx-auto px-6 justify-between">
          <div className="font-medium text-lg">Blog Project</div>
          {user ? (
            // αν ο χρήστης έχει κάνει login
            // δηλαδή έχουμε τα δεδομένα του στο user
            // τότε εμφανίζουμε το κουμπί με τα αρχικά του
            // π.χ. αν ο χρήστης έχει το όνομα "John Doe"
            // τότε το κουμπί θα έχει τα αρχικά "JD"
            <button className="h-9 w-9 bg-blue-500 rounded-full text-white">{getInitials(user.name)}</button>
          ) : // αλλιώς τίποτα
          null}
        </div>
      </header>
      <main>
        <div className="h-16" />
        <div className="space-y-2 mt-8">
          {
            // για κάθε post
            posts.map((post) => (
              // εμφανίζουμε τον τίτλο και το κείμενο του
              // καθώς και τα σχόλια και τα likes
              // το κουμπί για τα σχόλια έχει τον αριθμό των σχολίων
              // το κουμπί για τα likes έχει τον αριθμό των likes
              // και είναι διαφορετικό αν ο χρήστης έχει κάνει like
              // ή όχι στο post
              // το κουμπί για τα σχόλια έχει τον αριθμό των σχολίων
              // και εμφανίζει τα σχόλια αν είναι ανοιχτά
              <div key={post.id} className="max-w-7xl mx-auto px-6 py-4 bg-white rounded-md">
                <div className="font-medium text-lg">{post.title}</div>
                <div className="text-gray-500">{post.body}</div>
                <div className="flex items-center space-x-6 mt-4">
                  <button onClick={() => handleToggleComment(post.id)}>
                    <BiComment /> {post.comments.length}
                  </button>
                  <button>
                    {
                      // ο χρήστης έχει κάνει like στο post
                      // ανάλογα με αυτό εμφανίζουμε το κατάλληλο εικονίδιο
                      // και τον αριθμό των likes
                      // π.χ. αν ο χρήστης έχει κάνει like το post έχουμε:
                      // <AiFillLike size={20} /> 1
                      // αλλιώς έχουμε:
                      // <AiOutlineLike size={20} /> 0
                      post.likes.some((like) => like.userId === user.id) ? (
                        <AiFillLike size={20} />
                      ) : (
                        <AiOutlineLike size={20} />
                      )
                    }
                    {post.likes.length}
                  </button>
                </div>
                {
                  // αν το post έχει ανοιχτά τα σχόλια
                  // τότε εμφανίζουμε τα σχόλια
                  // αλλιώς τίποτα
                  expandedComments.includes(post.id) ? (
                    <ul>
                      {
                        // για κάθε σχόλιο
                        post.comments.map((comment) => {
                          // βρίσκουμε τον χρήστη που έκανε το σχόλιο
                          const commentUser = users.find((user) => user.id === comment.userId);

                          return (
                            // εμφανίζουμε το σχόλιο
                            <li key={comment.id}>
                              <div className="text-sm text-gray-500">{comment.body}</div>
                              {
                                // αν έχουμε τον χρήστη που έκανε το σχόλιο
                                // τότε εμφανίζουμε το όνομά του
                                // αλλιώς τίποτα
                                commentUser ? <div className="text-sm mt-1">{commentUser.name}</div> : null
                              }
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
