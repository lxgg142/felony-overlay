const { getPlayer } = require('../api/hypixelAPI.js');
const { mode, MODES } = require('../data/config.js');
const { mojang } = require('../api/mojangAPI.js');

const _mode = () => {
  if (mode.getMode() == MODES.overall) {
    return '';
  } else { return `${mode.getMode()}_`; }
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
    const _player = mojang.getUUID(player);
    if ((await _player).success) {
      const stats = await getPlayer((await _player).uuid);
      if (stats.success) {
        var _beds_broken =
          stats.player?.stats?.Bedwars[`${_mode()}beds_broken_bedwars`] || 0;
        var _beds_lost =
          stats.player?.stats?.Bedwars[`${_mode()}beds_lost_bedwars`] || 1;
        var _ws = stats.player?.stats?.Bedwars[`${_mode()}winstreak`] || '?';
        var _name = stats.player.displayname;
        var _star = stats.player?.achievements?.bedwars_level || 0;
        var _final_kills =
          stats.player?.stats?.Bedwars[`${_mode()}final_kills_bedwars`] || 0;
        var _final_deaths =
          stats.player?.stats?.Bedwars[`${_mode()}final_deaths_bedwars`] || 1;
        var _wins = stats.player?.stats?.Bedwars[`${_mode()}wins_bedwars`] || 0;
        var _losses =
          stats.player?.stats?.Bedwars[`${_mode()}losses_bedwars`] || 1;

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
          blr: (_beds_broken / _beds_lost).toFixed(2) || 0,
          winstreak: _ws,
          final_kills: _final_kills,
          final_deaths: _final_deaths,
          fkdr: (_final_kills / _final_deaths).toFixed(2) || 0,
          wins: _wins,
          wlr: (_wins / _losses).toFixed(2) || 0,
        };
      } else { return { success: false }; }
    } else {
      return {
        success: false,
        error: (await _player).errorMessage,
      };
    }
  },
};

module.exports = { bedwars };
