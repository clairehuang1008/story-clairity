import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { requestToGetAllSavedStories } from '../fetchRequests';

export const fetchSavedStories = createAsyncThunk(
  'page/fetchSavedStories',
  async (arg, { dispatch }) => {
    console.log('fetching saved stories...');
    const story = await requestToGetAllSavedStories();
    dispatch(updateSavedStories(story));
    // requestToGetAllSavedStories().then((data) =>
    //   dispatch(updateSavedStories(data))
    // );
  }
);

const initialState = {
  page: 'HOME',
  savedStories: [],
  chosenStory: null,
  username: null,
  userId: null,
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
      state.username = action.payload.username;
      state.userId = action.payload.userId;
    },
    userLogOut: (state, action) => {
      state.username = null;
      state.userId = null;
    },
  },
});

export const {
  goToPage,
  updateSavedStories,
  chooseStory,
  userLogIn,
  userLogOut,
} = pageSlice.actions;

export default pageSlice.reducer;
