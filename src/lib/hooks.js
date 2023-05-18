import { useEffect, useState } from 'react';

/**
 * Custom hook for fetching and managing posts.
 *
 * @returns {{
 *   isLoading: boolean,
 *   posts: Array<Object>
 * }}
 */
export function usePosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((posts) => setPosts(posts));
  }, []);

  return {
    isLoading: !posts.length,
    posts,
  };
}

/**
 * Custom hook for fetching and managing user session.
 *
 * @returns {{
 *   isLoading: boolean,
 *   session: Object
 * }}
 */
export function useSession() {
  const [session, setSession] = useState({ user: null });

  useEffect(() => {
    fetch('/api/session')
      .then((res) => res.json())
      .then((session) => setSession(session));
  }, []);

  return {
    isLoading: !session.user,
    session,
  };
}

/**
 * Custom hook for fetching and managing users.
 *
 * @returns {{
 *   isLoading: boolean,
 *   users: Array<Object>
 * }}
 */
export function useUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((users) => setUsers(users));
  }, []);

  return {
    isLoading: !users.length,
    users,
  };
}
