export function getPosts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: 'Hello world 1!',
          body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
          comments: [
            {
              id: 1,
              body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
              userId: 1,
            },
            {
              id: 2,
              body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
              userId: 2,
            },
          ],
          likes: [
            {
              id: 1,
              userId: 1,
            },
            {
              id: 2,
              userId: 2,
            },
          ],
        },
        {
          id: 2,
          title: 'Hello world 2!',
          body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
          comments: [
            {
              id: 1,
              body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
              userId: 1,
            },
            {
              id: 2,
              body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
              userId: 2,
            },
          ],
          likes: [
            {
              id: 2,
              userId: 2,
            },
          ],
        },
      ]);
    }, 1000);
  });
}

export function getSession() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example',
          role: 'admin',
        },
      });
    }, 1000);
  });
}

export function getUsers() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 2,
          name: 'Jane Doe',
          email: 'jane.doe@example',
          role: 'admin',
        },
        {
          id: 3,
          name: 'Jack Doe',
          email: 'jack.doe@example',
          role: 'user',
        },
      ]);
    }, 1000);
  });
}
