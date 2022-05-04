const path = require('path');
const fs = require('fs');

const { app, ipcMain, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    title: "MNTR",
    // frame: false, // you're gonna wanna make your own frame to make it look nicer
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
  });

  win.setMenuBarVisibility(false);
  win.setResizable(false);

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, './index.html')}`
  );

  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

/*
Adds profile object to profiles.json
Will overwrite profile if same name
Create profiles.json if doesnt exist
*/
ipcMain.handle('addProfile', async (event, obj) => {
  const file = `${app.getPath('userData')}\\profiles.json`;

  if (!fs.existsSync(file))
    fs.writeFileSync(file, JSON.stringify({}), null, 2);

  const jsonParsed = JSON.parse(fs.readFileSync(file));

  try {
    jsonParsed[obj.profileName] = obj;
    fs.writeFileSync(file, JSON.stringify(jsonParsed, null, 2));
    return {"success": true, "message": `Saved profile ${obj.profileName}!`};
  }
  catch(err) {
    console.error(err);
    return {"success": false, "message": "Failed to save profile!"};
  }
});

ipcMain.handle('loadProfile', async (event, profileName) => {
  const file = `${app.getPath('userData')}/profiles.json`;

  if (!fs.existsSync(file))
    return {"success": false, "message": "No profiles created!"};

  const jsonParsed = JSON.parse(fs.readFileSync(file));

  try {
    if (jsonParsed.hasOwnProperty(profileName)) {
      return {"success": true, "message": "Loaded file!", "content": jsonParsed[profileName]};
    }
    else {
      return {"success": false, "message": `Profile ${profileName} doesn't exist!`};
    }
  }
  catch(err) {
    console.error(err);
    return {"success": false, "message": "Failed to load profile!"};
  }
});

// wip
ipcMain.handle('editConfig', async (event, obj) => {
  const file = `${app.getPath('userData')}\\config.json`;
  const defaultConfig = {
    "wallets": [],
    "RPCURL": ""
  }

  let jsonParsed;

  if (!fs.existsSync(file))
    jsonParsed = defaultConfig;
  else
    jsonParsed = JSON.parse(fs.readFileSync(file));

  for (let i = 0; i < jsonParsed.wallets.length; i++) {
    if (jsonParsed.wallets[i].walletName == obj.walletName)
      return {"success": false, "message": "Wallet name already used!"};

    if (jsonParsed.wallets[i].privateKey == obj.privateKey)
      return {"success": false, "message": `Private key already used for ${jsonParsed.wallets[i].walletName}!`};
  }

  try {
    jsonParsed.wallets.push({privateKey: obj.privateKey, walletName: obj.walletName});

    fs.writeFileSync(file, JSON.stringify(jsonParsed), null, 2);
    return {"success": true, "message": `Added wallet ${obj.walletName}!`};
  }
  catch(err) {
    console.error(err);
    return {"success": false, "message": "Failed to add wallet!"};
  }
})

ipcMain.handle('changeRPC', async (event, RPCURL) => {
  const file = `${app.getPath('userData')}\\config.json`;
  const defaultConfig = {
    "wallets": [],
    "RPCURL": ""
  }

  let jsonParsed;

  if (!fs.existsSync(file))
    jsonParsed = defaultConfig
  else
    jsonParsed = JSON.parse(fs.readFileSync(file));

  try {
    jsonParsed["RPCURL"] = RPCURL;
    fs.writeFileSync(file, JSON.stringify(jsonParsed), null, 2);
    return {"success": true, "message": "Changed RPC!"};
  }
  catch(err) {
    console.error(err);
    return {"success": false, "message": "Failed to change RPC!"};
  }
})