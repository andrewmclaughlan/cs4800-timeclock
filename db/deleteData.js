const sqlite3 = require('sqlite3').verbose();
async function updateData(query) {
    let db = new sqlite3.Database('./timeclock.db', (err) => {
        if (err) {
          return console.error(err.message);
        }
    });
    db.run(query, (err) => {
        if(err) {
            return console.log(err.message);
        }        
    })
}
module.exports = updateData;