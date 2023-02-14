// eslint-disable-next-line
const HypixelAPIReborn = require('hypixel-api-reborn');
const { apiKey } = require('../data/config');
var key = apiKey.getKey();

const hypixel = new HypixelAPIReborn.Client(key, {
  cache: true,
});

module.exports = hypixel;
