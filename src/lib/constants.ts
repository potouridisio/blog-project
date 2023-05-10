export const USERS = [
  {
    email: 'adam.johnson@example',
    id: crypto.randomUUID(),
    name: 'Adam Johnson',
    role: 'admin',
  },
  {
    email: 'emily.green@example',
    id: crypto.randomUUID(),
    name: 'Emily Green',
    role: 'admin',
  },
  {
    email: 'robert.davis@example',
    id: crypto.randomUUID(),
    name: 'Robert Davis',
    role: 'user',
  },
  {
    id: crypto.randomUUID(),
    name: 'Sophie White',
    email: 'sophie.white@example.com',
    role: 'user',
  },
];

export const POSTS = [
  {
    body: "If you're just starting out with front-end development, there are a few things you should keep in mind. First, focus on the basics. Learn HTML, CSS, and JavaScript inside and out before moving on to more advanced topics. Second, don't be afraid to make mistakes. Learning by doing is one of the most effective ways to improve your skills. Finally, be patient. Learning front-end development takes time and practice, but the rewards are well worth it.",
    comments: [
      {
        body: 'Great advice! Thanks for sharing.',
        createdAt: '2023-05-06T09:10:41.702Z',
        id: crypto.randomUUID(),
        // χρησιμοποιούμε το id του χρήστη από τον πίνακα USERS για να συνδέσουμε το σχόλιο με τον χρήστη
        // επειδή αν χρησιμοποιούσαμε το crypto.randomUUID() θα έφτιαχνε ένα νέο id και δεν θα μπορούσαμε να συνδέσουμε το σχόλιο με τον χρήστη
        userId: USERS[1].id,
      },
      {
        body: 'I totally agree. Learning the basics is crucial.',
        createdAt: '2023-05-05T16:34:22.056Z',
        id: crypto.randomUUID(),
        userId: USERS[2].id,
      },
      {
        body: "I'm having a hard time with CSS. Any tips?",
        createdAt: '2023-05-04T18:45:19.333Z',
        id: crypto.randomUUID(),
        userId: USERS[3].id,
      },
    ],
    createdAt: '2023-05-06T09:10:41.702Z',
    id: crypto.randomUUID(),
    likes: [
      {
        id: crypto.randomUUID(),
        userId: USERS[0].id,
      },
      {
        id: crypto.randomUUID(),
        userId: USERS[2].id,
      },
    ],
    title: 'Tips for Learning Front-End Development',
    userId: USERS[0].id,
  },
  {
    body: "In today's world, more people are browsing the web on mobile devices than ever before. That's why it's crucial to design websites with responsiveness in mind. Responsive design allows your website to adapt to different screen sizes, making it accessible to users on any device. Not only does this improve the user experience, but it can also improve your website's search engine rankings.",
    comments: [
      {
        body: "I've been trying to learn responsive design. It's challenging, but I know it's worth it.",
        createdAt: '2023-05-06T01:22:05.452Z',
        id: crypto.randomUUID(),
        userId: USERS[2].id,
      },
      {
        body: "I completely agree. Responsive design is a must-have in today's digital landscape.",
        createdAt: '2023-05-05T11:56:17.932Z',
        id: crypto.randomUUID(),
        userId: USERS[3].id,
      },
    ],
    createdAt: '2023-05-06T01:22:05.452Z',
    id: crypto.randomUUID(),
    likes: [
      {
        id: crypto.randomUUID(),
        userId: USERS[1].id,
      },
    ],
    title: 'The Importance of Responsive Design',
    userId: USERS[1].id,
  },
  {
    body: 'There are a variety of tools available to help front-end developers create beautiful, functional websites. Some popular choices include text editors like VS Code and Sublime Text, version control systems like Git, and task runners like Gulp and Grunt. Additionally, frameworks like React, Vue.js, and Angular can make front-end development faster and more efficient.',
    comments: [
      {
        body: "I've been using React for a while now and I love it.",
        createdAt: '2023-05-05T08:30:00.000Z',
        id: crypto.randomUUID(),
        userId: USERS[1].id,
      },
      {
        body: "I'm just starting out with front-end development. Which framework do you recommend?",
        createdAt: '2023-05-05T09:15:00.000Z',
        id: crypto.randomUUID(),
        userId: USERS[2].id,
      },
      {
        body: "I'm not very familiar with Git. Do you have any resources to recommend?",
        createdAt: '2023-05-05T10:00:00.000Z',
        id: crypto.randomUUID(),
        userId: USERS[3].id,
      },
      {
        body: "I recommend checking out the Git documentation on their official website. It's very thorough and easy to follow.",
        createdAt: '2023-05-06T11:30:00.000Z',
        id: crypto.randomUUID(),
        userId: USERS[0].id,
      },
    ],
    createdAt: '2023-05-05T08:30:00.000Z',
    id: crypto.randomUUID(),
    likes: [
      {
        id: crypto.randomUUID(),
        userId: USERS[1].id,
      },
      {
        id: crypto.randomUUID(),
        userId: USERS[2].id,
      },
      {
        id: crypto.randomUUID(),
        userId: USERS[3].id,
      },
    ],
    title: 'Tools for Front-End Development',
    userId: USERS[0].id,
  },
];
