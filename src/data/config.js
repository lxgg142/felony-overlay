const Store = require('electron-store');
const LoggerManager = require('../helper/logger');
const store = new Store({
  schema: {
    hypixel: {
      default: '',
    },
    antisniper: {
      default: '',
    },
    client: {
      type: 'string',
      default: '',
    },
    mode: {
      type: 'string',
      default: 'overall',
    },
    guild: {
      type: 'boolean',
      default: false,
    },
    winstreakEstimate: {
      type: 'boolean',
      default: false,
    },
  },
});

const logger = new LoggerManager('CONFIG');

/**
 * @author lxgg#8588
 */

const hypixelAPI = {
  /**
   * @returns true if config contains api key
   */
  isKey: function () {
    try {
      const key = store.get('hypixel');
      if (key) return true;
      else return false;
    } catch (error) {}
  },

  /**
   * @param {*} apiKey HypixelAPI key
   */
  setKey: function (apiKey) {
    try {
      store.set('hypixel', apiKey);
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
      const key = store.get('hypixel');
      return key;
    } catch (error) {}
  },
};

const antisniperAPI = {
  /**
   * @returns true if config contains api key
   */
  isKey: function () {
    try {
      const key = store.get('antisniper');
      if (key) return true;
      else return false;
    } catch (error) {}
  },

  /**
   * @param {*} apiKey Antisniper key
   */
  setKey: function (apiKey) {
    try {
      store.set('antisniper', apiKey);
      logger.log(`APIKey succesfully set: ${apiKey}`);
    } catch (error) {
      logger.log(`Couldn't set APIKey`);
    }
  },

  /**
   * @returns Antisniper Key
   */
  getKey: function () {
    try {
      const key = store.get('antisniper');
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
  squad: 'fours',
  trio: 'threes',
  doubels: 'doubels',
  solo: 'solo',
  four_vs_four: '4v4',
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

const settings = {
  /**
   * @param {String} key
   */
  get: function (key) {
    const setting = store.get(key);
    if (!setting) return;
    else setting;
  },

  /**
   * @param {String} key
   * @param {*} state
   */
  set: function ({ key, state }) {
    try {
      if (key == null || state == null) return;
      store.set(key, state);
    } catch (error) {}
  },
};

module.exports = {
  antisniperAPI,
  hypixelAPI,
  client,
  CLIENTS,
  mode,
  MODES,
  settings,
  store,
};
