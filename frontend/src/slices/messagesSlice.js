/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchInitialData } from './channelsSlice';

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
      });
  },
});

export const { actions } = slice;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default slice.reducer;
