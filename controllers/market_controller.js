const marketModel = require("../models/market");
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

class Gymmarket {

  static async getItemCategorie(req, res){
    const categorie_id = req.body.categorie;
    var result = await marketModel.getItemCategorie(categorie_id);
    if (result) {
        res.send(result);
      } else {
        res.send({
          message: "empty",
        }
      );
    }
}

  static async deleteStoreItem(req,res){
    const id = req.body.supplement_id;
      var result = await marketModel.deleteStoreItem(id);
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


  static async GetItemsCategorie(req,res){
    const categorie = req.body.categorie;
    var result = await marketModel.GetItemsCategorie(categorie);
    if (result) {
        res.send(result);
      } else {
        res.send({
          message: "Erorr",
        }
      );
    }
  }


  static async CountItemsCategorie(req, res){
    const categorie = req.body.categorie;
    var result = await marketModel.getItemCat(categorie);
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
    static async addNewItem(req, res){
        upload.single("photo")(req, res, async function (err) {
          const supplement_name = req.body.supplement_name;
          const supplement_desc = req.body.supplement_desc;
          const Protein = req.body.Protein;
          const Carbohydrates = req.body.Carbohydrates;
          const fats = req.body.fats;
          const Vitamins = req.body.Vitamins;
          const hydration = req.body.hydration;
          const Quantity_Stock = req.body.Quantity_Stock;
          const price = req.body.price;
          const Flavor = req.body.Flavor;
          const categorie = req.body.categorie;
          
          const folderName = req.params.folderName;
          const logo = `/Upload/${folderName}/${req.file.filename}`;
            var result = await marketModel.addNewItem(
                supplement_name,
                logo,
                supplement_desc	,
                Protein,	
                Carbohydrates,	
                fats,
                Vitamins,
                hydration,	
                Quantity_Stock,
                price,
                Flavor,	
                categorie
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
}
module.exports = Gymmarket;
