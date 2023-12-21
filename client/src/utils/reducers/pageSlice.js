import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { requestToGetAllSavedStories } from '../fetchRequests';

export const fetchSavedStories = createAsyncThunk(
  'page/fetchSavedStories',
  async (arg, { dispatch }) => {
    console.log('fetching saved stories...');
    const story = await requestToGetAllSavedStories();
    dispatch(updateSavedStories(story));
  }
);

const initialState = {
  page: 'HOME',
  savedStories: [],
  chosenStory: null,
  loggedUser: null,
  userDetailId: null,
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
    userLogIn: (state, action) => {
      state.loggedUser = action.payload;
    },
    userLogOut: (state, action) => {
      state.loggedUser = null;
    },
    setUserDetailId: (state, action) => {
      state.userDetailId = action.payload;
    },
  },
});

export const {
  goToPage,
  updateSavedStories,
  chooseStory,
  userLogIn,
  userLogOut,
  setUserDetailId,
} = pageSlice.actions;

export default pageSlice.reducer;
