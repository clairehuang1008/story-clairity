import { createSlice } from '@reduxjs/toolkit';
import {
  generatePrompt,
  generateImagePrompt,
  summarizeStoryPrompt,
} from '../prompts';
import { apiCall } from '../apiCalls';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const generateAiPlot = createAsyncThunk(
  'story/generateAiPlot',
  async (arg, { getState, dispatch }) => {
    const state = getState();
    const aiPlot = await apiCall(state.story.prompt, 'text');
    dispatch(updateAiPlot(aiPlot)); // Dispatch an action to update state
  }
);

export const generateAiImage = createAsyncThunk(
  'story/generateAiImage',
  async (arg, { getState, dispatch }) => {
    const state = getState();
    const { pastPlots, genreKey } = state.story;
    console.log('past plots are: ', pastPlots);
    const summarizedStory = await apiCall(
      summarizeStoryPrompt(pastPlots, genreKey),
      'text'
    );
    console.log('summarized story is: ', summarizedStory);
    const imagePrompt = generateImagePrompt(summarizedStory, genreKey);
    console.log('prompt to generate image is: ', imagePrompt);
    const aiImageUrl = await apiCall(imagePrompt, 'image');
    dispatch(fetchAiImage(aiImageUrl));
  }
);

const initialState = {
  genreKey: '',
  plotCards: [],
  pastPlots: '',
  prompt: '',
  imageUrl: '',
};

export const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {
    setGenre: (state, action) => {
      const genreKey = action.payload;
      state.genreKey = genreKey;
      state.prompt = generatePrompt(genreKey, 'beginning', '');
    },
    addPlotCard: (state, action) => {
      const plotType = action.payload;
      const newCard = {
        type: plotType,
        userPlot: '',
        aiPlot: '',
        chosen: '', // 'ai' or 'user'
      };
      const plotCards = state.plotCards;
      if (plotCards.length > 0) {
        const lastCard = plotCards[plotCards.length - 1];
        const newAddedPlot =
          lastCard.chosen === 'ai' ? lastCard.aiPlot : lastCard.userPlot;
        state.pastPlots += newAddedPlot;
      }
      state.prompt = generatePrompt(state.genreKey, plotType, state.pastPlots);
      state.plotCards = [...plotCards, newCard];
    },
    updateAiPlot: (state, action) => {
      const aiPlot = action.payload;
      if (state.plotCards.length > 0) {
        state.plotCards[state.plotCards.length - 1].aiPlot = aiPlot;
      }
    },
    fetchAiImage: (state, action) => {
      state.imageUrl = action.payload;
      console.log('updated imageUrl to', state.imageUrl);
    },
    chooseCardType: (state, action) => {
      const userChosenType = action.payload;
      state.plotCards[state.plotCards.length - 1].type = userChosenType;
    },
    updateUserPlot: (state, action) => {
      state.plotCards[state.plotCards.length - 1].userPlot = action.payload;
    },
    chooseNewPlot: (state, action) => {
      state.plotCards[state.plotCards.length - 1].chosen = action.payload;
    },
    saveStory: (state) => {
      const plotCards = state.plotCards;
      const lastCard = plotCards[plotCards.length - 1];
      const newAddedPlot =
        lastCard.chosen === 'ai' ? lastCard.aiPlot : lastCard.userPlot;
      state.pastPlots += newAddedPlot;
    },
  },
});

export const {
  setGenre,
  addPlotCard,
  chooseCardType,
  updateUserPlot,
  chooseNewPlot,
  updateAiPlot,
  saveStory,
  fetchAiImage,
} = storySlice.actions;

export default storySlice.reducer;
