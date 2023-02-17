// eslint-disable-next-line
const HypixelAPIReborn = require('hypixel-api-reborn');
const { hypixelAPI } = require('../data/config.js');
var hypixelAPIKey = hypixelAPI.getKey();

const hypixel = new HypixelAPIReborn.Client(hypixelAPIKey, {
  cache: true,
});

module.exports = hypixel;

console.log(hypixel.getKeyInfo());
