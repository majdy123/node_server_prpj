const userModel = require("../models/gym");
class GymController {
  static async getAllData(req, res) {
    var result = await userModel.getData();
    if (result) {
      res.send(result);
    }
  }

  static async addGym(req, res) {
    var Email = req.body.Email;

    var result = await userModel.addGym("Name", Email);
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
  static async deleteGym(req, res) {
    const id = req.body.Name;
    if (id) {
      var result = await userModel.deleteGym(id);
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
}
module.exports = GymController;
