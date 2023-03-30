const db = require("../config/db");
class market {
  static async getItemCategorie(categorie_id){
    return new Promise((resolve) => {
        db.query("SELECT  *  FROM `market` WHERE `categorie` = ? ",[categorie_id],
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
static async deleteStoreItem(id){
  return new Promise((resolve) => {
    db.query(
      "delete from market where supplement_id=?",
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

  static async GetItemsCategorie(categorie_id){
    return new Promise((resolve) => {
      db.query("SELECT  *  FROM `market` WHERE `categorie` = ? ",[categorie_id],
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


  static async getItemCat(categorie_id){
    return new Promise((resolve) => {
        db.query("SELECT  *  FROM `market` WHERE `categorie` = ? ",[categorie_id],
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



    static async  addNewItem(
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
  ){
    return new Promise((resolve) => {
        db.query("INSERT INTO `market`( `supplement_name`, `logo`, `supplement_desc`, `Protein`, `Carbohydrates`, `fats`, `Vitamins`, `hydration`, `Quantity_Stock`, `price`, `Flavor`, `categorie`) VALUES (?,?,?,? ,?,?,?,? ,?,?,?,?)",[
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

module.exports = market;