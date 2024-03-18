const sqlite3 = require('sqlite3').verbose();

/*const db = new sqlite3.Database('./public/timeclock.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the timeclock.db SQlite database.');
  });*/
  
function testDatabase() {
    console.log("I am here");
    let desc;
    let db = new sqlite3.Database('./timeclock.db', (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Connected to the timeclock.db SQlite database.');
      });
      db.get("SELECT DESCRIPTION desc FROM USERTYPE", [], (err, row) => {
        if (err) {
          return console.error(err.message);
        }
        desc = row.desc;
        console.log(row.desc);
      });
      db.close;
}
function testReceive({query}) {
  let desc;
  let db = new sqlite3.Database('./timeclock.db', (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Connected to the timeclock.db SQlite database.');
    });
    db.get(query, [], (err, row) => {
      if (err) {
        return console.error(err.message);
      }
      desc = row.desc;
      console.log(row.desc);
    });
    console.log(desc);
    db.close;
    return desc;
}
module.exports = testDatabase, testReceive;