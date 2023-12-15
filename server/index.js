const express = require('express');
const path = require('path');
const storyController = require('./controllers/storyController');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const mongoURI = 'mongodb://localhost/story-clairity';
mongoose.connect(mongoURI);

app.use(cors());

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, '../client/build')));

app.use(express.json());
app.use(express.urlencoded());

app.get('/home', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get('/stories', storyController.getStories, (req, res) => {
  res.status(200).json(res.locals.stories);
});

app.post('/save-story', storyController.saveStory, (req, res) => {
  console.log('POST /save-story route hit');
  res.status(200).json({ message: 'hello' });
});

// The "catchall" handler should be last
app.get('*', storyController.getStories, (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
