const db = require("../config/db");
class NutritionModel {
  static getData() {
    return new Promise((resolve) => {
      db.query("select * from nutrients_plan", [], (err, result) => {
        if (!err) {
          resolve(result);
        }
        resolve(err);
      });
    });
  }
  static async addNutritonPlan(
    Vitamins_need,
    Water_need,
    Proteins_need,
    Carbohydrates_need,
    ntrition_plan_name
  ) {
    return new Promise((resolve) => {
      db.query(
        "INSERT INTO `nutrients_plan`( `Carbohydrates_need`, `Proteins_need`, `Water_need`, `Vitamins_need`,`ntrition_plan_name`) VALUES (?,?,?,?,?)",
        [
          Carbohydrates_need,
          Proteins_need,
          Water_need,
          Vitamins_need,
          ntrition_plan_name,
        ],
        (err, res) => {
          if (!err) {
            resolve(true);
          } else {
            console.log(err);
            resolve(false);
          }
        }
      );
    });
  }
  static async deleteNutritonPlan(id) {
    return new Promise((resolve) => {
      db.query(
        "delete from nutrients_plan where nutrients_plan_id=?",
        [id],
        (err, result) => {
          if (err) {
            resolve(false);
          }
          resolve(true);
        }
      );
    });
  }
  static async updateNutritonPlan(
    id,
    Vitamins_need,
    Water_need,
    Proteins_need,
    Carbohydrates_need,
    ntrition_plan_name
  ) {
    return new Promise((resolve) => {
      db.query(
        "UPDATE `nutrients_plan` SET  `ntrition_plan_name`=? ,`Carbohydrates_need`=?,`Proteins_need`=?,`Water_need`=?,`Vitamins_need`=? WHERE nutrients_plan_id=? ",
        [
          ntrition_plan_name,
          Carbohydrates_need,
          Proteins_need,
          Water_need,
          Vitamins_need,
          id,
        ],
        (err, result) => {
          if (err) {
            console.log(err);
            resolve(false);
          }
          resolve(true);
        }
      );
    });
  }
}

module.exports = NutritionModel;
