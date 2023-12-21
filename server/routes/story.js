const express = require('express');
const router = express.Router();

const storyController = require('../controllers/storyController');
const userController = require('../controllers/userController');

router.delete('/delete/:id', storyController.deleteStory, (req, res) => {
  console.log('DELETE /story/delete/:id route hit');
  res.status(200).json({ 'story deleted': res.locals.deleted });
});

router.get('/get/:id', storyController.getStory, (req, res) => {
  console.log('GET /story/get/:id route hit');
  res.status(200).json(res.locals.story);
});

router.put('/update/:id', storyController.updatePlot, (req, res) => {
  console.log('PUT /story/update/:id route hit');
  res.status(200).json(res.locals.updatedPlot);
});

router.get('/all', storyController.getStories, (req, res) => {
  console.log('GET story/all route hit');
  res.status(200).json(res.locals.stories);
});

router.post(
  '/save',
  storyController.saveStory,
  userController.incrementStoryCount,
  (req, res) => {
    console.log('POST story/save route hit');
    res.status(200).json({ newStory: res.locals.newStory });
  }
);

module.exports = router;
