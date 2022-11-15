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

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialData.fulfilled, (state, { payload }) => {
        const channels = payload.channels.map((chnl) => ({
          ...chnl,
          isSelected: payload.currentChannelId === chnl.id,
        }));
        console.log(channels);
        channelsAdapter.addMany(state.channels, channels);
      });
  },
});

// export const { actions } = slice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels.channels);
export default slice.reducer;
