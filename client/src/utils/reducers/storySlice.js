import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  generatePrompt,
  generateImagePrompt,
  summarizeStoryPrompt,
} from '../prompts';
import { requestAiImageUrl, requestAiText } from '../fetchRequests';

export const generateAiPlot = createAsyncThunk(
  'story/generateAiPlot',
  async (arg, { getState, dispatch }) => {
    console.log('generating a new ai plot...');
    const state = getState();
    const body = { prompt: state.story.prompt };
    const aiPlot = await requestAiText(body);
    dispatch(updateAiPlot(aiPlot));
  }
);

export const generateAiImage = createAsyncThunk(
  'story/generateAiImage',
  async (arg, { getState, dispatch }) => {
    const state = getState();
    const { pastPlots, genreKey } = state.story;
    const summarizedStory = await requestAiText({
      prompt: summarizeStoryPrompt(pastPlots, genreKey),
    });
    const imagePrompt = generateImagePrompt(summarizedStory, genreKey);
    const aiImageUrl = await requestAiImageUrl({ prompt: imagePrompt });
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
    reset: (state) => initialState,
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
        state.pastPlots += (state.pastPlots === '' ? '' : '\n ') + newAddedPlot;
        console.log(state.pastPlots);
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
      state.pastPlots += (state.pastPlots === '' ? '' : '\n ') + newAddedPlot;
    },
  },
});

export const {
  reset,
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
