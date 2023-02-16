const hypixel = require('../api/hypixelAPI.js');
const { mode } = require('../data/config.js');
const hypixelAPIReborn = require('hypixel-api-reborn');
const apiErrors = hypixelAPIReborn.Errors;

const errors = {
  PLAYER_DOES_NOT_EXIST: 'Player does not exist',
  PLAYER_NOT_PLAYED_BEDWARS: 'Player has not played Bedwars',
  PLAYER_HAS_NEVER_LOGGED: 'Player has never logged into Hypixel',
};

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
    const playerStats = await hypixel.getPlayer(player).catch((err) => {
      console.log(err);
      if (err.message === apiErrors.PLAYER_DOES_NOT_EXIST)
        {return { success: false, error: errors.PLAYER_DOES_NOT_EXIST };}
      else if (err.message === apiErrors.PLAYER_HAS_NEVER_LOGGED)
        {return { success: false, error: errors.PLAYER_HAS_NEVER_LOGGED };}
    });
    var nickname = playerStats?.nickname;
    var plusColor = playerStats?.plusColor;
    var rank = playerStats?.rank;
    var star = playerStats?.achievements?.bedwarsLevel;
    var gamemode = mode.getMode();

    //console.log(playerStats);

    if (playerStats.stats?.bedwars != null) {
      var bedLossRatio;
      var winLossRatio;
      var finalKills;
      var finalKDRatio;
      var winstreak;
      var wins;

      if (gamemode != 'overall') {
        bedLossRatio = playerStats.stats.bedwars[gamemode].beds.BLRatio;
        winLossRatio = playerStats.stats.bedwars[gamemode].WLRatio;
        finalKills = playerStats.stats.bedwars[gamemode].finalKills;
        finalKDRatio = playerStats.stats.bedwars[gamemode].finalKDRatio;
        winstreak = playerStats.stats.bedwars[gamemode].winstreak || '?';
        wins = playerStats.stats.bedwars[gamemode].wins;
      } else {
        bedLossRatio = playerStats.stats.bedwars.beds.BLRatio;
        winLossRatio = playerStats.stats.bedwars.WLRatio;
        finalKills = playerStats.stats.bedwars.finalKills;
        finalKDRatio = playerStats.stats.bedwars.finalKDRatio;
        winstreak = playerStats.stats.bedwars.winstreak || '?';
        wins = playerStats.stats.bedwars.wins;
      }

      return {
        success: true,
        player: {
          rank: rank,
          displayname: nickname,
          plusColor: plusColor?.toCode() || ' ',
        },
        star: star,
        BLRatio: bedLossRatio,
        WLRatio: winLossRatio,
        finalKills: finalKills,
        finalKDRatio: finalKDRatio,
        wins: wins,
        winstreak: winstreak || 0,
      };
    } else {
      if (playerStats.error != undefined) {
        return playerStats;
      } else {
        return {
          success: false,
          error: errors.PLAYER_NOT_PLAYED_BEDWARS,
          player: {
            rank: rank,
            displayname: nickname,
            plusColor: plusColor?.toCode() || ' ',
          },
        };
      }
    }
  },
};

module.exports = { bedwars, errors };
