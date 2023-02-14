const { ipcRenderer, clipboard } = require('electron');
const { client, CLIENTS, mode, MODES, apiKey } = require('../../data/config');

const RELOAD = document.getElementById('btnReload');
const MINUS = document.getElementById('btnMini');
const CLOSE = document.getElementById('btnClose');

RELOAD.addEventListener('click', () => ipcRenderer.send('app/reload'));
MINUS.addEventListener('click', () => ipcRenderer.send('app/minimize'));
CLOSE.addEventListener('click', () => ipcRenderer.send('app/close'));

// api_key

const api_key = document.getElementById('api_key');
api_key.addEventListener('click', () => {
  let key = clipboard.readText();
  if (key) key = key.replace(/\s/g, '');
  if (key.length !== 36) return;
  apiKey.setKey(key);
});

//settings screen (not finish!)

const settings = document.getElementById('btnSettings');
settings.addEventListener('click', () => {
  if ($('#settings').css('display') === 'none') {
    $('#settings').css('display', 'block');
    $('#player').css('display', 'none');
  } else {
    $('#settings').css('display', 'none');
    $('#player').css('display', 'flex');
  }
});

//dropdown @QuickCodingTuts
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach((dropdown) => {
  const select = dropdown.querySelector('.select');
  const caret = dropdown.querySelector('.caret');
  const menu = dropdown.querySelector('.menu');
  const options = dropdown.querySelectorAll('.menu li');
  const selected = dropdown.querySelector('.selected');

  select.addEventListener('click', () => {
    //add the clicked select styles to the select element
    select.classList.toggle('select-clicked');
    //add the rotate styles to the caret element
    caret.classList.toggle('caret-rotate');
    //add the open styles to the menu element
    menu.classList.toggle('menu-open');
  });

  options.forEach((option) => {
    const currentState = option.getAttribute('data-value');

    if (
      client.getClient() == currentState.toUpperCase() ||
      mode.getMode() == currentState
    ) {
      selected.innerHTML = option.innerHTML;
      option.classList.add('active');
    }

    option.addEventListener('click', () => {
      selected.innerHTML = option.innerHTML;
      //remove the clicked select styles to the select element
      select.classList.remove('select-clicked');
      //remove the rotate styles to the caret element
      caret.classList.remove('caret-rotate');
      //remove the open styles to the menu element
      menu.classList.remove('menu-open');

      //remove active class from all option elements
      options.forEach((option) => {
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
    ipcRenderer.send('client/change');
  });
});

BADLION.forEach((button) => {
  button.addEventListener('click', () => {
    if (String(client.getClient()).toUpperCase() == CLIENTS.badlion) return;
    client.setClient(CLIENTS.badlion);
    ipcRenderer.send('client/change');
  });
});

DEFAULT.forEach((button) => {
  button.addEventListener('click', () => {
    if (String(client.getClient()).toUpperCase() == CLIENTS.default) return;
    client.setClient(CLIENTS.default);
    ipcRenderer.send('client/change');
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
  console.log('test');
  mode.setMode(MODES.overall);
});

EIGHT_ONE.addEventListener('click', () => {
  if (mode.getMode() == MODES.solo) return;
  mode.setMode(MODES.solo);
  console.log('test');
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
  if (mode.getMode() == MODES.four_vs_four) return;
  mode.setMode(MODES.four_vs_four);
});
