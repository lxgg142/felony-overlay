const remote = require('@electron/remote');
const fs = require('fs');
const { getWinstreak } = require('../../api/antisniperAPI');
const { hypixelAPI, CLIENTS, client } = require('../../data/config');
const { bedwars, Errors } = require('../../helper/bedwars');
const {
  nameColor,
  fkdrColor,
  bblrColor,
  wsColor,
  winsColor,
  finalsColor,
  starColor,
  wlrColor,
  tagsColor,
  guildColor,
} = require('../../helper/hypixelColors');
const LoggerManager = require('../../helper/logger');

const Tails = require('tail').Tail;
const { app } = remote;
const homedir = app.getPath('home').replaceAll('\\', '/');
window.$ = window.jQuery = require('jquery');

const logger = new LoggerManager('Overlay');

var logPath,
  players = [];

$(() => {
  if (!client.isClient()) {
    $('#client').css('display', 'block');
    $('#player').remove();
    logger.log(
      'Client was not specified, please selected client in the settings menu'
    );
  } else {
    $('#client').remove();
    return main();
  }
});

function main() {
  /**
   * This code checks to see if an API key is valid. If the API key is not valid, it
   * adds some HTML elements to an element with the id "ign", and then logs an error
   * message in the console.
   */
  if (!hypixelAPI.isKey()) {
    let KEY = `<li class="player-item "><span style="color: #ef4444">INVAILID/MISSING API KEY</span></li>
    <li class="player-item "><span style="color: #ef4444">DO /API NEW</span></li>`;
    $(document).ready(function () {
      $('#ign').append(KEY);
    });
    logger.log('API-Key was not specified do: /api new');
  }

  loadPATH();
  if (!fs.existsSync(logPath)) {
    return logger.log('logpath was not found!');
  }

  /**
   * The Tail object is configured to use the log file specified by logpath, to monitor
   * for only one line of log output at a time, and to check the log file for updates
   * every 100 milliseconds.
   */
  const tail = new Tails(logPath, {
    useWatchFile: true,
    nLines: 1,
    fsWatchOptions: { interval: 100 },
  });

  tail.on('line', (data) => {
    const chat = data.indexOf('[CHAT]');
    if (chat !== -1) {
      const msg = data
        .substring(chat + 7)
        .replace(/(??|???)([0-9]|a|b|e|d|f|k|l|m|n|o|r|c)/gm, '');

      if (msg.indexOf('ONLINE:') !== -1 && msg.indexOf(',') !== -1) {
        clear();
        let who = msg.substring(8).split(', ');
        /**
         * looping through an array of strings, "who", and checking them against an array
         * of players. If the players array does not contain the first name of each string
         * in the who array, then a check is done to see if the player's name is in the
         * string. If there is no name in the string, the player is added to the players array.
         */
        for (let i = 0; i < who.length; i++) {
          if (!players.includes(who[i].split(' ')[0])) {
            if (who[i].indexOf('[') !== -1)
              who[i] = who[i].substring(0, who[i].indexOf('[') - 1);
            let contains = false;
            for (let l = 0; l < players.length; l++) {
              if (players[l] === who[i]) contains = true;
            }
            if (!contains) addPlayer(who[i]); //adds Player to UI (HTML)
          }
        }
        for (let i = 0; i < players.length; i++) {
          if (!who.includes(players[i])) {
            players.splice(i, 1);
          }
        }
      } else if (msg.indexOf('has joined') !== -1 && msg.indexOf(':') === -1) {
        let join = msg.split(' ')[0];
        // if a player is already in the players array. If the player is not already in the array, it adds the player to the array.
        let contains = false;
        for (let i = 0; i < players.length; i++) {
          if (join === players[i]) {
            contains = true;
          }
        }
        if (!contains) addPlayer(join); //adds Player to UI (HTML)
      } else if (msg.indexOf('has quit') !== -1 && msg.indexOf(':') === -1) {
        let left = msg.split(' ')[0];
        //remove player from array
        for (let i = 0; i < players.length; i++) {
          if (left == players[i]) {
            players.splice(i, 1);
          }
        }
        removePlayer(left); //remove player from UI (HTML)
      } else if (msg.indexOf('new API key') !== -1 && msg.indexOf(':') === -1) {
        let key = msg.substring(msg.indexOf('is ') + 3);
        hypixelAPI.setKey(key); //save the api key
        clear(); //clear the ui (HTML)
      } else if (msg.indexOf('Sending you') !== -1 && msg.indexOf(':') === -1) {
        clear(); //clear the ui (HTML)
      }
    }
  });
}

function loadPATH() {
  if (String(client.getClient()).toUpperCase() === CLIENTS.lunar) {
    /**
     * Find the latest LunarClient log file. It creates three objects containing the
     * path and modification time of the three log files, checks if the files exist
     * and updates the modification times accordingly, sorts the three objects by the
     * modified variable and sets the logpath variable to the modified file.
     */
    let lunar18 = {
      path: `${homedir}/.lunarclient/offline/1.8/logs/latest.log`,
      modified: 0,
    };
    let lunar189 = {
      path: `${homedir}/.lunarclient/offline/1.8.9/logs/latest.log`,
      modified: 0,
    };
    let lunarMultiver = {
      path: `${homedir}/.lunarclient/offline/multiver/logs/latest.log`,
      modified: 0,
    };

    if (fs.existsSync(lunar18.path))
      lunar18.modified = fs.statSync(lunar18.path).mtime;
    if (fs.existsSync(lunar189.path))
      lunar189.modified = fs.statSync(lunar189.path).mtime;
    if (fs.existsSync(lunarMultiver.path))
      lunarMultiver.modified = fs.statSync(lunarMultiver.path).mtime;

    const lunarLogs = [lunar18, lunar189, lunarMultiver];

    lunarLogs.sort((a, b) => {
      return b.modified - a.modified;
    });

    return (logPath = lunarLogs[0].path);
  } else if (process.platform === 'darwin') {
    if (client.getClient() === CLIENTS.badlion) {
      return (logPath = `${homedir}/Library/Application Support/minecraft/logs/blclient/minecraft/latest.log`);
    } else if (client.getClient() === CLIENTS.default) {
      return (logPath = `${homedir}/Library/Application Support/minecraft/logs/latest.log`);
    }
  } else {
    if (client.getClient() === CLIENTS.badlion) {
      return (logPath = `${homedir}/AppData/Roaming/.minecraft/logs/blclient/minecraft/latest.log`);
    } else if (client.getClient() === CLIENTS.default) {
      return (logPath = `${homedir}/AppData/Roaming/.minecraft/logs/latest.log`);
    }
  }
}

async function addPlayer(player) {
  const playerStats = await bedwars.get(player);
  let playerInfo = {
    info: 'NICK',
    rank: undefined,
    displayname: player,
    plusColor: {
      color: '',
    },
  };
  var ign;
  var winstreak;
  var fkdr;
  var wlr;
  var finals;
  var wins;
  var blr;

  console.log(playerStats);

  if (playerStats.success == true) {
    ign = `<li class="player-item ${player}">
    ${starColor(playerStats.star)} 
    ${nameColor(playerStats.player)} 
    ${guildColor(playerStats.guild) || ''}</li>`;
    winstreak = `<li class="player-item ${player}">
    ${wsColor(playerStats.winstreak)}</li>`;
    fkdr = `<li class="player-item ${player}">
    ${fkdrColor(playerStats.finalKDRatio)}</li>`;
    wlr = `<li class="player-item ${player}">
    ${wlrColor(playerStats.WLRatio)}</li>`;
    finals = `<li class="player-item ${player}">
    ${finalsColor(playerStats.finalKills)}</li>`;
    wins = `<li class="player-item ${player}">
    ${winsColor(playerStats.wins)}</li>`;
    blr = `<li class="player-item ${player}">
    ${bblrColor(playerStats.BLRatio)}</li>`;
  } else {
    if (playerStats.error === Errors.PLAYER_NOT_PLAYED_BEDWARS) {
      playerInfo.info = 'NEW';
      playerInfo.rank = playerStats.player.rank;
      playerInfo.plusColor.color = playerStats.player.plusColor;
      playerInfo.displayname = playerStats.player.displayname;
    } else if (playerStats.error === Errors.PLAYER_HAS_NEVER_LOGGED)
      playerInfo.info = 'NICK';

    ign = `<li class="player-item ${player}">
    ${starColor(0)} ${nameColor(playerInfo)} ${tagsColor(playerInfo.info)}
    </li>`;
    winstreak = `<li class="player-item ${player}"><span style="color: #FF5555;">-</span></li>`;
    fkdr = `<li class="player-item ${player}"><span style="color: #FF5555;">-</span></li>`;
    wlr = `<li class="player-item ${player}"><span style="color: #FF5555;">-</span></li>`;
    finals = `<li class="player-item ${player}"><span style="color: #FF5555;">-</span></li>`;
    wins = `<li class="player-item ${player}">-</li>`;
    blr = `<li class="player-item ${player}">-</li>`;
  }

  $('#ign').append(ign);
  $('#ws').append(winstreak);
  $('#fkdr').append(fkdr);
  $('#wlr').append(wlr);
  $('#blr').append(blr);
  $('#finals').append(finals);
  $('#wins').append(wins);
}

function removePlayer(player) {
  return $(`.${player}`).remove();
}

function clear() {
  return $('.player-item').remove();
}

// testarea

const ign = ['obvBetter'];

addPlayer('obvBetter');
