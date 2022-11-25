import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import './styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { io } from 'socket.io-client';
import ErrorPage from './components/ErrorPage';
import Root from './components/Root';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import Chat from './components/Chat';
import store from './slices/index';
import { actions as channelsActions } from './slices/channelsSlice';
import { actions as messagesActions } from './slices/messagesSlice';
import { SocketContext } from './contexts';

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
        element: <SignUpPage />,
        path: 'signup',
      },
      {
        element: <Chat />,
        path: '/',
      },
    ],
  },
]);

const socket = io();

const addNewChannel = (channel, callback) => socket.emit('newChannel', channel, () => callback());
const renameChannel = (channel, callback) => socket.emit('renameChannel', channel, () => callback());
const removeChannel = (id, callback) => socket.emit('removeChannel', { id }, () => callback());
const addNewMessage = (message, callback) => socket.emit('newMessage', message, () => callback());

socket.on('newChannel', (channel) => {
  store.dispatch(channelsActions.addChannel(channel));
});

socket.on('renameChannel', (channel) => {
  store.dispatch(channelsActions.renameChannel(channel));
});

socket.on('removeChannel', (payload) => {
  if (payload.id === store.getState().channels.selectedChannelId) {
    store.dispatch(channelsActions.switchChannel(1));
  }
  store.dispatch(channelsActions.removeChannel(payload));
});

socket.on('newMessage', (message) => {
  store.dispatch(messagesActions.addMessage(message));
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <SocketContext.Provider value={{
      addNewChannel,
      renameChannel,
      removeChannel,
      addNewMessage,
    }}
    >
      <RouterProvider router={router} />
    </SocketContext.Provider>
  </Provider>,
);
