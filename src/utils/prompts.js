import { genres } from './genres';

export function generatePrompt(genreKey, plotType, pastPlots) {
  const { name, situation, scenes, tone } = genres[genreKey];

  const wordsLenPrompt = 'limit to 30 words. ';
  const tonePrompt = `The tone should be ${tone}`;
  const generalPrompt =
    plotType === 'beginning'
      ? `Create a ${name} story beginning that introduces ${situation}. Set the scene for ${scenes}`
      : `Continue the ${name} story, which so far includes: '${pastPlots}'. Now, create a ${plotType} that follows the narrative and develops the plot. `;

  return generalPrompt + tonePrompt + wordsLenPrompt;
}

export function summarizeStoryPrompt(pastPlots, genreKey) {
  return (
    `Please provide a concise summary about 30 words or less for the ${genres[genreKey].name} story, ` +
    `retaining its original ${genres[genreKey].tone} and essential elements: \n\n` +
    pastPlots
  );
}

export function generateImagePrompt(summarizedStory, genreKey) {
  return (
    `Create a silent, caption-free image to visually narrate a ${genres[genreKey].name} story. ` +
    `The summary of the story is: ${summarizedStory}` +
    'The images should capture the key moments and elements of the story, conveying the narrative visually without any text or written elements. ' +
    '!IMPORTANT: `No Written Elements`! `Avoid any texts!` `Silent Images ONLY`!!!'
  );
}
