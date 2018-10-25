'use strict';
const config = require('config');
const debug = require('debug');

const logger = (id) => debug(config.get('name') + ":" + id);
/**
 * Fonctions de log
 * Trace les informations dans la console
 * Utilisable par le client et le serveur
 * @type {{logger: (function(*): *), debug: (function(*): *), info: (function(*): *), warn: (function(*): *), error: (function(*): *)}}
 */
module.exports = {
  logger,
  debug: (id) => logger('debug:' + id),
  info: (id) => logger('info:' + id),
  warn: (id) => logger('warn:' + id),
  error: (id) => logger('error:' + id),
};
