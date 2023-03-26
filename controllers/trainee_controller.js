const traineeModel = require("../models/trainee");
class traineeController {
  static async getData(req, res) {
    var Email = req.body.Email;
    var Password = req.body.Password;

    var result = await traineeModel.getData(Email, Password);
    if (result) {
      res.send(result);
    } else {
      res.send({
        message: "ERORR",
        status: 400,
      });
    }
  }
  static async addtrainee_id_from_person(req, res) {
    var id = req.body.id;
    var result = await traineeModel.addID(id);
    if (result) {
      res.send(result);
    } else {
      res.send({
        message: "ERORR",
        status: 400,
      });
    }
  }
  static async Sign_trainee(req, res) {
    var Trainee_id = req.body.Trainee_id;
    var Height = req.body.Height;
    var Weight = req.body.Weight;
    var Age = req.body.Age;
    var FullName = req.body.FullName;
    var Gender = req.body.Gender;
    var medical_conditions = req.body.medical_conditions;
    var Fitness_level = req.body.Fitness_level;
    var result = await traineeModel.Signtrainee(
      Trainee_id,
      Height,
      Weight,
      Age,
      FullName,
      Gender,
      medical_conditions,
      Fitness_level
    );
    if (result) {
      res.send(result);
    } else {
      res.send({
        message: "Error Id does not Exist",
        status: 400,
      });
    }
  }
  static async addtrainee(req, res) {
    var Trainee_id = req.body.Trainee_id;

    var Height = req.body.Height;

    var Weight = req.body.Weight;

    var Age = req.body.Age;

    var FullName = req.body.FullName;

    var Gender = req.body.Gender;

    var medical_conditions = req.body.medical_conditions;

    var Fitness_level = req.body.Fitness_level;

    var result = await traineeModel.addtrainee(
      Trainee_id,
      Height,
      Weight,
      Age,
      FullName,
      Gender,
      medical_conditions,
      Fitness_level
    );
    if (result.errno != 1062) {
      res.send({
        message: "Added to Trainee",
        status: true,
      });
    } else {
      res.send({
        message: "ERORR Not Added",
      });
    }
  }
}

module.exports = traineeController;
