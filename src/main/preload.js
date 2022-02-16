const { channel } = require('diagnostics_channel');
const { contextBridge, ipcRenderer } = require('electron');

sendDataThroughMiddleware(
  'api', //Event Name
  'getSettingDataFromDB', // Channel Name
  'sendSettingDataFromMain' //Response
);

sendDataThroughMiddleware(
  'add_category', //Event Name
  'insertCategoryData', // Channel Name
  'after_insert_get_response' //Response
);

sendDataThroughMiddleware(
  'get_category', //Event Name
  'sendResponseForCategory', // Channel Name
  'sendCategoryData' //Response
);

// Delete Category
sendDataThroughMiddleware(
  'delete_category', //Event Name
  'delete_category', // Channel Name
  'delete_category_response' //Response
);

// Get parent category
sendDataThroughMiddleware(
  'parent_category', //Event Name
  'parent_category', // Channel Name
  'parent_category' //Response
);

// Add new addons - channel
sendDataThroughMiddleware(
  'add_addons', //Event Name
  'add_addons', // Channel Name
  'add_addons_response' //Response
);

// get addons list - channel
sendDataThroughMiddleware(
  'addons_list', //Event Name
  'addons_list', // Channel Name
  'addons_list_response' //Response
);

// Delete addons - channel
sendDataThroughMiddleware(
  'delete_addons', //Event Name
  'delete_addons', // Channel Name
  'delete_addons_response' //Response
);

// Add new foods - channel
sendDataThroughMiddleware(
  'add_new_foods', //Event Name
  'add_new_foods', // Channel Name
  'add_new_foods_response' //Response
);

// Get food list - channel
sendDataThroughMiddleware(
  'get_food_list', //Event Name
  'get_food_list', // Channel Name
  'get_food_list_response' //Response
);

// Delete foods - channel
sendDataThroughMiddleware(
  'delete_foods', //Event Name
  'delete_foods', // Channel Name
  'delete_foods_response' //Response
);

// Add foods variant - channel
sendDataThroughMiddleware(
  'add_new_foods_variant', //Event Name
  'add_new_foods_variant', // Channel Name
  'add_new_foods_variant_response' //Response
);

// Get food lists channel
sendDataThroughMiddleware(
  'food_lists_channel', //Event Name
  'food_lists_channel', // Channel Name
  'food_lists_response' //Response
);

// Delete foods variant - channel
sendDataThroughMiddleware(
  'delete_foods_variant', //Event Name
  'delete_foods_variant', // Channel Name
  'delete_foods_variant_response' //Response
);

// Get variant lists channel
sendDataThroughMiddleware(
  'variant_lists_channel', //Event Name
  'variant_lists_channel', // Channel Name
  'variant_lists_response' //Response
);

// Insert food available day & time channel
sendDataThroughMiddleware(
  'context_bridge_food_available_time', //Event Name
  'context_bridge_food_available_time', // Channel Name
  'context_bridge_food_available_time_response' //Response
);

// Get food available time lists
sendDataThroughMiddleware(
  'get_food_availability_lists_channel', //Event Name
  'get_food_availability_lists_channel', // Channel Name
  'get_food_availability_lists_channel_response' //Response
);

// Delete food available day & time list channel
sendDataThroughMiddleware(
  'channel_delete_food_available_day_time', //Event Name
  'channel_delete_food_available_day_time', // Channel Name
  'delete_food_available_day_time_response' //Response
);

/*=================================================================
  MENU TYPE
=================================================================*/
// Insert menu type data
sendDataThroughMiddleware(
  'context_bridge_menu_type', //Event Name
  'context_bridge_menu_type', // Channel Name
  'context_bridge_menu_type_response' //Response
);

// Get menu type data from the DB
sendDataThroughMiddleware(
  'get_menu_type_lists', //Event Name
  'get_menu_type_lists', // Channel Name
  'get_menu_type_lists_response' //Response
);

// Get only active menu types
sendDataThroughMiddleware(
  'get_active_menu_type_lists', //Event Name
  'get_active_menu_type_lists', // Channel Name
  'get_active_menu_type_lists_response' //Response
);

// Delete menu type from the DB
sendDataThroughMiddleware(
  'delete_menu_type_item', //Event Name
  'delete_menu_type_item', // Channel Name
  'delete_menu_type_item_response' //Response
);

/*=================================================================
  MENU ADDONS
=================================================================*/
// Insert menu addons data
sendDataThroughMiddleware(
  'context_bridge_menu_addons', //Event Name
  'context_bridge_menu_addons', // Channel Name
  'context_bridge_menu_addons_response' //Response
);

// Get menu addons as an Array from the DB
sendDataThroughMiddleware(
  'get_menu_add_on_lists_channel', //Event Name
  'get_menu_add_on_lists_channel', // Channel Name
  'get_menu_add_on_lists_channel_response' //Response
);

// Delete menu addons from the DB
sendDataThroughMiddleware(
  'delete_menu_addons_item', //Event Name
  'delete_menu_addons_item', // Channel Name
  'delete_menu_addons_item_response' //Response
);

// Get food lists as an Array from the DB only [product_id, product_name]
sendDataThroughMiddleware(
  'get_food_name_lists_channel', //Event Name
  'get_food_name_lists_channel', // Channel Name
  'get_food_name_lists_channel_response' //Response
);

// Get addons name list
sendDataThroughMiddleware(
  'get_addons_name_list', //Event Name
  'get_addons_name_list', // Channel Name
  'get_addons_name_list_response' //Response
);

// Insert Currency
sendDataThroughMiddleware(
  'insert_currency', //Event Name
  'insert_currency', // Channel Name
  'insert_currency_response' //Response
);

// Get currency list
sendDataThroughMiddleware(
  'get_currency_lists', //Event Name
  'get_currency_lists', // Channel Name
  'get_currency_lists_response' //Response
);

// Delete Currency Item
sendDataThroughMiddleware(
  'delete_currency_list_item', //Event Name
  'delete_currency_list_item', // Channel Name
  'delete_currency_list_item_response' //Response
);

/*======================================================================
  FUNCTION DECLARATIONS
========================================================================*/
/**
 * Used as middleware to communicate between main.js & nodejs
 *
 * @params string event name
 * @params string channel name
 * @params string response
 */
function sendDataThroughMiddleware(event, channel, response) {
  contextBridge.exposeInMainWorld(event, {
    send: (channel, data) => {
      let validChannels = [channel];
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, data);
      }
    },
    once: (channel, func) => {
      let validChannels = [response];
      if (validChannels.includes(channel)) {
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
  });
}
