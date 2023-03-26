const multer = require("multer");
const path = require("path");
const recipe = require("../models/recipe"); // replace with your model
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
async function uploadFile(req, res, next) {
  upload.single("photo")(req, res, async function (err) {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: "Error uploading file" });
    }
    if (!req.file) {
      return res.status(400).json({ error: "No file found in request" });
    }
    const folderName = req.params.folderName;
    const recipe_id = req.body.recipe_id;
    console.log(recipe_id);
    const filePath = `/Upload/${folderName}/${req.file.filename}`;
    try {
      var result = await recipe.save_photo(filePath, recipe_id);
      console.log(result);
      res.status(200).json({ message: "File uploaded successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error saving file path in database" });
    }
  });
}

module.exports = { uploadFile };
