const { ipcRenderer } = require('electron');
const { client, CLIENTS, mode, MODES } = require('../../data/Config');

const RELOAD = document.getElementById('btnReload');
const MINUS = document.getElementById('btnMini');
const CLOSE = document.getElementById('btnClose');

RELOAD.addEventListener('click', reload_app);
MINUS.addEventListener('click', minimize_app);
CLOSE.addEventListener('click', close_app);

function reload_app() {
  ipcRenderer.send('app/reload');
}

function close_app() {
  ipcRenderer.send('app/close');
}

function minimize_app() {
  ipcRenderer.send('app/minimize');
}

/** CLEINT */

const LUNAR = document.getElementById('lunar');
const BADLION = document.getElementById('badlion');
const DEFAULT = document.getElementById('default');

LUNAR.addEventListener('click', () => {
  if (client.getClient() == CLIENTS.lunar) return;
  client.setClient(CLIENTS.lunar);
  ipcRenderer.send('client/change');
});

BADLION.addEventListener('click', () => {
  if (client.getClient() == CLIENTS.badlion) return;
  client.setClient(CLIENTS.badlion);
  ipcRenderer.send('client/change');
});

DEFAULT.addEventListener('click', () => {
  if (client.getClient() == CLIENTS.default) return;
  client.getClient(CLIENTS.default);
  ipcRenderer.send('client/change');
});

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

OVERALL.addEventListener('click', () => {
  if (mode.getMode() == MODES.overall) return;
  mode.setMode(MODES.overall);
});

EIGHT_ONE.addEventListener('click', () => {
  if (mode.getMode() == MODES.solo) return;
  mode.setMode(MODES.solo);
});

EIGHT_TWO.addEventListener('click', () => {
  if (mode.getMode() == MODES.doubels) return;
  mode.setMode(MODES.doubels);
});

FOUR_THREE.addEventListener('click', () => {
  if (mode.getMode() == MODES.trio) return;
  mode.setMode(MODES.trio);
});

FOUR_FOUR.addEventListener('click', () => {
  if (mode.getMode() == MODES.squad) return;
  mode.setMode(MODES.squad);
});

TWO_FOUR.addEventListener('click', () => {
  if (mode.getMode() == MODES.four_vs_vour) return;
  mode.setMode(MODES.four_vs_vour);
});
