import { useEffect, useState } from 'react';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';

import { getPosts, getSession, getUsers } from './api';

function App() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  // false ή κάποιο id
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    // επιστρέφει { user }
    getSession().then((data) => {
      setUser(data.user);
    });
    // επιστρέφει []
    getPosts().then(setPosts);
    getUsers().then(setUsers);
  }, []);

  const handleToggleComments = (postId) => {
    if (showComments === postId) {
      setShowComments(false);
    } else {
      setShowComments(postId);
    }
  };

  return (
    <div>
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <div className="h-16 flex items-center max-w-7xl mx-auto px-6 justify-between">
          <div className="font-medium text-lg">Blog Project</div>
          {user ? (
            <button className="h-9 w-9 bg-blue-500 rounded-full text-white">
              {user.name
                .split(' ')
                .map((value) => value.charAt(0))
                .join('')}
            </button>
          ) : null}
        </div>
      </header>
      <main>
        <div className="h-16" />
        <div className="space-y-2 mt-8">
          {posts.map((post) => (
            <div key={post.id} className="max-w-7xl mx-auto px-6 py-4 bg-white rounded-md">
              <div className="font-medium text-lg">{post.title}</div>
              <div className="text-gray-500">{post.body}</div>
              <div className="flex items-center space-x-6 mt-4">
                <button onClick={() => handleToggleComments(post.id)}>
                  <BiComment /> {post.comments.length}
                </button>
                <button>
                  {post.likes.some((like) => like.userId === user.id) ? (
                    <AiFillLike size={20} />
                  ) : (
                    <AiOutlineLike size={20} />
                  )}
                  {post.likes.length}
                </button>
              </div>
              {showComments === post.id ? (
                <ul>
                  {post.comments.map((comment) => {
                    const user = users.find((user) => user.id === comment.userId);
                    return (
                      <li key={comment.id}>
                        <div className="text-sm text-gray-500">{comment.body}</div>
                        {user ? <div className="text-sm mt-1">{user.name}</div> : null}
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
