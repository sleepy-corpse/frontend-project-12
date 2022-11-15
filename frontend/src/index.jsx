import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import './styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import Root from './components/Root';
import LoginPage from './components/LoginPage';
import SignUpForm from './components/SignUpForm';
import Chat from './components/Chat';
import store from './slices/index';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <LoginPage />,
        path: 'login',
      },
      {
        element: <SignUpForm />,
        path: 'signup',
      },
      {
        element: <Chat />,
        path: '/',
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
