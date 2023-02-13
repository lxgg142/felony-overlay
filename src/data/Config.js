const loggerManager = require('../helper/logger.js');
const electronStore = require('electron-store');
const store = new electronStore({
  schema: {
    key: {
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
  },
});

const logger = new loggerManager('CONFIG');

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
    } catch (error) {
      logger.error(error)
    }
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
    } catch (error) {
      logger.error(error)
    }
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
    } catch (error) {
      logger.error(error)
    }
  },

  /**
   * @returns Minecraft Client [lunar, badlion, etc..]
   */
  getClient: function () {
    try {
      const client = store.get('client');
      return client;
    } catch (error) {
      logger.error(error)
    }
  },

  /**
   * @param {CLIENTS} client Minecraft Client
   */
  setClient: function (client) {
    try {
      if (client == null) return;
      store.set('client', client);
    } catch (error) {
      logger.error(error)
    }
  },
};

const MODES = {
  overall: 'overall',
  squad: 'four_four',
  trio: 'four_three',
  doubels: 'eight_two',
  solo: 'eight_one',
  four_vs_four: 'two_four',
};

const mode = {
  /**
   * @returns Bedwars Mode [overall, four_four, etc..]
   */
  getMode: function () {
    try {
      const mode = store.get('mode');
      return mode;
    } catch (error) {
      logger.error(error)
    }
  },

  /**
   * @param {MODES} mode Bedwars mode
   */
  setMode: function (mode) {
    try {
      if (mode == null) return;
      store.set('mode', mode);
    } catch (error) {
      logger.error(error)
    }
  },
};

module.exports = { apiKey, client, CLIENTS, mode, MODES };
