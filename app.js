'use strict';

const express = require('express');
const config = require('config');
const path = require('path');
const createError = require('http-errors');
const logger = require('./common/helpers/logger');
const routeLogger = require('morgan');

const name = config.get('name');
const debugLog = logger.debug(`app`);

debugLog(`Service is initializing`);

const server = express();

/**
 * Normalisation du port en nombre, string, ou false.
 */

const normalizePort = value => {
  const port = parseInt(value, 10);
  if (isNaN(port)) {
    // named pipe
    return value;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};


const init = (server) => {
  // set the view engine to ejs
  server.set('view engine', 'ejs');

  // Paramèttres et configuration
  server.set('host', config.get('host'));
  server.set('port', normalizePort(config.get('port')));
  server.set('basePath',  path.join('/', config.get('basePath')));

  if (process.env.NODE_ENV !== 'test') server.use(routeLogger('combined'));
  server.use(express.json());

  // API
  const apiRouter = require('./routes/api');
  server.use('/api/1/', apiRouter);

  // Client
  server.use('/ui/', express.static(path.join(__dirname, 'ui')));
  // si on demande une page qui n'existe pas on retourne sur l'accueil
  server.use('/ui/*', (err, req, res, next) => {
    res.redirect('/ui/');
  });
  // si on ne précise pas on est redirigé sur l'accueil de l'ihm
  server.use('/', (req, res, next) => {
    res.redirect('/ui/');
  });

  // Erreurs
  server.use(() => {
    throw new createError.NotFound();
  });

  server.use(require('./routes/errorHandler'));
};

init(server);

debugLog(`Service ${name} initialized`);

module.exports = server;
