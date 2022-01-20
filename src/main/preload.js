const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
  "api", {
  send: (channel, data) => {
    let validChannels = ["getSettingDataFromDB"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  once: (channel, func) => {
    let validChannels = ["sendSettingDataFromMain"];
    if (validChannels.includes(channel)) {
      ipcRenderer.once(channel, (event, ...args) => func(...args));
    }
  },
  // dataExchange: (channel, func) => {
  //   let validChannels = ["sendSettingDbDataFromMain"];
  //   if (validChannels.includes(channel)) {
  //     ipcRenderer.once(channel, (event, ...args) => func(...args));
  //   }
  // }
}
);
