const recipeModel = require("../models/recipe");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderName = req.params.folderName;
    console.log(folderName);
    cb(null, "./Upload/" + folderName);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });
class RecipeController {
  static async getAllData(req, res) {
    var result = await recipeModel.getData();
    if (result) {
      res.send(result);
    }
  }
  static async deleteRecipe(req, res) {
    const recipe_id = req.body.recipe_id;
    if (recipe_id) {
      var result = await recipeModel.deleteRecipe(recipe_id);
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
  static async updateRecipeData(req, res, next) {
    upload.single("photo")(req, res, async function (err) {
      if (err) {
        console.log(err);
        return res.status(400).json({ error: "Error uploading file" });
      }
      if (!req.file) {
        return res.status(400).json({ error: "No file found in request" });
      }
      const folderName = req.params.folderName;
      const title = req.body.title;
      const descr = req.body.descr;
      const calu = req.body.calu;
      const carb = req.body.carb;
      const protein = req.body.protein;
      const category = req.body.category;
      const recipe_id = req.body.recipe_id;

      const filePath = `/Upload/${folderName}/${req.file.filename}`;
      try {
        var result = await recipeModel.update_All_info(
          filePath,
          title,
          descr,
          calu,
          protein,
          category,
          carb,
          recipe_id
        );
        console.log(result);
        res.status(200).json({ message: "recipe updated successfully" });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error saving file path in database" });
      }
    });
  }
  static async uploadRecipeData(req, res, next) {
    upload.single("photo")(req, res, async function (err) {
      if (err) {
        console.log(err);
        return res.status(400).json({ error: "Error uploading file" });
      }
      if (!req.file) {
        return res.status(400).json({ error: "No file found in request" });
      }
      const folderName = req.params.folderName;
      const title = req.body.title;
      const descr = req.body.descr;
      const calu = req.body.calu;
      const protein = req.body.protein;
      const category = req.body.category;

      const filePath = `/Upload/${folderName}/${req.file.filename}`;
      try {
        var result = await recipeModel.save_All_info(
          filePath,
          title,
          descr,
          calu,
          protein,
          category
        );
        console.log(result);
        res.status(200).json({ message: "File uploaded successfully" });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error saving file path in database" });
      }
    });
  }
}
module.exports = RecipeController;
