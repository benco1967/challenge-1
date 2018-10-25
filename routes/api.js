const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('config');

const FOURSQUARE_CFG = config.get('foursquare');

  /**
 *  GET api
 */
  router.get('/aroundme', function(req, res, next) {
    const url = `https://api.foursquare.com/v2/venues/search`;
    return axios
      .get(url, {
        params: {
          ...FOURSQUARE_CFG,
          ll: "48.1364079,-1.62038",

        }
      })
      .then(result => {
        console.log(result);
        res.json(result.data.response.venues);
      });
  });
router.get('/aroundme', function(req, res, next) {
  const url = `https://api.foursquare.com/v2/venues/search`;
  return axios
    .get(url, {
      params: {
        ...FOURSQUARE_CFG,
        ll: "48.1364079,-1.62038",

      }
    })
    .then(result => {
      console.log(result);
      res.json(result.data.response.venues);
    });
});

module.exports = router;
