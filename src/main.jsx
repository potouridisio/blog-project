import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { AuthProvider } from './lib/auth';

//import App from './App.jsx';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from './Routes/Root';
import Posts from './Routes/Posts';

import { loader as postsLoader } from './Routes/Posts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Posts />,
        loader: postsLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
