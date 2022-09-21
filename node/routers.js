exports.home = function (req, res) {
  res.sendFile(__dirname + '/dist/src/pages/index.html');
}
exports.sg = function (req, res) {
  res.sendFile(__dirname + '/dist/src/pages/sg.html');
}