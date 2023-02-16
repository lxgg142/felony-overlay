const loggerManager = require('../helper/logger.js');
const store = require('electron-store');
const workingStore = new store({
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

const hypixelAPIKey = {
  /**
   * @returns true if config contains api key
   */
  isKey: function () {
    try {
      const key = workingStore.get('key');
      if (key) return true;
      else return false;
    } catch (error) {
      console.log(error)
    }
  },

  /**
   * @param {*} apiKey HypixelAPI key
   */
  setKey: function (apiKey) {
    try {
      workingStore.set('key', apiKey);
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
      const key = workingStore.get('key');
      return key;
    } catch (error) {
      console.log(error)
    }
  },
};

const clients = {
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
      const client = workingStore.get('client');
      if (client) return true;
      else return false;
    } catch (error) {
      console.log(error)
    }
  },

  /**
   * @returns Minecraft Client [lunar, badlion, etc..]
   */
  getClient: function () {
    try {
      const client = workingStore.get('client');
      return client;
    } catch (error) {
      console.log(error)
    }
  },

  /**
   * @param {CLIENTS} client Minecraft Client
   */
  setClient: function (client) {
    try {
      if (client == null) return;
      workingStore.set('client', client);
    } catch (error) {
      console.log(error)
    }
  },
};

const modes = {
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
      const mode = workingStore.get('mode');
      return mode;
    } catch (error) {
      console.log(error)
    }
  },

  /**
   * @param {MODES} mode Bedwars mode
   */
  setMode: function (mode) {
    try {
      if (mode == null) return;
      workingStore.set('mode', mode);
    } catch (error) {
      console.log(error)
    }
  },
};

module.exports = { hypixelAPIKey, client, clients, mode,  modes };
