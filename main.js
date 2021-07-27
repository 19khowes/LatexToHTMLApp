/* This is where all windows are created and the main process happens */

const electron = require('electron');
const url = require('url');
const path = require('path');
const { app, BrowserWindow, Menu } = electron;

/* SET ENV HERE */
// process.env.NODE_ENV = 'production';

// All global variables for each window here 
let mainWindow;

// Listen for the app to be ready
app.on('ready', () => {

    // Create new window (mainWindow)
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    // Load main html into main window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
});
