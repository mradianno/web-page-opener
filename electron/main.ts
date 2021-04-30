import { app, BrowserWindow, Menu, MenuItem } from 'electron';
import * as path from 'path';
import * as url from 'url';

import { InitMainMenu } from './Menu/MainMenu';

const contextMenu = require('electron-context-menu');
const CONFIG = require('./config.json');
const fs = require('fs');

function createWindow() {
  const { width, height, fullscreenable, fullscreen, maximizable } = CONFIG;

  let alwaysOnTop: boolean = CONFIG.alwaysOnTop || false;

  const win = new BrowserWindow({
    width,
    height,
    fullscreenable,
    fullscreen,
    maximizable,
    frame: process.platform === 'darwin',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      enableRemoteModule: true,
      nodeIntegration: true
    }
  });

  // Init Main Top Menu
  InitMainMenu();

  // context menu
  let setWindowsOnTop = () => {
    alwaysOnTop = !alwaysOnTop;

    fs.writeFile(path.join(__dirname, '/config.json'), JSON.stringify({ ...CONFIG, alwaysOnTop }), (err: Error) => {
      if (err) console.error(err);
    });

    // @ts-ignore
    win.setAlwaysOnTop(alwaysOnTop, `screen`);
  };

  contextMenu({
    // @ts-ignore
    prepend: (defaultActions, parameters, browserWindow) => [
      {
        label: 'Always On Top',
        visible: true,
        click: () => {
          setWindowsOnTop();
        }
      },
      {
        label: 'Reload',
        visible: true,
        click: () => {
          let currentURL = win.webContents.getURL();
          win.loadURL(currentURL, { userAgent: 'Chrome' });
        }
      }
    ]
  });


  if (process.env.NODE_ENV === 'development') {
    win.loadURL(`http://localhost:4000`);
    win.webContents.openDevTools();
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
      })
    );
  }
}

app.on('ready', createWindow);
app.allowRendererProcessReuse = true;
