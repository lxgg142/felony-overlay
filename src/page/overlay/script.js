const remote = require('@electron/remote');
const { apiKey, client, CLIENTS } = require('../../data/Config');
const { bedwars } = require('../../helper/bedwars');
const fs = require('fs');
const {
  nameColor,
  starColor,
  wsColor,
  fkdrColor,
  wlrColor,
  finalsColor,
  winsColor,
  bblrColor,
} = require('../../helper/hypixelColors');
const LoggerManager = require('../../helper/Logger');
const Tail = require('tail').Tail;
const { app } = remote;
const homedir = app.getPath('home').replaceAll('\\', '/');
window.$ = window.jQuery = require('jquery');

const chat = new LoggerManager('CHAT');
const api = new LoggerManager('APIKey');

var players = [];
let logpath;

function main() {
  if (!apiKey.isKey()) {
    console.log(apiKey.getKey());
    let key = `<li class="player-item "><span style="color: #ef4444">INVAILID/MISSING API KEY</span></li>
    <li class="player-item "><span style="color: #ef4444">DO /API NEW</span></li>`;
    $(document).ready(function () {
      $('#ign').append(key);
    });
    api.log('API-Key was not specified do: /api new');
  }

  loadPATH();
  if (!fs.existsSync(logpath)) {
    return console.log('logpath');
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
          addPlayer(who[i]);
        }
        chat.log(who);
      } else if (msg.indexOf('has joined') !== -1 && msg.indexOf(':') === -1) {
        let join = msg.split(' ')[0];
        addPlayer(join);
      } else if (msg.indexOf('has quit') !== -1 && msg.indexOf(':') === -1) {
        let left = msg.split(' ')[0];
        removePlayer(left);
      } else if (msg.indexOf('new API key') !== -1 && msg.indexOf(':') === -1) {
        let key = msg.substring(msg.indexOf('is ') + 3);
        apiKey.setKey(key);
        clear();
        apiKey.setKey(key);
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
      console.log(res.success);
      if (res.success) {
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
      console.log(error);
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
    let log_18 = `${homedir}/.lunarclient/offline/1.8/logs/latest.log`;
    let log_189 = `${homedir}/.lunarclient/offline/1.8.9/logs/latest.log`;
    let log_multiver = `${homedir}/.lunarclient/offline/multiver/logs/latest.log`;

    if (fs.existsSync(log_18)) {
      logpath = log_18;
      return;
    }
    if (fs.existsSync(log_189)) {
      logpath = log_189;
      return;
    }
    if (fs.existsSync(log_multiver)) {
      logpath = log_multiver;
      return;
    }
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
