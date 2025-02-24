const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
require('dotenv').config();

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 800,
    webPreferences: {
      nodeIntegration: false,  
      contextIsolation: true,  
      preload: path.join(__dirname, 'preload.js')  // Correct path to preload.js
    }
  });

  // Send environment variables to renderer using IPC
  ipcMain.handle('get-api-key', () => process.env.API_KEY);
  ipcMain.handle('get-api-secret', () => process.env.API_SECRET);

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});