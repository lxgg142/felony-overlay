// eslint-disable-next-line
const HypixelAPIReborn = require('hypixel-api-reborn');
const { hypixelAPIKey } = require('../data/config.js');
var apiKey = hypixelAPIKey.getKey();

const hypixel = new HypixelAPIReborn.Client(apiKey, {
  cache: true,
});

module.exports = hypixel;

console.log(hypixel.getKeyInfo());
