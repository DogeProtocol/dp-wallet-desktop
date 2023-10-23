const {
    app,
    protocol,
    BrowserWindow,
    session,
    ipcMain,
    Menu,
    clipboard,
    shell
} = require("electron");

const path = require('path');
const sjcl = require('sjcl');
const fs = require('fs');
const readline = require('readline');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

let currentWindow;

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 600,
      height: 800,
      webPreferences: {
          preload: path.join(__dirname, 'preload.js'),
          nodeIntegration: false,
          nodeIntegrationInWorker: false,
          nodeIntegrationInSubFrames: false,
          contextIsolation: true,
          enableRemoteModule: false,
      },
      autoHideMenuBar: true
  });

  currentWindow = mainWindow;

  // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, 'theme/index.html'));

  // Open the DevTools.
   //mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ipcMain.handle('WriteText', async (event, data) => {
    //console.log(data);
    clipboard.writeText(data);
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ipcMain.handle('OpenUrlInShell', async (event, data) => {
    //console.log(data);
    shell.openExternal(data);
})

ipcMain.handle('FileApi', async (event, data) => {
    //console.log(data);
    filename = path.join(__dirname, 'assets/seedwords.txt');

    if (fs == null || fs == undefined) {
        console.log("undefined");
    }
    var fileStream = fs.createReadStream(filename);

    return fs.readFileSync(filename).toString();
})

ipcMain.handle('SjclApiSha256', async (event, data) => {
    return sjcl.hash.sha256.hash(data);
})
