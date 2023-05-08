import { useEffect, useState } from 'react';
import { getPosts, getSession, getUsers } from './api';

export function usePosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((data) => {
      console.log('posts', data);

      setPosts(data);
    });
  }, []);

  return posts;
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

export function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getSession().then((data) => {
      setUser(data.user);
    });
  }, []);

  return user;
}
