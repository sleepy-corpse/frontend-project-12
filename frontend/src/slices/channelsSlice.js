/* eslint-disable no-param-reassign */
import axios from 'axios';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes';

export const fetchInitialData = createAsyncThunk(
  'channels/fetchInitialData',
  async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const AuthHeader = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(routes.dataPath(), {
      headers: AuthHeader,
    });
    return response.data;
  },
);

const channelsAdapter = createEntityAdapter();

const slice = createSlice({
  name: 'channels',
  initialState: { channels: channelsAdapter.getInitialState(), selectedChannelId: null },
  reducers: {
    switchChannel: (state, { payload }) => {
      state.selectedChannelId = payload;
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialData.fulfilled, (state, { payload }) => {
        state.selectedChannelId = payload.currentChannelId;
        channelsAdapter.addMany(state.channels, payload.channels);
      });
  },
});

export const { actions } = slice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels.channels);
export default slice.reducer;
