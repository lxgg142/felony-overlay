const { ipcRenderer } = require('electron');
const { client, CLIENTS } = require('../../data/Config');

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
  client.setClient(CLIENTS.lunar);
  ipcRenderer.send('client/change');
});

BADLION.addEventListener('click', () => {
  client.setClient(CLIENTS.badlion);
  ipcRenderer.send('client/change');
});

DEFAULT.addEventListener('click', () => {
  client.getClient(CLIENTS.default);
  ipcRenderer.send('client/change');
});

const SIDEBAR_MENU = document.getElementById('sidebar-toggle');
SIDEBAR_MENU.addEventListener('click', () => {
  const SIDEBAR = document.getElementById('sidebar-menu');
  const width = SIDEBAR.style.width;
  if (width == '200px') {
    SIDEBAR.style.width = '0px';
  } else SIDEBAR.style.width = '200px';
});
