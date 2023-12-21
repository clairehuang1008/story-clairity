const Story = require('../models/storyModel');
const saveImageToLocal = require('../helpers/saveImageToLocal');

const storyController = {};

// Middleware for getting stories
storyController.getStories = (req, res, next) => {
  Story.find({})
    .then((stories) => (res.locals.stories = stories))
    .then(() => next())
    .catch((err) =>
      next({
        log: 'Express error handler caught storyController.getStories middleware error',
        message: {
          err: 'An error occurred when getting all the saved stories',
        },
      })
    );
};

storyController.saveStory = async (req, res, next) => {
  const { title, plotCards, genre, onlineImageUrl, userId } = req.body;
  console.log('body is', req.body);
  const imageUrl = await saveImageToLocal(onlineImageUrl, genre);
  console.log('imageUrl is', imageUrl);
  Story.create({ title, genre, plotCards, imageUrl, userId })
    .then((data) => (res.locals.newStory = data))
    .then(() => next())
    .catch((err) =>
      next({
        log: 'Express error handler caught storyController.saveStory middleware error',
        message: { err: 'An error occurred when saving a story' },
      })
    );
};

storyController.deleteStory = (req, res, next) => {
  const id = req.params.id;
  Story.findByIdAndDelete(id)
    .then((data) => {
      res.locals.deleted = data;
    })
    .then(() => next())
    .catch((err) =>
      next({
        log: 'Express error handler caught storyController.deleteStory middleware error',
        message: { err: 'An error occurred when deleting a story' },
      })
    );
};

storyController.getStory = (req, res, next) => {
  const id = req.params.id;
  Story.findById(id)
    .then((data) => (res.locals.story = data))
    .then(() => next())
    .catch((err) =>
      next({
        log: 'Express error handler caught storyController.getStory middleware error',
        message: { err: 'An error occurred when getting a story detail' },
      })
    );
};

storyController.updatePlot = (req, res, next) => {
  const storyId = req.params.id;
  const { plotCardId, updatedPlot } = req.body;
  Story.findOneAndUpdate(
    { _id: storyId, 'plotCards._id': plotCardId },
    { $set: { 'plotCards.$.plot': updatedPlot } },
    { new: true }
  )
    .then((data) => (res.locals.updatedPlot = data))
    .then(() => next())
    .catch((err) =>
      next({
        log: 'Express error handler caught storyController.updatePlot middleware error',
        message: { err: 'An error occurred when updating a plot card' },
      })
    );
};

module.exports = storyController;
