/*
 * Helper function definitions for fetching, updating, deleting & inserting data
 * @package restora-pos-desktop
 * @subpackage helper-functions
 * @since Restora POS Desktop 1.0.0
 */

/**
 * Fetch data from the database based on event & channel
 * Event must be unique and channel name too.
 * All the channels name is declared in the preload.js file in the main folder
 * And event is declared in the main.js in the main folder
 * This function returns a promise of object or an array if promise resolves
 *
 * @return promise
 *
 * @params string event
 * @params object channel
 */
export const getDataFromDatabase = (event, channel) => {
  return new Promise((resolve, reject) => {
    channel.once(event, (data) => {
      if (data) {
        resolve(data);
      } else {
        reject(Error('No settings found'));
      }
    });
  });
};

/**
 * Insert data into the database based on event & channel
 * Event must be unique and channel name too.
 * All the channels name is declared in the preload.js file in the main folder
 * And event is declard in the main.js in the mian folder
 * This function returns a promise of object or an array if promise resolves
 *
 * @return promise
 *
 * @params string event
 * @params object channel
 */
export const insertData = (event, channel) => {
  return new Promise((resolve, reject) => {
    channel.once(event, (insertCat) => {
      if (insertCat) {
        resolve(insertCat);
      } else {
        reject(Error('No settings found'));
      }
    });
  });
};

/**
 * Delete data from the database based on event & channel
 * Event must be unique and channel name too.
 * All the channels name is declared in the preload.js file in the main folder
 * And event is declard in the main.js in the mian folder
 * This function returns a promise of object or an array if promise resolves
 *
 * @return promise
 *
 * @params string event
 * @params object channel
 */
export const deleteData = (event, channel) => {
  return new Promise((resolve, reject) => {
    channel.once(event, (insertCat) => {
      if (insertCat) {
        resolve(insertCat);
      } else {
        reject(Error('No settings found'));
      }
    });
  });
};

// import electron from 'electron';
// const path = require('path');

// Importing dialog module using remote
// const dialog = electron.remote.dialog;

export const uploadMedia = () => {
  // If the platform is 'win' or 'Linux'
  if (process.platform !== 'darwin') {
    // Resolves to a Promise<Object>
    dialog
      .showOpenDialog({
        title: 'Select the File to be uploaded',
        defaultPath: path.join(__dirname, '../assets/'),
        buttonLabel: 'Upload',
        // Restricting the user to only Text Files.
        filters: [
          {
            name: 'Text Files',
            extensions: ['txt', 'docx'],
          },
        ],
        // Specifying the File Selector Property
        properties: ['openFile'],
      })
      .then((file) => {
        // Stating whether dialog operation was
        // cancelled or not.
        console.log('file.canceled', file.canceled);
        if (!file.canceled) {
          // Updating the GLOBAL filepath variable
          // to user-selected file.
          global.filepath = file.filePaths[0].toString();
          console.log('global.filepath', global.filepath);
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
  }
};
