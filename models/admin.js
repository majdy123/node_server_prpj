const db = require("../config/db");
class adminModel {
    static adminid(Admin_id) {
        return new Promise((resolve) => {
          db.query("select * from admin WHERE Admin_id = ? ", [Admin_id], (err, result) => {
            if (!err) {
              if(result.length>0){
                resolve(true);
              }
              else{
                resolve(false);
              }
            }
            resolve(err);
          });
        });
      }
}
module.exports = adminModel;