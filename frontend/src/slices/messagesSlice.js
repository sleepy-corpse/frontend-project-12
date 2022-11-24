/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchInitialData, actions as channelsActions } from './channelsSlice';

const messagesAdapter = createEntityAdapter();

const slice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialData.fulfilled, (state, { payload }) => {
        messagesAdapter.addMany(state, payload.messages);
      })
      .addCase(channelsActions.removeChannel, (state, { payload }) => {
        const messages = Object.values(state.entities)
          .filter((msg) => msg.channelId === payload.id)
          .map((msg) => msg.id);
        messagesAdapter.removeMany(state, messages);
      });
  },
});

export const { actions } = slice;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default slice.reducer;
