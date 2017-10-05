'use strict';

import {app, BrowserWindow, Menu} from 'electron';
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

	// This will load the React development tools into electron.
	// It uses the environment variable "REACT_DEV_TOOL" to get the path to
	// the chrome extension (directory path).  Set this path in the development
	// environment to enable the extension.
	if (process.env.NODE_ENV !== 'production'
			&& 'REACT_DEV_TOOL' in process.env
			&& process.env.REACT_DEV_TOOL) {
		BrowserWindow.addDevToolsExtension(process.env.REACT_DEV_TOOL);
	}

	mainWindow.webContents.openDevTools();
	mainWindow.on('closed', () => {
		mainWindow = null;
	});

	// Note that when running this app under tmux the copy and paste operations
	// will not work.  The app must be started outside of tmux
	//
	// https://github.com/ChrisJohnsen/tmux-MacOSX-pasteboard#mac-os-x-pasteboard-access-under-tmux-and-screen
	//

	const template: any = [
	  {
		label: 'Edit',
		submenu: [
		  {role: 'undo'},
		  {role: 'redo'},
		  {type: 'separator'},
		  {role: 'cut'},
		  {role: 'copy'},
		  {role: 'paste'},
		  {role: 'pasteandmatchstyle'},
		  {role: 'delete'},
		  {role: 'selectall'}
		]
	  },
	  {
		label: 'View',
		submenu: [
		  {role: 'reload'},
		  {role: 'forcereload'},
		  {role: 'toggledevtools'},
		  {type: 'separator'},
		  {role: 'resetzoom'},
		  {role: 'zoomin'},
		  {role: 'zoomout'},
		  {type: 'separator'},
		  {role: 'togglefullscreen'}
		]
	  },
	  {
		role: 'window',
		submenu: [
		  {role: 'minimize'},
		  {role: 'close'}
		]
	  },
	  {
		role: 'help',
		submenu: [
		  {
			label: 'Learn More',
			click () { require('electron').shell.openExternal('https://electron.atom.io') }
		  }
		]
	  }
	]

	if (process.platform === 'darwin') {
	  template.unshift({
		label: app.getName(),
		submenu: [
		  {role: 'about'},
		  {type: 'separator'},
		  {role: 'services', submenu: []},
		  {type: 'separator'},
		  {role: 'hide'},
		  {role: 'hideothers'},
		  {role: 'unhide'},
		  {type: 'separator'},
		  {role: 'quit'}
		]
	  })

	  // Edit menu
	  template[1].submenu.push(
		{type: 'separator'},
		{
		  label: 'Speech',
		  submenu: [
			{role: 'startspeaking'},
			{role: 'stopspeaking'}
		  ]
		}
	  )

	  // Window menu
	  template[3].submenu = [
		{role: 'close'},
		{role: 'minimize'},
		{role: 'zoom'},
		{type: 'separator'},
		{role: 'front'}
	  ]
	}

	const menu = Menu.buildFromTemplate(template)
	Menu.setApplicationMenu(menu)

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
