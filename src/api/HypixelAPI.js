const { apiKey } = require('../data/config.js');
const axios = require('axios').default;

const hypixel = new HypixelAPIReborn.Client(key, {
  cache: true,
});

module.exports = hypixel;
