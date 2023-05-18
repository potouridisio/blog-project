import { POSTS, USERS } from '../../data';
import { getRandomNumber } from './utils';

// Προσομοιώνουμε την αποστολή αιτήματος στον server με την χρήση της setTimeout

// η getPosts() επιστρέφει μια Promise που θα πάρει κάποια στιγμή τα posts από τον server
export function getPosts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(POSTS);
      // χρησιμοποιούμε την getRandomNumber() για να προσομοιώσουμε την καθυστέρηση
    }, getRandomNumber());
  });
}

// η getSession() επιστρέφει μια Promise που θα πάρει κάποια στιγμή τα δεδομένα της session από τον server
export function getSession() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ user: USERS[0] });
      // χρησιμοποιούμε την getRandomNumber() για να προσομοιώσουμε την καθυστέρηση
    }, getRandomNumber());
  });
}

// η getUsers() επιστρέφει μια Promise που θα πάρει κάποια στιγμή τους users από τον server
export function getUsers() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(USERS);
      // χρησιμοποιούμε την getRandomNumber() για να προσομοιώσουμε την καθυστέρηση
    }, getRandomNumber());
  });
}
