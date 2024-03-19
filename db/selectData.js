const sqlite3 = require('sqlite3').verbose();

async function selectData(query) {
    let db = new sqlite3.Database('./timeclock.db', (err) => {
        if (err) {
          return console.error(err.message);
        }
      });
      var data = 'This shouldnt be here';
      data = new Promise((resolve, reject) => {
        db.all(query, async (err, row) => {
          if (err) {
            reject(err);
          }
          resolve(row);
        });
      });
      db.close;
      return data;
      
  }
  module.exports = selectData;