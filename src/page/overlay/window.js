const { ipcRenderer, clipboard } = require('electron');
const { client, CLIENTS, mode, MODES, apiKey } = require('../../data/config');
function ms(ms) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve;
    }, ms)
  );
}

const RELOAD = document.getElementById('btnReload');
const MINUS = document.getElementById('btnMini');
const CLOSE = document.getElementById('btnClose');

RELOAD.addEventListener('click', () => ipcRenderer.send('app/reload'));
MINUS.addEventListener('click', () => ipcRenderer.send('app/minimize'));
CLOSE.addEventListener('click', () => ipcRenderer.send('app/close'));

/** CLEINT */
const LUNAR = document.querySelectorAll("[id='lunar']");
const BADLION = document.querySelectorAll("[id='badlion']");
const DEFAULT = document.querySelectorAll("[id='default']");
const CLEINTS_BTN = document.getElementById('clients').querySelectorAll('a');

LUNAR.forEach((button) => {
  button.addEventListener('click', () => {
    if (String(client.getClient()).toUpperCase() == CLIENTS.lunar) return;
    setSelectedClient();
    client.setClient(CLIENTS.lunar);
    ipcRenderer.send('client/change');
  });
});

BADLION.forEach((button) => {
  button.addEventListener('click', () => {
    if (String(client.getClient()).toUpperCase() == CLIENTS.badlion) return;
    setSelectedClient();
    client.setClient(CLIENTS.badlion);
    ipcRenderer.send('client/change');
  });
});

DEFAULT.forEach((button) => {
  button.addEventListener('click', () => {
    if (String(client.getClient()).toUpperCase() == CLIENTS.default) return;
    setSelectedClient();
    client.setClient(CLIENTS.default);
    ipcRenderer.send('client/change');
  });
});

async function setSelectedClient() {
  await CLEINTS_BTN.forEach((btn) => {
    btn.style.color = `var(--colors-light)`;
  });
  switch (String(client.getClient()).toUpperCase()) {
    case CLIENTS.default:
      DEFAULT.forEach((button) => {
        button.style.color = 'var(--colors-lime)';
      });
      break;
    case CLIENTS.lunar:
      LUNAR.forEach((button) => {
        button.style.color = 'var(--colors-lime)';
      });
      break;
    case CLIENTS.badlion:
      BADLION.forEach((button) => {
        button.style.color = 'var(--colors-lime)';
      });
      break;
  }
}

/**SIDEBAR */

const SIDEBAR_MENU = document.getElementById('sidebar-toggle');
SIDEBAR_MENU.addEventListener('click', () => {
  const SIDEBAR = document.getElementById('sidebar-menu');
  const width = SIDEBAR.style.width;
  if (width == '200px') {
    SIDEBAR.style.width = '0px';
  } else SIDEBAR.style.width = '200px';
});

/**MODE SELECTION */

const OVERALL = document.getElementById('overall');
const EIGHT_ONE = document.getElementById('eight_two');
const EIGHT_TWO = document.getElementById('eight_one');
const FOUR_THREE = document.getElementById('four_three');
const FOUR_FOUR = document.getElementById('four_four');
const TWO_FOUR = document.getElementById('two_four');
const MODE_BTN = document.getElementById('modes').querySelectorAll('a');

OVERALL.addEventListener('click', () => {
  if (mode.getMode() == MODES.overall) return;
  setSelectedMode();
  mode.setMode(MODES.overall);
});

EIGHT_ONE.addEventListener('click', () => {
  if (mode.getMode() == MODES.solo) return;
  setSelectedMode();
  mode.setMode(MODES.solo);
});

EIGHT_TWO.addEventListener('click', () => {
  if (mode.getMode() == MODES.doubels) return;
  setSelectedMode();
  mode.setMode(MODES.doubels);
});

FOUR_THREE.addEventListener('click', () => {
  if (mode.getMode() == MODES.trio) return;
  setSelectedMode();
  mode.setMode(MODES.trio);
});

FOUR_FOUR.addEventListener('click', () => {
  if (mode.getMode() == MODES.squad) return;
  setSelectedMode();
  mode.setMode(MODES.squad);
});

TWO_FOUR.addEventListener('click', () => {
  if (mode.getMode() == MODES.four_vs_four) return;
  setSelectedMode();
  mode.setMode(MODES.four_vs_four);
});

async function setSelectedMode() {
  await MODE_BTN.forEach((btn) => {
    btn.style.color = `var(--colors-light)`;
  });
  switch (mode.getMode()) {
    case MODES.overall:
      OVERALL.style.color = 'var(--colors-lime)';
      break;
    case MODES.solo:
      EIGHT_ONE.style.color = 'var(--colors-lime)';
      break;
    case MODES.doubels:
      EIGHT_TWO.style.color = 'var(--colors-lime)';
      break;
    case MODES.trio:
      FOUR_THREE.style.color = 'var(--colors-lime)';
      break;
    case MODES.squad:
      FOUR_FOUR.style.color = 'var(--colors-lime)';
      break;
    case MODES.four_vs_four:
      TWO_FOUR.style.color = 'var(--colors-lime)';
      break;
  }
}

// api_key

const api_key = document.getElementById('api_key');
api_key.addEventListener('click', () => {
  let key = clipboard.readText();
  if (key) key = key.replace(/\s/g, '');
  if (key.length !== 36) return;
  apiKey.setKey(key);
});

setSelectedClient();
setSelectedMode();
