const db = require("../config/db");
class personModel {
  static setpass(NewPassword, Email) {
    return new Promise((resolve) => {
      db.query(
        "UPDATE `person` SET `Password`=? WHERE `Email` = ?",
        [NewPassword, Email],
        (err, result) => {
          if (!err) {
            if (result.affectedRows > 0) {
              resolve(true);
            }
            resolve(false);
          } else {
            resolve(false);
          }
        }
      );
    });
  }

  static check_admin(Password, Email) {
    return new Promise((resolve) => {
      db.query(
        "SELECT * FROM  `person` WHERE Email = ? AND  Password = ?",
        [Email, Password],
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            resolve(err);
          }
        }
      );
    });
  }

  static get_person_id_admin(Email, Password) {
    return new Promise((resolve) => {
      db.query(
        "SELECT `person_id` FROM  `person` WHERE Email = ? AND  Password = ?",
        [Email, Password],
        (err, result) => {
          if (!err) {
            if (result.length > 0) {
              var data = result[0].person_id.toString();
              resolve(data);
            } else {
              resolve("This Account Dose not exeist");
            }
          } else {
            resolve(err);
          }
        }
      );
    });
  }

  static addPerson(Password, Email, User_Name, Phone_Num, person_id) {
    return new Promise((resolve) => {
      db.query(
        "INSERT INTO `person`(`person_id`, `Password`, `Email`, `phone_Number`, `User_Name`) VALUES (?,?,?,?,?) ",
        [person_id, Password, Email, Phone_Num, User_Name],
        (err, result) => {
          if (!err) {
            if (result.affectedRows > 0) {
              resolve(true);
            }
            resolve(err);
          } else {
            resolve(err);
          }
        }
      );
    });
  }

  static get_person_id(Email) {
    return new Promise((resolve) => {
      db.query(
        "SELECT `person_id` FROM `person` WHERE Email = ?",
        [Email],
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            resolve(err);
          }
        }
      );
    });
  }
  static updatePerson(
    filePath,
    email,
    password,
    phoneNumber,
    userName,
    person_id
  ) {
    return new Promise((resolve) => {
      db.query(
        "UPDATE `person` SET  `Password`=?,`Email`=?,`phone_number`=?,`User_Name`=? WHERE `person_id`=?",
        [password, email, phoneNumber, userName, person_id],
        (err, result) => {
          if (!err) {
            if (result.affectedRows > 0) {
              resolve({
                message: "Added",
              });
            }
            resolve({
              message: "Not Added",
            });
          } else {
            resolve({
              message: err,
            });
          }
        }
      );
    });
  }
}
module.exports = personModel;
