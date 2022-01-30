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
