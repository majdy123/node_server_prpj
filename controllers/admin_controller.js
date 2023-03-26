const adminModel = require("../models/admin");
class adminController {
    static async adminid(req, res){
        var Admin_id = req.body.Admin_id;
        var result = await adminModel.adminid(Admin_id);
        if (result) {
            res.send({
              message:"Accepted",
              status:true
            });
          } else {
            res.send({
              message: "Not Accepted",
            }
          );
        }
    }
}
module.exports = adminController;