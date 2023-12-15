import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSavedStories = createAsyncThunk(
  'page/fetchSavedStories',
  async (arg, { getState, dispatch }) => {
    console.log('fetching saved stories...');
    const response = await fetch('/stories', {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/JSON',
      },
    });
    const savedStories = await response.json();
    dispatch(updateSavedStories(savedStories));
  }
);

const initialState = {
  page: 'HOME',
  savedStories: [],
  chosenStory: null,
};

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    goToPage: (state, action) => {
      state.page = action.payload;
    },
    updateSavedStories: (state, action) => {
      state.savedStories = action.payload;
    },
    chooseStory: (state, action) => {
      state.chosenStory = action.payload;
    },
  },
});

export const { goToPage, updateSavedStories, chooseStory } = pageSlice.actions;

export default pageSlice.reducer;
