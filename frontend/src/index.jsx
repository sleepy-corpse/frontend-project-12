import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import './styles.css';
import { Provider } from 'react-redux';
import React from 'react';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { ToastContainer } from 'react-toastify';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { io } from 'socket.io-client';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import filter from 'leo-profanity';
import ErrorPage from './components/ErrorPage';
import Root from './components/Root';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import Chat from './components/Chat';
import store from './slices/index';
import { actions as channelsActions } from './slices/channelsSlice';
import { actions as messagesActions } from './slices/messagesSlice';
import { SocketContext, FilterContext } from './contexts';
import ru from './locales/ru';

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

filter.loadDictionary('ru');

const socket = io();

const addNewChannel = (channel, callback) => socket.timeout(5000).emit('newChannel', channel, (err) => callback(err));
const renameChannel = (channel, callback) => socket.timeout(5000).emit('renameChannel', channel, (err) => callback(err));
const removeChannel = (id, callback) => socket.timeout(5000).emit('removeChannel', { id }, (err) => callback(err));
const addNewMessage = (message, callback) => socket.timeout(5000).emit('newMessage', message, (err) => callback(err));

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

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ru,
    },
    lng: 'ru',
  });

const rollbarConfig = {
  accessToken: '236e6ae97b1a476ab11467917dd9df5c',
  environment: 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <Provider store={store}>
        <SocketContext.Provider value={{
          addNewChannel,
          renameChannel,
          removeChannel,
          addNewMessage,
        }}
        >
          <FilterContext.Provider value={filter}>
            <RouterProvider router={router} />
            <ToastContainer />
          </FilterContext.Provider>
        </SocketContext.Provider>
      </Provider>
    </ErrorBoundary>
  </RollbarProvider>,
);
