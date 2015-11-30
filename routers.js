exports.home = function (req, res) {
    res.sendfile(__dirname + '/views/home.html');
}
exports.snake = function (req, res) {
    res.sendfile(__dirname + '/views/snake.html');
}
exports.tetris = function (req, res) {
    res.sendfile(__dirname + '/views/tetris.html');
}
exports.calDay = function (req, res) {
    res.sendfile(__dirname + '/views/calDay.html');
}
