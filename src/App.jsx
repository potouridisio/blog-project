import { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineSend } from 'react-icons/ai';

import { getPosts, getSession, getUsers } from './api';
import { getInitials, getInitialsColor, timeAgo, truncateBody } from './utils';

function App() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [expandedComments, setExpandedComments] = useState([]);

  useEffect(() => {
    getSession().then((data) => {
      setUser(data.user);
    });
    getPosts().then((data) => {
      setPosts(data);
    });
    getUsers().then(setUsers);
  }, []);

  const handleToggleComment = (event, postId) => {
    event.preventDefault();

    if (expandedComments.includes(postId)) {
      setExpandedComments(expandedComments.filter((id) => id !== postId));
    } else {
      setExpandedComments([...expandedComments, postId]);
    }
  };

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

    setPosts(newPosts);
  };

  const handleCommentSubmit = (event, index) => {
    event.preventDefault();

    const commentField = event.target.elements.comment;

    if (!commentField.value) {
      return;
    } else {
      const newPosts = structuredClone(posts);
      const post = newPosts[index];

      post.comments.push({
        id: Math.max(...post.comments.map((comment) => comment.id)) + 1,
        userId: user.id,
        body: commentField.value,
        createdAt: new Date().toISOString(),
      });

      setPosts(newPosts);

      commentField.value = '';
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
          {posts.map((post, index) => (
            <div key={post.id} className="p-6 bg-white rounded-lg shadow">
              <h2 className="font-semibold text-lg mb-3">{post.title}</h2>
              <p className="text-sm text-gray-500">
                {truncateBody(post.body)}&nbsp;
                <a className="font-medium hover:underline" href="#">
                  See more
                </a>
              </p>
              <div className="flex items-center justify-between mt-6">
                <button
                  className="inline-flex items-center text-sm text-gray-500"
                  onClick={() => handleToggleLike(index)}
                >
                  {post.likes.some((like) => like.userId === user.id) ? (
                    <AiFillHeart className="shrink-0 fill-red-500" size={20} />
                  ) : (
                    <AiOutlineHeart className="shrink-0 fill-gray-500" size={20} />
                  )}
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
              {expandedComments.includes(post.id) ? (
                <>
                  <hr className="border-t-gray-200 mb-4 mt-6" />
                  <ul className="flex flex-col items-start space-y-3 py-3">
                    {post.comments.map((comment) => {
                      const commentUser = users.find((user) => user.id === comment.userId);
                      const commentUserInitials = commentUser ? getInitials(commentUser.name) : '';

                      return (
                        <li className="relative flex flex-col items-end pl-10" key={comment.id}>
                          <div
                            className="absolute flex items-center justify-center text-center text-xs left-0 top-0 h-8 w-8 text-white rounded-full font-medium select-none"
                            style={{ backgroundColor: getInitialsColor(commentUserInitials) }}
                          >
                            {commentUserInitials}
                          </div>
                          <div className="bg-gray-100 px-3 py-1.5 rounded-lg">
                            {commentUser ? <h3 className="text-sm font-semibold">{commentUser.name}</h3> : null}
                            <p className="text-sm text-gray-500">{comment.body}</p>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">{timeAgo(new Date(comment.createdAt))}</p>
                        </li>
                      );
                    })}
                    <li className="relative flex flex-col items-end pl-10 w-full">
                      <div
                        className="absolute flex items-center justify-center text-center text-xs left-0 top-0 h-8 w-8 text-white rounded-full font-medium select-none"
                        style={{ backgroundColor: getInitialsColor(userInitials) }}
                      >
                        {userInitials}
                      </div>
                      <form
                        className="bg-gray-100 rounded-lg py-0.5 w-full"
                        onSubmit={(event) => handleCommentSubmit(event, index)}
                      >
                        <input
                          autoComplete="new-password"
                          className="bg-transparent px-3 py-1.5 text-sm text-gray-500 placeholder-gray-500 w-full focus:outline-none"
                          name="comment"
                          placeholder="Write a comment..."
                        />
                        <div className="flex items-center justify-end pb-2 px-3">
                          <button className="p-1.5 -mb-1.5 -mr-2 rounded-full" type="submit">
                            <AiOutlineSend className="fill-gray-500" size={20} />
                          </button>
                        </div>
                      </form>
                    </li>
                  </ul>
                </>
              ) : null}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
