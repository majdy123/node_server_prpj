const personModel = require("../models/person");
class personContrller {
  static async setpass(req, res) {
    var NewPassword = req.body.NewPassword;
    var Email = req.body.Email;
    var result = await personModel.setpass(NewPassword, Email);
    if (result == true) {
      res.send({
        message: "Password Set Successflly",
        status: 200,
      });
    } else {
      res.send({
        message: "Faield to Set Password",
        status: 400,
      });
    }
  }

  static async get_person_id(req, res) {
    var Email = req.body.Email;
    var result = await personModel.get_person_id(Email);
    if (result) {
      res.send(result);
    } else {
      res.send({
        message: "Erorr",
        status: 400,
      });
    }
  }

  static async get_person_id_admin(req, res) {
    var Email = req.body.Email;
    var Password = req.body.Password;
    var result = await personModel.get_person_id_admin(Email, Password);
    if (result) {
      res.send(result);
    } else {
      res.send({
        message: "Erorr",
        status: 400,
      });
    }
  }

  static async addPerson(req, res) {
    //person table
    var Password = req.body.Password;
    var Email = req.body.Email;
    var User_Name = req.body.User_Name;
    var Phone_Num = req.body.Phone_Num;
    var person_id = req.body.person_id;
    var result = await personModel.addPerson(
      Password,
      Email,
      User_Name,
      Phone_Num,
      person_id
    );
    if (result == true) {
      res.send({
        message: "Added",
        status: 200,
      });
    } else {
      res.send({
        message: "Failed To Add Person",
        status: 400,
        error: result,
      });
    }
  }

  static async check_admin(req, res) {
    var Password = req.body.Password;
    var Email = req.body.Email;
    var result = await personModel.check_admin(Password, Email);
    if (result.length > 0) {
      res.send({
        message: "Accepted",
        status: 200,
      });
    } else {
      res.send({
        message: "Not Accepted",
        status: 400,
      });
    }
  }
  static async updatePersonData(req, res, next) {
    upload.single("photo")(req, res, async function (err) {
      if (err) {
        console.log(err);
        return res.status(400).json({ error: "Error uploading file" });
      }
      if (!req.file) {
        return res.status(400).json({ error: "No file found in request" });
      }
      const folderName = req.params.folderName;
      const email = req.body.email;
      const password = req.body.password;
      const phoneNumber = req.body.phoneNumber;
      const userName = req.body.userName;
      const personId = req.body.personId;

      const filePath = `/Upload/${folderName}/${req.file.filename}`;
      try {
        var result = await personModel.updatePerson(
          filePath,
          email,
          password,
          phoneNumber,
          userName,
          personId
        );
        console.log(result);
        res.status(200).json({ message: "recipe updated successfully" });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error saving file path in database" });
      }
    });
  }
}
module.exports = personContrller;
