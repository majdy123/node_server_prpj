 
const path = require('path');
exports.getPhoto = (req, res) => {
  const folder = req.params.folder;
  const filename = req.params.filename;
  const fullPath = path.join(__dirname, '../Upload', folder, filename);
  res.sendFile(fullPath);
};