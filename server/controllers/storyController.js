const fs = require('fs/promises');
const fsCallback = require('fs');
const path = require('path');
const Story = require('../models/storyModel');
const saveImageToLocal = require('../helpers');

const storyController = {};

// Middleware for getting stories
storyController.getStories = (req, res, next) => {
  Story.find({}).then((stories) => {
    console.log(stories);
    res.locals.stories = stories;
    return next();
  });
};

storyController.saveStory = async (req, res, next) => {
  const { title, plot, genre, onlineImageUrl } = req.body;
  const imageUrl = await saveImageToLocal(onlineImageUrl, genre);
  console.log('imageUrl is', imageUrl);
  Story.create({ title, genre, plot, imageUrl })
    .then((data) => console.log(data))
    .then(() => next());
};

module.exports = storyController;
