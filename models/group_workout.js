const db = require("../config/db");
class group_workout {
    static async getWorkoutCat(categorie_id){
        return new Promise((resolve) => {
            db.query("SELECT  *  FROM `group_workout` WHERE `categorie` = ? ",[categorie_id],
            (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                  resolve({
                    message: err,
                  });
                }
              });
        });
    }

    static async UpdateWorkout(
        exercise_id,
        excersie_name,
        Cal,
        Fav,
        workout_level,
        Reps,
        Round,
        Time,
        Tutorial,
        Video,
        categorie,
        filePath
    ){
      return new Promise((resolve) => {
        db.query("UPDATE `group_workout` SET `excersie_name`= ?,`Cal`= ?,`Fav`=?,`workout_level`=?,`Reps`=?,`Round`=?,`Time`=?,`Tutorial`=?,`Video`=?,`workout_img`=?,`categorie`=? WHERE `exercise_id`=?",[
          excersie_name,
          Cal,
          Fav,
          workout_level,
          Reps,
          Round,
          Time,
          Tutorial,
          Video,
          filePath,
          categorie,
          exercise_id
      ],
      (err, res) => {
          if (!err) {
            resolve(true);
          } else {
            console.log(err);
            resolve(false);
          }
        })
      });
    }
    static async getWorkoutData(exercise_id){
      return new Promise((resolve) => {
        db.query("SELECT `excersie_name`, `Cal`, `Fav`, `workout_level`, `Reps`, `Round`, `Time`, `Tutorial`, `Video`, `workout_img`, `categorie` FROM `group_workout` WHERE `exercise_id`= ?",[exercise_id],
        (err, result) => {
            if (!err) {
                resolve(result);
            } else {
              resolve({
                message: err,
              });
            }
          });
    });
    }

    static async deleteWorkout(id){
      return new Promise((resolve) => {
        db.query(
          "delete from group_workout where exercise_id=?",
          [id],
          (err, result) => {
            if (err) {
              resolve(
                {
                  flag : "Erorr",
                  message : "Erorr in delete request"
                }
              );
            }
            else if(result.affectedRows >0){
              resolve(
                {
                  flag : "yes",
                  message : "delete successfully"
                }
              );
            }
            else{
              resolve({
                flag : "no",
                message : "this id is not true"
              });
            }
          }
        );
      });
    }

    static async save_workout_photo(filePath, exercise_id){
        return new Promise((resolve) => {
            db.query(
                "UPDATE group_workout SET workout_img = ? WHERE exercise_id = ? ",
                [filePath, exercise_id ],
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
    static async addNewWorkout(
        excersie_name,
        Cal,
        Fav,
        workout_level,
        Reps,
        Round,
        Time,
        Tutorial,
        Video,
        categorie,
        filePath
    ){
        return new Promise((resolve) => {
            db.query("INSERT INTO `group_workout`(  `excersie_name`, `Cal`, `Fav`, `workout_level`, `Reps`, `Round`, `Time`, `Tutorial`, `Video`,   `categorie` , `workout_img`) VALUES (?,?,?,?,?,  ?,?,?,?,? , ?)",[ excersie_name,
                Cal,
                Fav,
                workout_level,
                Reps,
                Round,
                Time,
                Tutorial,
                Video,
                categorie,
                filePath
            ],
            (err, res) => {
                if (!err) {
                  resolve(true);
                } else {
                  console.log(err);
                  resolve(false);
                }
              })
        });
    }
}
module.exports = group_workout;