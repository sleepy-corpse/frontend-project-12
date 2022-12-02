import { Provider } from 'react-redux';
import React, { useMemo } from 'react';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { ToastContainer } from 'react-toastify';
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
import routes from './routes';

function App() {
  const router = createBrowserRouter([
    {
      path: routes.rootPage(),
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          element: <LoginPage />,
          path: routes.loginPage(),
        },
        {
          element: <SignUpPage />,
          path: routes.signupPage(),
        },
        {
          element: <Chat />,
          path: routes.rootPage(),
        },
      ],
    },
  ]);

  const ruProfanity = filter.getDictionary('ru');
  filter.add(ruProfanity);

  const socket = io();

  const addNewChannel = (channel, callback) => socket.timeout(5000).emit('newChannel', channel, (err) => callback(err));
  const renameChannel = (channel, callback) => socket.timeout(5000).emit('renameChannel', channel, (err) => callback(err));
  const removeChannel = (id, callback) => socket.timeout(5000).emit('removeChannel', { id }, (err) => callback(err));
  const addNewMessage = (message, callback) => socket.timeout(5000).emit('newMessage', message, (err) => callback(err));

  const socketActions = useMemo(() => ({
    addNewChannel,
    renameChannel,
    removeChannel,
    addNewMessage,
  }));

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
    accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
    environment: 'production',
    captureUncaught: true,
    captureUnhandledRejections: true,
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <SocketContext.Provider value={socketActions}>
            <FilterContext.Provider value={filter}>
              <RouterProvider router={router} />
              <ToastContainer />
            </FilterContext.Provider>
          </SocketContext.Provider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
}

export default App;
