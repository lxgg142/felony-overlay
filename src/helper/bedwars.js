const hypixel = require('../api/hypixelAPI');
const { mode } = require('../data/config');

/**
 * @author lxgg#8588
 * - Variables _beds_broken, _beds_lost, etc... are set from the player stats
 * - Object with all variables is returned
 */
const bedwars = {
  /**
   * @param {String} player ingame name
   */
  get: async function (player) {
    const playerStats = await hypixel.getPlayer(player);
    var star = playerStats.achievements.bedwarsLevel;
    var nickname = playerStats.nickname;
    var plusColor = playerStats.plusColor;
    var rank = playerStats.rank;
    var gamemode = mode.getMode();

    if (playerStats.stats.bedwars != undefined) {
      if (gamemode != 'overall') {
        var wins = playerStats.stats.bedwars[gamemode].wins;
        var losses = playerStats.stats.bedwars[gamemode].losses;
        var finalKills = playerStats.stats.bedwars[gamemode].finalKills;
        var finalDeaths = playerStats.stats.bedwars[gamemode].finalDeaths;
        var bedsBroken = playerStats.stats.bedwars[gamemode].beds.broken;
        var bedsLost = playerStats.stats.bedwars[gamemode].beds.lost;
        var winstreak = playerStats.stats.bedwars[gamemode].winstreak || '?';
      } else {
        var wins = playerStats.stats.bedwars.wins;
        var losses = playerStats.stats.bedwars.losses;
        var finalKills = playerStats.stats.bedwars.finalKills;
        var finalDeaths = playerStats.stats.bedwars.finalDeaths;
        var bedsBroken = playerStats.stats.bedwars.beds.broken;
        var bedsLost = playerStats.stats.bedwars.beds.lost;
        var winstreak = playerStats.stats.bedwars.winstreak || '?';
      }

      return {
        success: true,
        player: {
          rank: rank,
          displayname: nickname,
          plus_color: plusColor?.toCode() || ' ',
        },
        star: star,
        bedwars_beds: bedsBroken,
        beds_lost_bedwars: bedsLost,
        blr: (bedsBroken / bedsLost).toFixed(2) || 0,
        winstreak: winstreak,
        final_kills: finalKills,
        final_deaths: finalDeaths,
        fkdr: (finalKills / finalDeaths).toFixed(2) || 0,
        wins: wins,
        wlr: (wins / losses).toFixed(2) || 0,
      };
    } else {
      return {
        success: false,
        error: `Player has not played Bedwars`,
      };
    }
  },
};

module.exports = { bedwars };
