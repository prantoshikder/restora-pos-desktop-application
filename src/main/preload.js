const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  send: (channel, data) => {
    let validChannels = ['getSettingDataFromDB'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  once: (channel, func) => {
    let validChannels = ['sendSettingDataFromMain'];
    if (validChannels.includes(channel)) {
      ipcRenderer.once(channel, (event, ...args) => func(...args));
    }
  },
});

contextBridge.exposeInMainWorld('add_category', {
  send: (channel, data) => {
    let validChannels = ['insertCategoryData'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
});

contextBridge.exposeInMainWorld('get_category', {
  send: (channel, data) => {
    let validChannels = ['sendResponseForCategory'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },

  once: (channel, func) => {
    let validChannels = ['sendCategoryData'];
    if (validChannels.includes(channel)) {
      ipcRenderer.once(channel, (event, ...args) => func(...args));
    }
  },
});


contextBridge.exposeInMainWorld(

  "delete_category", {
  send: (channel, data) => {
    let validChannels = ["delete_category"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  once: (channel, func) => {
    let validChannels = ["delete_category_response"];
    if (validChannels.includes(channel)) {
      ipcRenderer.once(channel, (event, ...args) => func(...args));
    }
  }

});


contextBridge.exposeInMainWorld(

  "edit_category", {
  send: (channel, data) => {
    let validChannels = ["edit_category"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  // once: (channel, func) => {
  //   let validChannels = ["edit_category_response"];
  //   if (validChannels.includes(channel)) {
  //     ipcRenderer.on(channel, (event, ...args) => func(...args));
  //   }
  // }

});
