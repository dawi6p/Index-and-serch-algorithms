const { app, BrowserWindow } = require('electron');

let window = null;
function createWindow() {
  window = new BrowserWindow({
    webPreferences: {
        nodeIntegration: true,  
        contextIsolation: false,
    },
  });
  window.openDevTools();
  //window.openDevTools();
  window.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();
})

app.on('window-all-closed', () => {
    app.quit();
})