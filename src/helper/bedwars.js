const hypixel = require('../api/hypixelAPI');
const { mode } = require('../data/config');
const HypixelAPIReborn = require('hypixel-api-reborn');
const APIError = HypixelAPIReborn.Errors;

const Errors = {
  PLAYER_DOES_NOT_EXIST: 'Player does not exist',
  PLAYER_HAS_NOT_PLAYED_BEDWARS: 'Player has not played Bedwars',
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
      if (err.message === APIError.PLAYER_DOES_NOT_EXIST) {
        return { success: false, error: Errors.PLAYER_DOES_NOT_EXIST };
      }
    });
    var star = playerStats?.achievements?.bedwarsLevel;
    var nickname = playerStats?.nickname;
    var plusColor = playerStats?.plusColor;
    var rank = playerStats?.rank;
    var gamemode = mode.getMode();

    if (playerStats?.stats?.bedwars != undefined) {
      if (gamemode != 'overall') {
        var BLRatio = playerStats?.stats?.bedwars[gamemode]?.beds.BLRatio;
        var WLRatio = playerStats?.stats?.bedwars[gamemode]?.WLRatio;
        var finalKills = playerStats?.stats?.bedwars[gamemode]?.finalKills;
        var finalKDRatio = playerStats?.stats?.bedwars[gamemode]?.finalKDRatio;
        var winstreak = playerStats?.stats?.bedwars[gamemode]?.winstreak || '?';
        var wins = playerStats?.stats?.bedwars[gamemode]?.wins;
      } else {
        var BLRatio = playerStats?.stats?.bedwars?.beds.BLRatio;
        var WLRatio = playerStats?.stats?.bedwars?.WLRatio;
        var finalKills = playerStats?.stats?.bedwars?.finalKills;
        var finalKDRatio = playerStats?.stats?.bedwars?.finalKDRatio;
        var winstreak = playerStats?.stats?.bedwars?.winstreak || '?';
        var wins = playerStats?.stats?.bedwars?.wins;
      }

      return {
        success: true,
        player: {
          rank: rank,
          displayname: nickname,
          plusColor: plusColor?.toCode() || ' ',
        },
        star: star,
        BLRatio: BLRatio,
        WLRatio: WLRatio,
        finalKills: finalKills,
        finalKDRatio: finalKDRatio,
        wins: wins,
        winstreak: winstreak,
      };
    } else {
      if (playerStats != undefined) {
        return playerStats;
      } else
        return {
          success: false,
          error: Errors.PLAYER_HAS_NOT_PLAYED_BEDWARS,
        };
    }
  },
};

module.exports = { bedwars, Errors };
