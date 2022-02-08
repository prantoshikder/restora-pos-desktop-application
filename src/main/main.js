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

// Insert Category item data
ipcMain.on('insertCategoryData', (event, args) => {
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

// Send category item data
ipcMain.on('sendResponseForCategory', (event, args) => {
  let { status } = args;

  if (status) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    let settingSqlQ = `select * from add_item_category`;

    db.serialize(() => {
      db.all(settingSqlQ, [], (err, rows) => {
        mainWindow.webContents.send('sendCategoryData', rows);
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
          status: true
        });
    });
  });

  db.close();
});

// Insert and update addons data to db
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
ipcMain.on('addons_list', (event, args) => {
  let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
  let { status } = args;
  let sql = `SELECT * FROM addons`;

  if (status) {
    db.serialize(() => {
      db.all(sql, [], (err, rows) => {
        mainWindow.webContents.send('addons_list_response', rows);
      });
    });
  }

  db.close();
});

// Delete addons from DB
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


// Insert and update foods to DB
ipcMain.on('add_new_foods', (event, args) => {
  console.log(args);
  let { category_name, kitchen_select, food_name, component, notes, description, food_image, vat, is_offer, special, custom_quantity, cooking_time, menu_type, food_status, offer_rate, offer_start_date, offer_end_date } = args;

  if (args.add_on_id !== undefined) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    db.serialize(() => {
      db.run(
        `INSERT OR REPLACE INTO item_foods (CategoryID, ProductName, ProductImage, component, descrip, itemnotes, menutype, productvat, special, OffersRate, offerIsavailable,
          offerstartdate, offerendate, kitchenid, is_customqty, cookedtime, ProductsIsActive)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [category_name, food_name, food_image, component, description, notes, menu_type, vat, special, offer_rate, is_offer, offer_start_date, offer_end_date, kitchen_select, custom_quantity, cooking_time, food_status],
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
  }
  else {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    db.serialize(() => {
      db.run(
        `CREATE TABLE IF NOT EXISTS item_foods (
          'ProductsID' INTEGER PRIMARY KEY AUTOINCREMENT,
          'CategoryID' INT NOT NULL,
          'ProductName' varchar(255),
          'ProductImage' varchar(200),
          'bigthumb' varchar(255),
          'medium_thumb' varchar(255),
          'small_thumb' varchar(255),
          'component' TEXT,
          'descrip' TEXT,
          'itemnotes' varchar(255),
          'menutype' varchar(25),
          'productvat' REAL DEFAULT 0.00,
          'special' INT,
          'OffersRate' INT,
          'offerIsavailable' INT,
          'offerstartdate' DATETIME ,
          'offerendate' DATETIME,
          'Position' INT,
          'kitchenid' INT,
          'isgroup' INT,
          'is_customqty' INT,
          'cookedtime' varchar(10),
          'ProductsIsActive' INT,
          'UserIDInserted' INT,
          'UserIDUpdated' INT,
          'UserIDLocked' INT,
          'DateInserted' DATETIME,
          'DateUpdated' DATETIME,
          'DateLocked' DATETIME,
          'tax0' TEXT,
          'tax1' TEXT
        )`
      ).run(
        `INSERT OR REPLACE INTO item_foods (CategoryID, ProductName, ProductImage, component, descrip, itemnotes, menutype, productvat, special, OffersRate, offerIsavailable,
          offerstartdate, offerendate, kitchenid, is_customqty, cookedtime, ProductsIsActive)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [category_name, food_name, food_image, component, description, notes, menu_type, vat, special, offer_rate, is_offer, offer_start_date, offer_end_date, kitchen_select, custom_quantity, cooking_time, food_status],
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


// Get all food list from DB
ipcMain.on('get_food_list', (event, args) => {
  let { status } = args
  let sql = `SELECT item_foods.ProductsID, add_item_category.category_name, item_foods.ProductName, item_foods.ProductImage, item_foods.component, item_foods.descrip, item_foods.itemnotes, item_foods.menutype,
  item_foods.productvat, item_foods.special, item_foods.OffersRate, item_foods.offerIsavailable, item_foods.offerstartdate, item_foods.offerendate,item_foods.kitchenid, item_foods.productvat, item_foods.ProductsIsActive,
  item_foods.is_customqty, item_foods.cookedtime, item_foods.ProductsIsActive
  FROM item_foods
  INNER JOIN add_item_category ON item_foods.CategoryID=add_item_category.category_id`

  if (status) {
    let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
    db.serialize(() => {
      db.all(sql, [], (err, rows) => {
        mainWindow.webContents.send('get_food_list_response', rows);
      });
    });
    db.close()
  }
})


// Delete food from DB
ipcMain.on('delete_foods', (event, args) => {
  let { id } = args
  let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
  db.serialize(() => {
    db.run(`DELETE FROM item_foods WHERE ProductsID = ?`, id, (err) => {
      err
        ? mainWindow.webContents.send('delete_foods_response', { "status": err })
        : mainWindow.webContents.send('delete_foods_response', {
          "status": true,
        });
    });
  });
  db.close();
})


// Insert and update foods variant
ipcMain.on('add_new_foods_variant', (event, args) => {

  let { foodName, variantName, price } = args;

  // if (args.add_on_id !== undefined) {
  //   let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
  //   db.serialize(() => {
  //     db.run(
  //       `INSERT OR REPLACE INTO variant (menuid, variantName, price)
  //       VALUES (?, ?, ?)`,
  //   [foodName, variantName, price],
  //   (err) => {
  //     err
  //       ? mainWindow.webContents.send('add_new_foods_variant_response', err.message)
  //       : mainWindow.webContents.send('add_new_foods_variant_response', { status: 'inserted' });
  //   }
  //     );
  //   });
  //   db.close();
  // }
  // else {
  //   console.log("else");
  let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS variant (
          'variantid' INTEGER PRIMARY KEY AUTOINCREMENT,
          'menuid' INT NOT NULL,
          'variantName' varchar(120) NOT NULL,
          'price' REAL NOT NULL
        )`
    ).run(
      `INSERT OR REPLACE INTO variant (menuid, variantName, price)
          VALUES (?, ?, ?)`,
      [foodName, variantName, price],
      (err) => {
        err
          ? mainWindow.webContents.send('add_new_foods_variant_response', err.message)
          : mainWindow.webContents.send('add_new_foods_variant_response', { status: 'inserted' });
      }
    );
  });
  db.close();
  // }
});


// Delete variant from DB
ipcMain.on('delete_foods_variant', (event, args) => {
  console.log(args);
  let { id } = args
  let db = new sqlite3.Database(`${dbPath}/restora-pos.db`);
  db.serialize(() => {
    db.run(`DELETE FROM variant WHERE variantid = ?`, id, (err) => {
      err
        ? mainWindow.webContents.send('delete_foods_variant_response', { "status": err })
        : mainWindow.webContents.send('delete_foods_variant_response', { "status": true });
    });
  });
  db.close();
})



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
