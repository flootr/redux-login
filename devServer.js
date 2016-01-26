'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const config = require('./webpack.config.dev');
const debug = require('debug')('redux-login:devServer');

const app = express();
const compiler = webpack(config);

app.use(bodyParser.json());

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));

// fake login route
app.post('/login', (req, res) => {
  if (req.body.username === 'foo' && req.body.password === 'bar') {
    return res.json({
      status: 'success',
      user: {
        auth_token: 'SUPERSECRETAUTHTOKENPROPAPLYJWT',
        username: req.body.username,
      },
    });
  }

  return res.json({ status: 'failed', message: 'YOU SHALL NOT PASS!' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, 'localhost', (err) => {
  if (err) {
    debug(err);
    return;
  }

  debug('Listening at http://localhost:3000');
});
