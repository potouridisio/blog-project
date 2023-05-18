import './index.css';

import ReactDOM from 'react-dom/client';

import { AuthProvider } from './lib/auth';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>,
);
