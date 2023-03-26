const db = require("../config/db");
class skill{
    static get_skills_lists(){
        return new Promise((resolve) => {
            db.query("SELECT * FROM `skill` WHERE 1",[],(err,result)=>{
                if (!err) {
                    resolve(result);
                 }
                 else{
                    resolve(err);
                 }
            })
        });
    }


    static Add_skill_list(Skill_id, Powerlifting, Bodyweight, Cardiovascular, Yoga, Calisthenics, High_Intensity, Boxing, Bodybuilding, CrossFit){
        var sql = "INSERT INTO `skill`(`Skill_id`, `Powerlifting`, `Bodyweight`, `Cardiovascular`, `Yoga`, `Calisthenics`, `High_Intensity`, `Boxing`, `Bodybuilding`, `CrossFit`) "+
        "VALUES (?,?,?,?,?,?,?,?,?,?)";
        return new Promise((resolve) => {
            
            db.query(sql, [Skill_id, Powerlifting, Bodyweight, Cardiovascular, Yoga, Calisthenics, High_Intensity, Boxing, Bodybuilding, CrossFit], (err, result) => {
              if (!err) {
                if(result.affectedRows >0){
                  resolve(true)
                 }
                  resolve(false);
              }
              resolve(err);
            });
          });
    }
}

module.exports = skill