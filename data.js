import { v4 as uuidv4 } from 'uuid';

export const USERS = [
  {
    email: 'adam.johnson@example',
    id: uuidv4(),
    name: 'Adam Johnson',
    role: 'admin',
  },
  {
    email: 'emily.green@example',
    id: uuidv4(),
    name: 'Emily Green',
    role: 'admin',
  },
  {
    email: 'robert.davis@example',
    id: uuidv4(),
    name: 'Robert Davis',
    role: 'user',
  },
  {
    id: uuidv4(),
    name: 'Sophie White',
    email: 'sophie.white@example.com',
    role: 'user',
  },
  {
    email: 'john.smith@example',
    id: uuidv4(),
    name: 'John Smith',
    role: 'admin',
  },
  {
    email: 'sarah.jones@example',
    id: uuidv4(),
    name: 'Sarah Jones',
    role: 'user',
  },
  {
    email: 'mike.doe@example',
    id: uuidv4(),
    name: 'Mike Doe',
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
        id: uuidv4(),
        userId: USERS[1].id,
      },
      {
        body: 'I totally agree. Learning the basics is crucial.',
        createdAt: '2023-05-05T16:34:22.056Z',
        id: uuidv4(),
        userId: USERS[2].id,
      },
      {
        body: "I'm having a hard time with CSS. Any tips?",
        createdAt: '2023-05-04T18:45:19.333Z',
        id: uuidv4(),
        userId: USERS[3].id,
      },
    ],
    createdAt: '2023-05-06T09:10:41.702Z',
    id: uuidv4(),
    likes: [
      {
        id: uuidv4(),
        userId: USERS[0].id,
      },
      {
        id: uuidv4(),
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
        id: uuidv4(),
        userId: USERS[2].id,
      },
      {
        body: "I completely agree. Responsive design is a must-have in today's digital landscape.",
        createdAt: '2023-05-05T11:56:17.932Z',
        id: uuidv4(),
        userId: USERS[3].id,
      },
    ],
    createdAt: '2023-05-06T01:22:05.452Z',
    id: uuidv4(),
    likes: [
      {
        id: uuidv4(),
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
        id: uuidv4(),
        userId: USERS[1].id,
      },
      {
        body: "I'm just starting out with front-end development. Which framework do you recommend?",
        createdAt: '2023-05-05T09:15:00.000Z',
        id: uuidv4(),
        userId: USERS[2].id,
      },
      {
        body: "I'm not very familiar with Git. Do you have any resources to recommend?",
        createdAt: '2023-05-05T10:00:00.000Z',
        id: uuidv4(),
        userId: USERS[3].id,
      },
      {
        body: "I recommend checking out the Git documentation on their official website. It's very thorough and easy to follow.",
        createdAt: '2023-05-06T11:30:00.000Z',
        id: uuidv4(),
        userId: USERS[0].id,
      },
    ],
    createdAt: '2023-05-05T08:30:00.000Z',
    id: uuidv4(),
    likes: [
      {
        id: uuidv4(),
        userId: USERS[1].id,
      },
      {
        id: uuidv4(),
        userId: USERS[2].id,
      },
      {
        id: uuidv4(),
        userId: USERS[3].id,
      },
    ],
    title: 'Tools for Front-End Development',
    userId: USERS[0].id,
  },
  {
    body: 'Front-end development is constantly evolving. One of the latest trends is the use of static site generators. These tools can help you create fast, performant websites that are easy to maintain. Some popular options include Gatsby, Next.js, and Hugo.',
    comments: [
      {
        body: "I've been hearing a lot about static site generators lately. Thanks for the recommendation!",
        createdAt: '2023-05-11T12:45:00.000Z',
        id: uuidv4(),
        userId: USERS[4].id,
      },
      {
        body: "I've used Gatsby before and it's amazing. Highly recommend it!",
        createdAt: '2023-05-11T14:20:00.000Z',
        id: uuidv4(),
        userId: USERS[2].id,
      },
      {
        body: 'Static site generators are definitely the way of the future. They make it so easy to create high-performing websites.',
        createdAt: '2023-05-11T16:30:00.000Z',
        id: uuidv4(),
        userId: USERS[3].id,
      },
    ],
    createdAt: '2023-05-11T12:45:00.000Z',
    id: uuidv4(),
    likes: [
      {
        id: uuidv4(),
        userId: USERS[0].id,
      },
      {
        id: uuidv4(),
        userId: USERS[2].id,
      },
      {
        id: uuidv4(),
        userId: USERS[3].id,
      },
    ],
    title: 'The Latest Trend in Front-End Development: Static Site Generators',
    userId: USERS[0].id,
  },
  {
    body: 'The benefits of serverless architecture for web development are numerous. By eliminating the need for infrastructure management and providing automatic scaling, developers can focus on writing code rather than managing servers. Popular serverless platforms include AWS Lambda, Google Cloud Functions, and Microsoft Azure Functions.',
    comments: [
      {
        body: 'I have been using AWS Lambda for some time now and it has made my life so much easier.',
        createdAt: '2023-05-10T13:45:22.056Z',
        id: uuidv4(),
        userId: USERS[0].id,
      },
      {
        body: 'I am new to serverless architecture. Can you recommend any resources to get started?',
        createdAt: '2023-05-11T09:15:00.000Z',
        id: uuidv4(),
        userId: USERS[3].id,
      },
    ],
    createdAt: '2023-05-10T13:45:22.056Z',
    id: uuidv4(),
    likes: [
      {
        id: uuidv4(),
        userId: USERS[2].id,
      },
    ],
    title: 'The Benefits of Serverless Architecture',
    userId: USERS[1].id,
  },
  {
    body: 'Web performance is crucial to providing a good user experience. A slow-loading website can cause users to abandon your site and move on to a competitor. Some best practices for optimizing website performance include minimizing HTTP requests, optimizing images and other assets, and using a content delivery network (CDN).',
    comments: [
      {
        body: 'I recently started using a CDN for my website and it has made a huge difference in page load times.',
        createdAt: '2023-05-09T18:30:00.000Z',
        id: uuidv4(),
        userId: USERS[2].id,
      },
      {
        body: 'Thanks for the tips! I will definitely keep these in mind when optimizing my website.',
        createdAt: '2023-05-10T11:00:00.000Z',
        id: uuidv4(),
        userId: USERS[3].id,
      },
    ],
    createdAt: '2023-05-09T18:30:00.000Z',
    id: uuidv4(),
    likes: [
      {
        id: uuidv4(),
        userId: USERS[0].id,
      },
      {
        id: uuidv4(),
        userId: USERS[1].id,
      },
    ],
    title: 'Best Practices for Optimizing Website Performance',
    userId: USERS[2].id,
  },
];
