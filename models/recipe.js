const db = require("../config/db");
class recipe {
  static save_photo(photo_path, recipe_id) {
    return new Promise((resolve) => {
      db.query(
        "UPDATE `recipe` SET `img` = ? WHERE `recipe_id`= ? ",
        [photo_path, recipe_id],
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
  static save_All_info(filePath, title, descr, calu, protein, category) {
    return new Promise((resolve) => {
      db.query(
        "INSERT INTO `recipe`(`title`, `descr`, `img`, `calu`, `protein` , `category`) VALUES (?,?,?,?,?,?)",
        [title, descr, filePath, calu, protein, category],
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
  static update_All_info(
    filePath,
    title,
    descr,
    calu,
    protein,
    category,
    carb,
    recipe_id
  ) {
    return new Promise((resolve) => {
      db.query(
        "UPDATE `recipe` SET `title`=?,`descr`=?,`img`=?,`calu`=?,`protein`=?,`category`=?,`carb`=?  WHERE recipe_id=?",
        [title, descr, filePath, calu, protein, category, carb, recipe_id],
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
  static getData() {
    return new Promise((resolve) => {
      console.log("in alldata get");
      db.query("select * from recipe", [], (err, result) => {
        if (!err) {
          resolve(result);
        }
        resolve(err);
      });
    });
  }
  static async deleteRecipe(id) {
    return new Promise((resolve) => {
      db.query("delete from recipe where recipe_id=?", [id], (err, result) => {
        if (err) {
          resolve(false);
        }
        resolve(true);
      });
    });
  }
}
module.exports = recipe;
