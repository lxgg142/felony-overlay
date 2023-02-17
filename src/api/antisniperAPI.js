const config = require('../config.json');
const { antisniperAPI } = require('../data/config');

const key = antisniperAPI.getKey();

async function getWinstreak(player) {
  try {
    const data = fetch(
      `${config.api.antisniper}/winstreak?name=${player}&key=${key}`
    )
      .then((response) => response.json())
      .then((data) => {
        return {
          overall: data.player.data.overall_winstreak,
          fours: data.player.data.four_four_winstreak,
          threes: data.player.data.four_three_winstreak,
          doubels: data.player.data.eight_two_winstreak,
          solo: data.player.data.eight_one_winstreak,
          '4v4': data.player.data.two_four_winstreak,
        };
      });
    return data;
  } catch (err) {
    return err;
  }
}

module.exports = {
  getWinstreak,
};
