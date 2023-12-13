import { configureStore } from '@reduxjs/toolkit';
import storyReducer from '../utils/reducers/storySlice.js';

export const store = configureStore({
  reducer: {
    story: storyReducer,
  },
});
