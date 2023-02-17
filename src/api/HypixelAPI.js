// eslint-disable-next-line
const HypixelAPIReborn = require('hypixel-api-reborn');
const { hypixelAPI } = require('../data/config');
var KEY = hypixelAPI.getKey();

const hypixel = new HypixelAPIReborn.Client(KEY, {
  cache: true,
});

module.exports = hypixel;

console.log(hypixel.getKeyInfo());
