var sqlite3 = require('sqlite3').verbose();

// var db = new sqlite3.Database("./bhojon.sqlite");

// db.serialize(function() {
//   db.run(
// `    CREATE TABLE IF NOT EXISTS Category (
//       CategoryId INTEGER PRIMARY KEY AUTOINCREMENT,
//       CategoryName TEXT NOT NULL,
//       ParentCategory TEXT,
//       CategoryBgColor TEXT,
//       CategoryImage BLOB,
//       CategoryIcon BLOB,
//       Status NUMERIC NOT NULL,
//       OfferStartDate TEXT,
//       OfferEndDate TEXT)`
//   );

//   var stmt = db.prepare(`INSERT INTO Category (CategoryId, CategoryName, ParentCategory, CategoryBgColor, CategoryImage, CategoryIcon, Status, OfferStartDate, OfferEndDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);
//   stmt.run(10, 'Burger', 'Snakes', 'Yellow', '', '', 1, '26/12/2021', '27/12/2021');
//   stmt.finalize();

//   db.each("SELECT * FROM Category", function(err, row) {
//       console.log(row);
//   });
// });

// db.close();

const options = {
  client: 'sqlite3',
  connection: {
    filename: './bhojon.sqlite',
  },
  useNullAsDefault: true,
};
const knex = require('knex')(options);

// create table
module.exports.insertCategory = function (tableName, data) {
  // Check table exist or not
  return knex.schema
    .hasTable(tableName)
    .then(function (res) {
      if (res !== true) {
        // Created table
        knex.schema
          .createTable(tableName, (table) => {
            table.increments('CategoryId').primary();
            table.string('CategoryName').notNullable();
            table.string('ParentCategory');
            table.string('CategoryBgColor');

            table.binary('CategoryImage');
            table.binary('CategoryIcon');

            table.boolean('Status').notNullable();
            table.date('OfferStartDate');
            table.date('OfferEndDate');
          })
          .then(() => {
            // Insert data to the table
            knex(tableName)
              .insert({
                CategoryName: data.catName,
                ParentCategory: 'Snakes',
                CategoryBgColor: 'Red',
                CategoryImage: '',
                CategoryIcon: '',
                Status: 'Active',
                OfferStartDate: '',
                OfferEndDate: '',
              })
              .then((res) => console.log(res))
              .catch((err) => {
                console.log(err);
              })
              .finally(() => {
                // getAllValues(tableName)
                knex.destroy();
              });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        // Insert data to the table
        knex(tableName)
          .insert({
            CategoryName: 'Pizza',
            ParentCategory: 'Snakes',
            CategoryBgColor: 'Red',
            CategoryImage: '',
            CategoryIcon: '',
            Status: 'Active',
            OfferStartDate: '',
            OfferEndDate: '',
          })
          .then((res) => console.log(res))
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            // getAllValues(tableName)
            knex.destroy();
          });
      }
    })
    .catch(function (err) {
      console.log('zzz: error:', err);
    });
};
// insertCategory('Categories');

// function getAllValues(tableName) {
//   return knex(tableName)
//     .select('*')
//     .then((cName) => {
//       console.log(cName);
//       knex.destroy();
//     });
// }
// getAllValues(tableName);

// function getValues() {
//   return knex(tableName)
//     .select(
//       'CategoryId',
//       'CategoryName',
//       'ParentCategory',
//       'CategoryBgColor',
//       'CategoryImage',
//       'CategoryIcon',
//       'Status',
//       'OfferStartDate',
//       'OfferEndDate'
//     )
//     .then((_data) => {
//       console.log(_data);
//       knex.destroy();
//     });
// }
// getValues();
