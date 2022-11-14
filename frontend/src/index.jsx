import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import Root from './components/Root';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <LoginForm />,
        path: 'login',
      },
      {
        element: <SignUpForm />,
        path: 'signup',
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
