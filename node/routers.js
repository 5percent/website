const path = require('path');

exports.home = function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../dist/src/pages/index.html'));
}
exports.sg = function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../dist/src/pages/sg.html'));
}