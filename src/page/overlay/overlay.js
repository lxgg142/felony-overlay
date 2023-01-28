const remote = require('@electron/remote');
const fs = require('fs');
const { apiKey, CLIENTS, client } = require('../../data/Config');
const { bedwars } = require('../../helper/bedwars');
const {
  nameColor,
  fkdrColor,
  bblrColor,
  wsColor,
  winsColor,
  finalsColor,
  starColor,
  wlrColor,
} = require('../../helper/hypixelColors');
const LoggerManager = require('../../helper/Logger');

const Tail = require('tail').Tail;
const { app } = remote;
const homedir = app.getPath('home').replaceAll('\\', '/');
window.$ = window.jQuery = require('jquery');

const logger = new LoggerManager('Overlay');

let logpath;

function main() {
  if (!apiKey.isKey()) {
    console.log(apiKey.getKey());
    let key = `<li class="player-item "><span style="color: #ef4444">INVAILID/MISSING API KEY</span></li>
    <li class="player-item "><span style="color: #ef4444">DO /API NEW</span></li>`;
    $(document).ready(function () {
      $('#ign').append(key);
    });
    logger.log('API-Key was not specified do: /api new');
  }

  loadPATH();
  if (!fs.existsSync(logpath)) {
    return logger.log('logpath was not found!');
  }

  console.log(logpath);

  const tail = new Tail(logpath, {
    useWatchFile: true,
    nLines: 1,
    fsWatchOptions: { interval: 100 },
  });

  tail.on('line', (data) => {
    const k = data.indexOf('[CHAT]');
    if (k !== -1) {
      const msg = data
        .substring(k + 7)
        .replace(/(§|�)([0-9]|a|b|e|d|f|k|l|m|n|o|r|c)/gm, '');

      if (msg.indexOf('ONLINE:') !== -1 && msg.indexOf(',') !== -1) {
        clear();
        let who = msg.substring(8).split(', ');
        for (let i = 0; i < who.length; i++) {
          addPlayer(who[i].split(' ')[0]);
        }
        logger.log(who);
      } else if (msg.indexOf('has joined') !== -1 && msg.indexOf(':') === -1) {
        let join = msg.split(' ')[0];
        addPlayer(join);
      } else if (msg.indexOf('has quit') !== -1 && msg.indexOf(':') === -1) {
        let left = msg.split(' ')[0];
        removePlayer(left);
      } else if (
        msg.indexOf('The game starts in 1 second!') !== -1 &&
        msg.indexOf(':') === -1
      ) {
        console.log('game started');
      } else if (msg.indexOf('new API key') !== -1 && msg.indexOf(':') === -1) {
        let key = msg.substring(msg.indexOf('is ') + 3);
        apiKey.setKey(key);
        clear();
      } else if (msg.indexOf('Sending you') !== -1 && msg.indexOf(':') === -1) {
        clear();
      }
    }
  });
}

function addPlayer(player) {
  let nick = {
    newPackageRank: undefined,
    displayname: player,
    rankPlusColor: '',
    monthlyPackageRank: '',
  };

  let ign = `<li class="player-item ${player}">
  ${starColor(0)} ${nameColor(nick)} 
  <span style="color: #f59e0b">NICK?</span></li>`,
    winstreak = `<li class="player-item ${player}"><span style="color: #FF5555;">-</span></li>`,
    fkdr = `<li class="player-item ${player}"><span style="color: #FF5555;">-</span></li>`,
    wlr = `<li class="player-item ${player}"><span style="color: #FF5555;">-</span></li>`,
    finals = `<li class="player-item ${player}"><span style="color: #FF5555;">-</span></li>`,
    wins = `<li class="player-item ${player}">-</li>`,
    blr = `<li class="player-item ${player}">-</li>`;

  bedwars
    .get(player)
    .then((res) => {
      if (res.success == true) {
        ign = `<li class="player-item ${player}">
        ${starColor(res.star)} 
        ${nameColor(res.player)}</li>`;

        winstreak = `<li class="player-item ${player}">
        ${wsColor(res.winstreak)}</li>`;

        fkdr = `<li class="player-item ${player}">
        ${fkdrColor(res.fkdr)}</li>`;

        wlr = `<li class="player-item ${player}">${wlrColor(res.wlr)}</li>`;

        finals = `<li class="player-item ${player}">
        ${finalsColor(res.final_kills)}</li>`;

        wins = `<li class="player-item ${player}">
        ${winsColor(res.wins)}</li>`;

        blr = `<li class="player-item ${player}">${bblrColor(res.blr)}</li>`;
      }
    })
    .then(() => {
      $('#ign').append(ign);
      $('#ws').append(winstreak);
      $('#fkdr').append(fkdr);
      $('#wlr').append(wlr);
      $('#blr').append(blr);
      $('#finals').append(finals);
      $('#wins').append(wins);
    })
    .catch((error) => {
      logger.log(error);
    });
}

function removePlayer(player) {
  $(`.${player}`).remove();
}

function clear() {
  $('.player-item').remove();
}

function loadPATH() {
  if (client.getClient() === CLIENTS.lunar) {
    /**
     * Find the latest LunarClient log file. It creates three objects containing the
     * path and modification time of the three log files, checks if the files exist
     * and updates the modification times accordingly, sorts the three objects by the
     * modified variable and sets the logpath variable to the modified file.
     */
    let lunar_18 = {
      path: `${homedir}/.lunarclient/offline/1.8/logs/latest.log`,
      modified: 0,
    };
    let lunar_189 = {
      path: `${homedir}/.lunarclient/offline/1.8.9/logs/latest.log`,
      modified: 0,
    };
    let lunar_multiver = {
      path: `${homedir}/.lunarclient/offline/multiver/logs/latest.log`,
      modified: 0,
    };

    if (fs.existsSync(lunar_18.path))
      lunar_18.modified = fs.statSync(lunar_18.path).mtime;
    if (fs.existsSync(lunar_189.path))
      lunar_189.modified = fs.statSync(lunar_189.path).mtime;
    if (fs.existsSync(lunar_multiver.path))
      lunar_multiver.modified = fs.statSync(lunar_multiver.path).mtime;

    const lunarLogs = [lunar_18, lunar_189, lunar_multiver];

    lunarLogs.sort((a, b) => {
      return b.modified - a.modified;
    });

    logpath = lunarLogs[0].path;
  } else if (process.platform === 'darwin') {
    if (client.getClient() === CLIENTS.badlion) {
      logpath = `${homedir}/Library/Application Support/minecraft/logs/blclient/minecraft/latest.log`;
    } else if (client.getClient() === CLIENTS.default) {
      logpath = `${homedir}/Library/Application Support/minecraft/logs/latest.log`;
    }
  } else {
    if (client.getClient() === CLIENTS.badlion) {
      logpath = `${homedir}/AppData/Roaming/.minecraft/logs/blclient/minecraft/latest.log`;
    } else if (client.getClient() === CLIENTS.default) {
      logpath = `${homedir}/AppData/Roaming/.minecraft/logs/latest.log`;
    }
  }
}

main();

bedwars.get('obvBetter').then((res) => {
  console.log(res);
});
