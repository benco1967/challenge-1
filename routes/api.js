const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const axios = require('axios');
const config = require('config');
const logger = require('../common/helpers/logger');
const infoLog = logger.info('api');
const errorLog = logger.error('api');

const FOURSQUARE_CFG = config.get('foursquare');

const catchFSErr = (err, next) => {
  errorLog(err);
  if (err.response && err.response.status === 400) {
    next(new createError.NotFound(err.response.data.meta.errorDetail));
  }
  else {
    next(new createError.BadRequest());
  }
};

/**
 * GET aroundme
 * retourne les poi tour de la position transmise
 */
router.get('/aroundme', function(req, res, next) {
  const url = `https://api.foursquare.com/v2/venues/search`;
  axios
    .get(url, {
      params: {
        ...FOURSQUARE_CFG,
        ll: req.query.pos || "48.1364079,-1.62038", // Position par défaut centré sur leocare
      }
    })
    .then(result => {
      res.json(result.data.response.venues.map(poi => { const {id, name} = poi; return {id, name}; }));
    })
    .catch(err => catchFSErr(err, next));
});
/**
 * GET poi/:id
 * retourne les détails du poi dont on fourni l'id
 */
router.get('/poi/:id', function(req, res, next) {
  infoLog(`requested id ${req.params.id}`);
  const url = `https://api.foursquare.com/v2/venues/${req.params.id}`;

  return axios
    .get(url, {
      params: {
        ...FOURSQUARE_CFG,
      }
    })
    .then(result => {
      // ne récupère que l'id, le nom et les likes
      const { id, name, likes } = result.data.response.venue;
      // n'envoie que l'id, le nom et le nombre de likes
      res.json({ id, name, likes: likes.count });
    })
    .catch(err => catchFSErr(err, next));
});

module.exports = router;
