const Store = require('electron-store');
const { data } = require('jquery');
const LoggerManager = require('../helper/Logger');
const store = new Store({
  schema: {
    key: {
      default: '',
    },
    client: {
      type: 'string',
      default: 'DEFAULT',
    },
    mode: {
      type: 'string',
      default: 'OVERALL',
    },
  },
});
window.$ = window.jQuery = require('jquery');

const logger = new LoggerManager('CONFIG');

/**
 * @author lxgg#8588
 */
const apiKey = {
  /**
   * @returns true if config contains api key
   */
  isKey: function () {
    try {
      const key = store.get('key');
      if (key) return true;
      else return false;
    } catch (error) {}
  },

  /**
   * @param {*} apiKey HypixelAPI key
   */
  setKey: function (apiKey) {
    try {
      store.set('key', apiKey);
      logger.log(`APIKey succesfully set: ${apiKey}`);
    } catch (error) {
      logger.log(`Couldn't set APIKey`);
    }
  },

  /**
   * @returns HypixelAPI Key
   */
  getKey: function () {
    try {
      const key = store.get('key');
      return key;
    } catch (error) {}
  },
};

const CLIENTS = {
  lunar: 'LUNAR',
  badlion: 'BADLION',
  default: 'DEFAULT',
};

const client = {
  /**
   * @returns true if config contains clinet key
   */
  isClient: function () {
    try {
      const client = store.get('client');
      if (client) return true;
      else return false;
    } catch (error) {}
  },

  /**
   * @returns Minecraft Client [lunar, badlion, etc..]
   */
  getClient: function () {
    try {
      const client = store.get('client');
      return client;
    } catch (error) {}
  },

  /**
   * @param {CLIENTS} client Minecraft Client
   */
  setClient: function (client) {
    try {
      if (client == null) return;
      store.set('client', client);
    } catch (error) {}
  },
};

const MODES = {
  overall: 'overall',
  squad: 'four_four',
  trio: 'four_three',
  doubels: 'eight_two',
  solo: 'eight_one',
  four_vs_vour: 'two_four',
};

const mode = {
  /**
   * @returns Bedwars Mode [overall, four_four, etc..]
   */
  getMode: function () {
    try {
      const mode = store.get('mode');
      return mode;
    } catch (error) {}
  },

  /**
   * @param {MODES} mode Bedwars mode
   */
  setMode: function (mode) {
    try {
      if (mode == null) return;
      store.set('mode', mode);
    } catch (error) {}
  },
};

module.exports = { apiKey, client, CLIENTS, mode, MODES };
