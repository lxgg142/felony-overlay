const { getPlayer } = require('../api/HypixelAPI');
const { mojang } = require('../api/MojangAPI');
const { mode, MODES } = require('../data/Config');

const _mode = mode.getMode();

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
    const _player = mojang.getUUID(player);
    if ((await _player).success) {
      const stats = await getPlayer((await _player).uuid);
      if (stats.success) {
        var _beds_broken =
          stats.player?.stats?.Bedwars?.beds_broken_bedwars || 0;
        var _beds_lost = stats.player?.stats?.Bedwars?.beds_lost_bedwars || 0;
        var _ws = stats.player?.stats?.Bedwars?.winstreak || '?';
        var _name = stats.player.displayname;
        var _star = stats.player?.achievements?.bedwars_level || 0;
        var _final_kills =
          stats.player?.stats?.Bedwars?.final_kills_bedwars || 0;
        var _final_deaths =
          stats.player?.stats?.Bedwars?.final_deaths_bedwars || 0;
        var _wins = stats.player?.stats?.Bedwars?.wins_bedwars || 0;
        var _losses = stats.player?.stats?.Bedwars?.losses_bedwars || 0;

        var _rank = stats.player?.newPackageRank;
        var _rankPlusColor = stats.player?.rankPlusColor;
        var _monthlyPackageRank = stats.player?.monthlyPackageRank;

        return {
          success: true,
          player: {
            newPackageRank: _rank,
            displayname: _name,
            rankPlusColor: _rankPlusColor,
            monthlyPackageRank: _monthlyPackageRank,
          },
          star: _star,
          bedwars_beds: _beds_broken,
          beds_lost_bedwars: _beds_lost,
          blr: (_beds_broken / _beds_lost || 0).toFixed(2),
          winstreak: _ws,
          final_kills: _final_kills,
          final_deaths: _final_deaths,
          fkdr: (_final_kills / _final_deaths || 0).toFixed(2),
          wins: _wins,
          wlr: (_wins / _losses || 0).toFixed(2),
        };
      } else return { success: false };
    } else
      return {
        success: false,
        error: (await _player).errorMessage,
      };
  },
};

module.exports = { bedwars };
