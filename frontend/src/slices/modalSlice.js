/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'modal',
  initialState: {
    isOpened: false,
    type: null,
    extra: null,
  },
  reducers: {
    openModal: (state, { payload }) => {
      const { type, extra = {} } = payload;
      state.type = type;
      state.extra = extra;
      state.isOpened = true;
    },
    closeModal: (state) => {
      state.type = null;
      state.extra = null;
      state.isOpened = false;
    },
  },
});

export const { actions } = slice;

export default slice.reducer;
