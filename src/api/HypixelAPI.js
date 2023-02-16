// eslint-disable-next-line
const HypixelAPIReborn = require('hypixel-api-reborn');
const { APIKey } = require('../data/config.js');
var KEY = APIKey.getKey();

const hypixel = new HypixelAPIReborn.Client(KEY, {
  cache: true,
});

module.exports = hypixel;

console.log(hypixel.getKeyInfo());.
