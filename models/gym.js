const db = require("../config/db");
class GymModel {
  static getData() {
    return new Promise((resolve) => {
      db.query("select * from gym", [], (err, result) => {
        if (!err) {
          resolve(result);
        }
        resolve(err);
      });
    });
  }
  static async addGym(Name, Email) {
    return new Promise((resolve) => {
      db.query(
        "insert into gym (Name, Email) values(?,?)",
        [Name, Email],
        (err, res) => {
          if (!err) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      );
    });
  }
  static async deleteGym(id) {
    return new Promise((resolve) => {
      db.query("delete from gym where Name=?", [id], (err, result) => {
        if (err) {
          resolve(false);
        }
        resolve(true);
      });
    });
  }
}

module.exports = GymModel;
