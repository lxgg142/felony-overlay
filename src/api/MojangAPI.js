const axios = require('axios');

/**
 * @author lxgg#8588
 */
const mojang = {
  /**
   * @param {*} username
   * @returns minecraft uuid
   */
  getUUID: async function (username) {
    try {
      const res = await axios.get(
        `https://api.mojang.com/users/profiles/minecraft/${username}`
      );
      if (res.data.id != undefined) {
        return {
          success: true,
          uuid: res.data.id,
        };
      } else {
        return {
          success: false,
          error: 'BadRequestException',
          errorMessage: `${username} is undefined`,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'BadRequestException',
        errorMessage: `${username} is invalid`,
      };
    }
  },

  /**
   * @param {*} uuid
   * @returns minecraft username
   */
  getUsername: async function (uuid) {
    try {
      const res = await axios.get(
        `https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`
      );
      if (res.data.id != undefined) {
        return {
          success: true,
          username: res.data.name,
        };
      } else {
        return {
          success: false,
          error: 'BadRequestException',
          errorMessage: `Not a valid UUID: ${uuid}`,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'BadRequestException',
        errorMessage: `${uuid} is invalid`,
      };
    }
  },
};

module.exports = { mojang };
