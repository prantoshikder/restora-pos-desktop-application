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
        // reject(Error('No settings found'));
        console.log('Getting database from error');
      }
    });
  });
};

/**
 * Insert data into the database based on event & channel
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
export const insertData = (event, channel) => {
  return new Promise((resolve, reject) => {
    channel.once(event, (insertCat) => {
      if (insertCat) {
        resolve(insertCat);
      } else {
        // reject(Error('No settings found'));
        console.log('Inserting data error');
      }
    });
  });
};

/**
 * Delete data from the database based on event & channel
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
export const deleteData = (event, channel) => {
  return new Promise((resolve, reject) => {
    channel.once(event, (insertCat) => {
      if (insertCat) {
        resolve(insertCat);
      } else {
        // reject(Error('No settings found'));
        console.log('Deleting data error');
      }
    });
  });
};

// First latter of a string uppercase
export const getWords = (string) => {
  const newString = string.charAt(0).toUpperCase() + string.slice(1);

  return newString;
};

export class CalculatePrice {
  constructor(settings, arrayData) {
    this.settings = settings;
    this.arrayData = arrayData;

    // initialize default value to avoid error
    this.settings.discount = 0;
    this.settings.totalVatBasedOnPrice = 0;
    this.settings.serviceCharge = 0;
    this.settings.vat = 0;
  }

  getTotalPrice() {
    if (Array.isArray(this.arrayData) && this.arrayData.length > 0) {
      return this.arrayData.reduce(
        (prevPrice, currentPrice) => prevPrice + currentPrice.total_price,
        0
      );
    } else {
      return 0;
    }
  }

  getVat() {
    if (this.settings?.vat) {
      return parseFloat(
        ((this.getTotalPrice() * this.settings.vat) / 100).toFixed(2)
      );
    } else {
      return 0;
    }
  }

  getServiceCharge() {
    if (this.settings?.service_chargeType === 'percent') {
      return parseFloat(
        ((this.getTotalPrice() * this.settings.servicecharge) / 100).toFixed(2)
      );
    } else {
      return this.settings?.servicecharge;
    }
  }

  getDiscountAmount() {
    // calculate if it has discount type & amount
    // 1 = amount (fixed), 2 = percent (%)
    if (this.settings.discount_type && this.settings.discountrate) {
      if (this.settings.discount_type === 1) {
        return parseFloat(this.settings.discountrate.toFixed(2));
      } else if (this.settings.discount_type === 2) {
        return parseFloat(
          (this.getTotalPrice() * this.settings.discountrate.toFixed(2)) / 100
        );
      }
    } else {
      return 0;
    }
  }

  getGrandTotal() {
    return (
      this.getTotalPrice() +
      this.getVat() +
      this.getServiceCharge() -
      this.getDiscountAmount()
    ).toFixed(2);
  }
}
