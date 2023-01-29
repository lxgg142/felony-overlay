const { app, BrowserWindow, ipcMain } = require('electron');
const electronLocalshortcut = require('electron-localshortcut');
const path = require('path');
const remoteMain = require('@electron/remote/main');
const Store = require('electron-store');
const ipc = ipcMain;
Store.initRenderer();

if (process.platform === 'win32') app.setAppUserModelId('FelonyOverlay');
function createWindow() {
  let splash = new BrowserWindow({
    width: 450,
    height: 200,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    icon: path.join(__dirname, 'assets/favicon.ico'),
  });

  splash.loadFile('src/page/splash/splash.html');
  splash.setMenu(null);
  splash.center();

  let win = new BrowserWindow({
    maxWidth: 800,
    maxHeight: 600,
    width: 800,
    height: 600,
    minWidth: 600,
    minHeight: 500,
    frame: false,
    show: false,
    icon: path.join(__dirname, 'assets/favicon.ico'),
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  });

  win.loadFile('src/page/overlay/index.html');
  win.setMenu(null);

  splash.once('ready-to-show', () => {
    splash.show();
    setTimeout(() => {
      splash.destroy();
      win.show();
    }, 4000);
  });

  remoteMain.initialize();
  remoteMain.enable(win.webContents);

  //win.webContents.openDevTools();

  ipc.on('app/close', () => {
    app.quit();
  });

  ipc.on('app/minimize', () => {
    win.minimize();
  });

  ipc.on('app/reload', () => {
    win.reload();
  });

  ipc.on('client/change', () => {
    app.relaunch();
    app.exit();
  });

  electronLocalshortcut.register(win, 'F5', () => {
    win.reload();
  });
}

app.whenReady().then(() => {
  createWindow();
});
