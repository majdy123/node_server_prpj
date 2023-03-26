const coachModel = require("../models/coach");
class coachController {
    static async addcoach(req, res){
        var Coach_id = req.body.Coach_id;
        var Height = req.body.Height;
        var Weight = req.body.Weight;
        var Year_of_exp = req.body.Year_of_exp;
        var Age = req.body.Age;
        var coaching_Foucs = req.body.coaching_Foucs;
        var Gender = req.body.Gender;
        var Full_name = req.body.Full_name;
        var Personal_pic = req.body.Personal_pic;
        var Qualifications = req.body.Qualifications;
        var Nationality = req.body.Nationality;
        var Skills_id = req.body.Skills_id;
        var services = req.body.services;
        var subscription_tax = req.body.subscription_tax;
        var Salary = req.body.Salary;
        var Language = req.body.Language;
        var result = await coachModel.addcoach(Coach_id, Height, Weight, Year_of_exp, Age, coaching_Foucs, Gender, Full_name, Personal_pic, Qualifications, Nationality, Skills_id, services, subscription_tax, Salary, Language );
        if (result) {
            res.send({
              message:"Added to coach",
              status:true
            });
          } else {
            res.send({
              message: "ERORR Not Added",
            }
          );
        }
    }
}
module.exports = coachController;