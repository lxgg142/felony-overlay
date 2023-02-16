const { client, CLIENTS, mode, MODES, apiKey } = require('../../data/config.js');
const { ipcRenderer, clipboard } = require('electron');
const { modalWindow } = require('./modalWindow.js');
modalWindow.initialize();
const { client, CLIENTS, mode, MODES, apiKey } = require('../../data/config');

const RELOAD = document.getElementById('btnReload');
const MINUS = document.getElementById('btnMini');
const CLOSE = document.getElementById('btnClose');

RELOAD.addEventListener('click', () => ipcRenderer.send('app/reload'));
MINUS.addEventListener('click', () => ipcRenderer.send('app/minimize'));
CLOSE.addEventListener('click', () => ipcRenderer.send('app/close'));

//settings
const SETTINGS = document.getElementById('btnSettings');
SETTINGS.addEventListener('click', () => {
  if ($('#settings').css('display') === 'none') {
    $('#settings').css('display', 'block');
    $('#player').css('display', 'none');
  } else {
    $('#settings').css('display', 'none');
    $('#player').css('display', 'flex');
  }
});

// api_key

const API_KEY = document.getElementById('api_key');
API_KEY.addEventListener('click', () => {
  let key = clipboard.readText();
  if (key) key = key.replace(/\s/g, '');
  if (key.length !== 36) return;
  apiKey.setKey(key);
  return modalWindow.open({
    content: 'API-Key has been pasted in',
  });
});

//dropdown @QuickCodingTuts
const DROPDOWNS = document.querySelectorAll('.dropdown');
DROPDOWNS.forEach((dropdown) => {
  const SELECT = dropdown.querySelector('.select');
  const CARET = dropdown.querySelector('.caret');
  const MENU = dropdown.querySelector('.menu');
  const OPTIONS = dropdown.querySelectorAll('.menu li');
  const SELECTED = dropdown.querySelector('.selected');

  SELECT.addEventListener('click', () => {
    //add the clicked select styles to the select element
    SELECT.classList.toggle('select-clicked');
    //add the rotate styles to the caret element
    CARET.classList.toggle('caret-rotate');
    //add the open styles to the menu element
    MENU.classList.toggle('menu-open');
  });

  OPTIONS.forEach((option) => {
    const currentState = option.getAttribute('data-value');

    //add active class to current option element
    if (
      client.getClient() == currentState.toUpperCase() ||
      mode.getMode() == currentState
    ) {
      SELECTED.innerHTML = option.innerHTML;
      option.classList.add('active');
    }

    option.addEventListener('click', () => {
      SELECTED.innerHTML = option.innerHTML;
      //remove the clicked select styles to the select element
      SELECT.classList.remove('select-clicked');
      //remove the rotate styles to the caret element
      CARET.classList.remove('caret-rotate');
      //remove the open styles to the menu element
      MENU.classList.remove('menu-open');

      //remove active class from all option elements
      OPTIONS.forEach((option) => {
        option.classList.remove('active');
      });

      //add active class to clicked option element
      option.classList.add('active');
    });
  });
});

/** CLEINT */
const LUNAR = document.querySelectorAll("[id='lunar']");
const BADLION = document.querySelectorAll("[id='badlion']");
const DEFAULT = document.querySelectorAll("[id='default']");

LUNAR.forEach((button) => {
  button.addEventListener('click', () => {
    if (String(client.getClient()).toUpperCase() == CLIENTS.lunar) return;
    client.setClient(CLIENTS.lunar);
    return ipcRenderer.send('client/change');
  });
});

BADLION.forEach((button) => {
  button.addEventListener('click', () => {
    if (String(client.getClient()).toUpperCase() == CLIENTS.badlion) return;
    client.setClient(CLIENTS.badlion);
    return ipcRenderer.send('client/change');
  });
});

DEFAULT.forEach((button) => {
  button.addEventListener('click', () => {
    if (String(client.getClient()).toUpperCase() == CLIENTS.default) return;
    client.setClient(CLIENTS.default);
    return ipcRenderer.send('client/change');
  });
});

/**MODE SELECTION */
const OVERALL = document.getElementById('overall');
const EIGHT_ONE = document.getElementById('eight_one');
const EIGHT_TWO = document.getElementById('eight_two');
const FOUR_THREE = document.getElementById('four_three');
const FOUR_FOUR = document.getElementById('four_four');
const TWO_FOUR = document.getElementById('two_four');

OVERALL.addEventListener('click', () => {
  if (mode.getMode() == MODES.overall) return;
  return mode.setMode(MODES.overall);
});

EIGHT_ONE.addEventListener('click', () => {
  if (mode.getMode() == MODES.solo) return;
  return mode.setMode(MODES.solo);
});

EIGHT_TWO.addEventListener('click', () => {
  if (mode.getMode() == MODES.doubels) return;
  return mode.setMode(MODES.doubels);
});

FOUR_THREE.addEventListener('click', () => {
  if (mode.getMode() == MODES.trio) return;
  return mode.setMode(MODES.trio);
});

FOUR_FOUR.addEventListener('click', () => {
  if (mode.getMode() == MODES.squad) return;
  return mode.setMode(MODES.squad);
});

TWO_FOUR.addEventListener('click', () => {
  if (mode.getMode() == MODES.four_vs_four) return;
  return mode.setMode(MODES.four_vs_four);
});
