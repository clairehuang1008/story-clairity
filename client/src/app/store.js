import { configureStore } from '@reduxjs/toolkit';
import storyReducer from '../utils/reducers/storySlice.js';
import pageReducer from '../utils/reducers/pageSlice.js';

export const store = configureStore({
  reducer: {
    story: storyReducer,
    status: pageReducer,
  },
});
