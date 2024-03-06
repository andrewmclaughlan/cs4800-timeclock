// create a new database
//const db = new sqlite3.Database('./timeclock.db');
/*
let db = new sqlite3.Database(':memory:');
export function testDatabase() {
  return db.get('SELECT * FROM USER');
}
const database = new sqlite3.Database('./timeclock.db', (err) => {
  if (err) console.error('Database opening error: ', err);
});

ipcMain.on('asynchronous-message', (event, arg) => {
  const sql = arg;
  database.all(sql, (err, rows) => {
    event.reply('asynchronous-reply', (err && err.message) || rows);
  });
});
*/

;
import fs from 'fs';
const SQL = require('sql');
const initSqlJs = require('sql-wasm.js');
const filebuffer = fs.readFileSync('timeclock.db');
initSqlJs().then(function (SQL) {
  const db = new SQL.Database(filebuffer);
});

export function DBTest() {
  const db = new SQL.Database(filebuffer);
  var stmt = db.prepare("SELECT * FROM usertype");
  while(stmt.step()) {
    var row = stmt.getAsObject();
    console.log(JSON.stringify(row));
  }
  
}
