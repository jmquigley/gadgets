'use strict';

import {app, BrowserWindow} from 'electron';
import * as url from 'url';
import {join} from 'util.join';

let mainWindow: any;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1024,
		height: 768
	});

	mainWindow.loadURL(url.format({
		pathname: join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}));

	mainWindow.webContents.openDevTools();
	mainWindow.on('closed', () => {
		mainWindow = null;
	});
}

// This method will be called when Electron has finished
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});
