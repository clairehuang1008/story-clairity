const apiCall = require('../helpers/apiCalls');

const apiCallController = {};

apiCallController.getText = async (req, res, next) => {
  try {
    const { prompt } = req.body;
    res.locals.aiText = await apiCall(prompt, 'text');
    return next();
  } catch (error) {
    return next({
      log: 'Express error handler caught apiCallController.getText middleware error',
      message: { err: 'An error occurred when fetching a text from openAi' },
    });
  }
};

apiCallController.getImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;
    res.locals.aiImageUrl = await apiCall(prompt, 'image');
    return next();
  } catch (error) {
    return next({
      log: 'Express error handler caught apiCallController.getImage middleware error',
      message: { err: 'An error occurred when fetching an image from openAi' },
    });
  }
};

module.exports = apiCallController;
