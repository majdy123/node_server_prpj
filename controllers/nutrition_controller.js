const nutritionModel = require("../models/nutrition");
class NutritionController {
  static async getNutrition(req, res) {
    var result = await nutritionModel.getData();
    if (result) {
      res.send(result);
    }
  }

  static async addNutrition(req, res) {
    var Vitamins_need = req.body.Vitamins_need;
    var Water_need = req.body.Water_need;
    var Proteins_need = req.body.Proteins_need;
    var Carbohydrates_need = req.body.Carbohydrates_need;
    var ntrition_plan_name = req.body.ntrition_plan_name;

    var result = await nutritionModel.addNutritonPlan(
      Vitamins_need,
      Water_need,
      Proteins_need,
      Carbohydrates_need,
      ntrition_plan_name
    );
    if (result == true) {
      res.send({
        message: "add successfully",
        status: 200,
      });
    } else {
      res.send({
        message: "add failed",
        status: 400,
      });
    }
  }
  static async deleteNutrition(req, res) {
    const id = req.body.nutrients_plan_id;
    if (id) {
      var result = await nutritionModel.deleteNutritonPlan(id);
      if (result) {
        res.send({
          message: "delete successfully",
          status: 200,
        });
      } else {
        res.send({
          message: "failed to delete ",
          status: 400,
        });
      }
    }
  }
  static async updateNutrition(req, res) {
    const id = req.body.nutrients_plan_id;
    var Vitamins_need = req.body.Vitamins_need;
    var Water_need = req.body.Water_need;
    var Proteins_need = req.body.Proteins_need;
    var Carbohydrates_need = req.body.Carbohydrates_need;
    var ntrition_plan_name = req.body.ntrition_plan_name;

    if (id) {
      var result = await nutritionModel.updateNutritonPlan(
        id,
        Vitamins_need,
        Water_need,
        Proteins_need,
        Carbohydrates_need,
        ntrition_plan_name
      );
      if (result) {
        res.send({
          message: "update successfully",
          status: 200,
        });
      } else {
        res.send({
          message: "failed to update ",
          status: 400,
        });
      }
    }
  }
}
module.exports = NutritionController;
