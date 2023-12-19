const express = require('express');
const router = express.Router();

const apiCallController = require('../controllers/apiCallController');

router.post('/text', apiCallController.getText, (req, res) => {
  console.log('POST openAi/text route hit');
  res.status(200).json(res.locals.aiText);
});

router.post('/image', apiCallController.getImage, (req, res) => {
  console.log('POST openAi/image route hit');
  res.status(200).json(res.locals.aiImageUrl);
});

module.exports = router;
