const apiKey = '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';
const imageEndpoint = 'https://api.openai.com/v1/images/generations';
const textEndpoint = 'https://api.openai.com/v1/chat/completions';

export function apiCall(prompt, type) {
  const config =
    type === 'text'
      ? {
          messages: [{ role: 'system', content: prompt }],
          model: 'gpt-3.5-turbo',
        }
      : {
          model: 'dall-e-3',
          prompt: prompt,
          n: 1,
          size: '1024x1024',
        };
  const url = type === 'text' ? textEndpoint : imageEndpoint;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`, // Replace with your actual API key
    },
    body: JSON.stringify(config),
    mode: 'cors',
  };

  return fetch(`${url}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (type === 'text') {
        if (data.choices && data.choices.length > 0) {
          return data.choices[0].message.content; // Extracting the content for text
        }
      } else if (type === 'image') {
        if (data && data.data && data.data.length > 0) {
          return data.data[0].url; // Extracting the image URL
        }
      }
      throw new Error('No content received from OpenAI');
    })
    .catch((error) => {
      console.error('Error in generateNextPlot:', error);
      throw error; // Re-throw the error for handling in the calling function
    });
}
