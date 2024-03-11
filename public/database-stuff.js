const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./public/timeclock.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the timeclock.db SQlite database.');
  });
  
const testDatabase = () => {
    let db = new sqlite3.Database('./public/timeclock.db', (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Connected to the timeclock.db SQlite database.');
      });
      db.close;
}