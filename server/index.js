require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const storyController = require('./controllers/storyController');

const mongoURI = 'mongodb://localhost/story-clairity';
const mongoose = require('mongoose');
mongoose.connect(mongoURI);

const app = express();

const storyRouter = require('./routes/story');
const openAiRouter = require('./routes/openAi');
const userRouter = require('./routes/user');

app.use(cors());

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use('/downloadedImages', express.static('downloadedImages'));

app.use(express.json());
app.use(express.urlencoded());

app.use('/story', storyRouter);
app.use('/openAi', openAiRouter);
app.use('/user', userRouter);

// The "catchall" handler should be last
app.get('*', storyController.getStories, (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
