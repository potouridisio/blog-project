import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Posts from './routes/Posts';
import Root, { loader as rootLoader } from './routes/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: rootLoader,
    children: [
      {
        index: true,
        element: <Posts />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
