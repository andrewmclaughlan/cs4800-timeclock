
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
async function testReceive(query) {
  //console.log(query);
  let db = new sqlite3.Database('./timeclock.db', (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Connected to the timeclock.db SQlite database.');
    });
    var descript = 'This shouldnt be here';
    descript = new Promise((resolve, reject) => {
      db.all(query, async (err, row) => {
        if (err) {
          reject(err);
        }
        resolve(row);
      });
    });
    /*db.get('SELECT DESCRIPTION desc FROM USERTYPE', async (err, row) => {
      if (err) {
        return console.error(err.message);
      }
      console.log((typeof row.desc))
      console.log(row.desc);
      descript = row.desc;
    });
    */
    /*
    const task = db.prepare('SELECT * FROM USERTYPE');
    descript = task.all();
    console.log(task.all());*/
    console.log(descript);
    db.close;
    return descript;
    
}
module.exports = testReceive;