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
  },
});

// Add new addons - channel
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
  },
});

// get addons list - channel
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
  },
});

// Delete addons - channel
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

// Add new foods - channel
contextBridge.exposeInMainWorld('add_new_foods', {
  send: (channel, data) => {
    let validChannels = ['add_new_foods'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  once: (channel, func) => {
    let validChannels = ['add_new_foods_response'];
    if (validChannels.includes(channel)) {
      ipcRenderer.once(channel, (event, ...args) => func(...args));
    }
  },
});

// Get food list - channel
contextBridge.exposeInMainWorld('get_food_list', {
  send: (channel, data) => {
    let validChannels = ['get_food_list'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  once: (channel, func) => {
    let validChannels = ['get_food_list_response'];
    if (validChannels.includes(channel)) {
      ipcRenderer.once(channel, (event, ...args) => func(...args));
    }
  },
});

// Delete foods - channel
contextBridge.exposeInMainWorld('delete_foods', {
  send: (channel, data) => {
    let validChannels = ['delete_foods'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  once: (channel, func) => {
    let validChannels = ['delete_foods_response'];
    if (validChannels.includes(channel)) {
      ipcRenderer.once(channel, (event, ...args) => func(...args));
    }
  },
});

// Add foods variant - channel
contextBridge.exposeInMainWorld('add_new_foods_variant', {
  send: (channel, data) => {
    let validChannels = ['add_new_foods_variant'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  once: (channel, func) => {
    let validChannels = ['add_new_foods_variant_response'];
    if (validChannels.includes(channel)) {
      ipcRenderer.once(channel, (event, ...args) => func(...args));
    }
  },
});

// Get food lists channel
contextBridge.exposeInMainWorld('food_lists_channel', {
  send: (channel, data) => {
    let validChannels = ['food_lists_channel'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  once: (channel, func) => {
    let validChannels = ['food_lists_response'];
    if (validChannels.includes(channel)) {
      ipcRenderer.once(channel, (event, ...args) => func(...args));
    }
  },
});

// Delete foods variant - channel
contextBridge.exposeInMainWorld('delete_foods_variant', {
  send: (channel, data) => {
    let validChannels = ['delete_foods_variant'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  once: (channel, func) => {
    let validChannels = ['delete_foods_variant_response'];
    if (validChannels.includes(channel)) {
      ipcRenderer.once(channel, (event, ...args) => func(...args));
    }
  },
});

// Get variant lists channel
contextBridge.exposeInMainWorld('variant_lists_channel', {
  send: (channel, data) => {
    let validChannels = ['variant_lists_channel'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  once: (channel, func) => {
    let validChannels = ['variant_lists_response'];
    if (validChannels.includes(channel)) {
      ipcRenderer.once(channel, (event, ...args) => func(...args));
    }
  },
});

// Insert food available day & time channel
contextBridge.exposeInMainWorld('context_bridge_food_available_time', {
  send: (channel, data) => {
    let validChannels = ['context_bridge_food_available_time'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  once: (channel, func) => {
    let validChannels = ['context_bridge_food_available_time_response'];
    if (validChannels.includes(channel)) {
      ipcRenderer.once(channel, (event, ...args) => func(...args));
    }
  },
});

// Get food available time lists
contextBridge.exposeInMainWorld('get_food_availability_lists_channel', {
  send: (channel, data) => {
    let validChannels = ['get_food_availability_lists_channel'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  once: (channel, func) => {
    let validChannels = ['get_food_availability_lists_channel_response'];
    if (validChannels.includes(channel)) {
      ipcRenderer.once(channel, (event, ...args) => func(...args));
    }
  },
});

// Delete food available day & time list channel
contextBridge.exposeInMainWorld('channel_delete_food_available_day_time', {
  send: (channel, data) => {
    let validChannels = ['channel_delete_food_available_day_time'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  once: (channel, func) => {
    let validChannels = ['delete_food_available_day_time_response'];
    if (validChannels.includes(channel)) {
      ipcRenderer.once(channel, (event, ...args) => func(...args));
    }
  },
});

/*=================================================================
  MENU TYPE
=================================================================*/
// Insert menu type data
contextBridge.exposeInMainWorld('context_bridge_menu_type', {
  send: (channel, data) => {
    let validChannels = ['context_bridge_menu_type'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  once: (channel, func) => {
    let validChannels = ['context_bridge_menu_type_response'];
    if (validChannels.includes(channel)) {
      ipcRenderer.once(channel, (event, ...args) => func(...args));
    }
  },
});

// Get menu type data from the DB
contextBridge.exposeInMainWorld('get_menu_type_lists_channel', {
  send: (channel, data) => {
    let validChannels = ['get_menu_type_lists_channel'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  once: (channel, func) => {
    let validChannels = ['get_menu_type_lists_channel_response'];
    if (validChannels.includes(channel)) {
      ipcRenderer.once(channel, (event, ...args) => func(...args));
    }
  },
});

// Delete menu type from the DB
contextBridge.exposeInMainWorld('delete_menu_type_item', {
  send: (channel, data) => {
    let validChannels = ['delete_menu_type_item'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  once: (channel, func) => {
    let validChannels = ['delete_menu_type_item_response'];
    if (validChannels.includes(channel)) {
      ipcRenderer.once(channel, (event, ...args) => func(...args));
    }
  },
});

/*=================================================================
  MENU ADDONS
=================================================================*/
// Insert menu addons data
contextBridge.exposeInMainWorld('context_bridge_menu_addons', {
  send: (channel, data) => {
    let validChannels = ['context_bridge_menu_addons'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  once: (channel, func) => {
    let validChannels = ['context_bridge_menu_addons_response'];
    if (validChannels.includes(channel)) {
      ipcRenderer.once(channel, (event, ...args) => func(...args));
    }
  },
});
