const multer = require("multer");
const path = require("path");
const Trainee = require("../models/trainee"); // replace with your model
const personModel = require("../models/person");

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
    const Trainee_id = req.body.Trainee_id;
    const email = req.body.email;
    const password = req.body.password;
    const phoneNumber = req.body.phoneNumber;
    const userName = req.body.userName;
    // const personId = req.body.personId;
    const filePath = `/Upload/${folderName}/${req.file.filename}`;
    console.log(Trainee_id);
    try {
      var result = await Trainee.save_photo(filePath, Trainee_id);
      await personModel.updatePerson(
        filePath,
        email,
        password,
        phoneNumber,
        userName,
        Trainee_id
      );
      console.log(result);
      res.status(200).json({ message: "File uploaded successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error saving file path in database" });
    }
  });
}

module.exports = { uploadFile };
