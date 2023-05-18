import { useEffect, useState } from 'react';

export function usePosts() {
  const [posts, setPosts] = useState(undefined);

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((posts) => setPosts(posts));
  }, []);

  return {
    isLoading: !posts,
    posts,
  };
}

export function useSession() {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    fetch('/api/session')
      .then((res) => res.json())
      .then((session) => setSession(session));
  }, []);

  return {
    isLoading: !session,
    session,
  };
}

export function useUsers() {
  const [users, setUsers] = useState(undefined);

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((users) => setUsers(users));
  }, []);

  return {
    isLoading: !users,
    users,
  };
}
