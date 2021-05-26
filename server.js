const express = require('express');
const path = require('path');
const compression = require('compression');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const config = require('./server/config/main');
const api = require('./server/routes');
require('dotenv').config();

mongoose.connect(config.database, { useNewUrlParser: true });

mongoose.connection.on('connected', function() {
  console.log('Mongoose default connection open to ' + config.database);
});

const app = express();

app.use(
  cors({
    origin: '*',
  }),
);

app.use(compression());
app.use(bodyParser({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '30mb' }));
app.use(bodyParser.json({ limit: '30mb' }));
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

app.set('port', config.port);

app.use('/api/v1', api);

app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
