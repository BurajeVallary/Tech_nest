const { contextBridge, ipcRenderer } = require('electron');

// Expose functions to get API credentials from the main process
contextBridge.exposeInMainWorld('api', {
  getApiKey: () => ipcRenderer.invoke('get-api-key'),
  getApiSecret: () => ipcRenderer.invoke('get-api-secret')
});