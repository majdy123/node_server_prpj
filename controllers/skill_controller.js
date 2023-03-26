const skillModel = require("../models/skill");
class skillController {
    static async skillslist(req, res) {
      var result = await skillModel.get_skills_lists();
      if (result) {
        res.send(result);
      } else {
        res.send({
          message: "Erorr",
          status: 400,
        }
    );
    }
    }


    static async addskilllist(req, res){
        var Skill_id = req.body.Skill_id;
        var Powerlifting = req.body.Powerlifting;
        var Bodyweight = req.body.Bodyweight;
        var Cardiovascular = req.body.Cardiovascular;
        var Yoga = req.body.Yoga;
        var Calisthenics = req.body.Calisthenics;
        var High_Intensity = req.body.High_Intensity;
        var Boxing = req.body.Boxing;
        var Bodybuilding = req.body.Bodybuilding;
        var CrossFit = req.body.CrossFit;
        var result = await skillModel.Add_skill_list(Skill_id, Powerlifting, Bodyweight, Cardiovascular, Yoga, Calisthenics, High_Intensity, Boxing, Bodybuilding, CrossFit);
        if (result.errno != 1062) {
            res.send({
              message:"Added to Skills",
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

module.exports = skillController