import { app, BrowserWindow, ipcMain, shell } from 'electron';
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';
import path from 'path';
import 'regenerator-runtime/runtime';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
const sqlite3 = require('sqlite3').verbose();

var dbPath = app.getPath('userData');

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDevelopment) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDevelopment) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths) => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.maximize();

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

// Get parent category data
ipcMain.on('parent_category', (event, args) => {
  if (args.status) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    db.serialize(() => {
      let sql = `SELECT category_id, category_name, parent_id, category_is_active FROM add_item_category`;
      db.all(sql, [], (err, rows) => {
        mainWindow.webContents.send('parent_category', rows);
      });
    });

    db.close();
  }
});

// This is for settings
ipcMain.on('getSettingDataFromDB', (event, args) => {
  let { status } = args;

  let settingSqlQ = `select * from setting`;

  if (status) {
    // Create DB connection
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    db.serialize(() => {
      db.all(settingSqlQ, [], (err, rows = []) => {
        try {
          if (rows[0] !== undefined && Object.keys(rows[0])) {
            mainWindow.webContents.send('sendSettingDataFromMain', rows[0]);
          } else {
            rows[0] = {};
          }
        } catch (error) {
          console.log('Settings error', error);
        }
      });
    });
    // DB connection close
    db.close();
  } else {
    let {
      title,
      storename,
      address,
      email,
      phone,
      logo,
      favcon,
      opentime,
      closetime,
      vat,
      vattinno,
      discount_type,
      discountrate,
      servicecharge,
      service_chargeType,
      currency,
      min_prepare_time,
      language,
      timezone,
      dateformat,
      site_align,
      powerbytxt,
      footer_text,
    } = args;
    // Create DB connection
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);

    db.serialize(() => {
      db.run(`DROP TABLE IF EXISTS setting`)
        .run(
          `CREATE TABLE IF NOT EXISTS setting (
          "id" INTEGER PRIMARY KEY AUTOINCREMENT,
          "title" varchar(255),
          "storename" varchar(100),
          "address" TEXT,
          "email" varchar(255),
          "phone" varchar(25),
          "logo" varchar(255),
          "favicon" varchar(100),
          "opentime" varchar(255),
          "closetime" varchar(255),
          "vat" REAL,
          "vattinno" varchar(30),
          "discount_type" INT,
          "discountrate" REAL,
          "servicecharge" REAL,
          "service_chargeType" INT,
          "currency" INT,
          "min_prepare_time" varchar(50),
          "language" varchar(100),
          "timezone" varchar(150),
          "dateformat" TEXT,
          "site_align" varchar(50),
          "powerbytxt" TEXT,
          "footer_text" varchar(255)
        )`
        )
        .run(
          `INSERT INTO setting
          ( title, storename, address, email, phone, logo, favicon, opentime, closetime, vat, vattinno, discount_type, discountrate, servicecharge, service_chargeType,
            currency, min_prepare_time, language, timezone, dateformat, site_align, powerbytxt, footer_text )
          VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`,
          [
            title,
            storename,
            address,
            email,
            phone,
            logo,
            favcon,
            opentime,
            closetime,
            vat,
            vattinno,
            discount_type,
            discountrate,
            servicecharge,
            service_chargeType,
            currency,
            min_prepare_time,
            language,
            timezone,
            dateformat,
            site_align,
            powerbytxt,
            footer_text,
          ],
          function (err) {
            if (err) {
              console.log('Error message settings table ', err.message);
              return;
            }

            console.log(`row inserted ${this.applicationTitle}`);
          }
        );
    });

    // DB connection close
    db.close();
  }
});

// Insert and Update Category data
ipcMain.on('insertCategoryData', (event, args) => {
  console.log('cat img', JSON.parse(args.category_image));
  let {
    category_name,
    parent_id,
    category_image,
    category_icon,
    category_is_active,
    offer_start_date,
    offer_end_date,
    category_color,
  } = args;
  let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);

  if (args.category_id !== undefined) {
    db.serialize(() => {
      db.run(
        `INSERT OR REPLACE INTO add_item_category ( category_id, category_name, parent_id, category_image, category_icon, category_is_active, offer_start_date, offer_end_date, category_color )
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          args.category_id,
          category_name,
          parent_id,
          category_image,
          category_icon,
          category_is_active,
          offer_start_date,
          offer_end_date,
          category_color,
        ],
        (err) => {
          err
            ? mainWindow.webContents.send(
                'after_insert_get_response',
                err.message
              )
            : mainWindow.webContents.send('after_insert_get_response', {
                status: 'updated',
              });
        }
      );
    });
  } else {
    db.serialize(() => {
      db.run(
        `CREATE TABLE IF NOT EXISTS add_item_category (
          'category_id' INTEGER PRIMARY KEY AUTOINCREMENT,
          'category_name' varchar(255),
          'category_image' varchar(255),
          'position' INT,
          'category_is_active' INT,
          'offer_start_date' DATE ,
          'offer_end_date' DATE,
          'isoffer' INT,
          'category_color' varchar(50),
          'category_icon' varchar(255),
          'parent_id' INT,
          'user_id_inserted' INT,
          'user_id_updated' INT,
          'user_id_locked' INT,
          'date_inserted' DATETIME,
          'date_updated' DATETIME,
          'date_locked' DATETIME
        )`
      ).run(
        `INSERT OR REPLACE INTO add_item_category ( category_name, parent_id, category_image, category_icon, category_is_active, offer_start_date, offer_end_date, category_color )
         VALUES (?, ?, ?, ?, ?, ?, ?, ? )`,
        [
          category_name,
          parent_id,
          category_image,
          category_icon,
          category_is_active,
          offer_start_date,
          offer_end_date,
          category_color,
        ],
        (err) => {
          err
            ? mainWindow.webContents.send(
                'after_insert_get_response',
                err.message
              )
            : mainWindow.webContents.send('after_insert_get_response', {
                status: 'inserted',
              });
        }
      );
    });
  }

  db.close();
});

// Get all category list
ipcMain.on('sendResponseForCategory', (event, args) => {
  let { status } = args;

  if (status) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    let db2 = new sqlite3.Database(`${dbPath}/restora-pos.db`);

    let sqlQ = `SELECT * FROM add_item_category WHERE parent_id IS NULL`;
    let sqlQ2 = `SELECT * FROM add_item_category WHERE parent_id IS NOT NULL`;

    db.serialize(() => {
      db.all(sqlQ, [], (err, categories) => {
        db2.all(sqlQ2, [], (err, sub_categories) => {
          sub_categories.map((s) => {
            categories.map((c) => {
              if (c.category_id === s.parent_id) {
                let sub_cat = {
                  category_id: s.category_id,
                  category_name: s.category_name,
                  category_image: s.category_image,
                  category_is_active: s.category_is_active,
                  category_color: s.category_color,
                  parent_id: s.parent_id,
                  category_icon: s.category_icon,
                  parent_cat: c.category_name,
                };

                if (Array.isArray(c.subCategories)) {
                  c.subCategories.push(sub_cat);
                } else {
                  c.subCategories = [{ ...sub_cat }];
                }
              }
            });
          });
        });

        db2.close();
        setTimeout(() => {
          mainWindow.webContents.send('sendCategoryData', categories);
        }, 1000);
      });
    });

    db.close();
  }
});

// Delete category data
ipcMain.on('delete_category', (event, args) => {
  let { id } = args;
  let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
  db.serialize(() => {
    db.run(`DELETE FROM add_item_category WHERE category_id = ?`, id, (err) => {
      err
        ? mainWindow.webContents.send('delete_category_response', {
            status: err,
          })
        : mainWindow.webContents.send('delete_category_response', {
            status: true,
          });
    });
  });

  db.close();
});

// Insert and update addons data
ipcMain.on('add_addons', (event, args) => {
  let { add_on_name, price, is_active } = args;

  if (args.add_on_id !== undefined) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    db.serialize(() => {
      db.run(
        `INSERT OR REPLACE INTO addons ( add_on_id, add_on_name, price, is_active ) VALUES ( ?, ?, ?, ?)`,
        [args.add_on_id, add_on_name, price, is_active],
        (err) => {
          err
            ? mainWindow.webContents.send('add_addons_response', err.message)
            : mainWindow.webContents.send('add_addons_response', {
                status: 'updated',
              });
        }
      );
    });
    db.close();
  } else {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    db.serialize(() => {
      db.run(
        `CREATE TABLE IF NOT EXISTS addons (
        "add_on_id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "add_on_name" varchar(255),
        "price" REAL,
        "is_active" INT,
        "tax0" TEXT,
        "tax1" TEXT
            )`
      ).run(
        `INSERT OR REPLACE INTO addons ( add_on_name, price, is_active ) VALUES ( ?, ?, ?)`,
        [add_on_name, price, is_active],
        (err) => {
          err
            ? mainWindow.webContents.send('add_addons_response', err.message)
            : mainWindow.webContents.send('add_addons_response', {
                status: 'inserted',
              });
        }
      );
    });
    db.close();
  }
});

// Get all addons from DB
getListItems('addons_list', 'addons_list_response', 'addons');

// Delete addons data
deleteListItem(
  'delete_addons', //channel name
  'delete_addons_response', //response event,
  'addons' //table name
);

ipcMain.on('delete_addons', (event, args) => {
  let { id } = args;
  let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
  db.serialize(() => {
    db.run(`DELETE FROM addons WHERE add_on_id = ?`, id, (err) => {
      err
        ? mainWindow.webContents.send('delete_addons_response', { status: err })
        : mainWindow.webContents.send('delete_addons_response', {
            status: true,
          });
    });
  });
  db.close();
});

/*==================================================================

==================================================================*/
// Insert and update foods to DB
ipcMain.on('add_new_foods', (event, args) => {
  let {
    category_name,
    kitchen_select,
    food_name,
    component,
    notes,
    description,
    food_image,
    vat,
    is_offer,
    special,
    custom_quantity,
    cooking_time,
    menu_type,
    food_status,
    offer_rate,
    offer_start_date,
    offer_end_date,
  } = args;

  if (args.id !== undefined) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    db.serialize(() => {
      db.run(
        `INSERT OR REPLACE INTO item_foods (id, category_id, product_name, product_image, component, description, item_note, menu_type, product_vat, special, offers_rate, offer_is_available, offer_start_date, offer_end_date, kitchen_id, is_custom_quantity, cooked_time, is_active)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          args.id,
          category_name,
          food_name,
          food_image,
          component,
          description,
          notes,
          menu_type,
          vat,
          special,
          offer_rate,
          is_offer,
          offer_start_date,
          offer_end_date,
          kitchen_select,
          custom_quantity,
          cooking_time,
          food_status,
        ],
        (err) => {
          err
            ? mainWindow.webContents.send('add_new_foods_response', err.message)
            : mainWindow.webContents.send('add_new_foods_response', {
                status: 'updated',
              });
        }
      );
    });
    db.close();
  } else {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    db.serialize(() => {
      db.run(
        `CREATE TABLE IF NOT EXISTS item_foods (
          'id' INTEGER PRIMARY KEY AUTOINCREMENT,
          'category_id' INT NOT NULL,
          'product_name' varchar(255),
          'product_image' varchar(200),
          'big_thumb' varchar(255),
          'medium_thumb' varchar(255),
          'small_thumb' varchar(255),
          'component' TEXT,
          'description' TEXT,
          'item_note' varchar(255),
          'menu_type' varchar(25),
          'product_vat' REAL DEFAULT 0.00,
          'special' INT,
          'offers_rate' INT,
          'offer_is_available' INT,
          'offer_start_date' DATETIME ,
          'offer_end_date' DATETIME,
          'position' INT,
          'kitchen_id' INT,
          'is_group' INT,
          'is_custom_quantity' INT,
          'cooked_time' varchar(10),
          'is_active' INT,
          'user_id_inserted' INT,
          'user_id_updated' INT,
          'user_id_locked' INT,
          'date_inserted' DATETIME,
          'date_updated' DATETIME,
          'date_locked' DATETIME,
          'tax0' TEXT,
          'tax1' TEXT
        )`
      ).run(
        `INSERT OR REPLACE INTO item_foods (category_id, product_name, product_image, component, description, item_note, menu_type, product_vat, special, offers_rate, offer_is_available,
          offer_start_date, offer_end_date, kitchen_id, is_custom_quantity, cooked_time, is_active)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          category_name,
          food_name,
          food_image,
          component,
          description,
          notes,
          menu_type,
          vat,
          special,
          offer_rate,
          is_offer,
          offer_start_date,
          offer_end_date,
          kitchen_select,
          custom_quantity,
          cooking_time,
          food_status,
        ],
        (err) => {
          err
            ? mainWindow.webContents.send('add_new_foods_response', err.message)
            : mainWindow.webContents.send('add_new_foods_response', {
                status: 'inserted',
              });
        }
      );
    });
    db.close();
  }
});

// Get all foods list
ipcMain.on('get_food_list', (event, args) => {
  let { status } = args;
  let sql = `SELECT item_foods.id, item_foods.category_id, add_item_category.category_name, item_foods.product_name, item_foods.product_image, item_foods.component, item_foods.description, item_foods.item_note, item_foods.menu_type,
  item_foods.product_vat, item_foods.special, item_foods.offers_rate, item_foods.offer_is_available, item_foods.offer_start_date, item_foods.offer_end_date,item_foods.kitchen_id, item_foods.product_vat, item_foods.is_active,
  item_foods.is_custom_quantity, item_foods.cooked_time, item_foods.is_active
  FROM item_foods
  INNER JOIN add_item_category ON item_foods.category_id=add_item_category.category_id`;

  if (status) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    db.serialize(() => {
      db.all(sql, [], (err, rows) => {
        mainWindow.webContents.send('get_food_list_response', rows);
      });
    });
    db.close();
  }
});

// Delete food
deleteListItem(
  'delete_foods', //channel name
  'delete_foods_response', //response event,
  'item_foods' //table name
);

// Get only food lists as an Array for (Food Availability)
getListItems(
  'food_lists_channel',
  'food_lists_response',
  'item_foods',
  'id, product_name',
  true
);

/*==================================================================
  MENU TYPE - in the add food item
==================================================================*/
getListItems(
  'get_menu_type_list',
  'get_menu_type_list_response',
  'menu_type',
  'id, menu_type',
  true
);

/*==================================================================
  FOOD VARIANT
==================================================================*/
// Insert and update foods variant
ipcMain.on('add_new_foods_variant', (event, args) => {
  let { food_id, food_variant, food_price } = args;

  if (args.id !== undefined) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);

    db.serialize(() => {
      db.run(
        `INSERT OR REPLACE INTO variants (id, food_id, variant_name, price)
        VALUES (?, ?, ?, ?)`,
        [args.id, food_id, food_variant, Number(food_price)],
        (err) => {
          err
            ? mainWindow.webContents.send(
                'add_new_foods_variant_response',
                err.message
              )
            : mainWindow.webContents.send('add_new_foods_variant_response', {
                status: 'updated',
              });
        }
      );
    });
    db.close();
  } else {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    db.serialize(() => {
      db.run(
        `CREATE TABLE IF NOT EXISTS variants (
          'id' INTEGER PRIMARY KEY AUTOINCREMENT,
          'food_id' INT,
          'variant_name' varchar(255),
          'price' REAL
        )`
      ).run(
        `INSERT OR REPLACE INTO variants (food_id, variant_name, price)
          VALUES (?, ?, ?)`,
        [food_id, food_variant, Number(food_price)],
        (err) => {
          err
            ? mainWindow.webContents.send(
                'add_new_foods_variant_response',
                err.message
              )
            : mainWindow.webContents.send('add_new_foods_variant_response', {
                status: 'inserted',
              });
        }
      );
    });
    db.close();
  }
});

// get all variant list from DB
ipcMain.on('variant_lists_channel', (event, args) => {
  if (args.status) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    let sql = `SELECT variants.id,  variants.variant_name,  variants.price, variants.food_id, item_foods.product_name
    FROM variants
    INNER JOIN item_foods ON variants.food_id=item_foods.id`;
    db.serialize(() => {
      db.all(sql, [], (err, rows) => {
        console.log(rows);
        mainWindow.webContents.send('variant_lists_response', rows);
      });
    });
    db.close();
  }
});

// Delete variant from DB
deleteListItem(
  'delete_foods_variant', //channel name
  'delete_foods_variant_response', //response event,
  'variants' //table name
);

/*==================================================================
  FOOD AVAILABILITY
==================================================================*/
// Insert Food availability data
// Insert and update foods variant
ipcMain.on('context_bridge_food_available_time', (event, args) => {
  let { food_id, avail_day, avail_time, is_active } = args;

  if (args.id !== undefined) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    console.log('updated', args);

    db.serialize(() => {
      db.run(
        `INSERT OR REPLACE INTO food_variable (id, food_id, avail_day, avail_time, is_active)
        VALUES (?, ?, ?, ?, ?)`,
        [args.id, food_id, avail_day, avail_time, is_active],
        (err) => {
          err
            ? mainWindow.webContents.send(
                'context_bridge_food_available_time_response',
                err.message
              )
            : mainWindow.webContents.send(
                'context_bridge_food_available_time_response',
                {
                  status: 'updated',
                }
              );
        }
      );
    });
    db.close();
  } else {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    db.serialize(() => {
      db.run(
        `CREATE TABLE IF NOT EXISTS food_variable (
          'id' INTEGER PRIMARY KEY AUTOINCREMENT,
          'food_id' INT,
          'avail_day' varchar(30),
          'avail_time' varchar(50),
          'is_active' INT
        )`
      ).run(
        `INSERT OR REPLACE INTO food_variable (food_id, avail_day, avail_time, is_active)
          VALUES (?, ?, ?, ?)`,
        [food_id, avail_day, avail_time, is_active],
        (err) => {
          err
            ? mainWindow.webContents.send(
                'context_bridge_food_available_time_response',
                err.message
              )
            : mainWindow.webContents.send(
                'context_bridge_food_available_time_response',
                {
                  status: 'inserted',
                }
              );
        }
      );
    });
    db.close();
  }
});

ipcMain.on('get_food_availability_lists_channel', (event, args) => {
  if (args.status) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);

    let sql = `SELECT food_variable.*, item_foods.product_name FROM food_variable, item_foods WHERE food_variable.food_id == item_foods.id`;
    db.serialize(() => {
      db.all(sql, [], (err, rows) => {
        mainWindow.webContents.send(
          'get_food_availability_lists_channel_response',
          rows
        );
      });
    });

    db.close();
  }
});

// Delete food available day & time list channel from
deleteListItem(
  'channel_delete_food_available_day_time', //channel name
  'delete_food_available_day_time_response', //response event,
  'food_variable' //table name
);

/*==================================================================
  MENU TYPE
====================================================================*/
// Insert Menu type
ipcMain.on('context_bridge_menu_type', (event, args) => {
  let { id, menu_type, menu_icon, is_active } = args;

  // Execute if the event has menu type ID. It is used to update a specific item
  if (args.id !== undefined) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);

    db.serialize(() => {
      db.run(
        `INSERT OR REPLACE INTO menu_type (id, menu_type, menu_icon, is_active)
        VALUES (?, ?, ?, ?)`,
        [id, menu_type, menu_icon, is_active],
        (err) => {
          err
            ? mainWindow.webContents.send(
                'context_bridge_menu_type_response',
                err.message
              )
            : mainWindow.webContents.send('context_bridge_menu_type_response', {
                status: 'updated',
              });
        }
      );
    });
    db.close();
  } else {
    // Execute if it is new and then insert it
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    db.serialize(() => {
      db.run(
        `CREATE TABLE IF NOT EXISTS menu_type (
          'id' INTEGER PRIMARY KEY AUTOINCREMENT,
          'menu_type' varchar(120),
          'menu_icon' varchar(150),
          'is_active' INT
        )`
      ).run(
        `INSERT OR REPLACE INTO menu_type (menu_type, menu_icon, is_active)
          VALUES (?, ?, ?)`,
        [menu_type, menu_icon, is_active],
        (err) => {
          err
            ? mainWindow.webContents.send(
                'context_bridge_menu_type_response',
                err.message
              )
            : mainWindow.webContents.send('context_bridge_menu_type_response', {
                status: 'inserted',
              });
        }
      );
    });
    db.close();
  }
});

// Get menu type lists as an Array
getListItems(
  'get_menu_type_lists',
  'get_menu_type_lists_response',
  'menu_type'
);

// Get menu_type only is_active items & id, menu_type etc.
getListItems(
  'get_active_menu_type_lists',
  'get_active_menu_type_lists_response',
  'menu_type',
  'menu_type',
  true
);

//Delete menu type from the DB
deleteListItem(
  'delete_menu_type_item', //channel name
  'delete_menu_type_item_response', //response event,
  'menu_type' //table name
);

/*==================================================================
  MENU ADDONS
==================================================================*/
// Insert menu addons
ipcMain.on('context_bridge_menu_addons', (event, args) => {
  let { id, menu_id, add_on_id, is_active } = args;

  // Execute if the event has row ID / data ID. It is used to update a specific item
  if (args.id !== undefined) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);

    db.serialize(() => {
      db.run(
        `INSERT OR REPLACE INTO menu_add_on (id, menu_id, add_on_id, is_active)
        VALUES (?, ?, ?, ?)`,
        [id, menu_id, add_on_id, is_active],
        (err) => {
          err
            ? mainWindow.webContents.send(
                'context_bridge_menu_addons_response',
                err.message
              )
            : mainWindow.webContents.send(
                'context_bridge_menu_addons_response',
                {
                  status: 'updated',
                }
              );
        }
      );
    });
    db.close();
  } else {
    // Execute if it is new, then insert it
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    db.serialize(() => {
      db.run(
        `CREATE TABLE IF NOT EXISTS menu_add_on (
          'id' INTEGER PRIMARY KEY AUTOINCREMENT,
          'menu_id' INT,
          'add_on_id' INT,
          'is_active' INT
        )`
      ).run(
        `INSERT OR REPLACE INTO menu_add_on (menu_id, add_on_id, is_active)
          VALUES (?, ?, ?)`,
        [menu_id, add_on_id, is_active],
        (err) => {
          err
            ? mainWindow.webContents.send(
                'context_bridge_menu_addons_response',
                err.message
              )
            : mainWindow.webContents.send(
                'context_bridge_menu_addons_response',
                {
                  status: 'inserted',
                }
              );
        }
      );
    });
    db.close();
  }
});

// Get addons lists as an Array
getListItems(
  'get_menu_add_on_lists_channel',
  'get_menu_add_on_lists_channel_response',
  'menu_add_on',
  'id, menu_id, add_on_id'
);

//Delete menu addons from the DB
deleteListItem(
  'delete_menu_addons_item', //channel name
  'delete_menu_addons_item_response', //response event,
  'menu_add_on' //table name
);

// Get addons lists in names as an Array
getListItems(
  'get_addons_name_list',
  'get_addons_name_list_response',
  'addons',
  'add_on_id, add_on_name',
  true
);

// Get food lists as an Array from the DB only [id, product_name]
getListItems(
  'get_food_name_lists_channel',
  'get_food_name_lists_channel_response',
  'item_foods',
  'id, product_name',
  true
);

// Get Currency Lists
getListItems('get_currency_lists', 'get_currency_lists_response', 'currency');

deleteListItem(
  'delete_currency_list_item', //channel name
  'delete_currency_list_item_response', //response event,
  'currency' //table name
);

// const columns
insertData(
  'insert_currency', //Event Name
  'insert_currency_response', //Event response
  'currency', //Table name
  'currency_name, currency_icon, position, currency_rate' //columns name
);

/*===================================================
  New Customer Name in to POS
=====================================================*/
// Insert New Customer Info
ipcMain.on('insert_customer_info', (event, args) => {
  let {
    id,
    customer_name,
    customer_email,
    customer_phone,
    customer_address,
    is_active,
  } = args;

  // Execute if the event has row ID / data ID. It is used to update a specific item
  if (args.id !== undefined) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);

    db.serialize(() => {
      db.run(
        `INSERT OR REPLACE INTO customer_info (id, customer_name, customer_email, customer_phone, customer_address)
        VALUES (?, ?, ?, ?, ?)`,
        [id, customer_name, customer_email, customer_phone, customer_address],
        (err) => {
          err
            ? mainWindow.webContents.send(
                'insert_customer_info_response',
                err.message
              )
            : mainWindow.webContents.send('insert_customer_info_response', {
                status: 'updated',
              });
        }
      );
    });
    db.close();
  } else {
    // Execute if it is new, then insert it
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    db.serialize(() => {
      db.run(
        `CREATE TABLE IF NOT EXISTS customer_info (
          'id' INTEGER PRIMARY KEY AUTOINCREMENT,
          'customer_name' varchar(150),
          'customer_email' varchar(100),
          'customer_phone' varchar(200),
          'customer_address' varchar(250)
        )`
      ).run(
        `INSERT OR REPLACE INTO customer_info (customer_name, customer_email, customer_phone, customer_address)
          VALUES (?, ?, ?, ?)`,
        [customer_name, customer_email, customer_phone, customer_address],
        (err) => {
          err
            ? mainWindow.webContents.send(
                'insert_customer_info_response',
                err.message
              )
            : mainWindow.webContents.send('insert_customer_info_response', {
                status: 'inserted',
              });
        }
      );
    });
    db.close();
  }
});

// Get Customer names as an Array
getListItems(
  'get_customer_names',
  'get_customer_names_response',
  'customer_info',
  'id, customer_name'
);

/*==================================================================
  FUNCTIONS DEFINITIONS
==================================================================*/
/**
 *
 *
 * @params string event name
 * @params string event response
 * @params string database table name
 * @params string event name
 */
function insertData(eventName, eventResponse, table, columns) {
  ipcMain.on(eventName, (event, args) => {
    let { id, currency_name, currency_icon, position, currency_rate } = args;
    console.log(columns);

    // Execute if the event has row ID / data ID. It is used to update a specific item
    if (args.id !== undefined) {
      let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);

      db.serialize(() => {
        db.run(
          `INSERT OR REPLACE INTO ${table} (id, currency_name, currency_icon, position, currency_rate)
          VALUES (?, ?, ?, ?, ?)`,
          [id, currency_name, currency_icon, position, currency_rate],
          (err) => {
            err
              ? mainWindow.webContents.send(eventResponse, err.message)
              : mainWindow.webContents.send(eventResponse, {
                  status: 'updated',
                });
          }
        );
      });
      db.close();
    } else {
      // Execute if it is new, then insert it
      let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
      db.serialize(() => {
        db.run(
          `CREATE TABLE IF NOT EXISTS ${table} (
            'id' INTEGER PRIMARY KEY AUTOINCREMENT,
            'currency_name' varchar(50),
            'currency_icon' varchar(50),
            'position' INT,
            'currency_rate' real
          )`
        ).run(
          `INSERT OR REPLACE INTO ${table} (${columns})
            VALUES (?, ?, ?, ?)`,
          [currency_name, currency_icon, position, currency_rate],
          (err) => {
            console.log('curr insert err', err);
            err
              ? mainWindow.webContents.send(eventResponse, err.message)
              : mainWindow.webContents.send(eventResponse, {
                  status: 'inserted',
                });
          }
        );
      });
      db.close();
    }
  });
}

/**
 * Delete single item from the database based on the ID
 *
 * @params string channel name
 * @params string event response
 * @params string database table name
 * */
function deleteListItem(channel, eventResponse, table) {
  ipcMain.on(channel, (event, args) => {
    let { id } = args;
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);

    db.serialize(() => {
      db.run(`DELETE FROM ${table} WHERE id = ?`, id, (err) => {
        err
          ? mainWindow.webContents.send(eventResponse, {
              status: err,
            })
          : mainWindow.webContents.send(eventResponse, {
              status: true,
            });
      });
    });
    db.close();
  });
}

// Get addons lists in names as an Array
function getListItems(channelName, response, table, query = '*', condition) {
  ipcMain.on(channelName, (event, args) => {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    let { status } = args;
    let sql = `SELECT ${query} FROM ${table} ${
      condition && 'WHERE is_active = 1'
    }`;

    if (status) {
      db.serialize(() => {
        db.all(sql, [], (err, rows) => {
          mainWindow.webContents.send(response, rows);
        });
      });
    }

    db.close();
  });
}

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
