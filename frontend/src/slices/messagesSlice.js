/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const slice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelsActions.initChannels, (state, { payload }) => {
        messagesAdapter.addMany(state, payload.messages);
      })
      .addCase(channelsActions.removeChannel, (state, { payload }) => {
        const messages = Object.values(state.entities)
          .filter((msg) => msg.channelId === payload.id)
          .map((msg) => msg.id);
        messagesAdapter.removeMany(state, messages);
      })
      .addCase(channelsActions.reset, () => initialState);
  },
});

export const { actions } = slice;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default slice.reducer;
