const { channel } = require('diagnostics_channel');
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
  once: (channel, func) => {
    let validChannels = ['after_insert_get_response'];
    if (validChannels.includes(channel)) {
      ipcRenderer.once(channel, (event, ...args) => func(...args));
    }
  }
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

contextBridge.exposeInMainWorld('delete_category', {
  send: (channel, data) => {
    let validChannels = ['delete_category'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  once: (channel, func) => {
    let validChannels = ['delete_category_response'];
    if (validChannels.includes(channel)) {
      ipcRenderer.once(channel, (event, ...args) => func(...args));
    }
  },
});


contextBridge.exposeInMainWorld('parent_category', {

  send: (channel, data) => {
    let validChannels = ['parent_category'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  once: (channel, func) => {
    let validChannels = ['parent_category'];
    if (validChannels.includes(channel)) {
      ipcRenderer.once(channel, (event, ...args) => func(...args));
    }
  }

});


// Add addons channel
contextBridge.exposeInMainWorld('add_addons', {
  send: (channel, data) => {
    let validChannels = ['add_addons'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  once: (channel, func) => {
    let validChannels = ['add_addons_response'];
    if (validChannels.includes(channel)) {
      ipcRenderer.once(channel, (event, ...args) => func(...args));
    }
  }
});


// Addons list channel
contextBridge.exposeInMainWorld('addons_list', {
  send: (channel, data) => {
    let validChannels = ['addons_list'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  once: (channel, func) => {
    let validChannels = ['addons_list_response'];
    if (validChannels.includes(channel)) {
      ipcRenderer.once(channel, (event, ...args) => func(...args));
    }
  }
});


// Delete addons channel
contextBridge.exposeInMainWorld('delete_addons', {
  send: (channel, data) => {
    let validChannels = ['delete_addons'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  once: (channel, func) => {
    let validChannels = ['delete_addons_response'];
    if (validChannels.includes(channel)) {
      ipcRenderer.once(channel, (event, ...args) => func(...args));
    }
  },
});


