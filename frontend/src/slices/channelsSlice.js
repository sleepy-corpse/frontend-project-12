/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = { channels: channelsAdapter.getInitialState(), selectedChannelId: null };

const slice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    switchChannel: (state, { payload }) => {
      state.selectedChannelId = payload;
    },
    initChannels: (state, { payload }) => {
      state.selectedChannelId = payload.currentChannelId;
      channelsAdapter.addMany(state.channels, payload.channels);
    },
    addChannel: (state, { payload }) => {
      channelsAdapter.addOne(state.channels, payload);
      state.selectedChannelId = payload.id;
    },
    renameChannel: (state, { payload }) => {
      channelsAdapter.updateOne(state.channels, { id: payload.id, changes: payload });
    },
    removeChannel: (state, { payload }) => {
      channelsAdapter.removeOne(state.channels, payload.id);
    },
    reset: () => initialState,
  },
});

export const { actions } = slice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels.channels);
export default slice.reducer;
