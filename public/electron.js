const path = require('path');
const fs = require('fs');

const { app, ipcMain, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const Web3 = require('web3');

function formatParams(paramArr) {
  let returnStr = "";
  for (let i = 0; i < paramArr.length; i++) {
    if (paramArr[i] === 'uint') paramArr[i] = 'uint256';

    returnStr += `${paramArr[i]}, `;
  }

  return returnStr.slice(0, -2);
}

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

// wip
function isValidPrivateKey() {
  return true;
}

// wip
function isValidRPCURL() {
  return true;
}

/*
Adds profile object to profiles.json
Will overwrite profile if same name
Create profiles.json if doesnt exist
*/
ipcMain.handle('addProfile', (event, obj) => {
  const file = `${app.getPath('userData')}\\profiles.json`;

  if (!fs.existsSync(file))
    fs.writeFileSync(file, JSON.stringify({}), null, 2);

  const jsonParsed = JSON.parse(fs.readFileSync(file));

  try {
    jsonParsed[obj.profileName] = obj;
    fs.writeFileSync(file, JSON.stringify(jsonParsed, null, 2));
    return {"success": true, "message": `Saved profile ${obj.profileName}!`, "content": jsonParsed};
  }
  catch(err) {
    console.error(err);
    return {"success": false, "message": "Failed to save profile!", "content": {}};
  }
});

ipcMain.handle('loadProfile', (event, profileName) => {
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

ipcMain.handle('getProfiles', (event) => {
  const file = `${app.getPath('userData')}\\profiles.json`;

  let jsonParsed;

  if (!fs.existsSync(file))
    fs.writeFileSync(file, JSON.stringify({}), null, 2);
  else
    jsonParsed = JSON.parse(fs.readFileSync(file));

  return {"success": true, "message": `Found profiles file!`, "content": jsonParsed};
})

ipcMain.handle('addWallet', (event, obj) => {

  if (obj.walletName === "" || !isValidPrivateKey(obj.privateKey) || !isValidRPCURL(obj.RPCURL))
    return {"success": false, "message": "Wallet name must not be empty, private key must be valid, and RPCURL must be valid!"};

  const file = `${app.getPath('userData')}\\wallets.json`;
  let jsonParsed;

  if (!fs.existsSync(file))
    jsonParsed = {};
  else
    jsonParsed = JSON.parse(fs.readFileSync(file));

  // Checks if wallet name already saved
  if (jsonParsed.hasOwnProperty(obj.walletName))
    return {"success": false, "message": "Wallet name already used!"};

  // Checks if private key already saved
  for (const [key, value] of Object.entries(jsonParsed)) {
    if (value.privateKey == obj.privateKey)
      return {"success": false, "message": `Private key already used for ${key}!`};
  }

  try {
    jsonParsed[obj.walletName] = {walletName: obj.walletName, RPCURL: obj.RPCURL, privateKey: obj.privateKey};

    fs.writeFileSync(file, JSON.stringify(jsonParsed), null, 2);
    return {"success": true, "message": `Added wallet ${obj.walletName}!`, "content": jsonParsed};
  }
  catch(err) {
    console.error(err);
    return {"success": false, "message": "Failed to add wallet!"};
  }
})

ipcMain.handle('getWallets', (event) => {
  const file = `${app.getPath('userData')}\\wallets.json`;

  let jsonParsed;

  if (!fs.existsSync(file))
    jsonParsed = {};
  else
    jsonParsed = JSON.parse(fs.readFileSync(file));

  return {"success": true, "message": `Found wallets file!`, "content": jsonParsed};
})

ipcMain.handle('addTask', (event, obj) => {
  const file = `${app.getPath('userData')}\\tasks.json`;
  const defaultTasks = {
    tasks: []
  }

  let jsonParsed;

  if (!fs.existsSync(file))
    jsonParsed = defaultTasks;
  else
    jsonParsed = JSON.parse(fs.readFileSync(file));

  // Checks if wallet name/private key already saved
  for (let i = 0; i < jsonParsed.tasks.length; i++) {
    if (jsonParsed.tasks[i].taskName == obj.taskName)
      return {"success": false, "message": "Task name already used!"};

    if (jsonParsed.tasks[i].walletName == obj.walletName)
      return {"success": false, "message": `Private key already used for another task: ${jsonParsed.tasks[i].taskName}!`};
  }

  try {
    jsonParsed.tasks.push(obj);

    fs.writeFileSync(file, JSON.stringify(jsonParsed), null, 2);
    return {"success": true, "message": `Added task ${obj.walletName}!`, "content": jsonParsed};
  }
  catch(err) {
    console.error(err);
    return {"success": false, "message": "Failed to add wallet!"};
  }
})

ipcMain.handle('getTasks', (event) => {
  const file = `${app.getPath('userData')}\\tasks.json`;
  const defaultTasks = {
    tasks: []
  }

  let jsonParsed;

  if (!fs.existsSync(file))
    jsonParsed = defaultTasks;
  else
    jsonParsed = JSON.parse(fs.readFileSync(file));

  return {"success": true, "message": `Found tasks file!`, "content": jsonParsed};
})

ipcMain.handle('runTasks', (event, data) => {
  for (let i = 0; i < data.tasks.tasks.length; i++) {
    const RPCURL = data.wallets[data.tasks.tasks[i].walletName].RPCURL;
    const privateKey = data.wallets[data.tasks.tasks[i].walletName].privateKey;
    const web3 = new Web3(RPCURL);
    web3.eth.accounts.wallet.add(privateKey);
    const account = web3.eth.accounts.wallet[0].address;

    const profile = data.profiles[data.tasks.tasks[i].profileName];
    const contract = new web3.eth.Contract(profile.contractABI, profile.contractAddress);
    const tx = await contract.methods[`${profile.functionName}(${formatParams(profile.parameters)})`](profile.amount)
      .call({
        from: account,
        // gasPrice: data.args.gasPrice, 
        value: profile.price
      });
  }

  // myContract.methods['myMethod(uint256)'](123) <- example
  const tx = contract.methods[`${data.function}(${formatParams(data.params)})`](data.args).call({gasPrice: data.gasPrice, value: data.price});
  tx.sign(data.privateKey);
})
