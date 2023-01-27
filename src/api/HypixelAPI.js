const axios = require('axios').default;
const { apiKey } = require('../data/Config');

const key = apiKey.getKey();

/**
 * @param {*} uuid
 * @returns Hypixel Player Data
 * @author lxgg#8588
 */
async function getPlayer(uuid) {
  try {
    const res = await axios.get(
      `https://api.hypixel.net/player?key=${key}&uuid=${uuid}`
    );
    return res.data;
  } catch (error) {
    return {
      success: false,
      errorMessage: `Malformed UUID`,
    };
  }
}

module.exports = { getPlayer };
