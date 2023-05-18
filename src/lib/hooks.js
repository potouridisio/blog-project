import { useEffect, useState } from 'react';

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
