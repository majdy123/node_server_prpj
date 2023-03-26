const db = require("../config/db");
class coachModel {
    static addcoach(Coach_id, Height, Weight, Year_of_exp, Age, coaching_Foucs, Gender, Full_name, Personal_pic, Qualifications, Nationality, Skills_id, services, subscription_tax, Salary, Language ){
        return new Promise((resolve) => {
            db.query("INSERT INTO `coach` (`Coach_id`, `Height`, `Weight`, `Year_of_exp`, `Age`, `coaching_Foucs`, `Gender`, `Full_name`, `Personal_pic`, `Qualifications`, `Nationality`, `Skills_id`, `services`, `subscription_tax`, `Salary`, `Language`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ",[ Coach_id, Height, Weight, Year_of_exp, Age, coaching_Foucs, Gender, Full_name, Personal_pic, Qualifications, Nationality, Skills_id, services, subscription_tax, Salary, Language ],(err,result)=>{
                if (!err) {
                    if(result.affectedRows >0){
                     resolve(true)
                    }
                     resolve(false);
                 }
                 else{
                     resolve(false);
                 }
            })
        })
    }
}
module.exports = coachModel;