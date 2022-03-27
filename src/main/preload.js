const { channel } = require('diagnostics_channel');
const { contextBridge, ipcRenderer } = require('electron');

// Insert settings data
sendDataThroughMiddleware(
  'insert_settings', //Event Name
  'insert_settings', // Channel Name
  'insert_settings_response' //Response
);

// Get Settings for the application settings to display them in the fields
sendDataThroughMiddleware(
  'get_app_settings', //Event Name
  'get_app_settings', // Channel Name
  'get_app_settings_response' //Response
);

// Get Settings for UI
sendDataThroughMiddleware(
  'get_settings', //Event Name
  'get_settings', // Channel Name
  'get_settings_response' //Response
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

// Get sub-category list
sendDataThroughMiddlewareOn(
  'get_sub_category_list', //Event Name
  'get_sub_category_list', // Channel Name
  'get_sub_category_list_response' //Response
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

// Get food list for the POS
sendDataThroughMiddleware(
  'get_food_list_pos', //Event Name
  'get_food_list_pos', // Channel Name
  'get_food_list_pos_response' //Response
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

// Get food lists as an Array from the DB only [id, product_name]
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

// Get addons name list
sendDataThroughMiddleware(
  'get_addons_list_for_pos', //Event Name
  'get_addons_list_for_pos', // Channel Name
  'get_addons_list_for_pos_response' //Response
);

/*============================================
  CURRENCY
==============================================*/
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

// Insert Customer Info
sendDataThroughMiddleware(
  'insert_customer_info', //Event Name
  'insert_customer_info', // Channel Name
  'insert_customer_info_response' //Response
);

sendDataThroughMiddleware(
  'get_customer_names', //Event Name
  'get_customer_names', // Channel Name
  'get_customer_names_response' //Response
);

sendDataThroughMiddlewareOn(
  'get_addons_and_variant', //Event Name
  'get_addons_and_variant', // Channel Name
  'get_addons_and_variant_response' //Response
);

// Insert order info
sendDataThroughMiddlewareOn(
  'insert_order_info', //Event Name
  'insert_order_info', // Channel Name
  'insert_order_info_response' //Response
);

// Get all orders info
sendDataThroughMiddlewareOn(
  'get_all_order_info_ongoing', //Event Name
  'get_all_order_info_ongoing', // Channel Name
  'get_all_order_info_ongoing_response' //Response
);

// Update orders info
sendDataThroughMiddlewareOn(
  'update_order_info_ongoing', //Event Name
  'update_order_info_ongoing', // Channel Name
  'update_order_info_ongoing_response' //Response
);

// Update orders info after edit
sendDataThroughMiddlewareOn(
  'update_order_info_after_edit', //Event Name
  'update_order_info_after_edit', // Channel Name
  'update_order_info_after_edit_response' //Response
);

// Get today's completed orders
sendDataThroughMiddlewareOn(
  'get_todays_completed_orders', //Event Name
  'get_todays_completed_orders', // Channel Name
  'get_todays_completed_orders_response' //Response
);

// Get sales report
sendDataThroughMiddlewareOn(
  'get_all_order_for_sales_report',
  'get_all_order_for_sales_report',
  'get_all_order_for_sales_report_response'
)

// Get item sales report
sendDataThroughMiddlewareOn(
  'get_order_info_for_item_sales_report',
  'get_order_info_for_item_sales_report',
  'get_order_info_for_item_sales_report_response'
)


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

function sendDataThroughMiddlewareOn(event, channel, response) {
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
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
  });
}
