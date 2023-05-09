import { useEffect, useState } from 'react';

import { getPosts, getSession, getUsers } from './api';

export function usePosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((data) => {
      setPosts(data);
    });
  }, []);

  return posts;
}

export function useSession() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    getSession().then((data) => {
      setSession(data);
    });
  }, []);

  return session;
}

export function useUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  return users;
}
