const group_workoutModel = require("../models/group_workout");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderName = req.params.folderName;
    
    cb(null, "./Upload/" + folderName);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

class  group_workoutController {

    static async countWorkoutInCategorie(req, res){
      const categorie_id = req.body.categorie_id;
      var result = await group_workoutModel.getWorkoutCat(categorie_id);
      var count = 0 ;
      result.forEach(element => {
        count++
      }); 
      if (result) {
          res.send({
            workout_count:count
          });
        } else {
          res.send({
            message: "empty",
          }
        );
      }
    }

    static async getWorkoutCat(req, res){
        const categorie_id = req.body.categorie_id;
        var result = await group_workoutModel.getWorkoutCat(categorie_id);
        if (result) {
            res.send(result);
          } else {
            res.send({
              message: "empty",
            }
          );
        }
    }
    static async getWorkoutData(req, res){
      const exercise_id = req.body.exercise_id;
      var result = await group_workoutModel.getWorkoutData(exercise_id);
        if (result) {
            res.send(result);
          } else {
            res.send({
              message: "empty",
            }
          );
        }
    }


    static async UpdateWorkout(req, res){
      upload.single("photo")(req, res, async function (err) {
        const exercise_id = req.body.exercise_id;
        const excersie_name = req.body.excersie_name;
        const Cal = req.body.Cal;
        const Fav = req.body.Fav;
        const workout_level = req.body.workout_level;
        const Reps = req.body.Reps;
        const Round = req.body.Round;
        const Time = req.body.Time;
        const Tutorial = req.body.Tutorial;
        const Video = req.body.Video;
        const categorie = req.body.categorie;
        const folderName = req.params.folderName;
        const filePath = `/Upload/${folderName}/${req.file.filename}`;
          var result = await group_workoutModel.UpdateWorkout(
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
        );
        if (result == true) {
          res.send({
            message: "update successfully",
            status: 200,
          });
        } else {
          res.send({
            message: "Update failed",
            status: 400,
          });
        }
        if (err) {
          console.log(err);
          return res.status(400).json({ error: "Error uploading file" });
        }
        if (!req.file) {
          return res.status(400).json({ error: "No file found in request" });
        }
      
      });
    }


    static async addNewWorkout(req, res){
      upload.single("photo")(req, res, async function (err) {
        const excersie_name = req.body.excersie_name;
        const Cal = req.body.Cal;
        const Fav = req.body.Fav;
        const workout_level = req.body.workout_level;
        const Reps = req.body.Reps;
        const Round = req.body.Round;
        const Time = req.body.Time;
        const Tutorial = req.body.Tutorial;
        const Video = req.body.Video;
        const categorie = req.body.categorie;
        const folderName = req.params.folderName;
        const filePath = `/Upload/${folderName}/${req.file.filename}`;
          var result = await group_workoutModel.addNewWorkout(
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
        if (err) {
          console.log(err);
          return res.status(400).json({ error: "Error uploading file" });
        }
        if (!req.file) {
          return res.status(400).json({ error: "No file found in request" });
        }
      
      });
       
      

    }

    static async deleteWorkout(req, res){
      const id = req.body.exercise_id;
      if (id) {
        var result = await group_workoutModel.deleteWorkout(id);
        if (result.flag == "yes") {
          res.send({
            message: "delete successfully",
            status: 200,
          });
        } else if(result.flag == "no") {
          res.send({
            message: "failed to delete id not true ",
            status: 400,
          });
        }
      }
    }
}
module.exports = group_workoutController;