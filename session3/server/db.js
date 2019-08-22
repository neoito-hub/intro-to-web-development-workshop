const sqlite3 = require('sqlite3').verbose()

const DBSOURCE = require('./config')['DB']

const db = new sqlite3.Database(DBSOURCE)

db.asyncGetOne = function (sql) {
  const self = this;
  return new Promise(function (resolve, reject) {
    self.get(sql, function (err, row) {
      if (err)
        reject(err);
      else
        resolve(row);
    });
  });
}

db.asyncGetMany = function (sql) {
  const self = this;
  return new Promise(function (resolve, reject) {
    self.all(sql, function (err, rows) {
      if (err)
        reject(err);
      else
        resolve(rows);
    });
  });
}

db.asyncRun = function (sql) {
  const self = this;
  return new Promise(function (resolve, reject) {
    self.run(sql, function (err) {
      if (err)
        reject(err);
      else
        resolve(this.lastID);
    });
  });
}


module.exports = db;
