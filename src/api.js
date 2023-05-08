import { getRandomNumber } from "./utils";

export function getPosts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Tips for Learning Front-End Development",
          body: "If you're just starting out with front-end development, there are a few things you should keep in mind. First, focus on the basics. Learn HTML, CSS, and JavaScript inside and out before moving on to more advanced topics. Second, don't be afraid to make mistakes. Learning by doing is one of the most effective ways to improve your skills. Finally, be patient. Learning front-end development takes time and practice, but the rewards are well worth it.",
          comments: [
            {
              id: 1,
              body: "Great advice! Thanks for sharing.",
              userId: 2,
              createdAt: "2023-05-06T09:10:41.702Z",
            },
            {
              id: 2,
              body: "I totally agree. Learning the basics is crucial.",
              userId: 3,
              createdAt: "2023-05-05T16:34:22.056Z",
            },
            {
              id: 3,
              body: "I'm having a hard time with CSS. Any tips?",
              userId: 4,
              createdAt: "2023-05-04T18:45:19.333Z",
            },
          ],
          likes: [
            {
              id: 1,
              userId: 1,
            },
            {
              id: 2,
              userId: 3,
            },
          ],
        },
        {
          id: 2,
          title: "The Importance of Responsive Design",
          body: "In today's world, more people are browsing the web on mobile devices than ever before. That's why it's crucial to design websites with responsiveness in mind. Responsive design allows your website to adapt to different screen sizes, making it accessible to users on any device. Not only does this improve the user experience, but it can also improve your website's search engine rankings.",
          comments: [
            {
              id: 1,
              body: "I've been trying to learn responsive design. It's challenging, but I know it's worth it.",
              userId: 3,
              createdAt: "2023-05-06T01:22:05.452Z",
            },
            {
              id: 2,
              body: "I completely agree. Responsive design is a must-have in today's digital landscape.",
              userId: 4,
              createdAt: "2023-05-05T11:56:17.932Z",
            },
          ],
          likes: [
            {
              id: 1,
              userId: 2,
            },
          ],
        },
        {
          id: 3,
          title: "Tools for Front-End Development",
          body: "There are a variety of tools available to help front-end developers create beautiful, functional websites. Some popular choices include text editors like VS Code and Sublime Text, version control systems like Git, and task runners like Gulp and Grunt. Additionally, frameworks like React, Vue.js, and Angular can make front-end development faster and more efficient.",
          comments: [
            {
              id: 1,
              body: "I've been using React for a while now and I love it.",
              userId: 2,
              createdAt: "2023-05-05T08:30:00.000Z",
            },
            {
              id: 2,
              body: "I'm just starting out with front-end development. Which framework do you recommend?",
              userId: 3,
              createdAt: "2023-05-05T09:15:00.000Z",
            },
            {
              id: 3,
              body: "I'm not very familiar with Git. Do you have any resources to recommend?",
              userId: 4,
              createdAt: "2023-05-05T10:00:00.000Z",
            },
            {
              id: 4,
              body: "I recommend checking out the Git documentation on their official website. It's very thorough and easy to follow.",
              userId: 1,
              createdAt: "2023-05-06T11:30:00.000Z",
            },
          ],
          likes: [
            {
              id: 1,
              userId: 2,
            },
            {
              id: 2,
              userId: 3,
            },
            {
              id: 3,
              userId: 4,
            },
          ],
        },
      ]);
    }, getRandomNumber());
  });
}

export function getSession() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          id: 1,
          name: "Adam Johnson",
          email: "adam.johnson@example",
          role: "admin",
        },
      });
    }, getRandomNumber());
  });
}

export function getUsers() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "Adam Johnson",
          email: "adam.johnson@example",
          role: "admin",
        },
        {
          id: 2,
          name: "Emily Green",
          email: "emily.green@example",
          role: "admin",
        },
        {
          id: 3,
          name: "Robert Davis",
          email: "robert.davis@example",
          role: "user",
        },
        {
          id: 4,
          name: "Sophie White",
          email: "sophie.white@example.com",
          role: "user",
        },
      ]);
    }, getRandomNumber());
  });
}
