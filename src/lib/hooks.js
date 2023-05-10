import { useEffect, useState } from 'react';

import { getPosts, getSession, getUsers } from './api';

// η usePosts είναι ένα custom hook που επιστρέφει ένα object με δύο properties:
// 1. isLoading: ένα boolean που δηλώνει αν η λίστα των posts είναι άδεια ή όχι
// 2. posts: ένα array με τα posts
export function usePosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // η getPosts επιστρέφει μια Promise που θα πάρει κάποια στιγμή τα posts
    // από τον server
    getPosts().then((data) => {
      // όταν η Promise ολοκληρωθεί, θα ενημερώσουμε το state του posts
      // με τα δεδομένα που πήραμε από τον server
      setPosts(data);
    });
  }, []);

  return {
    isLoading: posts.length === 0,
    posts,
  };
}

// η useSession είναι ένα custom hook που επιστρέφει ένα object με δύο properties:
// 1. isLoading: ένα boolean που δηλώνει αν η session είναι άδεια ή όχι
// 2. session: ένα object με τα δεδομένα της session
export function useSession() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // η getSession επιστρέφει μια Promise που θα πάρει κάποια στιγμή τα δεδομένα
    // της session από τον server
    getSession().then((data) => {
      // όταν η Promise ολοκληρωθεί, θα ενημερώσουμε το state της session
      // με τα δεδομένα που πήραμε από τον server
      setSession(data);
    });
  }, []);

  return {
    isLoading: session === null,
    session,
  };
}

// η useUsers είναι ένα custom hook που επιστρέφει ένα object με δύο properties:
// 1. isLoading: ένα boolean που δηλώνει αν η λίστα των users είναι άδεια ή όχι
// 2. users: ένα array με τους users
export function useUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // η getUsers επιστρέφει μια Promise που θα πάρει κάποια στιγμή τους users
    // από τον server
    getUsers().then((data) => {
      // όταν η Promise ολοκληρωθεί, θα ενημερώσουμε το state των users
      // με τα δεδομένα που πήραμε από τον server
      setUsers(data);
    });
  }, []);

  return {
    isLoading: users.length === 0,
    users,
  };
}
