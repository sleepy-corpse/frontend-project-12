import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from './messagesSlice';
import channelsReducer from './channelsSlice';

export default configureStore({
  reducer: {
    messages: messagesReducer,
    channels: channelsReducer,
  },
});
