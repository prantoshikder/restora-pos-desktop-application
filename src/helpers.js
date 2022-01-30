export const getApplicationSettingsData = (event) => {
  return new Promise((resolve, reject) => {
    window.api.once(event, (settingsData) => {
      if (settingsData[0]) {
        resolve(settingsData[0]);
      } else {
        reject(Error('No settings found'));
      }
    });
  });
};
